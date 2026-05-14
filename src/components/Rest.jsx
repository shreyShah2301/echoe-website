// Echoe Landing EN: Mechanic + Pricing + FAQ + FinalCTA + Footer

import { useState } from 'react';
import { Card, Kbd, HUD, AppTile, EchoeMark } from './Shared.jsx';


export const MechanicSectionEN = () => (
  <section style={{ background: 'var(--parchment)' }}>
    <div className="container">
      <div style={{ maxWidth: 720 }}>
        <div className="eyebrow">Out of the way</div>
        <h2 className="h2" style={{ marginTop: 14 }}>
          A small floating panel. <span style={{ color: 'var(--terracotta)' }}>That's the entire UI.</span>
        </h2>
        <p className="lede">
          No window, no focus stealing, no extra clicks. Echoe hovers in the corner while you talk, transforms what you said, drops it where your cursor was, then disappears.
        </p>
      </div>

      <div className="mechanic-grid" style={{ marginTop: 56 }}>
        <Card>
          <div className="eyebrow" style={{ color: 'var(--dust)', marginBottom: 16 }}>Step 01</div>
          <div style={{ font: '500 22px/1.25 var(--font-ui)', color: 'var(--ink)', letterSpacing: '-0.015em', marginBottom: 14 }}>Hold a hotkey.</div>
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
          <div style={{ font: '500 22px/1.25 var(--font-ui)', color: 'var(--ink)', letterSpacing: '-0.015em', marginBottom: 14 }}>The HUD does the rest.</div>
          <div style={{ font: '400 14px/1.5 var(--font-ui)', color: 'var(--sepia)', marginBottom: 22 }}>
            Listening, transforming, inserted. Three states, one tiny window. Auto-dismisses when it's done.
          </div>
          <div style={{ transform: 'scale(0.7)', transformOrigin: 'left top', height: 56, width: '100%', overflow: 'hidden' }}>
            <HUD state="listening" pair="EN · auto" metaRight="0:03" />
          </div>
        </Card>

        <Card>
          <div className="eyebrow" style={{ color: 'var(--dust)', marginBottom: 16 }}>Quietly</div>
          <div style={{ font: '500 22px/1.25 var(--font-ui)', color: 'var(--ink)', letterSpacing: '-0.015em', marginBottom: 14 }}>Auto-pauses in meetings.</div>
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
          <div style={{ font: '500 22px/1.25 var(--font-ui)', color: 'var(--ink)', letterSpacing: '-0.015em', marginBottom: 14 }}>Learns your apps.</div>
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
      <div style={{ maxWidth: 720 }}>
        <div className="eyebrow">Pricing</div>
        <h2 className="h2" style={{ marginTop: 14 }}>
          Free to start. <span style={{ color: 'var(--terracotta)' }}>Pro when it's earned.</span>
        </h2>
        <p className="lede">No trial-expiry pressure. No credit card upfront. The free plan is yours to keep.</p>
      </div>
      <div className="pricing-grid" style={{ marginTop: 56 }}>
        {PRICES_EN.map(p => (
          <div key={p.id} style={{
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
            <div style={{ font: '500 14px/1 var(--font-ui)' }}>{p.label}</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <span style={{ font: '500 36px/1 var(--font-ui)', letterSpacing: '-0.025em' }}>{p.price}</span>
              <span style={{ font: '400 13px/1 var(--font-ui)', color: p.highlight ? 'rgba(245,241,232,0.6)' : 'var(--dust)' }}>{p.suffix}</span>
            </div>
            <div style={{ font: '500 11px/1.4 var(--font-ui)', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--terracotta)' }}>{p.tag}</div>
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
    a: "Audio is processed by Sarvam (our ASR provider) for transcription, then immediately discarded. Your audio is never stored. Transcripts stay on your Mac unless you export them.",
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
];

const FAQItemEN = ({ q, a, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ borderTop: '0.5px solid var(--hairline)', padding: '20px 0' }}>
      <button onClick={() => setOpen(!open)} style={{ all: 'unset', cursor: 'pointer', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
        <span style={{ font: '500 18px/1.4 var(--font-ui)', color: 'var(--ink)', letterSpacing: '-0.01em' }}>{q}</span>
        <span style={{ font: '400 22px/1 var(--font-ui)', color: 'var(--dust)', transform: open ? 'rotate(45deg)' : 'rotate(0)', transition: 'transform 200ms var(--ease-default)', flexShrink: 0 }}>+</span>
      </button>
      <div style={{ maxHeight: open ? 400 : 0, overflow: 'hidden', transition: 'max-height 280ms var(--ease-default), opacity 240ms var(--ease-default)', opacity: open ? 1 : 0 }}>
        <div style={{ marginTop: 14, font: '400 15px/1.6 var(--font-ui)', color: 'var(--sepia)', maxWidth: 720, textWrap: 'pretty' }}>{a}</div>
      </div>
    </div>
  );
};

export const FAQSectionEN = () => (
  <section style={{ background: 'var(--ivory)' }}>
    <div className="container">
      <div style={{ maxWidth: 720 }}>
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

export const FinalCTAEN = () => (
  <section style={{ background: 'var(--ink)', color: 'var(--ivory)', padding: '120px 0' }}>
    <div className="container" style={{ textAlign: 'center' }}>
      <div className="eyebrow">Try it on your Mac</div>
      <h2 style={{ margin: '20px auto 0', maxWidth: 820, font: '500 clamp(36px, 5.5vw, 60px)/1.05 var(--font-ui)', letterSpacing: '-0.03em', color: 'var(--ivory)', textWrap: 'balance' }}>
        Stop typing. <span style={{ color: 'var(--terracotta-soft)' }}>Start speaking.</span>
      </h2>
      <div style={{ marginTop: 36, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
        <a
          href="https://github.com/shreyShah2301/echoe-website/releases/download/v1.1.0/Echoe-1.0.dmg"
          download
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
          Download for Mac
        </a>
        <div style={{ font: '400 12px/1.5 var(--font-ui)', color: 'rgba(245,241,232,0.55)' }}>
          macOS 14+ · Apple Silicon and Intel
        </div>
      </div>
      <div style={{ marginTop: 24, display: 'inline-flex', gap: 8, alignItems: 'center', font: '400 13px/1 var(--font-ui)', color: 'rgba(245,241,232,0.55)' }}>
        <Kbd onDark size={11}>right ⌘</Kbd><span>Hold to dictate</span>
      </div>
    </div>
  </section>
);

export const FooterEN = () => (
  <footer style={{ background: 'var(--ink)', color: 'rgba(245,241,232,0.6)', padding: '40px 0', borderTop: '0.5px solid rgba(245,241,232,0.08)' }}>
    <div className="container" style={{ display: 'flex', flexWrap: 'wrap', gap: 20, alignItems: 'center', justifyContent: 'space-between', font: '400 12px/1.5 var(--font-ui)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
        <EchoeMark height={28} variant="cream" />
        <span style={{ fontStyle: 'italic' }}>Don't whisper when you can echo your thoughts with confidence.</span>
      </div>
      <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap' }}>
        <a href="/privacy" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy</a>
        <a href="/terms" style={{ color: 'inherit', textDecoration: 'none' }}>Terms</a>
        <a href="mailto:hello@echoeapp.com" style={{ color: 'inherit', textDecoration: 'none' }}>Contact</a>
        <span>©2026</span>
      </div>
    </div>
  </footer>
);
