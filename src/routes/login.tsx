import { createFileRoute, redirect } from "@tanstack/react-router";

// Backwards compatibility: legacy links point at /login; sign-in lives at /.
export const Route = createFileRoute("/login")({
  beforeLoad: ({ search }) => {
    throw redirect({ to: "/", search, replace: true });
  },
});
