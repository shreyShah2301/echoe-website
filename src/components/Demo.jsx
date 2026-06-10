// Echoe Landing EN: Demo (WhatsApp / Gmail / Slack / ChatGPT)

import { useState, useEffect, useRef } from 'react';
import { AppTile, PulseOrb, HUD, useInView, useTypewriter } from './Shared.jsx';

const SCENARIOS_EN = [
  {
    id: 'whatsapp-vendor',
    app: 'whatsapp', appName: 'WhatsApp',
    title: 'Vendor chat',
    subtitle: 'Rohit · Supplier',
    pair: 'Hinglish · kept',
    spoken: "Rohit bhai, Tuesday ka order confirm hai but quantity 200 se 350 kar do. Invoice mujhe kal subah tak bhej dena, payment Friday ko clear ho jayegi.",
    output: "Rohit bhai, Tuesday ka order confirm hai but quantity 200 se 350 kar do. Invoice mujhe kal subah tak bhej dena, payment Friday ko clear ho jayegi.",
  },
  {
    id: 'gmail-investor',
    app: 'gmail', appName: 'Gmail',
    title: 'Investor follow-up',
    subtitle: 'Re: Series A check-in',
    pair: 'EN · polished',
    spoken: "Hey Anand, thanks for the call yesterday. Quick recap. We're at 2.3 cr ARR, growing 18 percent month over month. The two open questions you had on burn and on the design hire, I'll send a doc by Friday. Also wanted to flag that we're closing a small bridge before the main round.",
    output: "Hi Anand,\n\nThanks for the call yesterday. Quick recap of where we are:\n\n- ARR: ₹2.3 Cr, growing 18% MoM\n- Two open questions you raised on burn runway and the design hire. I'll send a doc on both by Friday\n- One heads-up: we're closing a small bridge before the main round\n\nMore soon.",
  },
  {
    id: 'slack-pm',
    app: 'slack', appName: 'Slack',
    title: 'Standup update',
    subtitle: '#product-launch',
    pair: 'EN · clean-up',
    spoken: "Quick update on the launch. We're slipping two days because the analytics integration ka one webhook is firing twice. Shrey is on it, should land EOD tomorrow. Going to send the comms team a heads up.",
    output: "Quick update on the launch. We're slipping by two days because one webhook in the analytics integration is firing twice. Shrey is on it; should land by EOD tomorrow. I'll send the comms team a heads-up.",
  },
  {
    id: 'chatgpt-prompt',
    app: 'chatgpt', appName: 'ChatGPT',
    title: 'Quick prompt',
    subtitle: 'Hinglish to AI prompt',
    pair: 'Hinglish → EN',
    spoken: "Yaar mujhe ek email likhna hai client ko, deadline miss ho gayi, do din late hain. Casual but professional rakhna, aur ek follow-up plan bhi suggest kar dena.",
    output: "Draft a casual but professional email to a client. We missed a deadline by two days. Apologize for the delay and suggest a short follow-up plan.",
  },
];

