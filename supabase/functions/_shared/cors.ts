// Per-request CORS for the Echoe site.
//
// Allowed origins:
//   1. Explicit allowlist (production, www, local dev)
//   2. Project-scoped Vercel deploys for echoe-website
//      (production vanity URL + all preview subdomains)
//
// If the origin is not allowed, no `Access-Control-Allow-Origin` header is
// returned and the browser blocks the response — which is what we want.

const ALLOWED_ORIGINS = new Set([
  'https://echoeapp.com',
  'https://www.echoeapp.com',
  'http://localhost:5173',
]);

const BASE_HEADERS: Record<string, string> = {
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Vary': 'Origin',
};

const VERCEL_TLD = '.vercel.app';
const PROJECT_SLUG = 'echoe-website';

/**
 * Match echoe-website.vercel.app (production) and echoe-website-*.vercel.app
 * (Vercel previews under this project).
 *
 * We require the slug to be a single label with no internal dots so that a
 * spoofed multi-dot host like `echoe-website-x.attacker.com.vercel.app` is
 * rejected. (Vercel allocates subdomains flat under .vercel.app, so real
 * project hosts always have exactly one label before .vercel.app.)
 */
function isProjectVercelHost(host: string): boolean {
  if (!host.endsWith(VERCEL_TLD)) return false;
  const slug = host.slice(0, host.length - VERCEL_TLD.length);
  if (slug.includes('.')) return false;
  return slug === PROJECT_SLUG || slug.startsWith(`${PROJECT_SLUG}-`);
}

function isAllowedOrigin(origin: string): boolean {
  if (ALLOWED_ORIGINS.has(origin)) return true;
  let u: URL;
  try {
    u = new URL(origin);
  } catch {
    return false;
  }
  if (u.protocol !== 'https:') return false;
  return isProjectVercelHost(u.hostname);
}

export function corsHeadersFor(req: Request): Record<string, string> {
  const origin = req.headers.get('origin') ?? '';
  if (isAllowedOrigin(origin)) {
    return { ...BASE_HEADERS, 'Access-Control-Allow-Origin': origin };
  }
  return BASE_HEADERS;
}
