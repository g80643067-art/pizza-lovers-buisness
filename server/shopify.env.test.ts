import { describe, expect, it } from "vitest";
import { ENV } from "./_core/env";

describe("Shopify environment contract", () => {
  it("exposes the server-side storefront configuration fields", () => {
    expect(ENV).toHaveProperty("shopifyStoreDomain");
    expect(ENV).toHaveProperty("shopifyStorefrontApiAccessToken");
  });
});
