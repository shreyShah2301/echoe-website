// Per-request CORS for the Echoe site.
// Allowlist is checked against the incoming `Origin` header. If the origin is
// not in the list, no `Access-Control-Allow-Origin` header is returned and the
// browser blocks the response — which is what we want.

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

export function corsHeadersFor(req: Request): Record<string, string> {
  const origin = req.headers.get('origin') ?? '';
  if (ALLOWED_ORIGINS.has(origin)) {
    return { ...BASE_HEADERS, 'Access-Control-Allow-Origin': origin };
  }
  return BASE_HEADERS;
}
