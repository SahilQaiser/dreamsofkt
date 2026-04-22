'use client'

import { useEffect, useRef, useState } from 'react'

const CARD_W = 380
const CARD_H = 240
const GAP    = 12
const GRID_W = CARD_W * 2 + GAP
const GRID_H = CARD_H * 2 + GAP

// Centre of the container — stacked cards live here
const CX = GRID_W / 2 - CARD_W / 2   // 194
const CY = GRID_H / 2 - CARD_H / 2   // 126

const VARIANT_KEYS = ['dreams', 'thoughts', 'memories', 'legacy']

const CARDS = [
  {
    key: 'dreams',    label: 'Dreams',   eyebrow: 'Aerial Cinematography',
    bg:  'linear-gradient(145deg,#0a1628 0%,#0d3a5e 70%,#050608 100%)',
    accent: '#38bdf8',
    dx: 0,   dy: 0,   dr: -4,  col: 0, row: 0, delay: 0,
  },
  {
    key: 'thoughts',  label: 'Thoughts', eyebrow: 'Aerial Essays',
    bg:  'linear-gradient(145deg,#12121a 0%,#3b1f8c 70%,#0d0d12 100%)',
    accent: '#a78bfa',
    dx: 12,  dy: 10,  dr: 3,   col: 1, row: 0, delay: 60,
  },
  {
    key: 'memories',  label: 'Memories', eyebrow: 'Aerial Gallery',
    bg:  'linear-gradient(145deg,#130f0a 0%,#7c4a0a 70%,#0c0805 100%)',
    accent: '#f59e0b',
    dx: -10, dy: 18,  dr: -2,  col: 0, row: 1, delay: 120,
  },
  {
    key: 'legacy',    label: 'Legacy',   eyebrow: 'Aerial Archive',
    bg:  'linear-gradient(145deg,#0e1018 0%,#1e2d45 70%,#080a0f 100%)',
    accent: '#cbd5e1',
    dx: 18,  dy: 22,  dr: 3.5, col: 1, row: 1, delay: 180,
  },
]

function getBaseHost(host: string) {
  const parts = host.split('.')
  return VARIANT_KEYS.includes(parts[0]) ? parts.slice(1).join('.') : host
}

export default function FlavorSwitcher() {
  const sectionRef  = useRef<HTMLElement>(null)
  const [hrefs,     setHrefs]     = useState<Record<string, string>>({})
  const [triggered, setTriggered] = useState(false)

  // Build subdomain hrefs on the client
  useEffect(() => {
    const base  = getBaseHost(window.location.host)
    const proto = window.location.protocol
    setHrefs(Object.fromEntries(VARIANT_KEYS.map(v => [v, `${proto}//${v}.${base}`])))
  }, [])

  // Trigger grid animation when section is 30% visible
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTriggered(true); observer.disconnect() } },
      { threshold: 0.3 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{ background: 'var(--color-void)', padding: '112px 0', overflow: 'hidden' }}
    >
      <div className="container">

        {/* Heading */}
        <div style={{ textAlign: 'center', marginBottom: '72px' }}>
          <span className="eyebrow" style={{ marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
            Four Universes
          </span>
          <h2 style={{ color: 'var(--color-snow)' }}>
            Choose your{' '}
            <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 300, color: 'var(--color-sky)' }}>
              perspective
            </span>
          </h2>
        </div>

        {/* Card grid — fixed size, centred */}
        <div style={{ position: 'relative', width: GRID_W, height: GRID_H, margin: '0 auto' }}>
          {CARDS.map((card, i) => {
            const gridX  = card.col * (CARD_W + GAP)
            const gridY  = card.row * (CARD_H + GAP)
            // Stacked: all cards piled at centre, with per-card offsets
            const stackX = CX + card.dx
            const stackY = CY + card.dy
            const stackS = 1 - i * 0.03   // 1.00 / 0.97 / 0.94 / 0.91
            const stackZ = CARDS.length - i

            return (
              <a
                key={card.key}
                href={hrefs[card.key] ?? '#'}
                style={{
                  position: 'absolute',
                  top: 0, left: 0,
                  width: CARD_W, height: CARD_H,
                  borderRadius: 14,
                  background: card.bg,
                  border: '1px solid rgba(255,255,255,0.08)',
                  textDecoration: 'none',
                  display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                  padding: '20px 24px',
                  overflow: 'hidden',
                  willChange: 'transform, opacity',
                  zIndex: triggered ? i + 1 : stackZ,
                  opacity: triggered ? 1 : (i === 0 ? 1 : 0.9 - i * 0.1),
                  transform: triggered
                    ? `translate(${gridX}px,${gridY}px) rotate(0deg) scale(1)`
                    : `translate(${stackX}px,${stackY}px) rotate(${card.dr}deg) scale(${stackS})`,
                  transition: triggered
                    ? `transform 0.75s cubic-bezier(0.34,1.4,0.64,1) ${card.delay}ms,
                       opacity   0.5s  ease                          ${card.delay}ms`
                    : 'none',
                }}
                onMouseEnter={e => {
                  if (!triggered) return
                  e.currentTarget.style.borderColor  = card.accent + '55'
                  e.currentTarget.style.boxShadow    = `0 0 40px ${card.accent}22`
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor  = 'rgba(255,255,255,0.08)'
                  e.currentTarget.style.boxShadow    = 'none'
                }}
              >
                {/* Accent glow */}
                <div style={{
                  position: 'absolute', top: '15%', right: '15%',
                  width: 140, height: 140, borderRadius: '50%',
                  background: card.accent, opacity: 0.1, filter: 'blur(50px)',
                  pointerEvents: 'none',
                }} />

                <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.18em', color: card.accent, textTransform: 'uppercase', marginBottom: 10, opacity: 0.8 }}>
                  {card.eyebrow}
                </p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 32, fontWeight: 300, color: 'var(--color-snow)', lineHeight: 1 }}>
                    {card.label}
                  </span>
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 600, color: card.accent, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    KT
                  </span>
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