const SlackPanel = ({ scenario, phase, typed }) => {
  const showText = phase === 'typing' || phase === 'settled';
  return (
    <div style={{
      width: '100%', maxWidth: 600, background: '#FFFFFF',
      border: '0.5px solid var(--hairline-stronger)', borderRadius: 12,
      overflow: 'hidden', boxShadow: '0 12px 40px rgba(28,26,21,0.10)',
    }}>
      <div style={{
        height: 44, padding: '0 16px',
        borderBottom: '0.5px solid var(--hairline)', background: '#FAFAF7',
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <span style={{ color: 'var(--dust)', font: '500 14px var(--font-mono)' }}>#</span>
        <span style={{ font: '500 13px/1 var(--font-ui)', color: 'var(--ink)' }}>{scenario.subtitle.replace('#','')}</span>
        <div style={{ flex: 1 }} />
        <AppTile kind="slack" size={14} />
      </div>
      <div style={{ padding: '20px 16px 12px', minHeight: 180 }}>
        <div style={{ display: 'flex', gap: 10 }}>
          <div style={{ width: 30, height: 30, borderRadius: 6, background: 'var(--sepia)', flexShrink: 0, display:'flex', alignItems:'center', justifyContent:'center', color:'var(--ivory)', font:'600 12px var(--font-ui)' }}>P</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 2 }}>
              <span style={{ font: '600 13px/1.2 var(--font-ui)', color: 'var(--ink)' }}>Priya</span>
              <span style={{ font: '400 11px/1 var(--font-ui)', color: 'var(--dust)' }}>10:38 AM</span>
            </div>
            <div style={{ font: '400 14px/1.55 var(--font-ui)', color: 'var(--ink)' }}>
              hey what's the launch ETA looking like? need to lock the comms calendar today
            </div>
          </div>
        </div>
      </div>
      <div style={{ padding: '12px 16px 16px', borderTop: '0.5px solid var(--hairline)' }}>
        <div style={{
          border: `1px solid ${phase === 'typing' || phase === 'settled' ? 'var(--ink)' : 'var(--hairline-stronger)'}`,
          borderRadius: 8, padding: '10px 12px',
          font: '400 14px/1.55 var(--font-ui)', color: 'var(--ink)',
          minHeight: 56, transition: 'border-color 200ms',
        }}>
          {phase === 'idle' && <span style={{ color: 'var(--dust)' }}>Message #{scenario.subtitle.replace('#','')}</span>}
          {phase === 'listening' && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><PulseOrb size={10} /><span style={{ color: 'var(--product-accent)', font: '500 10px/1 var(--font-ui)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Listening</span></span>}
          {phase === 'transforming' && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><div style={{ width: 10, height: 10, borderRadius: '50%', border: '1.5px solid var(--ink)', borderTopColor: 'transparent', animation: 'echoe-spin 0.9s linear infinite' }} /><span style={{ color: 'var(--ink)', font: '400 12px/1 var(--font-ui)' }}>Transforming…</span></span>}
          {showText && <span style={{ whiteSpace: 'pre-wrap' }}>{typed}{phase === 'typing' && <span className="typing-caret" />}</span>}
        </div>
      </div>
    </div>
  );
};

const WhatsAppPanel = ({ scenario, phase, typed }) => {
  const showText = phase === 'typing' || phase === 'settled';
  return (
    <div style={{
      width: '100%', maxWidth: 600, background: '#ECE5DD',
      border: '0.5px solid var(--hairline-stronger)', borderRadius: 12,
      overflow: 'hidden', boxShadow: '0 12px 40px rgba(28,26,21,0.10)',
    }}>
      <div style={{
        padding: '12px 16px',
        background: '#075E54', color: '#FFFFFF',
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', font: '600 12px var(--font-ui)' }}>R</div>
        <div style={{ flex: 1 }}>
          <div style={{ font: '500 14px/1.2 var(--font-ui)' }}>Rohit · Supplier</div>
          <div style={{ font: '400 11px/1.2 var(--font-ui)', opacity: 0.7 }}>online</div>
        </div>
        <AppTile kind="whatsapp" size={14} />
      </div>
      <div style={{ padding: '20px 16px', minHeight: 200, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{
          alignSelf: 'flex-start', maxWidth: '78%',
          background: '#FFFFFF', borderRadius: '12px 12px 12px 2px',
          padding: '8px 12px', font: '400 14px/1.45 var(--font-ui)', color: 'var(--ink)',
          boxShadow: '0 1px 0.5px rgba(0,0,0,0.13)',
        }}>
          Order Tuesday ke liye theek hai bhai, kitna chahiye?
          <div style={{ font: '400 10px/1 var(--font-ui)', color: '#888', textAlign: 'right', marginTop: 4 }}>10:42</div>
        </div>
      </div>
      <div style={{ padding: '10px 12px', background: '#F0F0F0', borderTop: '0.5px solid rgba(0,0,0,0.08)' }}>
        <div style={{
          background: '#FFFFFF', borderRadius: 18, padding: '10px 14px',
          font: '400 14px/1.45 var(--font-ui)', color: 'var(--ink)',
          minHeight: 38, display: 'flex', alignItems: 'center',
          border: `1px solid ${showText ? 'var(--ink)' : 'transparent'}`,
          transition: 'border-color 200ms',
        }}>
          {phase === 'idle' && <span style={{ color: '#999' }}>Type a message</span>}
          {phase === 'listening' && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><PulseOrb size={10} /><span style={{ color: 'var(--product-accent)', font: '500 10px/1 var(--font-ui)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Listening</span></span>}
          {phase === 'transforming' && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><div style={{ width: 10, height: 10, borderRadius: '50%', border: '1.5px solid var(--ink)', borderTopColor: 'transparent', animation: 'echoe-spin 0.9s linear infinite' }} /><span style={{ color: 'var(--ink)', font: '400 12px/1 var(--font-ui)' }}>Transforming…</span></span>}
          {showText && <span style={{ whiteSpace: 'pre-wrap' }}>{typed}{phase === 'typing' && <span className="typing-caret" />}</span>}
        </div>
      </div>
    </div>
  );
};

const GmailPanel = ({ scenario, phase, typed }) => {
  const showText = phase === 'typing' || phase === 'settled';
  return (
    <div style={{
      width: '100%', maxWidth: 600, background: '#FFFFFF',
      border: '0.5px solid var(--hairline-stronger)', borderRadius: 12,
      overflow: 'hidden', boxShadow: '0 12px 40px rgba(28,26,21,0.10)',
    }}>
      <div style={{ padding: '14px 18px', borderBottom: '0.5px solid var(--hairline)', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ flex: 1 }}>
          <div style={{ font: '500 14px/1.3 var(--font-ui)', color: 'var(--ink)', marginBottom: 4 }}>Re: Series A check-in</div>
          <div style={{ font: '400 12px/1.4 var(--font-ui)', color: 'var(--sepia)' }}>To: <span style={{ color: 'var(--ink)' }}>Anand · Lightspeed</span></div>
        </div>
        <AppTile kind="gmail" size={14} />
      </div>
      <div style={{ padding: '20px 20px', minHeight: 240, font: '400 14px/1.6 var(--font-ui)', color: showText ? 'var(--ink)' : 'var(--dust)', whiteSpace: 'pre-wrap' }}>
        {phase === 'idle' && <span>Compose your reply…</span>}
        {phase === 'listening' && <><PulseOrb size={12} style={{ display:'inline-block', verticalAlign:'middle', marginRight:8 }} /><span style={{ color: 'var(--product-accent)', font: '500 11px/1 var(--font-ui)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Listening · {scenario.pair}</span></>}
        {phase === 'transforming' && <span style={{ color: 'var(--sepia)' }}>Polishing for an investor…</span>}
        {showText && <span>{typed}{phase === 'typing' && <span className="typing-caret" />}</span>}
      </div>
    </div>
  );
};

// ============================================================================
// ChatGPTPanel: prompt composer mock — text inserts into the message box.
// Header reads as "ChatGPT · 4o"; body has a soft prompt-coaching hint that
// fades when the user starts dictating.
// ============================================================================
const ChatGPTPanel = ({ scenario, phase, typed }) => {
  const showText = phase === 'typing' || phase === 'settled';
  return (
    <div style={{
      width: '100%', maxWidth: 600, background: '#FFFFFF',
      border: '0.5px solid var(--hairline-stronger)', borderRadius: 12,
      overflow: 'hidden', boxShadow: '0 12px 40px rgba(28,26,21,0.10)',
    }}>
      <div style={{
        padding: '14px 18px', borderBottom: '0.5px solid var(--hairline)',
        display: 'flex', alignItems: 'center', gap: 10, background: '#FAFAF7',
      }}>
        <AppTile kind="chatgpt" size={16} />
        <span style={{ font: '500 13px/1 var(--font-ui)', color: 'var(--ink)' }}>ChatGPT</span>
        <span style={{ font: '400 11px/1 var(--font-ui)', color: 'var(--dust)' }}>· 4o</span>
        <div style={{ flex: 1 }} />
        <span style={{ font: '400 11px/1 var(--font-ui)', color: 'var(--dust)' }}>New chat</span>
      </div>

      <div style={{
        padding: '32px 24px 16px', minHeight: 200,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{
          font: '500 16px/1.3 var(--font-ui)', color: 'var(--dust)',
          textAlign: 'center', maxWidth: 360,
        }}>
          What can I help with?
        </div>
      </div>

      <div style={{ padding: '12px 16px 16px', borderTop: '0.5px solid var(--hairline)' }}>
        <div style={{
          border: `1px solid ${showText ? 'var(--ink)' : 'var(--hairline-stronger)'}`,
          borderRadius: 12, padding: '12px 14px',
          font: '400 14px/1.55 var(--font-ui)', color: 'var(--ink)',
          minHeight: 56, transition: 'border-color 200ms',
          display: 'flex', alignItems: 'flex-start', gap: 10,
        }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            {phase === 'idle' && <span style={{ color: 'var(--dust)' }}>Message ChatGPT</span>}
            {phase === 'listening' && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <PulseOrb size={10} />
                <span style={{ color: 'var(--product-accent)', font: '500 10px/1 var(--font-ui)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Listening</span>
              </span>
            )}
            {phase === 'transforming' && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', border: '1.5px solid var(--ink)', borderTopColor: 'transparent', animation: 'echoe-spin 0.9s linear infinite' }} />
                <span style={{ color: 'var(--ink)', font: '400 12px/1 var(--font-ui)' }}>Cleaning up the prompt…</span>
              </span>
            )}
            {showText && (
              <span style={{ whiteSpace: 'pre-wrap' }}>
                {typed}{phase === 'typing' && <span className="typing-caret" />}
              </span>
            )}
          </div>
          {showText && (
            <div style={{
              width: 28, height: 28, borderRadius: '50%', background: 'var(--ink)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#FFFFFF', font: '500 14px/1 var(--font-ui)', flexShrink: 0,
            }}>↑</div>
          )}
        </div>
      </div>
    </div>
  );
};

const ScenarioPanel = ({ scenario, phase, typed }) => {
  if (scenario.id === 'whatsapp-vendor') return <WhatsAppPanel scenario={scenario} phase={phase} typed={typed} />;
  if (scenario.id === 'gmail-investor') return <GmailPanel scenario={scenario} phase={phase} typed={typed} />;
  if (scenario.id === 'slack-pm') return <SlackPanel scenario={scenario} phase={phase} typed={typed} />;
  return <ChatGPTPanel scenario={scenario} phase={phase} typed={typed} />;
};

const SpokenStripEN = ({ scenario, phase }) => {
  const visible = phase === 'listening' || phase === 'transforming';
  return (
    <div style={{
      maxWidth: 600, margin: '0 auto 16px',
      opacity: visible ? 1 : 0, height: visible ? 'auto' : 0, overflow: 'hidden',
      transition: 'opacity 240ms var(--ease-default)',
    }}>
      <div style={{
        background: 'var(--parchment)', border: '0.5px solid var(--hairline)',
        borderRadius: 12, padding: '14px 18px',
        display: 'flex', gap: 14, alignItems: 'flex-start',
      }}>
        <div style={{
          width: 28, height: 28, borderRadius: '50%', background: 'var(--ink)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <div style={{ display: 'flex', gap: 1.5 }}>
            {[5, 9, 12, 7, 10].map((h, i) => (
              <div key={i} style={{ width: 1.5, height: h, background: 'var(--ivory)', borderRadius: 1, animation: `hud-wave-anim 0.9s ease-in-out infinite`, animationDelay: `${i * 0.1}s` }} />
            ))}
          </div>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ font: '500 10px/1.4 var(--font-ui)', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--terracotta)', marginBottom: 4 }}>You said</div>
          <div style={{ font: '400 14px/1.55 var(--font-ui)', color: 'var(--ink)' }}>{scenario.spoken}</div>
        </div>
      </div>
    </div>
  );
};

export const DemoSectionEN = () => {
  const [scenarioId, setScenarioId] = useState(SCENARIOS_EN[0].id);
  const scenarioIndex = SCENARIOS_EN.findIndex(s => s.id === scenarioId);
  const scenario = SCENARIOS_EN[scenarioIndex];
  const [phase, setPhase] = useState('idle');
  const sectionRef = useRef(null);
  // once:false → we can pause the auto-advance carousel when it scrolls away.
  const inView = useInView(sectionRef, { once: false });
  const [hasPlayed, setHasPlayed] = useState(false);
  // auto-advance state. `auto` switches off permanently once the user picks a
  // scenario; `paused` is the transient hover/touch/focus hold; `swapped` gates
  // the crossfade so the prerendered first frame has no animation class; `dwell`
  // drives the active-tab progress bar during the 3s settled hold.
  const [auto, setAuto] = useState(true);
  const [paused, setPaused] = useState(false);
  const [swapped, setSwapped] = useState(false);
  const [dwell, setDwell] = useState(false);
  const tabRefs = useRef([]);

  const goToPhase = (id, idleToListen = 250) => {
    setScenarioId(id);
    setSwapped(true);
    setPhase('idle');
    setTimeout(() => setPhase('listening'), idleToListen);
  };

  useEffect(() => {
    if (!inView || phase !== 'idle' || hasPlayed) return;
    const t = setTimeout(() => { setHasPlayed(true); setPhase('listening'); }, 600);
    return () => clearTimeout(t);
  }, [inView, hasPlayed, phase]);

  useEffect(() => {
    if (phase === 'listening') {
      const t = setTimeout(() => setPhase('transforming'), 3200);
      return () => clearTimeout(t);
    }
    if (phase === 'transforming') {
      const t = setTimeout(() => setPhase('typing'), 1100);
      return () => clearTimeout(t);
    }
  }, [phase]);

  const { shown } = useTypewriter(scenario.output, {
    speed: 14, play: phase === 'typing',
    onDone: () => setPhase('settled'),
  });

  // Auto-advance: once a scenario settles, hold 3s (progress bar fills), then
  // move to the next. Disabled under reduced motion, while paused, after a manual
  // pick, or when the section is off-screen.
  useEffect(() => {
    if (phase !== 'settled' || !auto || paused || !inView ||
        (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches)) {
      setDwell(false);
      return;
    }
    setDwell(true);
    const t = setTimeout(() => {
      setDwell(false);
      const nextId = SCENARIOS_EN[(scenarioIndex + 1) % SCENARIOS_EN.length].id;
      goToPhase(nextId);
    }, 3000);
    return () => clearTimeout(t);
  }, [phase, auto, paused, inView, scenarioIndex]);

  const replay = () => {
    setAuto(false);
    setPhase('idle');
    setTimeout(() => setPhase('listening'), 200);
  };
  const change = (id) => {
    setAuto(false);
    goToPhase(id);
  };
  const onTabKeyDown = (e) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const dir = e.key === 'ArrowRight' ? 1 : -1;
    const ni = (scenarioIndex + dir + SCENARIOS_EN.length) % SCENARIOS_EN.length;
    change(SCENARIOS_EN[ni].id);
    tabRefs.current[ni]?.focus();
  };

  return (
    <section id="demo" ref={sectionRef} style={{ background: 'var(--parchment)' }}>
      <div className="container">
        <div className="reveal" style={{ maxWidth: 720 }}>
          <div className="eyebrow">One hotkey. Any app. Your thoughts in your language.</div>
          <h2 className="h2" style={{ marginTop: 14 }}>
            Pick a scenario. <span style={{ color: 'var(--terracotta)' }}>Watch it land.</span>
          </h2>
        </div>

        <div className="scenario-picker" role="tablist" aria-label="Demo scenarios">
          {SCENARIOS_EN.map((s, i) => {
            const on = s.id === scenarioId;
            return (
              <button
                key={s.id}
                ref={(el) => { tabRefs.current[i] = el; }}
                role="tab"
                aria-selected={on}
                tabIndex={on ? 0 : -1}
                onClick={() => change(s.id)}
                onKeyDown={onTabKeyDown}
                className={`scenario-btn ${on ? 'is-active' : ''}`}
                style={{ position: 'relative' }}
              >
                <div className="scenario-tag-row">
                  <AppTile kind={s.app} size={12} />
                  <span className={`scenario-app ${on ? 'is-active' : ''}`}>{s.appName}</span>
                </div>
                <span className="scenario-title">{s.title}</span>
                <span className="scenario-subtitle">{s.subtitle}</span>
                {on && <span className={`scenario-progress ${dwell ? 'is-running' : ''}`} aria-hidden="true" />}
              </button>
            );
          })}
        </div>

        <div
          style={{ marginTop: 36, padding: '40px 24px', background: 'var(--ivory)', border: '0.5px solid var(--hairline)', borderRadius: 16 }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
        >
          <SpokenStripEN scenario={scenario} phase={phase} />
          <div key={scenarioId} className={swapped ? 'scenario-swap' : undefined} style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
            <ScenarioPanel scenario={scenario} phase={phase} typed={phase === 'settled' ? scenario.output : shown} />
            <div style={{ position: 'absolute', right: 'min(8%, 60px)', top: -28, zIndex: 2 }}>
              <HUD
                state={phase === 'listening' ? 'listening' : phase === 'settled' ? 'inserted' : 'transforming'}
                pair={scenario.pair}
                metaRight={phase === 'settled' ? '✓' : '0:04'}
                title={phase === 'settled' ? 'Inserted.' : phase === 'listening' ? 'Listening.' : 'Transforming…'}
                style={{ width: 280, transform: 'scale(0.92)' }}
              />
            </div>
          </div>
          <div style={{ marginTop: 28, display: 'flex', justifyContent: 'center' }}>
            <button onClick={replay} style={{
              background: 'var(--ink)', color: 'var(--ivory)', border: 'none',
              borderRadius: 999, padding: '10px 20px', cursor: 'pointer',
              font: '500 13px/1 var(--font-ui)',
              display: 'inline-flex', alignItems: 'center', gap: 8,
            }}><span style={{ fontSize: 14 }}>↻</span> Play again</button>
          </div>
        </div>
      </div>
    </section>
  );
};
