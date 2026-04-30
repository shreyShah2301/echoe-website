// Echoe Landing EN: Hero + Nav

import { useState, useEffect } from 'react';
import { EchoeMark, PrimaryButton, Kbd, PulseOrb, AppTile, HUD, useTypewriter } from './Shared.jsx';
import WaitlistForm from './WaitlistForm.jsx';

// Map ISO 639-1 codes to display names for Indian regional languages.
// Used to localize slot 2 of the rotator based on the visitor's browser
// language setting. Excludes English/Hindi (already static slots).
const NATIVE_LANG_BY_CODE = {
  mr: 'Marathi',
  ta: 'Tamil',
  te: 'Telugu',
  bn: 'Bengali',
  kn: 'Kannada',
  ml: 'Malayalam',
  gu: 'Gujarati',
  pa: 'Punjabi',
  or: 'Odia',
  as: 'Assamese',
};
const NATIVE_LANG_FALLBACK = 'Marathi';

function detectNativeLanguage() {
  if (typeof navigator === 'undefined') return NATIVE_LANG_FALLBACK;
  const tags = (navigator.languages && navigator.languages.length)
    ? navigator.languages
    : [navigator.language || ''];
  for (const tag of tags) {
    const code = tag.toLowerCase().split('-')[0];
    const name = NATIVE_LANG_BY_CODE[code];
    if (name) return name;
  }
  return NATIVE_LANG_FALLBACK;
}

// "Dictate in" stays static on line 1; only the language on line 2 cycles.
// Slot 2 is dynamic per visitor; the rest are static.
const CyclingHeroPhrase = () => {
  const [nativeLang] = useState(detectNativeLanguage);
  const [i, setI] = useState(0);
  const [op, setOp] = useState(1);

  const langs = ['English', nativeLang, 'Hinglish', 'Hindi', 'your language'];

  useEffect(() => {
    let t1, t2;
    const cycle = () => {
      t1 = setTimeout(() => setOp(0), 2300);
      t2 = setTimeout(() => { setI(n => (n + 1) % langs.length); setOp(1); }, 2500);
    };
    cycle();
    const iv = setInterval(cycle, 2500);
    return () => { clearInterval(iv); clearTimeout(t1); clearTimeout(t2); };
  }, [langs.length]);

  return (
    <>
      <span style={{ display: 'block' }}>Dictate in</span>
      <span style={{
        display: 'block',
        color: 'var(--terracotta)',
        opacity: op,
        transition: 'opacity 200ms var(--ease-default)',
      }}>
        {langs[i]}.
      </span>
    </>
  );
};

const scrollToWaitlist = () => {
  const el = document.getElementById('waitlist');
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
};

export const NavEN = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="container" style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: 64, gap: 16,
      }}>
        <EchoeMark size={22} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
          <a href="#demo" style={{ font: '400 14px/1 var(--font-ui)', color: 'var(--sepia)', textDecoration: 'none' }}>Demo</a>
          <a href="#how" style={{ font: '400 14px/1 var(--font-ui)', color: 'var(--sepia)', textDecoration: 'none' }}>How it works</a>
          <a href="#pricing" style={{ font: '400 14px/1 var(--font-ui)', color: 'var(--sepia)', textDecoration: 'none' }}>Pricing</a>
          <PrimaryButton size="md" onClick={scrollToWaitlist}>Get early access</PrimaryButton>
        </div>
      </div>
    </header>
  );
};

// The transformation example: the core "magic moment" the hero animates.
// Spoken in casual Hinglish; output is cleaned for the Slack channel.
const HERO_SPOKEN = "yaar iska timeline nahi ban raha";
const HERO_REPLY  = "Yaar, this timeline isn't coming together yet.";

