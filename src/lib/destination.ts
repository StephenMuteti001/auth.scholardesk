import type { AuthUser } from "./api";

/** The ScholarDesk portal network this auth site signs users into. */
export const PORTALS = {
  PUBLIC: "https://scholardesk.pro",
  AUTH: "https://auth.scholardesk.pro",
  EXPERT: "https://expert.scholardesk.pro",
  CUSTOMER: "https://portal.scholardesk.pro",
  ADMIN: "https://admin.scholardesk.pro",
} as const;

export const SITE_URL = PORTALS.AUTH;

export type Destination =
  | { type: "external"; url: string }
  | { type: "internal"; to: "/writer-onboarding/apply" | "/writer-onboarding/pending" | "/writer-onboarding/approved" | "/writer-onboarding/rejected" };

export function authSearch(search: Record<string, unknown>): { return_to?: string | undefined } {
  return typeof search['return_to'] === "string" && search['return_to'].length <= 4096
    ? { return_to: search['return_to'] }
    : {};
}

/** Return links are destinations, never proof of access: the API owns permissions. */
export function requestedPortalDestination(user: AuthUser, raw?: string | null): Destination | null {
  const portal = user.role === "customer" || user.role === "client"
    ? PORTALS.CUSTOMER
    : user.role === "admin" || user.role === "super_admin"
      ? PORTALS.ADMIN
      : user.role === "expert" || user.role === "writer" ? PORTALS.EXPERT : null;
  if (!portal || !raw) return null;
  try {
    const candidate = new URL(raw, `${portal}/`);
    if (candidate.protocol !== "https:" || candidate.origin !== portal || candidate.username || candidate.password) return null;
    return { type: "external", url: candidate.toString() };
  } catch {
    return null;
  }
}

/**
 * Where a user goes after signing in, based on role and (for experts)
 * their onboarding status; mirrors the expert pipeline:
 * apply -> review -> approved -> deposit -> activated -> profile.
 */
export function resolvePostAuthDestination(user: AuthUser, returnTo?: string | null): Destination {
  switch (user.role) {
    case "expert":
    case "writer":
      switch (user.application_status) {
        case "not_applied":
          return { type: "internal", to: "/writer-onboarding/apply" };
        case "applied":
          return { type: "internal", to: "/writer-onboarding/pending" };
        case "awaiting_initial_deposit":
          return { type: "internal", to: "/writer-onboarding/approved" };
        case "rejected":
          return { type: "internal", to: "/writer-onboarding/rejected" };
        default:
          return requestedPortalDestination(user, returnTo) ?? { type: "external", url: PORTALS.EXPERT };
      }
    case "admin":
    case "super_admin":
      return requestedPortalDestination(user, returnTo) ?? { type: "external", url: PORTALS.ADMIN };
    case "customer":
    case "client":
      return requestedPortalDestination(user, returnTo) ?? { type: "external", url: PORTALS.CUSTOMER };
    default:
      return { type: "external", url: PORTALS.PUBLIC };
  }
}

/** The internal onboarding page an expert's status maps to. */
export function writerOnboardingPath(status: string | undefined): Extract<Destination, { type: "internal" }>['to'] {
  switch (status) {
    case "applied":
      return "/writer-onboarding/pending";
    case "awaiting_initial_deposit":
      return "/writer-onboarding/approved";
    case "rejected":
      return "/writer-onboarding/rejected";
    default:
      return "/writer-onboarding/apply";
  }
}
