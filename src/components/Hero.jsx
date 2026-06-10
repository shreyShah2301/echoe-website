// Echoe Landing EN: Hero + Nav

import { useState, useEffect, useRef } from 'react';
import { EchoeMark, Kbd, PulseOrb, AppTile, HUD, useTypewriter } from './Shared.jsx';

const DMG_URL = 'https://github.com/shreyShah2301/echoe-website/releases/download/v1.1.3/Echoe-1.1.3.dmg';

export const NavEN = () => {
  return (
    <header className="nav">
      <div className="container nav-row">
        <EchoeMark height={32} />
        <div className="nav-actions">
          <a className="nav-link" href="#demo">Demo</a>
          <a className="nav-link" href="#how">How it works</a>
          <a className="nav-link" href="#pricing">Pricing</a>
          <a
            className="btn-lift"
            href={DMG_URL}
            download
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              minHeight: 44, boxSizing: 'border-box',
              background: 'transparent',
              color: 'var(--terracotta)',
              border: '1px solid var(--terracotta)',
              borderRadius: 999,
              padding: '11px 20px',
              font: '500 13px/1 var(--font-ui)',
              letterSpacing: '-0.005em',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
            }}
          >Download</a>
        </div>
      </div>
    </header>
  );
};

// Slim sticky bar that slides in once the hero scrolls out of view. Uses an
// IntersectionObserver on the hero section (no scroll listeners), and is
// hidden by default so it ships off-screen in the prerendered static HTML
// with no layout shift — the observer enhances it client-side after hydration.
export const StickyBarEN = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const hero = document.getElementById('hero');
    if (!hero) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { rootMargin: '0px', threshold: 0 }
    );
    io.observe(hero);
    return () => io.disconnect();
  }, []);
  return (
    <div className={`sticky-bar ${visible ? 'is-visible' : ''}`} aria-hidden={!visible}>
      <div className="container sticky-bar-row">
        <EchoeMark height={26} />
        <a
          className="btn-lift"
          href={DMG_URL}
          download
          rel="noopener noreferrer"
          tabIndex={visible ? 0 : -1}
          style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            minHeight: 44, boxSizing: 'border-box',
            background: 'var(--terracotta)',
            color: 'var(--ivory)',
            borderRadius: 999,
            padding: '10px 20px',
            font: '500 13px/1 var(--font-ui)',
            letterSpacing: '-0.005em',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
          }}
        >Download</a>
      </div>
    </div>
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
  const { shown } = useTypewriter(HERO_REPLY, { speed: 32, play: phase === 'typing' });
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
  // Layout is pure CSS (.hero-section / .hero-grid / .hero-demo-col, see
  // index.html) rather than a JS isMobile flag. The old flag computed the
  // breakpoint at render time, so the prerendered (no-window) HTML always baked
  // the desktop layout and the client re-rendered to mobile after hydration —
  // a hydration mismatch. CSS media queries have nothing to mismatch.

  // Single source of truth for the demo cycle. SlackComposerMock + HUD both read
  // this, so they animate as one demo, not two separate widgets. We mount on the
  // SETTLED frame — that's what the prerenderer bakes into the static HTML, so the
  // page reads as a finished transformation with zero JS. The loop only starts
  // after hydration, and pauses whenever the hero scrolls out of view.
  const [phase, setPhase] = useState('settled');
  const [hudShown, setHudShown] = useState(true);
  const heroRef = useRef(null);

  useEffect(() => {
    // Reduced motion: keep the settled frame, never animate.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let timers = [];
    const clear = () => { timers.forEach(clearTimeout); timers = []; };
    const at = (ms, fn) => timers.push(setTimeout(fn, ms));

    // One full cycle, beginning from the settled/inserted frame we mount on:
    // hold → HUD fades → reset → listening → transforming → type → settled → loop.
    const runCycle = () => {
      clear();
      setPhase('settled'); setHudShown(true);
      at(2200,  () => setHudShown(false));                       // HUD fades after a beat
      at(4000,  () => { setPhase('idle'); setHudShown(true); });  // reset, HUD returns as Listening
      at(5000,  () => setPhase('listening'));
      at(8200,  () => setPhase('transforming'));
      at(9100,  () => setPhase('typing'));
      at(11600, runCycle);                                        // text has settled → loop
    };

    const el = heroRef.current;
    if (!el) { runCycle(); return () => clear(); }
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) runCycle();
      else clear();
    }, { threshold: 0 });
    io.observe(el);
    return () => { clear(); io.disconnect(); };
  }, []);

  return (
    <section ref={heroRef} id="hero" className="hero-section">
      <div className="container hero-grid">
        <div>
          <div className="eyebrow">Built for Indian voices and languages</div>
          <h1 style={{
            margin: '20px 0 0', maxWidth: 720,
            font: '500 clamp(36px, 5.5vw, 64px)/1.06 var(--font-ui)',
            letterSpacing: '-0.03em', color: 'var(--ink)', textWrap: 'balance',
          }}>
            Stop typing. Start <span style={{ color: 'var(--product-accent)' }}>speaking.</span>
          </h1>
          <p className="lede" style={{ marginTop: 18 }}>
            Echoe hears how Indians talk and types how Indians need. Hold right ⌘, speak naturally, release. Echoe types in English, Hinglish, Hindi, or your native language. Wherever your cursor is.
          </p>

          <div style={{ marginTop: 36, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <a
              className="btn-lift"
              href={DMG_URL}
              download
              rel="noopener noreferrer"
              style={{
                alignSelf: 'flex-start',
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
            <div style={{ font: '400 12px/1.5 var(--font-ui)', color: 'var(--dust)' }}>
              macOS 14+ · Apple Silicon and Intel · v1.1.3 · 6 MB
            </div>
            <div style={{ font: '400 12px/1.5 var(--font-ui)', color: 'var(--dust)' }}>
              Pro from ₹399/mo.
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

        <div className="hero-demo-col">
          <SpokenChip phase={phase} />
          <SlackComposerMock phase={phase} />
          <div className="hero-hud" style={{ marginTop: -8, opacity: hudShown ? 1 : 0, transition: 'opacity 320ms var(--ease-default)' }}>
            <HUD
              state={hudStateForPhase(phase)}
              title={hudTitleForPhase(phase)}
              pair="हिंदी → EN"
              metaRight={phase === 'settled' ? '✓' : '0:03'}
            />
          </div>
        </div>
      </div>

      <div className="hero-divider" />
    </section>
  );
};
