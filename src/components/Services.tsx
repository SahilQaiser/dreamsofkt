const services = [
  {
    number: '01',
    title: 'Aerial Cinematography',
    description:
      'Feature films, documentaries, music videos, and branded content — crafted with cinema-grade colour science and professional-grade drones.',
    features: ['RAW & Log footage', 'DJI Mavic 3 Pro / Inspire 3', '4K HDR up to 120fps', 'LUT-matched delivery'],
    accent: 'var(--color-sky)',
  },
  {
    number: '02',
    title: 'Real Estate & Architecture',
    description:
      'Luxury property showcases, architectural surveys, and site documentation that sells vision before a single brick is laid.',
    features: ['Twilight & golden hour shots', 'Virtual fly-through edits', 'Still photography included', 'Same-week turnaround'],
    accent: 'var(--color-amber)',
  },
  {
    number: '03',
    title: 'Events & Live Coverage',
    description:
      'Weddings, concerts, motorsport, and extreme sports. Real-time aerial perspective that ground cameras can\'t touch.',
    features: ['Multi-drone coordination', 'Live downlink monitoring', 'ISO & event permits handled', 'Crowd-safe operations'],
    accent: 'var(--color-sky)',
  },
  {
    number: '04',
    title: 'Post-Production & Colour',
    description:
      'Already have raw drone footage? I grade, stabilize, cut, and score it — transforming raw files into a cinematic story.',
    features: ['DaVinci Resolve grade', 'Gyroflow stabilization', 'Sync-to-music editing', 'Subtitling & captions'],
    accent: 'var(--color-amber)',
  },
]

export default function Services() {
  return (
    <section
      id="services"
      style={{
        background: 'var(--color-void)',
        paddingTop: '112px',
        paddingBottom: '112px',
      }}
    >
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '56px' }}>
          <span className="eyebrow" style={{ marginBottom: '20px', display: 'flex' }}>
            Services
          </span>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              flexWrap: 'wrap',
              gap: '24px',
            }}
          >
            <h2 style={{ color: 'var(--color-snow)', maxWidth: '420px' }}>
              What I{' '}
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontStyle: 'italic',
                  fontWeight: 300,
                  color: 'var(--color-amber)',
                }}
              >
                bring
              </span>{' '}
              to every project
            </h2>
            <p
              style={{
                maxWidth: '340px',
                fontSize: '14px',
                lineHeight: 1.75,
                color: 'var(--color-mist)',
              }}
            >
              From pre-flight planning to final delivery — fully managed aerial
              production, anywhere in the world.
            </p>
          </div>
        </div>

        {/* Grid */}
        <div className="services-grid">
          {services.map((s) => (
            <div key={s.number} className="service-card">
              {/* Number + accent line */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '24px',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontStyle: 'italic',
                    fontSize: '13px',
                    color: s.accent,
                    opacity: 0.7,
                    letterSpacing: '0.04em',
                  }}
                >
                  {s.number}
                </span>
                <div
                  style={{
                    flex: 1,
                    height: '1px',
                    background: s.accent,
                    opacity: 0.2,
                  }}
                />
              </div>

              <h3
                style={{
                  color: 'var(--color-snow)',
                  marginBottom: '14px',
                  fontWeight: 500,
                }}
              >
                {s.title}
              </h3>

              <p
                style={{
                  fontSize: '14px',
                  lineHeight: 1.7,
                  color: 'var(--color-mist)',
                  marginBottom: '24px',
                }}
              >
                {s.description}
              </p>

              {/* Feature list */}
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', listStyle: 'none' }}>
                {s.features.map((f) => (
                  <li
                    key={f}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      fontSize: '12px',
                      color: 'var(--color-snow)',
                      opacity: 0.7,
                    }}
                  >
                    <span
                      style={{
                        width: '5px',
                        height: '5px',
                        borderRadius: '50%',
                        background: s.accent,
                        flexShrink: 0,
                        opacity: 0.8,
                      }}
                    />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
