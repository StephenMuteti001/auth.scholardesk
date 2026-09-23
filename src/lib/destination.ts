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
  | { type: "internal"; to: string };

/**
 * Where a user goes after signing in, based on role and (for experts)
 * their onboarding status; mirrors the expert pipeline:
 * apply -> review -> approved -> deposit -> activated -> profile.
 */
export function resolvePostAuthDestination(user: AuthUser): Destination {
  switch (user.role) {
    case "expert":
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
          return { type: "external", url: PORTALS.EXPERT };
      }
    case "admin":
    case "super_admin":
      return { type: "external", url: PORTALS.ADMIN };
    case "customer":
      return { type: "external", url: PORTALS.CUSTOMER };
    default:
      return { type: "external", url: PORTALS.PUBLIC };
  }
}

/** The internal onboarding page an expert's status maps to. */
export function writerOnboardingPath(status: string | undefined): string {
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
