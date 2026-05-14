import { EchoeMark } from './Shared.jsx';
import { FooterEN } from './Rest.jsx';

const Mono = ({ children }) => (
  <code style={{
    font: '400 13px/1.4 var(--font-mono)',
    background: 'var(--parchment)',
    border: '0.5px solid var(--hairline-stronger)',
    borderRadius: 4,
    padding: '2px 7px',
    color: 'var(--ink)',
  }}>{children}</code>
);

const SectionHead = ({ children }) => (
  <h2 style={{
    margin: '52px 0 0',
    font: '500 22px/1.3 var(--font-ui)',
    letterSpacing: '-0.02em',
    color: 'var(--ink)',
  }}>{children}</h2>
);

const Body = ({ children }) => (
  <p style={{
    margin: '14px 0 0',
    font: '400 16px/1.7 var(--font-ui)',
    color: 'var(--sepia)',
    textWrap: 'pretty',
  }}>{children}</p>
);

const THIRD_PARTIES = [
  {
    service: 'Sarvam AI',
    purpose: 'Speech-to-text',
    data: "Audio for transcription. Per Sarvam's policy: audio is processed in real-time and not stored, never used for model training, and all data processed within India with no cross-border transfers.",
    link: 'https://www.sarvam.ai/privacy-policy',
  },
  {
    service: 'Anthropic Claude',
    purpose: 'Text polish and formatting',
    data: "Transcript text only. Per Anthropic's API terms: never used for model training. API requests are automatically deleted after 7 days.",
    link: 'https://platform.claude.com/docs/en/build-with-claude/api-and-data-retention',
  },
  {
    service: 'Vercel Analytics',
    purpose: 'Page analytics',
    data: 'Aggregate page views, browser type, country (via IP), referrer. No cookies, no fingerprinting, no user-level tracking.',
    link: 'https://vercel.com/legal/privacy-policy',
  },
];

const PrivacyNav = () => (
  <header style={{
    position: 'sticky', top: 0, zIndex: 50,
    background: 'rgba(245,241,232,0.92)',
    backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
    borderBottom: '0.5px solid var(--hairline)',
  }}>
    <div className="container" style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64,
    }}>
      <a href="/" style={{ textDecoration: 'none' }}>
        <EchoeMark height={32} />
      </a>
      <a href="/" style={{
        font: '400 14px/1 var(--font-ui)', color: 'var(--sepia)', textDecoration: 'none',
      }}>← Home</a>
    </div>
  </header>
);

export default function PrivacyPage() {
  return (
    <>
      <PrivacyNav />
      <section style={{ background: 'var(--ivory)', padding: '80px 0 120px' }}>
        <div className="container" style={{ maxWidth: 720 }}>

          <div className="eyebrow">Privacy</div>
          <h1 style={{
            margin: '16px 0 0',
            font: '500 clamp(32px, 4.5vw, 52px)/1.06 var(--font-ui)',
            letterSpacing: '-0.03em', color: 'var(--ink)', textWrap: 'balance',
          }}>
            What Echoe stores, and where.
          </h1>
          <p style={{
            marginTop: 20,
            font: '400 17px/1.7 var(--font-ui)', color: 'var(--sepia)', textWrap: 'pretty',
          }}>
            The short version: your dictation text lives on your Mac and nowhere else.
            We have no way to read what you've dictated — not even for our own beta testers.
          </p>
          <p style={{
            marginTop: 14,
            font: '400 14px/1.6 var(--font-ui)', color: 'var(--dust)',
          }}>
            This policy applies to the Echoe Mac application and echoeapp.com.
          </p>

          <SectionHead>Audio</SectionHead>
          <Body>
            Audio is briefly stored on our servers for up to one hour to enable retries
            and quality monitoring, then automatically deleted by an hourly cleanup process.
            We never read its contents — it exists only to be processed by Sarvam AI, our
            speech-to-text provider. Per Sarvam's policy, the audio they receive is processed
            in real-time and not retained.
          </Body>

          <SectionHead>Your dictations</SectionHead>
          <Body>
            The transcript and polished output are returned to your Mac in the HTTP response
            and written to a local database at:
          </Body>
          <div style={{ margin: '16px 0 0', paddingLeft: 2 }}>
            <Mono>~/Library/Application Support/Echoe/echoe.sqlite</Mono>
          </div>
          <Body>
            Only your macOS user account can read this file. There is no sync to our servers,
            no cloud backup, and no way for us to access your dictation history remotely.
          </Body>

          <SectionHead>What our server logs</SectionHead>
          <Body>Each dictation writes one metadata row to our database:</Body>
          <ul style={{
            margin: '14px 0 0', paddingLeft: 22,
            font: '400 16px/1.9 var(--font-ui)', color: 'var(--sepia)',
          }}>
            <li>Timestamp</li>
            <li>Audio duration</li>
            <li>Language detected</li>
            <li>Processing time (ms)</li>
            <li>Success or failure, with an error code if applicable</li>
          </ul>
          <Body>
            The transcript and polished text are never written to our database. If you delete
            the Echoe app, your local history goes with it. Our server log remains, but it
            contains nothing about what you said.
          </Body>

          <SectionHead>Third-party services</SectionHead>
          <div style={{
            marginTop: 16,
            border: '0.5px solid var(--hairline-stronger)',
            borderRadius: 10, overflow: 'hidden',
          }}>
            {THIRD_PARTIES.map(({ service, purpose, data, link }, i) => (
              <div key={service} style={{
                padding: '16px 20px',
                borderBottom: i < THIRD_PARTIES.length - 1 ? '0.5px solid var(--hairline)' : 'none',
              }}>
                <div style={{ font: '500 14px/1.2 var(--font-ui)', color: 'var(--ink)' }}>
                  {service}
                  <span style={{ font: '400 13px/1 var(--font-ui)', color: 'var(--sepia)', marginLeft: 8 }}>
                    · {purpose}
                  </span>
                </div>
                <div style={{ marginTop: 5, font: '400 13px/1.5 var(--font-ui)', color: 'var(--sepia)' }}>
                  {data}{' '}
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--terracotta)', textDecoration: 'none', whiteSpace: 'nowrap' }}
                  >
                    Learn more →
                  </a>
                </div>
              </div>
            ))}
          </div>

          <SectionHead>Your rights</SectionHead>
          <Body>
            You can delete your local dictation history at any time from Settings → Privacy &amp; data.
            This permanently removes all records from your device. To request deletion of server
            metadata — which contains no dictation content — email us and we'll handle it manually.
            We will delete what is technically possible to delete. Some records may be retained where
            required by law (e.g., billing records for tax purposes) for the minimum legally-required
            period.
          </Body>

          <SectionHead>Changes to this policy</SectionHead>
          <Body>
            Material changes to this policy will be communicated to active users via email at least
            seven days before taking effect.
          </Body>

          <SectionHead>Questions</SectionHead>
          <Body>
            Email us at{' '}
            <a href="mailto:developer@echoeapp.com" style={{ color: 'var(--terracotta)', textDecoration: 'none' }}>
              developer@echoeapp.com
            </a>.
          </Body>

          <p style={{ marginTop: 56, font: '400 13px/1.5 var(--font-ui)', color: 'var(--dust)' }}>
            Effective: May 2026 · Last updated: May 2026
          </p>

        </div>
      </section>
      <FooterEN />
    </>
  );
}
