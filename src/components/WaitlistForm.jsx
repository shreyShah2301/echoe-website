import { useState } from 'react';
import { joinWaitlist } from '../lib/supabase.js';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function WaitlistForm({ source = 'hero', onDark = false, ctaLabel = 'Get early access' }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [errorKind, setErrorKind] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    if (status === 'submitting') return;

    const trimmed = email.trim();
    if (!EMAIL_RE.test(trimmed)) {
      setStatus('error');
      setErrorKind('invalid');
      return;
    }

    setStatus('submitting');
    setErrorKind(null);
    const result = await joinWaitlist({ email: trimmed, source });
    if (result.ok) {
      setStatus('success');
    } else {
      setStatus('error');
      setErrorKind(result.error === 'invalid' ? 'invalid' : 'network');
    }
  }

  const inputBg = onDark ? 'rgba(245,241,232,0.08)' : '#FFFFFF';
  const inputBorder = onDark ? 'rgba(245,241,232,0.25)' : 'var(--hairline-stronger)';
  const inputColor = onDark ? 'var(--ivory)' : 'var(--ink)';
  const btnBg = 'var(--terracotta)';
  const btnColor = 'var(--ivory)';
  const helperColor = onDark ? 'rgba(245,241,232,0.65)' : 'var(--sepia)';

  if (status === 'success') {
    return (
      <div id="waitlist" style={{
        display: 'inline-flex', alignItems: 'center', gap: 12,
        padding: '14px 18px',
        background: onDark ? 'rgba(15,110,86,0.18)' : 'var(--tint-success-fill)',
        border: `0.5px solid ${onDark ? 'rgba(245,241,232,0.2)' : 'var(--tint-terracotta-border)'}`,
        borderRadius: 12,
        font: '400 14px/1.5 var(--font-ui)', color: onDark ? 'var(--ivory)' : 'var(--ink)',
      }}>
        <span style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: 20, height: 20, borderRadius: '50%',
          background: 'var(--success-green)', color: 'var(--ivory)',
          font: '500 12px/1 var(--font-ui)',
        }}>✓</span>
        <span>Got it. We'll email you when Echoe ships.</span>
      </div>
    );
  }

  return (
    <form id="waitlist" onSubmit={handleSubmit} style={{
      display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center',
      maxWidth: 460,
    }}>
      <input
        type="email"
        inputMode="email"
        autoComplete="email"
        required
        placeholder="you@email.com"
        value={email}
        onChange={(e) => { setEmail(e.target.value); if (status === 'error') setStatus('idle'); }}
        disabled={status === 'submitting'}
        className={onDark ? 'echoe-waitlist-input on-dark' : 'echoe-waitlist-input'}
        style={{
          flex: '1 1 220px', minWidth: 220,
          padding: '14px 16px',
          background: inputBg,
          border: `1px solid ${inputBorder}`,
          borderRadius: 999,
          font: '400 15px/1 var(--font-ui)',
          color: inputColor,
          outline: 'none',
          transition: 'border-color 120ms var(--ease-default)',
        }}
        onFocus={(e) => { e.currentTarget.style.borderColor = onDark ? 'var(--ivory)' : 'var(--ink)'; }}
        onBlur={(e) => { e.currentTarget.style.borderColor = inputBorder; }}
        aria-label="Email address"
      />
      <button type="submit" disabled={status === 'submitting'} style={{
        background: btnBg, color: btnColor, border: 'none', borderRadius: 999,
        padding: '14px 24px',
        font: '500 15px/1 var(--font-ui)', letterSpacing: '-0.005em',
        cursor: status === 'submitting' ? 'wait' : 'pointer',
        opacity: status === 'submitting' ? 0.7 : 1,
        transition: 'transform 120ms var(--ease-default), opacity 120ms var(--ease-default)',
        flexShrink: 0,
      }}
      onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.98)'; }}
      onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
      >
        {status === 'submitting' ? 'Adding you…' : ctaLabel}
      </button>
      {status === 'error' && (
        <div style={{
          flexBasis: '100%', font: '400 13px/1.5 var(--font-ui)', color: helperColor, marginTop: 2,
        }}>
          {errorKind === 'invalid'
            ? "That doesn't look like an email address."
            : "Our end hit a hiccup. Try again?"}
        </div>
      )}
    </form>
  );
}
