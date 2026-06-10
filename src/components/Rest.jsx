// Echoe Landing EN: Mechanic + Pricing + FAQ + FinalCTA + Footer

import { useState } from 'react';
import { Card, Kbd, HUD, AppTile, EchoeMark } from './Shared.jsx';

const IconWhatsApp = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"
    style={{ display: 'block', flexShrink: 0 }}>
    <path d="M8 1.5C4.41 1.5 1.5 4.19 1.5 7.5c0 1.1.3 2.14.83 3.03L1.5 14.5l4.09-1.06A6.46 6.46 0 0 0 8 13.5c3.59 0 6.5-2.69 6.5-6s-2.91-6-6.5-6z"
      stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
    <path d="M5.75 7.25c.22.7.7 1.35 1.5 1.85.62.38 1.3.52 1.9.45"
      stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
);

const IconEmail = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"
    style={{ display: 'block', flexShrink: 0 }}>
    <rect x="1.5" y="3.5" width="13" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
    <path d="M1.5 5.5L8 10l6.5-4.5" stroke="currentColor" strokeWidth="1.4"
      strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconX = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"
    style={{ display: 'block', flexShrink: 0 }}>
    <path d="M2.5 2.5L13.5 13.5M13.5 2.5L2.5 13.5"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export const MechanicSectionEN = () => (
  <section style={{ background: 'var(--parchment)' }}>
    <div className="container">
      <div className="reveal" style={{ maxWidth: 720 }}>
        <div className="eyebrow">Out of the way</div>
        <h2 className="h2" style={{ marginTop: 14 }}>
          A small floating panel. <span style={{ color: 'var(--terracotta)' }}>That's the entire UI.</span>
        </h2>
        <p className="lede">
          No window, no focus stealing, no extra clicks. Echoe hovers in the corner while you talk, transforms what you said, drops it where your cursor was, then disappears.
        </p>
      </div>

      <div className="mechanic-grid reveal" style={{ marginTop: 56, '--reveal-delay': '80ms' }}>
        <Card>
          <div className="eyebrow" style={{ color: 'var(--dust)', marginBottom: 16 }}>Step 01</div>
          <h3 style={{ font: '500 22px/1.25 var(--font-ui)', color: 'var(--ink)', letterSpacing: '-0.015em', margin: '0 0 14px' }}>Hold a hotkey.</h3>
          <div style={{ font: '400 14px/1.5 var(--font-ui)', color: 'var(--sepia)', marginBottom: 22 }}>
            Right ⌘ by default. fn, caps lock, anything. Works in any app where your cursor is.
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <Kbd>right ⌘</Kbd><span style={{ font: '400 12px/1.6 var(--font-ui)', color: 'var(--dust)' }}>or</span>
            <Kbd>fn</Kbd><span style={{ font: '400 12px/1.6 var(--font-ui)', color: 'var(--dust)' }}>or any combo</span>
          </div>
        </Card>

        <Card>
          <div className="eyebrow" style={{ color: 'var(--dust)', marginBottom: 16 }}>Step 02</div>
          <h3 style={{ font: '500 22px/1.25 var(--font-ui)', color: 'var(--ink)', letterSpacing: '-0.015em', margin: '0 0 14px' }}>The HUD does the rest.</h3>
          <div style={{ font: '400 14px/1.5 var(--font-ui)', color: 'var(--sepia)', marginBottom: 22 }}>
            Listening, transforming, inserted. Three states, one tiny window. Auto-dismisses when it's done.
          </div>
          <div style={{ transform: 'scale(0.7)', transformOrigin: 'left top', height: 56, width: '100%', overflow: 'hidden' }}>
            <HUD state="listening" pair="EN · auto" metaRight="0:03" />
          </div>
        </Card>

        <Card>
          <div className="eyebrow" style={{ color: 'var(--dust)', marginBottom: 16 }}>Quietly</div>
          <h3 style={{ font: '500 22px/1.25 var(--font-ui)', color: 'var(--ink)', letterSpacing: '-0.015em', margin: '0 0 14px' }}>Auto-pauses in meetings.</h3>
          <div style={{ font: '400 14px/1.5 var(--font-ui)', color: 'var(--sepia)', marginBottom: 22 }}>
            Zoom, Meet, FaceTime, Slack Huddle, Teams. If your mic is busy, Echoe stays out.
          </div>
          <div style={{ padding: '10px 14px', background: 'var(--ivory)', border: '0.5px solid var(--hairline)', borderRadius: 8, font: '400 12px/1.4 var(--font-ui)', color: 'var(--sepia)', display: 'flex', gap: 10, alignItems: 'center' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--success-green)' }} />
            <span>Zoom call detected · Echoe paused</span>
          </div>
        </Card>

        <Card>
          <div className="eyebrow" style={{ color: 'var(--dust)', marginBottom: 16 }}>Quietly</div>
          <h3 style={{ font: '500 22px/1.25 var(--font-ui)', color: 'var(--ink)', letterSpacing: '-0.015em', margin: '0 0 14px' }}>Learns your apps.</h3>
          <div style={{ font: '400 14px/1.5 var(--font-ui)', color: 'var(--sepia)', marginBottom: 22 }}>
            Always Hinglish in Slack, English in Gmail, structured Markdown in Linear? It picks up your defaults after three dictations.
          </div>
          <div style={{ padding: 12, background: 'var(--ivory)', border: '0.5px solid var(--hairline)', borderRadius: 8, display: 'flex', flexDirection: 'column', gap: 6, font: '400 12px/1.4 var(--font-ui)' }}>
            {[
              { app: 'slack', name: 'Slack', def: 'Hinglish' },
              { app: 'gmail', name: 'Gmail', def: 'English' },
              { app: 'notion', name: 'Linear', def: 'Markdown' },
            ].map(row => (
              <div key={row.name} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <AppTile kind={row.app} size={12} />
                <span style={{ color: 'var(--ink)', flex: 1 }}>{row.name}</span>
                <span style={{ color: 'var(--dust)' }}>→</span>
                <span style={{ color: 'var(--terracotta)', font: '500 12px/1 var(--font-ui)' }}>{row.def}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  </section>
);

const PRICES_EN = [
  { id: 'free',  label: 'Free',          price: '₹0',     suffix: '',         tag: '14-day Pro, free forever',      blurb: '5 dictations a day, free forever after the trial.' },
  { id: 'week',  label: 'Pro · Weekly',  price: '₹100',   suffix: '/ week',   tag: 'Try it now',                    blurb: 'Full Pro, billed weekly. The cheapest way to see if it sticks.' },
  { id: 'month', label: 'Pro · Monthly', price: '₹399',   suffix: '/ month',  tag: '₹13 / day. Less than a chai.',  blurb: 'The default. For anyone using Echoe daily.', highlight: true },
  { id: 'year',  label: 'Pro · Yearly',  price: '₹3,999', suffix: '/ year',   tag: 'Roughly two months free',       blurb: 'Best value, billed once.' },
];

export const PricingSectionEN = () => (
  <section id="pricing" style={{ background: 'var(--parchment)' }}>
    <div className="container">
      <div className="reveal" style={{ maxWidth: 720 }}>
        <div className="eyebrow">Pricing</div>
        <h2 className="h2" style={{ marginTop: 14 }}>
          Free to start. <span style={{ color: 'var(--terracotta)' }}>Pro when it's earned.</span>
        </h2>
        <p className="lede">No trial-expiry pressure. No credit card upfront. The free plan is yours to keep.</p>
      </div>
      <div className="pricing-grid reveal" style={{ marginTop: 56, '--reveal-delay': '80ms' }}>
        {PRICES_EN.map(p => (
          <div key={p.id}
            className={`price-card${p.highlight ? ' price-card-pop' : ''}`}
            style={{
              padding: 28,
              background: p.highlight ? 'var(--ink)' : 'var(--ivory)',
              color: p.highlight ? 'var(--ivory)' : 'var(--ink)',
              border: `0.5px solid ${p.highlight ? 'var(--ink)' : 'var(--hairline-stronger)'}`,
              borderRadius: 14, position: 'relative',
              display: 'flex', flexDirection: 'column', gap: 14,
            }}>
            {p.highlight && (
              <div style={{
                position: 'absolute', top: -12, right: 20, background: 'var(--terracotta)',
                color: 'var(--ivory)', padding: '5px 12px', borderRadius: 999,
                font: '500 10px/1 var(--font-ui)', letterSpacing: '0.14em', textTransform: 'uppercase',
              }}>Most popular</div>
            )}
            <h3 style={{ font: '500 14px/1 var(--font-ui)', margin: 0 }}>{p.label}</h3>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <span style={{ font: '500 36px/1 var(--font-ui)', letterSpacing: '-0.025em' }}>{p.price}</span>
              <span style={{ font: '400 13px/1 var(--font-ui)', color: p.highlight ? 'rgba(245,241,232,0.6)' : 'var(--dust)' }}>{p.suffix}</span>
            </div>
            <div style={{ font: `500 ${p.highlight ? 13 : 11}px/1.4 var(--font-ui)`, letterSpacing: '0.12em', textTransform: 'uppercase', color: p.highlight ? 'var(--terracotta-soft)' : 'var(--terracotta)' }}>{p.tag}</div>
            <div style={{ font: '400 13px/1.5 var(--font-ui)', color: p.highlight ? 'rgba(245,241,232,0.7)' : 'var(--sepia)', flex: 1 }}>{p.blurb}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 28, font: '400 13px/1.5 var(--font-ui)', color: 'var(--sepia)', display: 'flex', gap: 18, flexWrap: 'wrap' }}>
        <span>UPI · Cards · Net Banking via Razorpay</span>
        <span style={{ color: 'var(--dust)' }}>·</span>
        <span>Cancel anytime</span>
        <span style={{ color: 'var(--dust)' }}>·</span>
        <span>Team plans available. Talk to us.</span>
      </div>
    </div>
  </section>
);

const FAQ_ITEMS_EN = [
  {
    q: 'Is my audio sent to a server?',
    a: <>Audio is briefly stored on our servers for up to one hour to enable retries and quality monitoring, then automatically deleted. We never read its contents — it exists only to be processed by Sarvam AI for transcription. Full details on our <a href="/privacy" style={{ color: 'var(--terracotta)', textDecoration: 'none' }}>Privacy page</a>.</>,
  },
  {
    q: 'Does this work in WhatsApp Web?',
    a: "Yes. Echoe types into any text field your cursor is in, including WhatsApp Web, Slack, Gmail, Figma, terminals, and AI chat tools like ChatGPT and Claude.",
  },
  {
    q: 'What if I have an Intel Mac?',
    a: "Apple Silicon and Intel are both supported. macOS 14+ required.",
  },
  {
    q: 'Does Echoe train AI on my data?',
    a: "No. Your transcripts are not used to train any model, ours or third-party. See our privacy page for details.",
  },
  {
    q: 'Where does my dictation text live?',
    a: "On your Mac, in a local database that only your macOS account can read. (Technical readers: full path is ~/Library/Application Support/Echoe/echoe.sqlite.) The transcript and polished output travel from our server to your Mac in the HTTP response and are never written to our database. Our server only records metadata: duration, language detected, and whether the request succeeded.",
  },
  {
    q: 'Can the Echoe team read my dictations?',
    a: "No. We have no access to dictation text — not even for our own beta testers. Our server logs contain timestamps, durations, and error codes, never what you said. The only copy of your dictations is on your own Mac.",
  },
];

const FAQItemEN = ({ q, a, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ borderTop: '0.5px solid var(--hairline)', padding: '20px 0' }}>
      <button onClick={() => setOpen(!open)} aria-expanded={open} style={{ all: 'unset', cursor: 'pointer', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
        <span style={{ font: '500 18px/1.4 var(--font-ui)', color: 'var(--ink)', letterSpacing: '-0.01em' }}>{q}</span>
        <span style={{ font: '400 22px/1 var(--font-ui)', color: 'var(--dust)', transform: open ? 'rotate(45deg)' : 'rotate(0)', transition: 'transform 200ms var(--ease-default)', flexShrink: 0 }}>+</span>
      </button>
      {/* grid-template-rows 0fr→1fr collapses cleanly to true content height —
          fixes the latent max-height:400 clip on long answers. */}
      <div style={{ display: 'grid', gridTemplateRows: open ? '1fr' : '0fr', transition: 'grid-template-rows 250ms var(--ease-default)' }}>
        <div style={{ overflow: 'hidden', minHeight: 0 }}>
          <div style={{ marginTop: 14, font: '400 15px/1.6 var(--font-ui)', color: 'var(--sepia)', maxWidth: 720, textWrap: 'pretty' }}>{a}</div>
        </div>
      </div>
    </div>
  );
};

export const FAQSectionEN = () => (
  <section style={{ background: 'var(--ivory)' }}>
    <div className="container">
      <div className="reveal" style={{ maxWidth: 720 }}>
        <div className="eyebrow">FAQ</div>
        <h2 className="h2" style={{ marginTop: 14 }}>The questions <span style={{ color: 'var(--terracotta)' }}>we get most.</span></h2>
      </div>
      <div style={{ marginTop: 48, maxWidth: 820 }}>
        {FAQ_ITEMS_EN.map((it, i) => <FAQItemEN key={i} q={it.q} a={it.a} defaultOpen={i === 0} />)}
        <div style={{ borderTop: '0.5px solid var(--hairline)' }} />
      </div>
    </div>
  </section>
);

export const ContactSectionEN = () => (
  <section style={{ background: 'var(--ivory)' }}>
    <div className="container">
      <div className="reveal" style={{ maxWidth: 620 }}>
        <div className="eyebrow">Questions or feedback</div>
        <h2 className="h2" style={{ marginTop: 14 }}>Reach out anytime.</h2>
        <p className="lede" style={{ marginTop: 18 }}>
          If something breaks, doesn't make sense,
          or you just want to share what worked — reachout directly. Brutal honesty welcome.
        </p>
      </div>
      <div className="reveal" style={{ marginTop: 36, display: 'flex', flexWrap: 'wrap', gap: 12, '--reveal-delay': '80ms' }}>
        <a
          className="btn-lift"
          href="https://wa.me/917023785120"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'var(--terracotta)', color: 'var(--ivory)',
            borderRadius: 999, padding: '14px 24px',
            font: '500 15px/1 var(--font-ui)', letterSpacing: '-0.005em',
            textDecoration: 'none',
          }}
        ><IconWhatsApp />Message on WhatsApp</a>
        <a
          className="btn-lift"
          href="mailto:developer@echoeapp.com"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'transparent', color: 'var(--terracotta)',
            border: '1px solid var(--terracotta)',
            borderRadius: 999, padding: '14px 24px',
            font: '500 15px/1 var(--font-ui)', letterSpacing: '-0.005em',
            textDecoration: 'none',
          }}
        ><IconEmail />Email</a>
        <a
          className="btn-lift"
          href="https://x.com/shreyshah2301"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'transparent', color: 'var(--terracotta)',
            border: '1px solid var(--terracotta)',
            borderRadius: 999, padding: '14px 24px',
            font: '500 15px/1 var(--font-ui)', letterSpacing: '-0.005em',
            textDecoration: 'none',
          }}
        ><IconX />DM on X</a>
      </div>
    </div>
  </section>
);

