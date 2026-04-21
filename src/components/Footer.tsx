const NAV = ['Work', 'About', 'Services', 'Contact']
const SOCIAL = [
  { label: 'Instagram', href: '#' },
  { label: 'YouTube', href: '#' },
  { label: 'Vimeo', href: '#' },
  { label: 'LinkedIn', href: '#' },
]

export default function Footer() {
  return (
    <footer
      style={{
        background: 'var(--color-deep)',
        borderTop: '1px solid var(--color-rim)',
        paddingTop: '72px',
        paddingBottom: '40px',
      }}
    >
      <div className="container">
        {/* Top row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: '48px',
            marginBottom: '64px',
          }}
        >
          {/* Wordmark + tagline */}
          <div>
            <a
              href="#"
              style={{
                display: 'inline-flex',
                alignItems: 'baseline',
                gap: '6px',
                marginBottom: '16px',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontStyle: 'italic',
                  fontSize: '28px',
                  fontWeight: 300,
                  color: 'var(--color-snow)',
                  letterSpacing: '0.01em',
                }}
              >
                Dreams of
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '16px',
                  fontWeight: 600,
                  color: 'var(--color-amber)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                KT
              </span>
            </a>
            <p
              style={{
                fontSize: '13px',
                lineHeight: 1.7,
                color: 'var(--color-mist)',
                maxWidth: '260px',
              }}
            >
              Aerial cinematography & drone videography.
              <br />
              Dubai-based. Worldwide.
            </p>
          </div>

          {/* Nav + Social */}
          <div
            style={{
              display: 'flex',
              gap: '80px',
              flexWrap: 'wrap',
            }}
          >
            <div>
              <p
                style={{
                  fontSize: '10px',
                  fontWeight: 600,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'var(--color-haze)',
                  marginBottom: '20px',
                }}
              >
                Navigate
              </p>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', listStyle: 'none' }}>
                {NAV.map((item) => (
                  <li key={item}>
                    <a href={`#${item.toLowerCase()}`} className="footer-link">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p
                style={{
                  fontSize: '10px',
                  fontWeight: 600,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'var(--color-haze)',
                  marginBottom: '20px',
                }}
              >
                Follow
              </p>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', listStyle: 'none' }}>
                {SOCIAL.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} className="footer-link">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'var(--color-rim)', marginBottom: '28px' }} />

        {/* Bottom row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <p
            style={{
              fontSize: '11px',
              color: 'var(--color-haze)',
              letterSpacing: '0.04em',
            }}
          >
            © {new Date().getFullYear()} Dreams of KT. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '24px' }}>
            {['Privacy policy', 'Terms of use'].map((t) => (
              <a key={t} href="#" className="footer-link" style={{ fontSize: '11px' }}>
                {t}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
