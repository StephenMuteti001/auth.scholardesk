<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Auth and onboarding layouts use flat white or subtle neutral surfaces with borders for hierarchy; avoid gradients, backdrop blur, and decorative elevation.
- Shared auth and onboarding branding uses the compact signature on mobile and the full wordmark from the small breakpoint upward.
- Validate return_to in root route search and preserve it with TanStack navigation through all auth pages; role-matched HTTPS portal origins alone may receive redirects, after onboarding requirements, because incoming links must never bypass account permissions or onboarding.
- Keep the existing external cookie-based ScholarDesk API as the session authority; frontend destination checks do not grant access to portal data.
- Apply thin scrollbar styling globally through semantic CSS tokens so all pages and scrollable controls stay consistent.
- Use a shared page metadata helper for onboarding leaf routes so each status page has distinct shareable metadata.
