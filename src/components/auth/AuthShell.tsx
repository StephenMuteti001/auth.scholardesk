import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Check } from "lucide-react";

import { Logo } from "@/components/brand/Logo";
import { PORTALS } from "@/lib/destination";

interface AuthShellProps {
  children: ReactNode;
  /** Short tagline shown above the working card */
  panelTitle: string;
  panelSubtitle: string;
  panelPoints?: { title: string; description: string }[];
}

/**
 * Shared layout for every auth page: a light, flat surface matching the
 * public site, with crisp borders and no decorative elevation.
 */
export function AuthShell({
  children,
  panelTitle,
  panelSubtitle,
  panelPoints,
}: AuthShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="flex items-center justify-between border-b bg-background px-5 py-5 sm:px-10">
        <a href={PORTALS.PUBLIC} className="flex items-center">
          <Logo variant="signature" className="h-7 sm:hidden" />
          <Logo variant="wordmark" className="hidden h-8 sm:block" />
        </a>
        <a
          href={PORTALS.PUBLIC}
          className="inline-flex items-center gap-1.5 px-2 py-1.5 text-sm font-medium text-muted-foreground transition-colors duration-300 hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to main site
        </a>
      </header>

      <main className="flex flex-1 flex-col items-center px-4 pt-8 pb-16 sm:pt-12">
        <div className="w-full max-w-xl">
          {/* Intro */}
          <div className="mb-8 space-y-2 text-center">
            <p className="text-sm font-semibold tracking-wide text-primary">
              {panelTitle}
            </p>
            <p className="mx-auto max-w-md text-sm leading-relaxed text-muted-foreground">
              {panelSubtitle}
            </p>
          </div>

          {/* Working surface */}
          <div className="rounded-lg border bg-card p-6 sm:p-10">
            {children}
          </div>

          {/* Trust points */}
          {panelPoints && panelPoints.length > 0 && (
            <ul
              className={
                panelPoints.length === 2
                  ? "mt-8 grid gap-3 sm:grid-cols-2"
                  : "mt-8 grid gap-3 sm:grid-cols-3"
              }
            >
              {panelPoints.map((point) => (
                <li
                  key={point.title}
                  className="flex items-start gap-2.5 border-t px-1 py-4"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success/15 text-success">
                    <Check className="h-3 w-3" />
                  </span>
                  <div>
                    <p className="text-sm leading-snug font-semibold text-foreground">
                      {point.title}
                    </p>
                    <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                      {point.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>

      <footer className="border-t px-6 py-5 text-center text-xs text-muted-foreground">
        <a href={PORTALS.PUBLIC} className="inline-flex items-center transition-colors hover:text-foreground sm:inline">
          <Logo variant="signature" className="h-5 sm:hidden" />
          <span className="hidden sm:inline">scholardesk.pro</span>
        </a>
        <span className="mx-2">·</span>
        Secure access portal
      </footer>
    </div>
  );
}
