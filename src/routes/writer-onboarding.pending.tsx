import { Navigate, createFileRoute, useSearch } from "@tanstack/react-router";
import { ExternalRedirect } from "@/components/guards";
import { pageMeta } from "@/lib/page-meta";
import { FileSearch } from "lucide-react";

import { WriterJourney } from "@/components/writer/WriterJourney";
import { useAuth } from "@/lib/auth";
import { resolvePostAuthDestination } from "@/lib/destination";

export const Route = createFileRoute("/writer-onboarding/pending")({
  head: () => pageMeta("Application Under Review", "Check the review stage of your ScholarDesk writer application."),
  component: PendingPage,
});

function PendingPage() {
  const { user } = useAuth();
  const { return_to } = useSearch({ strict: false });

  if (user && user.application_status !== "applied") {
    const destination = resolvePostAuthDestination(user, return_to);
    return destination.type === "external" ? <ExternalRedirect url={destination.url} /> : <Navigate to={destination.to} search={true} replace />;
  }

  return (
    <div className="space-y-8">
      <div className="rounded-lg border bg-card p-8 text-center sm:p-10">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
          <FileSearch className="h-7 w-7 text-primary" />
        </span>
        <h1 className="font-display mt-6 text-3xl font-bold tracking-tight">
          Application under review
        </h1>
        <p className="mx-auto mt-3 max-w-md leading-relaxed text-muted-foreground">
          Thank you{user?.full_name ? `, ${user.full_name.split(" ")[0]}` : ""}.
          Our editorial team is verifying that your application meets our
          experience and skills requirements. You'll receive an email as soon
          as a decision is made, typically within 2–3 business days.
        </p>
      </div>

      <div className="rounded-lg border bg-card p-6 sm:p-8">
        <h2 className="text-lg font-semibold">Where you are in the journey</h2>
        <WriterJourney current="review" className="mt-6" />
      </div>
    </div>
  );
}