// SHA-256 of Echoe-1.1.3.dmg. Lets users verify the download integrity against
// the Sparkle appcast / GitHub release. Update on every release.
const DMG_SHA256 = 'e00a76548681f79924a77baa136ee2c4a3b61fa7567aafdf39acfefd9f8dcfd1';

// Expandable "Verify download" disclosure under the final CTA. Renders collapsed
// in SSR (open=false) so it's SSG-safe; enhanced on the client. Lives on the dark
// (ink) section, so colors are ivory-on-dark.
const VerifyDownload = () => {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(DMG_SHA256);
        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
      } catch {
        // Clipboard blocked — the code stays selectable as a fallback.
      }
    }
  };
  return (
    <div style={{ marginTop: 4, width: '100%', maxWidth: 460 }}>
      <div style={{ textAlign: 'center' }}>
        <button
          onClick={() => setOpen(o => !o)}
          aria-expanded={open}
          style={{
            background: 'transparent', border: 'none', cursor: 'pointer', padding: 0,
            color: 'rgba(245,241,232,0.55)', font: '400 12px/1.5 var(--font-ui)',
            textDecoration: 'underline', textUnderlineOffset: 3,
          }}
        >{open ? 'Hide verification' : 'Verify download'}</button>
      </div>
      <div style={{
        maxHeight: open ? 180 : 0, overflow: 'hidden', opacity: open ? 1 : 0,
        transition: 'max-height 280ms var(--ease-default), opacity 240ms var(--ease-default)',
      }}>
        <div style={{
          marginTop: 12, padding: '12px 14px', textAlign: 'left',
          background: 'rgba(245,241,232,0.06)',
          border: '0.5px solid rgba(245,241,232,0.18)', borderRadius: 10,
          display: 'flex', flexDirection: 'column', gap: 8,
        }}>
          <div style={{ font: '500 10px/1 var(--font-ui)', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(245,241,232,0.45)' }}>SHA-256</div>
          <code style={{
            font: '400 12px/1.55 var(--font-mono)', color: 'rgba(245,241,232,0.85)',
            wordBreak: 'break-all', userSelect: 'all',
          }}>{DMG_SHA256}</code>
          <button
            onClick={copy}
            style={{
              alignSelf: 'flex-start', marginTop: 2,
              background: 'transparent', border: '0.5px solid rgba(245,241,232,0.25)',
              color: 'rgba(245,241,232,0.7)', borderRadius: 6, cursor: 'pointer',
              padding: '5px 10px', font: '500 11px/1 var(--font-ui)',
            }}
          >{copied ? 'Copied ✓' : 'Copy'}</button>
        </div>
      </div>
    </div>
  );
};

export const FinalCTAEN = () => (
  <section style={{ background: 'var(--ink)', color: 'var(--ivory)', padding: '120px 0' }}>
    <div className="container" style={{ textAlign: 'center' }}>
      <div className="reveal eyebrow">Try it on your Mac</div>
      <h2 className="reveal" style={{ margin: '20px auto 0', maxWidth: 820, font: '500 clamp(36px, 5.5vw, 60px)/1.05 var(--font-ui)', letterSpacing: '-0.03em', color: 'var(--ivory)', textWrap: 'balance', '--reveal-delay': '60ms' }}>
        Stop typing. <span style={{ color: 'var(--terracotta-soft)' }}>Start speaking.</span>
      </h2>
      <div className="reveal" style={{ marginTop: 36, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, '--reveal-delay': '120ms' }}>
        <a
          className="btn-lift"
          href="https://github.com/shreyShah2301/echoe-website/releases/download/v1.1.3/Echoe-1.1.3.dmg"
          download
          rel="noopener noreferrer"
          style={{
            background: 'var(--terracotta)',
            color: 'var(--ivory)',
            borderRadius: 999,
            padding: '14px 24px',
            font: '500 15px/1 var(--font-ui)',
            letterSpacing: '-0.005em',
            textDecoration: 'none',
          }}
        >
          Download for Mac — Free
        </a>
        <div style={{ font: '400 12px/1.5 var(--font-ui)', color: 'rgba(245,241,232,0.55)' }}>
          macOS 14+ · Apple Silicon and Intel
        </div>
        <VerifyDownload />
      </div>
      <div style={{ marginTop: 24, display: 'inline-flex', gap: 8, alignItems: 'center', font: '400 13px/1 var(--font-ui)', color: 'rgba(245,241,232,0.55)' }}>
        <Kbd onDark size={11}>right ⌘</Kbd><span>Hold to dictate</span>
      </div>
    </div>
  </section>
);

const footerLinkStyle = {
  color: 'var(--sepia)', textDecoration: 'none',
  display: 'inline-flex', alignItems: 'center', gap: 6,
  transition: 'color 120ms var(--ease-default)',
};
const onHover   = (e) => { e.currentTarget.style.color = 'var(--terracotta)'; };
const onUnhover = (e) => { e.currentTarget.style.color = 'var(--sepia)'; };

export const FooterEN = () => (
  <footer style={{
    background: 'var(--parchment)',
    borderTop: '0.5px solid var(--hairline)',
    padding: '28px 0',
  }}>
    <div className="container" style={{
      display: 'flex', flexWrap: 'wrap', gap: 20,
      alignItems: 'center', justifyContent: 'space-between',
      font: '400 13px/1.5 var(--font-ui)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
        <EchoeMark height={28} />
        <span style={{ color: 'var(--dust)', fontStyle: 'italic' }}>
          Don't whisper when you can echo your thoughts with confidence.
        </span>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 16 }}>
        <a href="https://wa.me/917023785120" target="_blank" rel="noopener noreferrer"
          style={footerLinkStyle} onMouseEnter={onHover} onMouseLeave={onUnhover}>
          <IconWhatsApp />WhatsApp
        </a>
        <span style={{ color: 'var(--hairline-strong)' }}>·</span>
        <a href="mailto:developer@echoeapp.com"
          style={footerLinkStyle} onMouseEnter={onHover} onMouseLeave={onUnhover}>
          <IconEmail />developer@echoeapp.com
        </a>
        <span style={{ color: 'var(--hairline-strong)' }}>·</span>
        <a href="https://x.com/shreyshah2301" target="_blank" rel="noopener noreferrer"
          style={footerLinkStyle} onMouseEnter={onHover} onMouseLeave={onUnhover}>
          <IconX />@shreyshah2301
        </a>
        <span style={{ color: 'var(--hairline-strong)' }}>·</span>
        <a href="/privacy" style={footerLinkStyle} onMouseEnter={onHover} onMouseLeave={onUnhover}>Privacy</a>
        <span style={{ color: 'var(--hairline-strong)' }}>·</span>
        <a href="/terms" style={footerLinkStyle} onMouseEnter={onHover} onMouseLeave={onUnhover}>Terms</a>
        <span style={{ color: 'var(--dust)' }}>·</span>
        <span style={{ color: 'var(--dust)' }}>©2026</span>
      </div>
    </div>
  </footer>
);
