const reels = [
  { title: 'Norwegian Fjords',   gradient: 'linear-gradient(135deg,#0d3348 0%,#0d6e6e 100%)' },
  { title: 'Santorini Sunrise',  gradient: 'linear-gradient(135deg,#7c2d12 0%,#f97316 100%)' },
  { title: 'Tokyo at Dusk',      gradient: 'linear-gradient(135deg,#1e1b4b 0%,#7c3aed 100%)' },
  { title: 'Sahara Dunes',       gradient: 'linear-gradient(135deg,#92400e 0%,#fbbf24 100%)' },
  { title: 'Icelandic Highlands',gradient: 'linear-gradient(135deg,#1e3a5f 0%,#6366f1 100%)' },
  { title: 'Maldives Atolls',    gradient: 'linear-gradient(135deg,#0369a1 0%,#38bdf8 100%)' },
  { title: 'Amazon Canopy',      gradient: 'linear-gradient(135deg,#14532d 0%,#4ade80 100%)' },
  { title: 'Swiss Alps',         gradient: 'linear-gradient(135deg,#1e3a5f 0%,#bfdbfe 100%)' },
  { title: 'Dubai Skyline',      gradient: 'linear-gradient(135deg,#1c1917 0%,#d97706 100%)' },
  { title: 'Bali Temples',       gradient: 'linear-gradient(135deg,#431407 0%,#fb923c 100%)' },
]
const DOUBLED = [...reels, ...reels]

export default function ReelStrip() {
  return (
    <div
      style={{
        background: 'var(--color-deep)',
        borderTop: '1px solid var(--color-rim)',
        borderBottom: '1px solid var(--color-rim)',
        overflow: 'hidden',
        padding: '24px 0',
      }}
    >
      <div className="reel-track">
        {DOUBLED.map((r, i) => (
          <div
            key={i}
            style={{
              width: '220px',
              height: '130px',
              borderRadius: '10px',
              background: r.gradient,
              flexShrink: 0,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Play icon */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%,-50%)',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="white">
                <path d="M3 2l7 4-7 4V2z" />
              </svg>
            </div>
            {/* Title */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '20px 12px 10px',
                background: 'linear-gradient(transparent, rgba(0,0,0,0.6))',
              }}
            >
              <p
                style={{
                  fontSize: '11px',
                  fontWeight: 500,
                  color: 'rgba(255,255,255,0.85)',
                  letterSpacing: '0.04em',
                }}
              >
                {r.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
