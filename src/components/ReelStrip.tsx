import type { VideoItem } from '@/types/content'

function getThumbnail(v: VideoItem): string | undefined {
  if (v.type === 'youtube' && v.src)
    return v.thumbnail || `https://img.youtube.com/vi/${v.src}/maxresdefault.jpg`
  if (v.type === 'r2' && v.thumbnail) return v.thumbnail
  return undefined
}

export default function ReelStrip({ videos }: { videos: VideoItem[] }) {
  const items = videos.length ? videos : []
  const DOUBLED = [...items, ...items]

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
        {DOUBLED.map((v, i) => {
          const thumb = getThumbnail(v)
          return (
            <a
              key={i}
              href="#work"
              style={{
                display: 'block',
                width: '220px',
                height: '130px',
                borderRadius: '10px',
                background: v.type === 'gradient' ? v.src : 'var(--color-surface)',
                backgroundImage: thumb ? `url(${thumb})` : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                flexShrink: 0,
                position: 'relative',
                overflow: 'hidden',
                textDecoration: 'none',
                cursor: 'pointer',
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
                  {v.title}
                </p>
              </div>
            </a>
          )
        })}
      </div>
    </div>
  )
}
