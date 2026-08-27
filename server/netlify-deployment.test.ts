import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { handler } from "../netlify/functions/api";
import { createApp } from "./app";

const projectRoot = path.resolve(import.meta.dirname, "..");

describe("Netlify deployment configuration", () => {
  it("creates an Express app that can be mounted by a serverless function", () => {
    const app = createApp();

    expect(app).toBeTypeOf("function");
    expect(app.settings["trust proxy fn"]).toBeDefined();
  });

  it("keeps dynamic routes ahead of the single-page application fallback", () => {
    const netlifyConfig = fs.readFileSync(path.join(projectRoot, "netlify.toml"), "utf8");
    const apiFunction = fs.readFileSync(
      path.join(projectRoot, "netlify", "functions", "api.ts"),
      "utf8"
    );

    expect(netlifyConfig).toContain('command = "pnpm run build:netlify"');
    expect(netlifyConfig).toContain('publish = "dist/public"');
    expect(netlifyConfig.indexOf('from = "/api/*"')).toBeLessThan(
      netlifyConfig.indexOf('from = "/*"')
    );
    expect(netlifyConfig).toContain('from = "/manus-storage/*"');
    expect(apiFunction).toContain('serverless(createApp())');
  });

  it("serves a tRPC health check through the Netlify function handler", async () => {
    const response = await handler(
      {
        body: null,
        headers: { host: "example.netlify.app", "x-forwarded-proto": "https" },
        httpMethod: "GET",
        isBase64Encoded: false,
        multiValueHeaders: {},
        multiValueQueryStringParameters: {
          batch: ["1"],
          input: ['{"0":{"json":{"timestamp":0}}}'],
        },
        path: "/api/trpc/system.health",
        queryStringParameters: {
          batch: "1",
          input: '{"0":{"json":{"timestamp":0}}}',
        },
        requestContext: {},
        resource: "",
      },
      {} as never
    );

    expect(response.statusCode).toBe(200);
    expect(response.body).toContain('ok');
  });
});
