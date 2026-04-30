# Changelog

All notable changes to the Echoe website are tracked here, one entry per
deployed version. Format roughly follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/);
versioning is [SemVer](https://semver.org/):

- **MAJOR** (e.g. `2.0.0`): redesign or breaking content restructure.
- **MINOR** (e.g. `1.1.0`): new section, new feature, meaningful copy/UX overhaul.
- **PATCH** (e.g. `1.1.1`): small copy tweaks, bug fixes, polish.

Every push to `main` triggers a Vercel deploy and corresponds to a version
entry here. Tag the commit (`git tag vX.Y.Z`) before pushing.

---

## [1.3.0] — 2026-04-30

Hero headline rewrite: rotator dropped in favour of a single manifesto
statement. Eyebrows shuffled between hero and demo to give the wedge line a
stronger position.

### Hero

- **H1 replaced.** Was a rotating "Dictate in [language]." (5 slots, geo-aware
  slot 2). Now a single static line: "Stop typing and start speaking."
- **H1 sizing tuned for the new copy.** `clamp(40px, 6.5vw, 76px)/1.02` →
  `clamp(36px, 5.5vw, 64px)/1.06`. Slightly smaller scale, more line-height,
  letter-spacing eased.
- **Eyebrow swapped:** now reads "Voice dictation that finally speaks
  Indian." (the wedge line; previously was at the demo section).
- Removed `CyclingHeroPhrase`, `NATIVE_LANG_BY_CODE`, `NATIVE_LANG_FALLBACK`,
  `detectNativeLanguage()` from `Hero.jsx`. Browser-language geo detection
  is gone with the rotator.
- Hero body line was also updated mid-cycle (in the same series of edits):
  "Roman, Hindi, or mixed" → "English, Hinglish, Hindi, or your native
  language."

### Demo

- **Eyebrow swapped:** "See it run" → "One hotkey. Any app. Your thoughts in
  your language." (the previous hero eyebrow takes its position here).

---

## [1.2.0] — 2026-04-30

Canonical brand mark wired in. Nav, footer, favicon, and OG image now use the
official Echoe wordmark from the logo library at
`Echoe Mac Design/Echoe Logo Library/`. Plus a hero body copy refresh.

### Brand assets

- **Nav + footer** now use the canonical wordmark via the rewritten
  `EchoeMark` component. The placeholder orb-and-text was replaced with an
  `<img>` referencing the proper SVG. Brand-correct lowercase "echoe"
  lockup; the old capital "Echoe" was a placeholder.
- **`EchoeMark` API rewritten:** `<EchoeMark height={number} variant="primary"|"cream" />`.
  Drops the old `size` / `color` / `withWord` props. Two variants now: ink
  (with terracotta orb core, for cream surfaces) and cream (single-fill,
  for the dark footer band).
- **Tightened the website's wordmark SVGs** (`public/echoe-wordmark.svg`
  and `public/echoe-wordmark-cream.svg`): viewBox `0 0 360 80` →
  `32 14 180 52`. Source library files in `Echoe Mac Design/` are
  untouched. The canonical 360×80 canvas has ~45% padding around the
  mark, which made the logo render small in the nav. The website-side
  copies crop to content; logos now read at intended visual weight.
- **Favicon** swapped from a hand-rolled placeholder to the canonical
  32px app icon (`favicon/echoe-favicon-32.svg`): parchment box, line
  shirorekha, ink orb, terracotta core.
- **OG image** rebuilt to embed the canonical wordmark elements at 2.4×
  scale instead of the ad-hoc circle + capital "Echoe" mock. PNG
  regenerated.

### Hero copy

- Body line updated: "Echoe gives you Roman, Hindi, or mixed." →
  "Echoe types in English, Hinglish, Hindi, or your native language."
  Plain-language list of output modes; aligns with the geo rotator in
  the H1.

### Sizing

- Nav wordmark: `height={32}` (echoe text ~21px on screen).
- Footer wordmark: `height={28}` (echoe text ~18px on dark band).

