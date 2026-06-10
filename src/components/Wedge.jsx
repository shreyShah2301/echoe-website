// Echoe Landing EN: Wedge: "Hinglish stays Hinglish (if you want it)"

const WEDGE_OUTPUTS_EN = {
  echoe: {
    label: 'Echoe',
    subtitle: 'Hinglish, kept',
    text: "Bhai launch is slipping by two days because ek webhook is firing twice. Shrey is on it, EOD tomorrow ho jayega.",
    note: "We transcribe what you actually said. Hinglish stays Hinglish, English stays English. Filler is removed; meaning is preserved.",
    accent: 'var(--terracotta)',
  },
  others: {
    label: 'Others',
    subtitle: 'Auto-translated',
    text: "Brother, the launch is delayed by two days because a webhook is firing twice. Shrey is working on it; it will be done by end of day tomorrow.",
    note: "Auto-translation strips the texture out of how you actually talk. Sounds correct; reads like a stranger wrote it.",
    accent: 'var(--dust)',
  },
};

export const WedgeSectionEN = () => {
  return (
    <section id="how" style={{ background: 'var(--ivory)' }}>
      <div className="container">
        <div className="reveal" style={{ maxWidth: 720 }}>
          <div className="eyebrow">The wedge</div>
          <h2 className="h2" style={{ marginTop: 14 }}>
            Hinglish stays <span style={{ color: 'var(--terracotta)' }}>Hinglish</span>
            <span style={{
              font: '400 italic 0.5em/1.1 var(--font-ui)',
              color: 'var(--dust)', letterSpacing: '-0.01em',
              marginLeft: '0.35em', verticalAlign: 'middle',
            }}>(if you want it)</span><span>.</span>
          </h2>
          <p className="lede">
            Most dictation tools quietly translate you into stiff English. Echoe doesn't. If you said "ek webhook" you'll see "ek webhook", not "a webhook." Code-switching is how you actually talk; we keep it.
          </p>
        </div>

        <div style={{
          marginTop: 56, display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
          gap: 16, alignItems: 'stretch',
        }}>
          {Object.entries(WEDGE_OUTPUTS_EN).map(([key, opt]) => (
            <div key={key}
              className={`reveal ${key === 'echoe' ? 'wedge-elevated' : 'wedge-recessed'}`}
              style={{
                '--reveal-delay': key === 'echoe' ? '0ms' : '120ms',
                padding: '32px 32px',
                background: key === 'echoe' ? 'var(--tint-terracotta-fill)' : 'var(--parchment)',
                border: `0.5px solid ${key === 'echoe' ? 'var(--tint-terracotta-border)' : 'var(--hairline)'}`,
                borderRadius: 14, display: 'flex', flexDirection: 'column', gap: 18,
              }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span style={{ font: '500 16px/1 var(--font-ui)', color: 'var(--ink)' }}>{opt.label}</span>
                <span style={{ font: '500 11px/1 var(--font-ui)', letterSpacing: '0.12em', textTransform: 'uppercase', color: opt.accent }}>{opt.subtitle}</span>
              </div>
              <div style={{ font: '400 18px/1.55 var(--font-ui)', color: 'var(--ink)', letterSpacing: '-0.005em', textWrap: 'pretty', flex: 1 }}>
                "{opt.text}"
              </div>
              <div style={{
                paddingTop: 14, borderTop: `0.5px solid ${key === 'echoe' ? 'var(--tint-terracotta-border)' : 'var(--hairline)'}`,
                font: '400 13px/1.55 var(--font-ui)', color: 'var(--sepia)',
              }}>
                {opt.note}
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 28, font: '400 14px/1.6 var(--font-ui)', color: 'var(--sepia)', maxWidth: 720 }}>
          You can still flip an output to clean English when the audience demands it, bank emails, investor follow-ups, formal docs. Echoe learns per-app: Slack stays Hinglish, Gmail goes English, after about three dictations.
        </div>
      </div>
    </section>
  );
};
