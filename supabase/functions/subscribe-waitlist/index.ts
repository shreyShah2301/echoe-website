// Echoe website: subscribe-waitlist Edge Function.
// POST { email: string, source?: string } → { ok: true } | { ok: false, error: 'invalid' | 'config' | 'db' }
//
// Uses service_role to bypass RLS for the insert, but RLS is also configured to allow
// anonymous inserts as a fallback. Idempotent on lower(email) via ON CONFLICT.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.4';
import { corsHeadersFor } from '../_shared/cors.ts';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

Deno.serve(async (req) => {
  const cors = corsHeadersFor(req);
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: cors });
  }
  if (req.method !== 'POST') {
    return json({ ok: false, error: 'method' }, 405, cors);
  }

  const url = Deno.env.get('SUPABASE_URL');
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  if (!url || !serviceKey) {
    return json({ ok: false, error: 'config' }, 500, cors);
  }

  let body: { email?: string; source?: string };
  try {
    body = await req.json();
  } catch {
    return json({ ok: false, error: 'invalid' }, 400, cors);
  }

  const email = (body.email ?? '').trim().toLowerCase();
  const source = (body.source ?? 'unknown').slice(0, 64);

  if (!EMAIL_RE.test(email) || email.length > 254) {
    return json({ ok: false, error: 'invalid' }, 400, cors);
  }

  const supabase = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { error } = await supabase
    .from('waitlist')
    .upsert({ email, source }, { onConflict: 'email', ignoreDuplicates: true });

  if (error) {
    console.error('waitlist insert failed', error);
    return json({ ok: false, error: 'db' }, 500, cors);
  }

  return json({ ok: true }, 200, cors);
});

function json(payload: unknown, status: number, cors: Record<string, string>) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { ...cors, 'content-type': 'application/json' },
  });
}
