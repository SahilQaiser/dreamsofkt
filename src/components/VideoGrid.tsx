'use client'

import { useState } from 'react'
import type { VideoItem } from '@/types/content'

function getBackground(v: VideoItem): string {
  if (v.type === 'gradient') return v.src
  return 'var(--color-surface)'
}

function getBackgroundImage(v: VideoItem): string | undefined {
  if (v.type === 'youtube' && v.src) {
    const thumb = v.thumbnail || `https://img.youtube.com/vi/${v.src}/maxresdefault.jpg`
    return `url(${thumb})`
  }
  if (v.type === 'r2' && v.thumbnail) return `url(${v.thumbnail})`
  return undefined
}

export default function VideoGrid({ videos }: { videos: VideoItem[] }) {
  const [playingId, setPlayingId] = useState<string | null>(null)
  const sorted = [...videos].sort((a, b) => a.order - b.order)
  const canPlay = (v: VideoItem) => (v.type === 'youtube' || v.type === 'r2') && !!v.src

  return (
    <section
      id="work"
      style={{
        background: 'var(--color-void)',
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
              Portfolio
            </span>
            <h2 style={{ color: 'var(--color-snow)' }}>
              The world{' '}
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontStyle: 'italic',
                  fontWeight: 300,
                  color: 'var(--color-sky)',
                }}
              >
                from above
              </span>
            </h2>
          </div>
          <a href="#contact" className="btn-rim">
            Inquire about a project
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        {/* Grid */}
        <div className="video-grid">
          {sorted.map((v, i) => (
            <div
              key={v.id}
              className={`video-card${v.wide ? ' video-card-wide' : ''}`}
              onClick={canPlay(v) && playingId !== v.id ? () => setPlayingId(v.id) : undefined}
              style={{ cursor: canPlay(v) && playingId !== v.id ? 'pointer' : 'default' }}
            >
              <div
                style={{
                  width: '100%',
                  aspectRatio: v.wide ? '21/9' : '4/3',
                  position: 'relative',
                  background: getBackground(v),
                  backgroundImage: getBackgroundImage(v),
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                {/* ── Inline player ── */}
                {playingId === v.id && (
                  <>
                    {v.type === 'youtube' ? (
                      <iframe
                        src={`https://www.youtube.com/embed/${v.src}?autoplay=1&rel=0&modestbranding=1`}
                        allow="autoplay; fullscreen"
                        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
                      />
                    ) : (
                      <video
                        autoPlay
                        controls
                        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                      >
                        <source src={v.src} type="video/mp4" />
                      </video>
                    )}
                    <button
                      onClick={(e) => { e.stopPropagation(); setPlayingId(null) }}
                      aria-label="Stop video"
                      style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        zIndex: 10,
                        width: '30px',
                        height: '30px',
                        borderRadius: '50%',
                        background: 'rgba(5,6,8,0.7)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        color: 'rgba(255,255,255,0.85)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        backdropFilter: 'blur(4px)',
                        fontSize: '13px',
                        lineHeight: 1,
                      }}
                    >
                      ✕
                    </button>
                  </>
                )}

                {/* ── Thumbnail overlay (hidden when playing) ── */}
                {playingId !== v.id && (
                  <>
                    <div className="video-card-overlay">
                      <div className="play-ring">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="white">
                          <path d="M3 2l9 5-9 5V2z" />
                        </svg>
                      </div>
                    </div>

                    {/* Duration */}
                    <span
                      style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        fontSize: '10px',
                        fontWeight: 600,
                        letterSpacing: '0.08em',
                        color: 'rgba(241,245,249,0.55)',
                        background: 'rgba(5,6,8,0.45)',
                        backdropFilter: 'blur(4px)',
                        padding: '3px 8px',
                        borderRadius: '100px',
                      }}
                    >
                      {v.duration}
                    </span>

                    {/* Index */}
                    <span
                      style={{
                        position: 'absolute',
                        top: '12px',
                        left: '14px',
                        fontFamily: 'var(--font-display)',
                        fontStyle: 'italic',
                        fontSize: '11px',
                        color: 'rgba(241,245,249,0.25)',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    {/* Bottom info */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        padding: '28px 16px 14px',
                        background: 'linear-gradient(transparent, rgba(5,6,8,0.75))',
                      }}
                    >
                      <p style={{ fontSize: '13px', fontWeight: 500, color: 'var(--color-snow)', marginBottom: '4px' }}>
                        {v.title}
                      </p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '10px', color: 'rgba(56,189,248,0.6)', fontWeight: 500, letterSpacing: '0.06em' }}>
                          {v.location}
                        </span>
                        {v.tags.map((tag) => (
                          <span
                            key={tag}
                            style={{ fontSize: '9px', fontWeight: 600, letterSpacing: '0.1em', color: 'rgba(241,245,249,0.3)', textTransform: 'uppercase' }}
                          >
                            · {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
