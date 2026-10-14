export function pageMeta(title: string, description: string) {
  return { meta: [
    { title: `${title} | ScholarDesk` },
    { name: "description", content: description },
    { property: "og:title", content: `${title} | ScholarDesk` },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] };
}