// Spoken-input chip that fades in during listening + transforming, fades out
// before the typed output starts. Connects voice input to inserted text.
const SpokenChip = ({ phase }) => {
  const visible = phase === 'listening' || phase === 'transforming';
  return (
    <div style={{
      width: '100%', maxWidth: 445,
      opacity: visible ? 1 : 0,
      maxHeight: visible ? 80 : 0,
      transition: 'opacity 240ms var(--ease-default), max-height 240ms var(--ease-default)',
      overflow: 'hidden',
    }}>
      <div style={{
        background: 'var(--parchment)',
        border: '0.5px solid var(--hairline-stronger)',
        borderRadius: 10,
        padding: '10px 14px',
        font: '400 13px/1.45 var(--font-ui)',
        color: 'var(--ink)',
        display: 'flex', gap: 10, alignItems: 'baseline',
      }}>
        <span style={{
          font: '500 10px/1 var(--font-ui)', letterSpacing: '0.12em',
          textTransform: 'uppercase', color: 'var(--terracotta)', flexShrink: 0,
        }}>You said</span>
        <span style={{ fontStyle: 'italic' }}>"{HERO_SPOKEN}"</span>
      </div>
    </div>
  );
};

// SlackComposerMock now receives `phase` as a prop so the parent can sync
// the HUD with the same lifecycle. No internal phase state.
const SlackComposerMock = ({ phase }) => {
  const { shown } = useTypewriter(HERO_REPLY, { speed: 22, play: phase === 'typing' });
  const showText = phase === 'typing' || phase === 'settled';
  const text = phase === 'settled' ? HERO_REPLY : shown;

  return (
    <div style={{
      width: '100%', maxWidth: 445, background: '#FFFFFF',
      border: '0.5px solid var(--hairline-stronger)', borderRadius: 12, overflow: 'hidden',
      boxShadow: '0 24px 60px rgba(28,26,21,0.14), 0 6px 18px rgba(28,26,21,0.06)',
    }}>
      <div style={{
        height: 44, padding: '0 16px',
        borderBottom: '0.5px solid var(--hairline)',
        display: 'flex', alignItems: 'center', gap: 8,
        background: '#FAFAF7',
      }}>
        <span style={{ color: 'var(--dust)', font: '500 14px var(--font-mono)' }}>#</span>
        <span style={{ font: '500 13px/1 var(--font-ui)', color: 'var(--ink)' }}>design-review</span>
        <span style={{ font: '400 11px/1 var(--font-ui)', color: 'var(--dust)', marginLeft: 8 }}>· 8 members</span>
        <div style={{ flex: 1 }} />
        <AppTile kind="slack" size={14} />
      </div>

      <div style={{ padding: '14px 16px 10px', background: '#FFFFFF' }}>
        <div style={{ display: 'flex', gap: 10 }}>
          <div style={{ width: 30, height: 30, borderRadius: 6, background: 'linear-gradient(135deg,#7E5BB7,#4A2D6E)', flexShrink: 0 }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 2 }}>
              <span style={{ font: '600 13px/1.2 var(--font-ui)', color: 'var(--ink)' }}>Priya</span>
              <span style={{ font: '400 11px/1 var(--font-ui)', color: 'var(--dust)' }}>9:42</span>
            </div>
            <div style={{ font: '400 13.5px/1.5 var(--font-ui)', color: 'var(--ink)' }}>
              Where are we on the v2 mocks? Locking the timeline today.
            </div>
          </div>
        </div>
      </div>

      <div style={{
        padding: '12px 16px 16px', borderTop: '0.5px solid var(--hairline)', background: '#FFFFFF',
      }}>
        <div style={{
          border: `1px solid ${showText ? 'var(--ink)' : 'var(--hairline-stronger)'}`,
          borderRadius: 8, padding: '10px 12px',
          font: '400 13.5px/1.5 var(--font-ui)',
          color: phase === 'idle' ? 'var(--dust)' : 'var(--ink)',
          transition: 'border-color 200ms',
          minHeight: 38,
        }}>
          {phase === 'idle' && <span>Message #design-review</span>}
          {phase === 'listening' && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <PulseOrb size={10} />
              <span style={{ color: 'var(--product-accent)', font: '500 10px/1 var(--font-ui)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Listening</span>
            </span>
          )}
          {phase === 'transforming' && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', border: '1.5px solid var(--ink)', borderTopColor: 'transparent', animation: 'echoe-spin 0.9s linear infinite' }} />
              <span style={{ color: 'var(--ink)', font: '400 12px/1 var(--font-ui)' }}>Transforming…</span>
            </span>
          )}
          {showText && (
            <span style={{ whiteSpace: 'pre-wrap' }}>
              {text}
              {phase === 'typing' && <span className="typing-caret" />}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

// HUD state mirrors the composer phase so the two read as one demo.
const hudStateForPhase = (phase) => {
  if (phase === 'transforming') return 'transforming';
  if (phase === 'typing' || phase === 'settled') return 'inserted';
  return 'listening';
};

const hudTitleForPhase = (phase) => {
  if (phase === 'transforming') return 'Transforming…';
  if (phase === 'typing' || phase === 'settled') return 'Inserted.';
  return 'Listening.';
};

export const HeroEN = () => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 720;

  // Single source of truth for the demo cycle. SlackComposerMock + HUD
  // both read this, so they animate as one demo, not two separate widgets.
  const [phase, setPhase] = useState('idle');
  useEffect(() => {
    let timers = [];
    const reset = () => {
      timers.push(setTimeout(() => setPhase('listening'),    1000));
      timers.push(setTimeout(() => setPhase('transforming'), 4200));
      timers.push(setTimeout(() => setPhase('typing'),       5100));
      timers.push(setTimeout(() => setPhase('settled'),      9800));
      timers.push(setTimeout(() => { setPhase('idle'); reset(); }, 13500));
    };
    reset();
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <section style={{ padding: isMobile ? '40px 0 60px' : '64px 0 80px', overflow: 'hidden' }}>
      <div className="container" style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1.05fr 1fr',
        gap: isMobile ? 36 : 56, alignItems: 'center',
      }}>
        <div>
          <div className="eyebrow">One hotkey. Any app. Your thoughts in your language.</div>
          <h1 style={{
            margin: '20px 0 0', maxWidth: 640,
            font: '500 clamp(40px, 6.5vw, 76px)/1.02 var(--font-ui)',
            letterSpacing: '-0.035em', color: 'var(--ink)', textWrap: 'balance',
          }}>
            <CyclingHeroPhrase />
          </h1>
          <p className="lede" style={{ marginTop: 24 }}>
            Hold right ⌘, speak naturally, release. Echoe gives you Roman, Hindi, or mixed. Wherever your cursor is.
          </p>

          <div style={{ marginTop: 36, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <WaitlistForm source="hero" />
            <div style={{ font: '400 12px/1.5 var(--font-ui)', color: 'var(--dust)' }}>
              <div>Now in private beta · Apple Silicon + Intel · macOS 14+</div>
              <div>Free for 5 dictations a day. Pro from ₹399/mo.</div>
            </div>
          </div>

          <div style={{
            marginTop: 28, padding: '14px 18px', background: 'var(--parchment)',
            border: '0.5px solid var(--hairline)', borderRadius: 12,
            display: 'inline-flex', alignItems: 'center', gap: 12,
            font: '400 13px/1.4 var(--font-ui)', color: 'var(--sepia)',
          }}>
            <Kbd size={12}>right ⌘</Kbd>
            <span>Hold, talk, release. That's the whole product.</span>
          </div>
        </div>

        {!isMobile && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 12 }}>
            <SpokenChip phase={phase} />
            <SlackComposerMock phase={phase} />
            <div style={{ marginTop: -8 }}>
              <HUD
                state={hudStateForPhase(phase)}
                title={hudTitleForPhase(phase)}
                pair="हिंदी → EN"
                metaRight={phase === 'settled' ? '✓' : '0:03'}
              />
            </div>
          </div>
        )}
        {isMobile && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <SpokenChip phase={phase} />
            <SlackComposerMock phase={phase} />
          </div>
        )}
      </div>

      <div style={{ marginTop: isMobile ? 80 : 96, borderTop: '0.5px solid var(--hairline)' }} />
    </section>
  );
};
