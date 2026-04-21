const stats = [
  {
    value: '180+',
    label: 'Hours of footage',
    suffix: 'hrs',
    accent: 'var(--color-amber)',
  },
  {
    value: '40+',
    label: 'Countries visited',
    suffix: 'nations',
    accent: 'var(--color-sky)',
  },
  {
    value: '120+',
    label: 'Projects delivered',
    suffix: 'films',
    accent: 'var(--color-amber)',
  },
  {
    value: '7',
    label: 'Years airborne',
    suffix: 'yrs',
    accent: 'var(--color-sky)',
  },
]

export default function Stats() {
  return (
    <section
      style={{
        background: 'var(--color-deep)',
        borderTop: '1px solid var(--color-rim)',
        borderBottom: '1px solid var(--color-rim)',
        paddingTop: '80px',
        paddingBottom: '80px',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '0',
          }}
        >
          {stats.map((s, i) => (
            <div
              key={s.label}
              style={{
                padding: '0 40px',
                borderLeft: i > 0 ? '1px solid var(--color-rim)' : 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontStyle: 'italic',
                    fontSize: 'clamp(40px, 5vw, 64px)',
                    fontWeight: 300,
                    color: s.accent,
                    lineHeight: 1,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {s.value}
                </span>
              </div>
              <p
                style={{
                  fontSize: '11px',
                  fontWeight: 500,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--color-mist)',
                }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
