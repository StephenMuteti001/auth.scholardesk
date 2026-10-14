import { describe, expect, it } from "vitest";
import { authSearch, PORTALS, resolvePostAuthDestination } from "./destination";

describe("portal return destinations", () => {
  it.each([
    ["customer", PORTALS.CUSTOMER], ["client", PORTALS.CUSTOMER],
    ["admin", PORTALS.ADMIN], ["super_admin", PORTALS.ADMIN],
    ["expert", PORTALS.EXPERT], ["writer", PORTALS.EXPERT],
  ])("returns %s to its requested page", (role, portal) => {
    const url = `${portal}/orders/42?tab=files#latest`;
    expect(resolvePostAuthDestination({ id: 1, role, application_status: "approved_active" }, url))
      .toEqual({ type: "external", url });
    expect(resolvePostAuthDestination({ id: 1, role }, "/orders/42"))
      .toEqual({ type: "external", url: `${portal}/orders/42` });
  });
  it.each([
    "https://evil.example/order", "//evil.example/order", "javascript:alert(1)",
    "https://portal.scholardesk.pro.evil.example", "http://portal.scholardesk.pro/orders",
    "https://name:pass@portal.scholardesk.pro/orders", `${PORTALS.ADMIN}/orders`,
  ])("rejects unsafe or wrong-role return URL %s", (url) => {
    expect(resolvePostAuthDestination({ id: 1, role: "customer" }, url))
      .toEqual({ type: "external", url: PORTALS.CUSTOMER });
  });
  it.each([
    ["not_applied", "/writer-onboarding/apply"], ["applied", "/writer-onboarding/pending"],
    ["awaiting_initial_deposit", "/writer-onboarding/approved"], ["rejected", "/writer-onboarding/rejected"],
  ])("keeps onboarding first for %s", (application_status, to) => {
    for (const role of ["expert", "writer"]) {
      expect(resolvePostAuthDestination({ id: 1, role, application_status }, `${PORTALS.EXPERT}/orders`))
        .toEqual({ type: "internal", to });
    }
  });
  it("ignores malformed search values", () => {
    expect(authSearch({ return_to: ["/orders"] })).toEqual({});
    expect(authSearch({ return_to: "x".repeat(4097) })).toEqual({});
    expect(authSearch({ return_to: "/orders" })).toEqual({ return_to: "/orders" });
  });
});