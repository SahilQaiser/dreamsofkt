export default function TextHero() {
  return (
    <section
      style={{
        background: 'var(--color-void)',
        paddingTop: '160px',
        paddingBottom: '120px',
      }}
    >
      <div className="container">
        <span className="eyebrow" style={{ marginBottom: '24px', display: 'flex' }}>
          Aerial Cinematography
        </span>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: 'clamp(48px, 8vw, 96px)',
            lineHeight: 1.05,
            color: 'var(--color-snow)',
            maxWidth: '800px',
            marginBottom: '32px',
          }}
        >
          The world,{' '}
          <span style={{ color: 'var(--color-sky)' }}>written</span>
          {' '}from above
        </h1>
        <p
          style={{
            fontSize: '16px',
            lineHeight: 1.75,
            color: 'var(--color-mist)',
            maxWidth: '520px',
            marginBottom: '40px',
          }}
        >
          Drone cinematography across 40+ locations and 7 continents.
          Each frame a considered observation of landscape, light, and motion.
        </p>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <a href="#work" className="btn-rim">
            View portfolio
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a href="#reel" style={{ color: 'var(--color-sky)', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
            Watch showreel →
          </a>
        </div>
      </div>
    </section>
  )
}
