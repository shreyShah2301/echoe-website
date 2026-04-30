// Echoe Landing: Shared primitives
// All components needed across hero, demo, wedge, mechanic, rest sections.

import { useState, useEffect, useRef } from 'react';

// ============================================================================
// EchoeMark: canonical wordmark lockup. Renders the SVG from `public/`.
// `variant`: "primary" (ink + terracotta core, for cream surfaces) or
// "cream" (single-fill cream, for dark surfaces like the footer).
// `height`: pixel height of the mark; width auto-derives from the SVG aspect.
// ============================================================================
export const EchoeMark = ({ height = 28, variant = 'primary' }) => {
  const src = variant === 'cream' ? '/echoe-wordmark-cream.svg' : '/echoe-wordmark.svg';
  return (
    <img
      src={src}
      alt="Echoe"
      style={{ height, width: 'auto', display: 'block' }}
    />
  );
};

// ============================================================================
// Kbd: keyboard chip in JetBrains Mono.
// ============================================================================
export const Kbd = ({ children, onDark = false, size = 11, style = {} }) => (
  <span style={{
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    font: `500 ${size}px/1 var(--font-mono)`,
    background: onDark ? 'rgba(245,241,232,0.15)' : '#FFFFFF',
    border: `0.5px solid ${onDark ? 'rgba(245,241,232,0.25)' : 'var(--hairline-stronger)'}`,
    borderRadius: 4, padding: `${size * 0.35}px ${size * 0.6}px`,
    color: onDark ? 'var(--ivory)' : 'var(--ink)',
    minWidth: size + 8, ...style,
  }}>{children}</span>
);

// ============================================================================
// Eyebrow / Meta: uppercase kickers
// ============================================================================
export const Eyebrow = ({ children, color = 'var(--terracotta)', style = {} }) => (
  <div style={{
    font: '500 11px/1.4 var(--font-ui)', letterSpacing: '0.14em',
    textTransform: 'uppercase', color, ...style,
  }}>{children}</div>
);

// ============================================================================
// PrimaryButton: terracotta or ink CTA pill
// ============================================================================
export const PrimaryButton = ({ children, accent = true, size = 'lg', style = {}, ...rest }) => {
  const sizes = {
    md: { padding: '11px 20px', font: '500 13px/1 var(--font-ui)' },
    lg: { padding: '15px 26px', font: '500 15px/1 var(--font-ui)' },
  };
  return (
    <button {...rest} style={{
      background: accent ? 'var(--terracotta)' : 'var(--ink)',
      color: 'var(--ivory)', border: 'none', borderRadius: 999,
      cursor: 'pointer', letterSpacing: '-0.005em',
      transition: 'transform 120ms var(--ease-default), filter 120ms var(--ease-default)',
      ...sizes[size], ...style,
    }}
    onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.98)'; }}
    onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
    onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
    >
      {children}
    </button>
  );
};

export const SecondaryButton = ({ children, color = 'var(--sepia)', style = {}, ...rest }) => (
  <button {...rest} style={{
    background: 'transparent', color, border: 'none',
    font: '400 14px/1 var(--font-ui)', padding: '13px 18px',
    borderRadius: 999, cursor: 'pointer', ...style,
  }}>{children}</button>
);

// ============================================================================
// PulseOrb: the listening pulse, used in HUD + hero
// ============================================================================
export const PulseOrb = ({ size = 28, intensity = 1, style = {} }) => (
  <div style={{
    width: size, height: size, borderRadius: '50%',
    background: 'var(--product-accent)',
    animation: `echoe-pulse ${1.4 / intensity}s ease-out infinite`,
    flexShrink: 0, position: 'relative', ...style,
  }} />
);

export const Waveform = ({ barColor = 'var(--ivory)' }) => (
  <div style={{
    position: 'absolute', top: '50%', left: '50%',
    transform: 'translate(-50%,-50%)', display: 'flex', gap: 2, alignItems: 'center',
  }}>
    {[5, 9, 12, 7, 10].map((h, i) => (
      <div key={i} style={{
        width: 2, height: h, background: barColor, borderRadius: 1,
        animation: `hud-wave-anim 0.9s ease-in-out infinite`,
        animationDelay: `${i * 0.1}s`, transformOrigin: 'center',
      }} />
    ))}
  </div>
);

// ============================================================================
// AppTile: gradient placeholders for app brand marks
// ============================================================================
export const AppTile = ({ kind = 'whatsapp', size = 14, style = {} }) => {
  const grads = {
    slack:    'linear-gradient(135deg, #E01E5A, #36C5F0)',
    mail:     'linear-gradient(135deg, #1F8FFF, #82C2FF)',
    whatsapp: 'linear-gradient(135deg, #25D366, #128C7E)',
    notion:   'linear-gradient(135deg, #1C1A15, #6B5D42)',
    gmail:    'linear-gradient(135deg, #EA4335, #FBBC05)',
    chatgpt:  'linear-gradient(135deg, #10A37F, #1C1A15)',
  };
  return (
    <div style={{
      width: size, height: size, borderRadius: Math.max(2, size / 4),
      background: grads[kind] || grads.whatsapp, flexShrink: 0, ...style,
    }} />
  );
};

