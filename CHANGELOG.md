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

## [1.4.5] — 2026-05-01

Mechanic cards: symmetric mobile padding.

### Fixed

- **Mechanic Card 2 ("The HUD does the rest.") was overflowing the
  container on mobile.** Card 2 contains a `<HUD>` widget with a fixed
  `width: 320`. CSS `transform: scale(0.7)` shrinks the visual but
  doesn't shrink the layout box, so the card needed at least
  376px (320 HUD + 56 card padding) to lay out without overflow. On
  iPhone viewports (~330–340px content area), the card overflowed the
  right edge; `body { overflow-x: hidden }` clipped the visible
  spillover, which produced the asymmetric "left has padding, right
  has none" look in screenshots.

### Changed

- `.mechanic-grid` mobile column: `1fr` → `minmax(0, 1fr)` so the
  column can shrink below the content's intrinsic min-width.
- HUD wrapper in Mechanic Card 2 gets `width: 100%; overflow: hidden`
  so the 320px HUD layout box clips visually instead of pushing the
  card wider than its grid column.
- Mobile container padding: `22px` → `28px` (more parchment band
  visible on each side; small breathing-room bump that's now
  matched left/right since the overflow root cause is fixed).
- `.container` got an explicit `box-sizing: border-box` declaration
  (the wildcard rule already covered it; defensive in case any mobile
  browser respects element-level rules differently).

---

## [1.4.4] — 2026-05-01

Compact scenario picker on mobile.

### Changed

- Demo section's scenario picker dominated mobile screen real estate:
  4 buttons stacked single-column, each ~3 lines tall (app name +
  title + subtitle). Felt like a wall of options before the actual
  demo.
- Refactored from inline-styled JSX to class-based markup
  (`.scenario-picker`, `.scenario-btn`, `.scenario-tag-row`,
  `.scenario-app`, `.scenario-title`, `.scenario-subtitle`,
  `.is-active` modifier).
- **Below 720px:** picker becomes a 2×2 grid; title and subtitle
  hide via `display: none`; buttons are compact horizontal pills with
  just AppTile + app name. Padding tightens (12×16 → 10×12), gap and
  letter-spacing adjusted for the smaller scale.
- **Above 720px:** unchanged — flex-wrap, full info per pill, 170px
  min-width.

---

## [1.4.3] — 2026-05-01

Mobile polish: card borders, hero HUD on mobile, demo text persistence.

### Fixed

- **Demo composer text disappeared at the "Inserted" state.** Root cause:
  `useTypewriter` resets `shown` to `''` when `play` becomes false, which
  fires during the `typing` → `settled` transition. Demo panels were
  consuming `shown` directly, so the typed text vanished as soon as the
  HUD flipped to ✓ Inserted. Fixed at the parent — the panels now receive
  `phase === 'settled' ? scenario.output : shown`, mirroring the Hero's
  existing workaround.
- **Card right-side border invisible on mobile.** `Card` component used
  `0.5px solid` borders that sub-pixel-rendered on small DPIs. Bumped to
  `1px` so all four Mechanic cards have crisp, visible edges.

### Added

- **HUD render on the mobile hero.** The mobile branch in `HeroEN` now
  renders the same `<HUD>` (Listening / Transforming / Inserted) as
  desktop, synced to the Slack mock's `phase` state. Shows the canonical
  product surface on mobile too. Pulled up `-8px` to overlap the Slack
  composer's bottom edge for a connected-demo feel.

---

## [1.4.2] — 2026-05-01

Mobile nav fix.

### Fixed

- Nav was unviewable below ~720px: "How it works" wrapped mid-phrase
  into 3 stacked lines, and "Get early access" overflowed the right
  edge. Logo + 3 links + CTA can't fit ~330px of mobile width.

### Changed

- Nav refactored from inline-styled flex to class-based layout
  (`.nav-row`, `.nav-actions`, `.nav-link`) so a media query can
  collapse the link list on mobile.
- Below 720px: the three nav links (Demo / How it works / Pricing)
  hide via `display: none`. Logo + "Get early access" CTA remain
  visible. Page is short enough that nav links aren't load-bearing
  on mobile.
- Nav row height: 64px → 56px on mobile, action gap 22px → 12px.
- Added `white-space: nowrap` on links + CTA to prevent
  mid-phrase wrapping at any viewport.

---

## [1.4.1] — 2026-04-30

Favicon rendering fix.

### Fixed

- `public/favicon.svg` was the 32px-optimized SVG from the logo library
  (stroke-width 1.5, orange core r=2.2). When browsers scaled it down to
  the 16×16 tab render size, the line and orange core became sub-pixel and
  effectively invisible — only the black orb survived. Tabs showed a blank
  ink circle instead of the canonical mark.
- Replaced `favicon.svg` with the 16px-optimized variant from the logo
  library (stroke-width 1, core r=1.1) so strokes survive at small sizes.

### Added

- `public/favicon-32.svg` (32px-optimized variant) shipped alongside.
- `<link>` tags in `index.html` now declare both with `sizes="16x16"` and
  `sizes="32x32"` hints so browsers can pick the right variant per render
  context (tab vs bookmarks-page vs retina).

---

## [1.4.0] — 2026-04-30

ICP-targeted v1.0 brief execution. Hero copy locked, FAQ restored, OG image
rebuilt with the Devanagari→Hinglish transformation, apple-touch-icon
shipped. Demo reordered + ChatGPT scenario added. Existing structure (Slack
mock in hero, 4-card Mechanic, Wedge) preserved per Q&A on the brief.

