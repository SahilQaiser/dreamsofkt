'use client'

import { useRef, useEffect, useState } from 'react'
import type { HeroSettings } from '@/types/content'

const LOCATIONS = [
  'NORWAY', 'ICELAND', 'SANTORINI', 'TOKYO',
  'MALDIVES', 'SWISS ALPS', 'SAHARA', 'AMAZON',
  'DUBAI', 'BALI', 'PATAGONIA', 'FJORDS',
]
const TICKS = Array(6).fill(LOCATIONS).flat()

export default function VideoHero({ hero }: { hero?: HeroSettings }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [muted, setMuted] = useState(true)

  useEffect(() => {
    videoRef.current?.play().catch(() => {})
  }, [])

  const toggleMute = () => {
    if (!videoRef.current) return
    videoRef.current.muted = !videoRef.current.muted
    setMuted(videoRef.current.muted)
  }

  return (
    <section
      style={{
        position: 'relative',
        height: '100svh',
        minHeight: '600px',
        overflow: 'hidden',
        background: 'var(--color-void)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* ── Background video ── */}
      {hero?.type === 'youtube' ? (
        <iframe
          src={`https://www.youtube.com/embed/${hero.src}?autoplay=1&mute=1&loop=1&playlist=${hero.src}&controls=0&rel=0&showinfo=0&modestbranding=1`}
          allow="autoplay; fullscreen"
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            border: 'none',
            opacity: 0.55,
            pointerEvents: 'none',
          }}
        />
      ) : (
        <video
          ref={videoRef}
          muted
          autoPlay
          loop
          playsInline
          poster=""
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.55,
          }}
        >
          {hero?.type === 'r2' && hero.src && (
            <source src={hero.src} type="video/mp4" />
          )}
        </video>
      )}

      {/* ── Cinematic gradient overlay ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            linear-gradient(to bottom,
              rgba(5,6,8,0.55) 0%,
              rgba(5,6,8,0.15) 40%,
              rgba(5,6,8,0.15) 60%,
              rgba(5,6,8,0.80) 100%)
          `,
          zIndex: 1,
        }}
      />

      {/* ── Placeholder gradient (shows when no video) ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(ellipse 120% 80% at 60% 40%,
              #0d2a4a 0%, #081428 50%, #050608 100%)
          `,
          zIndex: 0,
        }}
      />

      {/* ── Main content ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 3,
          textAlign: 'center',
          padding: '0 24px',
          userSelect: 'none',
        }}
      >
        {/* Eyebrow */}
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--color-sky)',
            marginBottom: '32px',
          }}
        >
          Aerial Cinematography & Drone Videography
        </p>

        {/* Display title */}
        <h1>
          <span
            className="display-italic"
            style={{
              display: 'block',
              fontSize: 'clamp(80px, 14vw, 200px)',
              color: 'var(--color-snow)',
              textShadow: '0 4px 40px rgba(0,0,0,0.5)',
            }}
          >
            Dreams
          </span>
          <span
            style={{
              display: 'block',
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(22px, 4vw, 56px)',
              fontWeight: 300,
              letterSpacing: '0.5em',
              color: 'rgba(241,245,249,0.55)',
              textTransform: 'uppercase',
              marginTop: '-8px',
            }}
          >
            of&nbsp;
            <span
              style={{
                color: 'var(--color-amber)',
                fontWeight: 600,
                letterSpacing: '0.1em',
              }}
            >
              KT
            </span>
          </span>
        </h1>

        {/* Sub copy */}
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '14px',
            color: 'rgba(241,245,249,0.45)',
            marginTop: '28px',
            letterSpacing: '0.04em',
          }}
        >
          The world from above — captured, not just filmed.
        </p>

        {/* CTA row */}
        <div
          style={{
            display: 'flex',
            gap: '14px',
            justifyContent: 'center',
            marginTop: '40px',
            flexWrap: 'wrap',
          }}
        >
          <a href="#reel" className="btn-amber">Watch the reel</a>
          <a href="#work" className="btn-rim">Browse work</a>
        </div>
      </div>

      {/* ── Mute toggle ── */}
      <button
        onClick={toggleMute}
        aria-label={muted ? 'Unmute video' : 'Mute video'}
        style={{
          position: 'absolute',
          bottom: '36px',
          right: '44px',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(5,6,8,0.5)',
          border: '1px solid var(--color-rim-2)',
          borderRadius: '1000px',
          padding: '8px 14px',
          color: 'var(--color-mist)',
          fontSize: '11px',
          fontFamily: 'var(--font-sans)',
          fontWeight: 500,
          letterSpacing: '0.06em',
          cursor: 'pointer',
          backdropFilter: 'blur(8px)',
          transition: 'color 0.3s ease, border-color 0.3s ease',
        }}
      >
        {muted ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </svg>
        )}
        {muted ? 'SOUND OFF' : 'SOUND ON'}
      </button>

      {/* ── Scroll indicator ── */}
      <a
        href="#locations"
        aria-label="Scroll to next section"
        className="scroll-btn"
        style={{
          position: 'absolute',
          bottom: '36px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 3v10M3 9l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>

      {/* ── Location ticker strip ── */}
      <div
        id="locations"
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          borderTop: '1px solid rgba(56,189,248,0.1)',
          overflow: 'hidden',
          zIndex: 5,
        }}
      >
        <div className="marquee-track" style={{ gap: '48px', padding: '10px 0' }}>
          {[...TICKS, ...TICKS].map((loc, i) => (
            <span
              key={i}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '0.22em',
                color: 'rgba(56,189,248,0.35)',
                whiteSpace: 'nowrap',
              }}
            >
              {loc}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
