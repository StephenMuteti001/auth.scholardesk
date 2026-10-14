import { useEffect, type ReactNode } from "react";
import { Navigate, useSearch } from "@tanstack/react-router";

import { useAuth } from "@/lib/auth";
import { resolvePostAuthDestination } from "@/lib/destination";
import { BRAND } from "@/components/brand/Logo";

export function PageLoader({ label = "Loading…" }: { label?: string }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
      <img src={BRAND.monogram} alt="" className="h-12 w-12 animate-pulse" />
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

/** Hard redirect to an external portal (another scholardesk.pro site). */
export function ExternalRedirect({ url }: { url: string }) {
  useEffect(() => {
    window.location.replace(url);
  }, [url]);
  return <PageLoader label="Taking you to your portal…" />;
}

interface RequireAuthProps {
  children: ReactNode;
  /** Restrict to these roles; others are bounced to sign-in. */
  roles?: string[];
}

export function RequireAuth({ children, roles }: RequireAuthProps) {
  const { user, isLoading } = useAuth();

  if (isLoading) return <PageLoader />;
  if (!user) return <Navigate to="/" search={true} replace />;
  const role = user.role === "expert" ? "writer" : user.role;
  if (roles && (!role || !roles.includes(role))) {
    return <Navigate to="/" search={true} replace />;
  }
  return <>{children}</>;
}

/**
 * For sign-in/sign-up pages: users with a live session are sent to their
 * destination instead of seeing the form again.
 */
export function GuestOnly({ children }: { children: ReactNode }) {
  const { user, isLoading } = useAuth();
  const { return_to } = useSearch({ strict: false });

  if (isLoading) return <PageLoader />;
  if (user) {
    const destination = resolvePostAuthDestination(user, return_to);
    if (destination.type === "external") {
      return <ExternalRedirect url={destination.url} />;
    }
    return <Navigate to={destination.to} search={{ return_to }} replace />;
  }
  return <>{children}</>;
}
