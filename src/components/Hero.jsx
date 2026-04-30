// Echoe Landing EN: Hero + Nav for English Tier-1 knowledge workers

import { useState, useEffect } from 'react';
import { EchoeMark, PrimaryButton, Kbd, PulseOrb, AppTile, HUD, useTypewriter } from './Shared.jsx';
import WaitlistForm from './WaitlistForm.jsx';

const HERO_PHRASES = [
  { text: 'Dictate in WhatsApp.', accent: 'WhatsApp' },
  { text: 'Dictate in Slack.',    accent: 'Slack' },
  { text: 'Dictate in Gmail.',    accent: 'Gmail' },
  { text: 'Dictate anywhere.',    accent: 'anywhere' },
];

const CyclingHeroPhrase = () => {
  const [i, setI] = useState(0);
  const [op, setOp] = useState(1);
  useEffect(() => {
    let t1, t2;
    const cycle = () => {
      t1 = setTimeout(() => setOp(0), 2300);
      t2 = setTimeout(() => { setI(n => (n + 1) % HERO_PHRASES.length); setOp(1); }, 2500);
    };
    cycle();
    const iv = setInterval(cycle, 2500);
    return () => { clearInterval(iv); clearTimeout(t1); clearTimeout(t2); };
  }, []);
  const cur = HERO_PHRASES[i];
  const idx = cur.text.indexOf(cur.accent);
  return (
    <span style={{ opacity: op, transition: 'opacity 200ms var(--ease-default)' }}>
      {cur.text.slice(0, idx)}
      <span style={{ color: 'var(--terracotta)' }}>{cur.accent}</span>
      {cur.text.slice(idx + cur.accent.length)}
    </span>
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

const HERO_REPLY_EN = "Standup update. Wrapping up the auth refactor today, ek aur edge case mila so pushing the staging deploy to tomorrow. Will share Loom by EOD.";

const SlackComposerMock = () => {
  const [phase, setPhase] = useState('idle');
  useEffect(() => {
    let timers = [];
    const reset = () => {
      timers.push(setTimeout(() => setPhase('listening'),    1000));
      timers.push(setTimeout(() => setPhase('transforming'), 3500));
      timers.push(setTimeout(() => setPhase('typing'),       4400));
      timers.push(setTimeout(() => setPhase('settled'),      11200));
      timers.push(setTimeout(() => { setPhase('idle'); reset(); }, 15500));
    };
    reset();
    return () => timers.forEach(clearTimeout);
  }, []);
  const { shown } = useTypewriter(HERO_REPLY_EN, { speed: 18, play: phase === 'typing' });
  const showText = phase === 'typing' || phase === 'settled';
  const text = phase === 'settled' ? HERO_REPLY_EN : shown;

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
        <span style={{ font: '500 13px/1 var(--font-ui)', color: 'var(--ink)' }}>eng-standup</span>
        <span style={{ font: '400 11px/1 var(--font-ui)', color: 'var(--dust)', marginLeft: 8 }}>· 12 members</span>
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
              Anyone got the latest staging deploy notes? Bhai I need them for the customer call at 11.
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
        }}>
          {phase === 'idle' && <span>Message #eng-standup</span>}
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

export const HeroEN = () => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 720;
  return (
    <section style={{ padding: isMobile ? '40px 0 60px' : '64px 0 80px', overflow: 'hidden' }}>
      <div className="container" style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1.05fr 1fr',
        gap: isMobile ? 36 : 56, alignItems: 'center',
      }}>
        <div>
          <div className="eyebrow">Don't whisper when you can echo your thoughts with confidence.</div>
          <h1 style={{
            margin: '20px 0 0', maxWidth: 640,
            font: '500 clamp(40px, 6.5vw, 76px)/1.02 var(--font-ui)',
            letterSpacing: '-0.035em', color: 'var(--ink)', textWrap: 'balance',
          }}>
            <CyclingHeroPhrase />
          </h1>
          <h2 style={{
            margin: '18px 0 0', maxWidth: 580,
            font: '500 clamp(20px, 2.6vw, 28px)/1.22 var(--font-ui)',
            letterSpacing: '-0.02em', color: 'var(--ink)', textWrap: 'balance',
          }}>
            One hotkey. Any app. <span style={{ color: 'var(--sepia)' }}>Speak the way you actually talk —</span>code-switching included.
          </h2>
          <p className="lede">
            Hold right ⌘ (your hotkey), say what you mean, let go. Echoe transcribes, cleans up filler, and inserts text into Slack, WA, Gmail, Figma, anywhere your cursor is. Input in Native, English, or mix it up. Get the output in English, code-mix, or Native.
          </p>

          <div style={{ marginTop: 36, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <WaitlistForm source="hero" />
            <div style={{ font: '400 12px/1.5 var(--font-ui)', color: 'var(--dust)' }}>
              <div>Apple Silicon + Intel · macOS 14+</div>
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
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 24 }}>
            <SlackComposerMock />
            <HUD state="listening" pair="EN · auto" metaRight="0:03" />
          </div>
        )}
        {isMobile && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <SlackComposerMock />
          </div>
        )}
      </div>

      <div style={{ marginTop: isMobile ? 80 : 96, borderTop: '0.5px solid var(--hairline)' }} />
    </section>
  );
};
