import { Link, createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  BadgeCheck,
  CalendarClock,
  MessagesSquare,
  PenTool,
  ShieldCheck,
  UserRound,
  Wallet,
} from "lucide-react";

import { AuthShell } from "@/components/auth/AuthShell";
import { GuestOnly } from "@/components/guards";
import { Badge } from "@/components/ui/badge";
import { platformSettingsQuery } from "@/lib/platform";
import { SITE_URL } from "@/lib/destination";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/register/")({
  head: () => ({
    meta: [
      { title: "Create an Account | ScholarDesk" },
      {
        name: "description",
        content:
          "Join ScholarDesk as a customer to hire verified academic experts, or apply as a writer to earn with your expertise.",
      },
      { property: "og:title", content: "Create an Account | ScholarDesk" },
      {
        property: "og:description",
        content:
          "Join ScholarDesk as a customer to hire verified academic experts, or apply as a writer to earn with your expertise.",
      },
      { property: "og:url", content: `${SITE_URL}/register` },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/register` }],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  const { data: settings } = useQuery(platformSettingsQuery);
  const hiringOpen = settings?.writer_hiring_open ?? true;

  return (
    <GuestOnly>
      <AuthShell
        panelTitle="One platform. Two ways in."
        panelSubtitle="Whether you need academic work done to the highest standard, or you're the expert who does it, your account starts here."
        panelPoints={[
          {
            title: "Customers stay anonymous",
            description:
              "A nickname is all we ask for. Your real identity is never collected.",
          },
          {
            title: "Writers are vetted",
            description:
              "A structured application keeps quality high for everyone.",
          },
        ]}
      >
        <div className="space-y-8">
          <div className="space-y-2">
            <h2 className="font-display text-3xl font-bold tracking-tight">
              Join ScholarDesk
            </h2>
            <p className="text-muted-foreground">
              Choose how you want to use the platform.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {/* Customer */}
            <Link
              to="/register/customer"
              search={true}
              className="group rounded-lg border bg-card p-6 text-left transition-colors duration-300 hover:border-primary/40 hover:bg-accent/40"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <UserRound className="h-5 w-5" />
              </span>
              <h3 className="mt-4 flex items-center gap-2 text-lg font-semibold">
                I'm a customer
                <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Post projects and hire verified expert writers.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <ShieldCheck className="h-3.5 w-3.5 text-success" />
                  No real name required
                </li>
                <li className="flex items-center gap-2">
                  <MessagesSquare className="h-3.5 w-3.5 text-success" />
                  Direct writer communication
                </li>
                <li className="flex items-center gap-2">
                  <Wallet className="h-3.5 w-3.5 text-success" />
                  Secure, guaranteed payments
                </li>
              </ul>
            </Link>

            {/* Writer */}
            <Link
              to="/register/writer"
              search={true}
              className={cn(
                "group rounded-lg border bg-card p-6 text-left transition-colors duration-300 hover:border-primary/40 hover:bg-accent/40",
                !hiringOpen && "opacity-90",
              )}
            >
              <div className="flex items-start justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <PenTool className="h-5 w-5" />
                </span>
                {!hiringOpen && (
                  <Badge
                    variant="secondary"
                    className="gap-1 bg-warning/15 text-warning-foreground"
                  >
                    <CalendarClock className="h-3 w-3" />
                    Closed
                  </Badge>
                )}
              </div>
              <h3 className="mt-4 flex items-center gap-2 text-lg font-semibold">
                I'm a writer
                <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {hiringOpen
                  ? "Apply to write and earn with your academic expertise."
                  : "Applications are paused: see when hiring reopens."}
              </p>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <BadgeCheck className="h-3.5 w-3.5 text-success" />
                  Vetted, professional community
                </li>
                <li className="flex items-center gap-2">
                  <Wallet className="h-3.5 w-3.5 text-success" />
                  Reliable, timely payouts
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="h-3.5 w-3.5 text-success" />
                  Clear, fair review process
                </li>
              </ul>
            </Link>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/" search={true} className="font-semibold text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </AuthShell>
    </GuestOnly>
  );
}
