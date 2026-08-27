import serverless from "serverless-http";
import { createApp } from "../../server/app";

/**
 * Netlify serves this Express application on demand. The redirects in
 * netlify.toml preserve the public /api/* routes expected by the frontend.
 */
export const handler = serverless(createApp());