---

## [1.1.0] — 2026-04-30

First content/UX overhaul after launch. ICP-focused copy, geo-aware rotator,
demo polish.

### Hero

- **Headline layout locked to two lines.** "Dictate in" stays static on line
  1; the language on line 2 cycles. Replaces viewport-driven balance.
- **Rotator extended to five slots, with geo-localized slot 2.** Cycle is now:
  English → [native language] → Hinglish → Hindi → your language. Slot 2
  derives from `navigator.languages`; maps `mr-IN`/`ta-IN`/`bn-IN`/`kn-IN`/
  `ml-IN`/`gu-IN`/`pa-IN`/`or-IN`/`as-IN`/`te-IN` to display names. Fallback:
  Marathi.
- **Canonical tagline moved to the eyebrow:** "One hotkey. Any app. Your
  thoughts in your language."
- **H2 sub-headline dropped** (was redundant with the new eyebrow).
- **"Now in private beta" merged into the caption** under the form, beside
  platform info.
- **Slack mockup now shows the transformation magic.** A "You said" chip
  fades in during listening + transforming with the spoken Hinglish ("yaar
  iska timeline nahi ban raha"); the composer types the cleaned output
  ("Yaar, this timeline isn't coming together yet."). Channel context message
  reworked to match the new transformation.
- **HUD synced to the composer phase.** The Slack mock and the floating HUD
  pill now read from the same timer and animate as one demo. HUD pulled up
  `-8px` to slightly overlap the composer's bottom edge.
- HUD pair indicator updated to `हिंदी → EN`.

### Mechanic section

- **H2 dropped HUD jargon:** "A 320 × 80 HUD." → "A small floating panel."
- **Body rewritten** to remove technical framing while keeping the
  out-of-the-way essence.

### Demo section

- Removed the lede paragraph that explained the mechanics
  ("Four real surfaces: ..."). Section now reads tighter.

### Copy / typography

- **Em dashes (—) removed everywhere** across user-facing copy, code
  comments, and dev docs. Replaced contextually with periods, commas, or
  colons depending on the rhythm.

### Tooling

- `supabase/.temp/` (Supabase CLI cache) added to `.gitignore`.
- Bumped `package.json` from `0.1.0` to `1.1.0`.

---

## [1.0.0] — 2026-04-30 (untagged in git history)

Initial public launch at **echoeapp.com**. This was the first live deploy.

### Added

- Vite + React 18 marketing site, ported from `landing-en/*.jsx` prototype
  in the Echoe Design System.
- Sections: Hero, Demo, Wedge, Mechanic, Pricing, Final CTA, Footer.
- Waitlist form backed by Supabase Edge Function `subscribe-waitlist`.
- Pricing card grid with Free / Weekly / Monthly / Yearly tiers.
- OG image (parchment-cream SVG → PNG via sharp), favicon, robots.txt,
  sitemap.xml.
- `@vercel/analytics` wired into the App component.

### Fixed (intra-launch)

- CORS allowlist tightened from wildcard `*.vercel.app` to a project-scoped
  match (`echoe-website.vercel.app` + `echoe-website-*.vercel.app`) plus the
  explicit production domains and localhost.
- Hero waitlist placeholder color migrated from React-rendered inline
  `<style>` to the global stylesheet; color bumped to `#333333` with
  `opacity: 1` so it survives the browser's default placeholder fade.

### Infrastructure

- DNS: `echoeapp.com` and `www.echoeapp.com` pointed at Vercel; SSL
  provisioned globally.
- Supabase project: `ghewxicwxfhngljgghse` (shared with the Mac app); new
  `public.waitlist` table, RLS-protected, service-role-only writes.

### Documentation

- `README.md`: develop / build / Supabase deploy / waitlist swap-at-launch.
- `docs/INFRA_DEBT.md`: P2 entry for Supabase deprecated keys migration,
  calendar trigger 2026-10-30.