// ============================================================================
// HUD: the floating 320×80 listening overlay, used in hero + demo
// ============================================================================
export const HUD = ({
  state = 'listening', pair = 'हिंदी → Roman', metaRight = '0:03',
  title = null, body = null, scale = 1, style = {},
}) => {
  let orb, defaultTitle = '';
  switch (state) {
    case 'listening':
      defaultTitle = 'Listening.';
      orb = (
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <PulseOrb size={28} />
          <div style={{ position: 'absolute', inset: 0 }}><Waveform /></div>
        </div>
      );
      break;
    case 'transforming':
      defaultTitle = 'Transforming…';
      orb = (
        <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--parchment)', border: '0.5px solid var(--hairline-stronger)', position: 'relative', flexShrink: 0 }}>
          <div style={{
            position: 'absolute', inset: 4, borderRadius: '50%',
            border: '1.5px solid var(--ink)', borderTopColor: 'transparent', borderRightColor: 'transparent',
            animation: 'echoe-spin 0.9s linear infinite',
          }} />
        </div>
      );
      break;
    case 'inserted':
      defaultTitle = 'Inserted.';
      orb = (
        <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ivory)', font: '500 14px/1 var(--font-ui)', flexShrink: 0 }}>✓</div>
      );
      break;
    case 'error':
      defaultTitle = 'Our end hit a hiccup.';
      orb = (
        <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--muted-red)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ivory)', font: '700 14px/1 var(--font-ui)', flexShrink: 0 }}>!</div>
      );
      break;
    default:
      defaultTitle = state;
      orb = <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--ink)', flexShrink: 0 }} />;
  }
  const finalTitle = title ?? defaultTitle;

  return (
    <div style={{
      width: 320, minHeight: 80, padding: '0 18px',
      background: 'rgba(245,241,232,0.92)',
      backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
      border: '0.5px solid var(--hairline)', borderRadius: 14,
      boxShadow: '0 8px 28px rgba(28,26,21,0.14), 0 2px 6px rgba(28,26,21,0.06)',
      display: 'flex', alignItems: 'center', gap: 14,
      transform: `scale(${scale})`, transformOrigin: 'top left',
      transition: 'all 200ms var(--ease-default)',
      ...style,
    }}>
      {orb}
      <div style={{ flex: 1, minWidth: 0, padding: '14px 0' }}>
        <div style={{ font: '500 13px/1.3 var(--font-ui)', color: 'var(--ink)', marginBottom: 2 }}>{finalTitle}</div>
        {body ? (
          <div style={{ font: '400 12px/1.4 var(--font-ui)', color: 'var(--sepia)' }}>{body}</div>
        ) : (
          <div style={{ display: 'flex', gap: 6, alignItems: 'center', font: '400 11px/1 var(--font-ui)', color: 'var(--sepia)' }}>
            <span style={{ color: 'var(--terracotta)', textTransform: 'uppercase', letterSpacing: '0.12em', fontSize: 10, fontWeight: 500 }}>{pair}</span>
            <span>· {metaRight}</span>
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// useInView: intersection observer hook for reveal animations
// ============================================================================
export const useInView = (ref, { once = true, margin = '-10% 0px' } = {}) => {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setInView(true);
        if (once) io.unobserve(el);
      } else if (!once) {
        setInView(false);
      }
    }, { rootMargin: margin });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, once, margin]);
  return inView;
};

// ============================================================================
// useTypewriter: types out a string char-by-char with humanized cadence
// ============================================================================
export const useTypewriter = (fullText, { speed = 28, pauseAt = [], play = true, onDone } = {}) => {
  const [shown, setShown] = useState('');
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (!play) { setShown(''); setDone(false); return; }
    setShown(''); setDone(false);
    let i = 0; let cancelled = false;
    const tick = () => {
      if (cancelled) return;
      if (i >= fullText.length) {
        setDone(true);
        onDone?.();
        return;
      }
      i += 1;
      setShown(fullText.slice(0, i));
      const ch = fullText[i - 1];
      let extra = 0;
      if (ch === ',' || ch === '·' || ch === ';') extra = 90;
      if (ch === '.' || ch === '!' || ch === '?') extra = 180;
      if (pauseAt.includes(i)) extra = 240;
      setTimeout(tick, speed + extra + Math.random() * 18);
    };
    const t = setTimeout(tick, 250);
    return () => { cancelled = true; clearTimeout(t); };
  }, [fullText, play, speed]);
  return { shown, done };
};

// ============================================================================
// Card: flat parchment card, the only "card" pattern in Echoe
// ============================================================================
export const Card = ({ children, tinted = false, style = {} }) => (
  <div style={{
    background: tinted ? 'var(--tint-terracotta-fill)' : 'var(--ivory)',
    border: `0.5px solid ${tinted ? 'var(--tint-terracotta-border)' : 'var(--hairline-stronger)'}`,
    borderRadius: 14, padding: 28, ...style,
  }}>{children}</div>
);