### Hero

- **H1:** `Stop typing and start speaking.` → `Stop typing. Start <orange>speaking.</orange>`
  Period instead of "and". The word "speaking" is now in the orange
  product-accent colour (`var(--product-accent)` = `#C97B3F`); rest of the
  H1 stays ink.
- **Sub merged into a single paragraph (lede style):**
  `Echoe hears how Indians talk and types how Indians need. Hold right ⌘,
  speak naturally, release. Echoe types in English, Hinglish, Hindi, or
  your native language. Wherever your cursor is.` Replaced the two-tier
  sub (22px sepia + smaller lede) with one consolidated lede; same font
  size throughout the paragraph.
- **New line below the form:** `Join the waitlist · 5 free dictations a day`
  (13px dust). The platform / pricing caption sits under it on a smaller
  line.
- **Eyebrow:** swapped from `Voice dictation that finally speaks Indian.`
  to `Built for Indian voices and languages` after iterating through
  intermediate options. Concrete positioning over wedge-claim.
- **Final CTA section H2:** `Start talking.` → `Start speaking.` for
  consistency with the hero.

### Waitlist form

- Success copy: `Got it. We'll email you when Echoe ships.` →
  `You're on the list. Watch your inbox.`
- Network error copy: `Our end hit a hiccup. Try again?` →
  `Something went wrong. Try again or email hello@echoeapp.com.`
- Validation error message unchanged.

### Demo section

- **Scenario order rewritten:** Slack / WhatsApp / Gmail / Notion → 
  WhatsApp / Gmail / Slack / ChatGPT. Reads as casual messaging → formal
  email → team chat → AI prompt; loose escalation of "how clean does
  the output need to be."
- **NotionPanel removed.** Notion-PRD scenario dropped.
- **ChatGPTPanel added** (new component). Mock shows a ChatGPT 4o
  composer; the dictated Hinglish ("Yaar mujhe ek email likhna hai
  client ko...") becomes a clean AI prompt ("Draft a casual but
  professional email to a client..."). Transforming phase reads
  "Cleaning up the prompt…" to call out the use case.
- `AppTile` now has a `chatgpt` gradient (`#10A37F` → `#1C1A15`).

### FAQ

- Re-imported `FAQSectionEN` in `App.jsx`; renders between Pricing and
  FinalCTA.
- Content rewritten to the brief's four questions: audio retention,
  WhatsApp Web compatibility, Intel Mac support, AI training stance.
- Older questions (offline, language list, Wispr-vs-Apple comparison,
  cancellation) removed.

### Meta + shareability

- `<title>`: `Echoe. Stop typing. Start speaking.` (was `Echoe. Your
  thoughts in your language. Voice dictation for Mac.`)
- Description rewritten to the brief's longer Indian-language version.
- `og:title`, `og:description`, `twitter:title`, `twitter:description`
  realigned. `og:site_name` added.
- `<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">`
  added.

### OG image

- Rebuilt per the brief's composition: logo top-left at 1.5× scale,
  H1 with orange `speaking.`, sub line, hotkey pill (`right ⌘`) +
  `Hold. Talk. Release.`, Devanagari→Hinglish demo card panel right
  (408×316). Live page right column still uses the Slack mock + HUD
  per call; the OG-only Devanagari card is brief-spec.
- `npm run og` regenerated the PNG.

### Apple touch icon

- New: `public/apple-touch-icon.png` (180×180) generated from
  `public/echoe-icon-256.svg` (canonical 256px Echoe app icon copied
  from the logo library).
- `scripts/generate-og.mjs` extended to produce both
  `og-image.png` and `apple-touch-icon.png` from their respective SVG
  sources via `sharp`.

### Tokens / palette (no breaking changes)

- Brief defines a token taxonomy where `--terracotta` is the orange
  product accent and `--forest` is the green CTA. The website's
  existing `--terracotta` is the green CTA colour and
  `--product-accent` is the orange. To avoid a high-risk rename across
  many files, the new copy uses `var(--product-accent)` for the
  orange `speaking.` highlight. No tokens renamed; site rendering
  stable.

### Em dash policy

- Continued the project-wide em dash removal. Brief copy that contained
  `—` was rendered with periods or commas in titles and prose, matching
  the established preference.

### Anti-pattern compliance

- `Voice dictation for Mac` appears only in `<title>` and meta
  description; absent from visible page content.
- `Dictate in Slack` (and the rest of the rotator's app names) verified
  absent across `src/` and `index.html`.
- No new dependencies. No animation libraries.
- CTA buttons remain forest green (`var(--terracotta)` resolves to
  `#2F5F3D` in this codebase).

### Notes / caveats

- This site is a Vite SPA. The hero copy is rendered client-side, so a
  raw `curl` of the homepage returns the HTML shell, not the headline
  text in `<body>`. Crawlers that execute JS (Google) see the content;
  social card unfurlers (WhatsApp / Slack / FB / Twitter / LinkedIn)
  only read the meta tags, which are server-rendered correctly.
  Migrating to an SSR / SSG framework was out of scope for this
  release.
- Devanagari rendering in the OG PNG depends on the system's font
  fallback chain when `sharp`/`librsvg` rasterizes the SVG. If the
  glyphs render as `tofu` boxes on the deployed image, we fall back to
  a transliterated example or ship Devanagari as outlined paths.
- The ChatGPT scenario currently shows "ChatGPT · 4o" in the panel
  header. Update if the model lineup or branding changes (low effort:
  one string in `Demo.jsx::ChatGPTPanel`).

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
