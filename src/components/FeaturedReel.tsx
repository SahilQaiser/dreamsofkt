import type { ReelSettings } from '@/types/content'

export default function FeaturedReel({ reel }: { reel?: ReelSettings }) {
  const reelTitle = reel?.title || 'Dreams of KT'
  const reelSubtitle = reel?.subtitle || '40+ Locations · 7 Continents · 2024'
  const reelDuration = reel?.duration || '04:17'
  const reelHref = reel?.type === 'youtube' && reel.src
    ? `https://youtu.be/${reel.src}`
    : reel?.type === 'r2' && reel.src
    ? reel.src
    : undefined

  return (
    <section
      id="reel"
      style={{
        background: 'var(--color-deep)',
        paddingTop: '112px',
        paddingBottom: '112px',
      }}
    >
      <div className="container">
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '24px',
            marginBottom: '40px',
          }}
        >
          <div>
            <span className="eyebrow" style={{ marginBottom: '20px', display: 'flex' }}>
              Featured reel
            </span>
            <h2 style={{ color: 'var(--color-snow)' }}>
              2024 Showreel
            </h2>
          </div>
          <div
            style={{
              display: 'flex',
              gap: '16px',
              alignItems: 'center',
              paddingBottom: '4px',
            }}
          >
            {['4K', 'HDR', 'DJI Mavic 3 Pro'].map((tag) => (
              <span
                key={tag}
                style={{
                  padding: '4px 12px',
                  borderRadius: '1000px',
                  border: '1px solid var(--color-rim-2)',
                  fontSize: '11px',
                  fontWeight: 500,
                  color: 'var(--color-mist)',
                  letterSpacing: '0.06em',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Reel card */}
        <div className="reel-card" {...(reelHref ? { onClick: () => window.open(reelHref, '_blank') } : {})}>
          {/* Thumbnail gradient */}
          <div
            style={{
              width: '100%',
              aspectRatio: '21/9',
              background: `
                radial-gradient(ellipse 80% 60% at 60% 40%, #0d3a5e 0%, #050608 70%),
                linear-gradient(135deg, #050608 0%, #0a1628 100%)
              `,
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Atmospheric light */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: '20%',
                right: '25%',
                width: '300px',
                height: '300px',
                borderRadius: '50%',
                background: 'var(--color-amber)',
                opacity: 0.04,
                filter: 'blur(60px)',
              }}
            />
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                bottom: '10%',
                left: '15%',
                width: '400px',
                height: '200px',
                borderRadius: '50%',
                background: 'var(--color-sky)',
                opacity: 0.04,
                filter: 'blur(60px)',
              }}
            />

            {/* Duration label */}
            <span
              style={{
                position: 'absolute',
                top: '24px',
                left: '28px',
                fontSize: '11px',
                fontWeight: 600,
                color: 'rgba(241,245,249,0.4)',
                letterSpacing: '0.1em',
              }}
            >
              {reelDuration}
            </span>

            {/* Play button */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '20px',
              }}
            >
              <div className="reel-play-btn">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  style={{ marginLeft: '4px' }}
                >
                  <path d="M8 5l16 9-16 9V5z" fill="var(--color-void)" />
                </svg>
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.18em',
                  color: 'rgba(241,245,249,0.35)',
                  textTransform: 'uppercase',
                }}
              >
                Play showreel
              </p>
            </div>

            {/* Bottom bar */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '32px 28px 24px',
                background: 'linear-gradient(transparent, rgba(5,6,8,0.85))',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <p
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontStyle: 'italic',
                    fontSize: '28px',
                    fontWeight: 300,
                    color: 'var(--color-snow)',
                    lineHeight: 1,
                  }}
                >
                  {reelTitle}
                </p>
                <p style={{ fontSize: '11px', color: 'var(--color-mist)', marginTop: '4px' }}>
                  {reelSubtitle}
                </p>
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.15em',
                  color: 'var(--color-amber)',
                  textTransform: 'uppercase',
                }}
              >
                2024 REEL
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
