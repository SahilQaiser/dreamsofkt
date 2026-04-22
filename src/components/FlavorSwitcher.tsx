'use client'

import { useEffect, useRef } from 'react'

const CARD_W = 380
const CARD_H = 240
const GAP = 20
const GRID_W = CARD_W * 2 + GAP
const GRID_H = CARD_H * 2 + GAP
const CX = GRID_W / 2 - CARD_W / 2  // center x = 190
const CY = GRID_H / 2 - CARD_H / 2  // center y = 130

const CARDS = [
  {
    key: 'dreams',
    label: 'Dreams',
    eyebrow: 'Aerial Cinematography',
    href: '/?variant=dreams',
    bg: 'linear-gradient(145deg, #0a1628 0%, #0d3a5e 70%, #050608 100%)',
    accent: '#38bdf8',
    sx: -8, sy: -12, sr: -4,
    col: 0, row: 0,
  },
  {
    key: 'thoughts',
    label: 'Thoughts',
    eyebrow: 'Aerial Essays',
    href: '/?variant=thoughts',
    bg: 'linear-gradient(145deg, #12121a 0%, #3b1f8c 70%, #0d0d12 100%)',
    accent: '#a78bfa',
    sx: 16, sy: -18, sr: 4,
    col: 1, row: 0,
  },
  {
    key: 'memories',
    label: 'Memories',
    eyebrow: 'Aerial Gallery',
    href: '/?variant=memories',
    bg: 'linear-gradient(145deg, #130f0a 0%, #7c4a0a 70%, #0c0805 100%)',
    accent: '#f59e0b',
    sx: -14, sy: 18, sr: -2,
    col: 0, row: 1,
  },
  {
    key: 'legacy',
    label: 'Legacy',
    eyebrow: 'Aerial Archive',
    href: '/?variant=legacy',
    bg: 'linear-gradient(145deg, #0e1018 0%, #1e2d45 70%, #080a0f 100%)',
    accent: '#cbd5e1',
    sx: 20, sy: 10, sr: 3,
    col: 1, row: 1,
  },
]

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

export default function FlavorSwitcher() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const update = () => {
      const rect = section.getBoundingClientRect()
      const scrollRange = section.offsetHeight - window.innerHeight
      const scrolled = -rect.top
      const p = easeInOut(Math.min(1, Math.max(0, scrolled / scrollRange)))

      CARDS.forEach((card, i) => {
        const el = cardRefs.current[i]
        if (!el) return

        const gx = card.col * (CARD_W + GAP)
        const gy = card.row * (CARD_H + GAP)
        const x = lerp(CX + card.sx, gx, p)
        const y = lerp(CY + card.sy, gy, p)
        const r = lerp(card.sr, 0, p)

        el.style.transform = `translate(${x}px, ${y}px) rotate(${r}deg)`
        el.style.zIndex = String(p > 0.5 ? i + 1 : CARDS.length - i)
      })
    }

    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{ height: '300vh', background: 'var(--color-void)' }}
    >
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          gap: '48px',
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center' }}>
          <span className="eyebrow" style={{ marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
            Four Universes
          </span>
          <h2 style={{ color: 'var(--color-snow)' }}>
            Choose your{' '}
            <span style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontWeight: 300,
              color: 'var(--color-sky)',
            }}>
              perspective
            </span>
          </h2>
        </div>

        {/* Cards */}
        <div style={{ position: 'relative', width: GRID_W, height: GRID_H }}>
          {CARDS.map((card, i) => (
            <a
              key={card.key}
              href={card.href}
              ref={el => { cardRefs.current[i] = el }}
              style={{
                position: 'absolute',
                width: CARD_W,
                height: CARD_H,
                borderRadius: 14,
                background: card.bg,
                border: '1px solid rgba(255,255,255,0.08)',
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '20px 24px',
                overflow: 'hidden',
                willChange: 'transform',
                transform: `translate(${CX + card.sx}px, ${CY + card.sy}px) rotate(${card.sr}deg)`,
                cursor: 'pointer',
                transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = card.accent + '44'
                e.currentTarget.style.boxShadow = `0 0 40px ${card.accent}22`
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {/* Accent glow */}
              <div style={{
                position: 'absolute',
                top: '15%', right: '15%',
                width: 140, height: 140,
                borderRadius: '50%',
                background: card.accent,
                opacity: 0.1,
                filter: 'blur(50px)',
                pointerEvents: 'none',
              }} />

              {/* Content */}
              <p style={{
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: '0.18em',
                color: card.accent,
                textTransform: 'uppercase',
                marginBottom: 10,
                opacity: 0.8,
              }}>
                {card.eyebrow}
              </p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontStyle: 'italic',
                  fontSize: 32,
                  fontWeight: 300,
                  color: 'var(--color-snow)',
                  lineHeight: 1,
                }}>
                  {card.label}
                </span>
                <span style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 13,
                  fontWeight: 600,
                  color: card.accent,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}>
                  KT
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
