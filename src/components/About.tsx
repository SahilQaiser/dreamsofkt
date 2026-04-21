export default function About() {
  return (
    <section
      id="about"
      style={{
        background: 'var(--color-void)',
        paddingTop: '120px',
        paddingBottom: '120px',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'flex',
            gap: '80px',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
          }}
        >
          {/* ── Left: portrait area ── */}
          <div style={{ flex: '0 0 360px', position: 'relative' }}>
            {/* Gradient portrait placeholder */}
            <div
              style={{
                width: '100%',
                aspectRatio: '3/4',
                borderRadius: '16px',
                background: 'linear-gradient(160deg, #0d2a4a 0%, #050608 100%)',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              {/* Subtle silhouette */}
              <svg
                style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)' }}
                width="200" height="280" viewBox="0 0 200 280" fill="none"
              >
                <circle cx="100" cy="80" r="52" fill="rgba(56,189,248,0.06)" />
                <ellipse cx="100" cy="240" rx="90" ry="60" fill="rgba(56,189,248,0.04)" />
              </svg>
              {/* Amber glow */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '-20px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '200px',
                  height: '200px',
                  borderRadius: '50%',
                  background: 'var(--color-amber)',
                  opacity: 0.04,
                  filter: 'blur(40px)',
                }}
              />
              {/* Label overlay */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '20px',
                  left: '20px',
                  right: '20px',
                  padding: '16px',
                  background: 'rgba(5,6,8,0.7)',
                  borderRadius: '10px',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid var(--color-rim)',
                }}
              >
                <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-snow)', marginBottom: '2px' }}>KT</p>
                <p style={{ fontSize: '11px', color: 'var(--color-mist)', letterSpacing: '0.06em' }}>Aerial Cinematographer · Dubai, UAE</p>
              </div>
            </div>

            {/* Floating stat card */}
            <div
              style={{
                position: 'absolute',
                top: '24px',
                right: '-20px',
                background: 'var(--color-surface)',
                border: '1px solid var(--color-rim-2)',
                borderRadius: '12px',
                padding: '16px 20px',
                backdropFilter: 'blur(8px)',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontStyle: 'italic',
                  fontSize: '36px',
                  fontWeight: 300,
                  color: 'var(--color-amber)',
                  lineHeight: 1,
                }}
              >
                7+
              </p>
              <p style={{ fontSize: '11px', color: 'var(--color-mist)', marginTop: '4px', whiteSpace: 'nowrap' }}>Years airborne</p>
            </div>
          </div>

          {/* ── Right: bio ── */}
          <div style={{ flex: '1 1 300px', paddingTop: '12px' }}>
            <span className="eyebrow" style={{ marginBottom: '28px', display: 'flex' }}>
              About the filmmaker
            </span>

            <h2 style={{ marginBottom: '28px', color: 'var(--color-snow)' }}>
              Every frame is a{' '}
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontStyle: 'italic',
                  fontWeight: 300,
                  color: 'var(--color-sky)',
                }}
              >
                decision.
              </span>
            </h2>

            <p
              style={{
                fontSize: '15px',
                lineHeight: 1.75,
                color: 'var(--color-mist)',
                marginBottom: '20px',
              }}
            >
              I'm KT — a drone cinematographer obsessed with light, altitude, and
              the stories only visible from above. Seven years ago I picked up my
              first controller over the cliffs of Oman. I haven't come down since.
            </p>
            <p
              style={{
                fontSize: '15px',
                lineHeight: 1.75,
                color: 'var(--color-mist)',
                marginBottom: '40px',
              }}
            >
              My work has taken me across 40+ countries — from sub-zero Icelandic
              glaciers to 50°C desert dunes — always chasing the golden hour, the
              perfect arc, the frame that makes people stop scrolling.
            </p>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <a href="#work" className="btn-amber">
                View the portfolio
              </a>
              <a href="#contact" className="btn-rim">
                Book a shoot
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
