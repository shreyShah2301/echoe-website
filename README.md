# echoe-website

Marketing site for Echoe, voice dictation for Mac. Built with Vite + React 18.

Source design system lives in `../Echoe Mac Design/Echoe Design System/`. Tokens
are copied into `src/styles/tokens.css`; re-sync manually if the design system
changes.

## Develop

```bash
npm install
cp .env.example .env.local        # fill in Supabase URL + anon key
npm run dev
```

## Build

```bash
npm run build       # → dist/
npm run preview     # serve dist/ locally
```

## Waitlist

The hero + final-CTA forms POST to the `subscribe-waitlist` Supabase Edge
Function. The function lowercases the email and does an idempotent upsert
into `public.waitlist` (unique constraint on `email`, CHECK enforces
`email = lower(email)` at the DB level).

- Migration: `supabase/migrations/20260430120000_create_waitlist.sql`
- Function: `supabase/functions/subscribe-waitlist/index.ts`
- Client: `src/lib/supabase.js`

To deploy these:

```bash
# from the website repo, against the existing Echoe Supabase project
supabase link --project-ref <PROJECT-REF>
supabase db push                                   # applies migration
supabase functions deploy subscribe-waitlist       # deploys the Edge Function
```

The function reads `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` from the
function environment (set automatically by Supabase). The browser only ever
sees `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.

## OG image

Source: `public/og-image.svg`. Run `npm run og` to regenerate
`public/og-image.png` (1200×630) for social platforms that don't render SVG.

## Known items to address before public launch

- **Rate limiting on `subscribe-waitlist`.** The Edge Function has no per-IP
  or global rate limit. Acceptable for a private/pre-launch waitlist, but add
  a guard before opening the form to traffic. Options: Cloudflare Turnstile
  challenge on the form, a per-IP token bucket via Upstash Redis, or a
  Postgres function that counts inserts per IP+window.
- **CORS allowlist.** Already restricted to `echoeapp.com` / `www.echoeapp.com`
  / `localhost:5173`. Verify after first deploy that browsers allow the
  request from production.
- **Email canonicalization.** DB enforces `email = lower(email)` via CHECK,
  so any non-canonical insert fails fast. The Edge Function lowercases on the
  way in. No anon write path exists.
- **Supabase legacy keys (P2 infra debt).** This repo uses the deprecated
  `SUPABASE_SERVICE_ROLE_KEY` and `VITE_SUPABASE_ANON_KEY` env vars.
  Migration to `SUPABASE_PUBLISHABLE_KEYS` / `SUPABASE_SECRET_KEYS` is
  deferred and coordinated with `echoe-mac`. See
  [docs/INFRA_DEBT.md](docs/INFRA_DEBT.md) for triggers and action items.

## Switching from waitlist → download at launch

When the Mac DMG is ready (M6), change two things:

1. In `src/components/WaitlistForm.jsx`, replace the form with a
   `PrimaryButton` linking to the DMG, OR keep the form for analytics and
   add a download button alongside.
2. Update the hero caption + final CTA copy from "early access" to
   "Download for Mac."

The form `id="waitlist"` and the nav `Get early access` button can stay; both
still work as anchor targets.
