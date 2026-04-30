# Infrastructure debt

Items deferred for after public launch. Each entry has a priority, trigger
conditions for revisit, and an effort estimate.

**Priority key**

- **P0** — blocks launch; fix now
- **P1** — fix in the next sprint
- **P2** — fix this quarter or before a known trigger fires
- **P3** — backlog; revisit only if a trigger fires

---

## P2: Supabase deprecated keys migration

**Filed:** 2026-04-30

### What's deprecated

- `SUPABASE_ANON_KEY` and `SUPABASE_SERVICE_ROLE_KEY` env vars in Edge
  Functions.
- `VITE_SUPABASE_ANON_KEY` on the client (same legacy key, exposed to the
  browser via Vite).

### What replaces them

- `SUPABASE_PUBLISHABLE_KEYS` — replaces anon-side use.
- `SUPABASE_SECRET_KEYS` — replaces service-role-side use.

Both are JSON dicts of JWT-signed keys (instead of a single static string).
Consumers must parse the dict and pick the active key.

### Current usage in this repo

- `supabase/functions/subscribe-waitlist/index.ts` reads
  `SUPABASE_SERVICE_ROLE_KEY` for the privileged insert.
- `src/lib/supabase.js` reads `VITE_SUPABASE_ANON_KEY` for the browser
  client.

### Why deferred

- Migration must be coordinated with the `echoe-mac` codebase, which also
  reads these env vars (Supabase functions for create/cancel subscription,
  etc.).
- Pre-launch shipping takes priority over a non-breaking auth refresh.
- Supabase typically gives 12+ months notice before actual removal — no
  immediate runtime risk.

### Effort estimate

**1–2 days** for the coordinated migration across `echoe-website` +
`echoe-mac`.

### Triggers to revisit

Whichever fires first:

1. Supabase removal-warning email or dashboard banner appears.
2. Next major `echoe-mac` release (bundle the auth refresh with a real
   release rather than a one-off infra commit).
3. **2026-10-30** — six months from filing date.

### Action items when migrating

1. Refactor `supabase/functions/subscribe-waitlist/index.ts` to parse
   `SUPABASE_SECRET_KEYS` (JSON dict) and select the active secret.
2. Refactor `src/lib/supabase.js` to parse `SUPABASE_PUBLISHABLE_KEYS` and
   select the active publishable key.
3. Update Vercel env vars (Production + Preview environments).
4. Update local `.env.local` and `.env.example`.
5. End-to-end test: submit the live waitlist form, verify a row lands in
   `public.waitlist` using the new keys; submit again with the same email,
   confirm idempotent.
6. Update `README.md` "Develop" section to reference the new env var names.
7. Mirror the same refactor in `echoe-mac` Supabase functions
   (`create-subscription`, `cancel-subscription`, etc.).
