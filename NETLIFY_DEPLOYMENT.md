# Netlify deployment guide

This project is now configured to publish the Vite client from `dist/public` and route the existing Express application through a Netlify Function. The configuration keeps browser requests to `/api/trpc`, the OAuth callback at `/api/oauth/callback`, and the storage proxy under `/manus-storage/*` on the same public origin as the storefront. Netlify’s current Express guidance uses an Express-to-serverless adapter with a rewrite to retain readable `/api/*` paths, while its Vite guidance recommends a rewrite to `index.html` for single-page application routes.[1] [2]

## Routing model

| Public request | Netlify destination | Purpose |
|---|---|---|
| `/api/*` | `netlify/functions/api.ts` | tRPC storefront, Shopify cart and product requests, and the OAuth callback. |
| `/manus-storage/*` | `netlify/functions/api.ts` | Existing server-side proxy for project-hosted media. |
| All other paths | `dist/public/index.html` | Client-side routing and static Vite assets. |

## Deploy from the connected GitHub repository

In Netlify, create a site from the repository that contains this project and use the repository root as the base directory. The committed `netlify.toml` supplies the build command, publish directory, functions directory, redirects, and Node version, so no separate build or publish values should be entered in the site configuration. Netlify supports repository-based continuous deployment and can also initialize a site through its CLI.[1] [2]

Before the first production deploy, add the environment values below in **Site configuration → Environment variables**. Use the same values currently configured for the working site where they are still appropriate. Treat credentials as secrets; do not commit a `.env` file.

| Variable group | Variables | When required |
|---|---|---|
| Browser build configuration | `VITE_APP_ID`, `VITE_OAUTH_PORTAL_URL`, `VITE_FRONTEND_FORGE_API_URL`, `VITE_FRONTEND_FORGE_API_KEY` | Required for the existing OAuth client flow and the optional interactive map integration. These are read during the Vite build. |
| Server authentication and database | `JWT_SECRET`, `OAUTH_SERVER_URL`, `DATABASE_URL`, `OWNER_OPEN_ID` | Required whenever the existing session, OAuth callback, or database-backed user flow is retained. |
| Shopify storefront | `SHOPIFY_STORE_DOMAIN`, `SHOPIFY_STOREFRONT_API_ACCESS_TOKEN` | Required for the live product menu, cart, and Shopify checkout flow. |
| Project service proxies | `BUILT_IN_FORGE_API_URL`, `BUILT_IN_FORGE_API_KEY` | Required only for code paths that use the existing media, maps, data, image, voice, or scheduled-service proxies. These platform-specific values are not automatically supplied by Netlify. |

The configured storefront uses server-side Shopify calls for its menu and cart, so the Shopify domain and storefront token must be present in Netlify for commerce to remain live. The static page can render without the dynamic function, but its cart, product data, authentication, and proxy-backed functionality will not operate without the variables and rewrites above.

## OAuth and domain cutover

The client builds its callback URL from the current browser origin. Once Netlify assigns the production domain, register `https://YOUR_DOMAIN/api/oauth/callback` as an allowed redirect URI in the OAuth provider associated with `VITE_APP_ID`, if that provider restricts callback URLs. Test sign-in on the Netlify domain after the production deploy; this also verifies the secure session cookie through the Netlify proxy.

## Local verification

Run the following from the repository root before pushing any later changes. The first command checks TypeScript across the client, server, and Netlify function. The second runs the project’s automated tests. The final command recreates the static production output used by Netlify.

```bash
pnpm run check
pnpm run test
pnpm run build:netlify
```

> Netlify Functions have platform execution and memory limits, so this configuration is designed for the existing request-driven storefront API rather than persistent workers or long-running background processes.[1]

## References

[1]: https://docs.netlify.com/build/frameworks/framework-setup-guides/express/ "Netlify Docs — Express on Netlify"
[2]: https://docs.netlify.com/build/frameworks/framework-setup-guides/vite/ "Netlify Docs — Vite on Netlify"
