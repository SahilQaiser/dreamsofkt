'use client'

import { useEffect, useState } from 'react'

const links = ['Work', 'About', 'Services', 'Contact']

export default function Navbar({ wordmark = 'Dreams of' }: { wordmark?: string }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <header
      className={scrolled ? 'nav-wrap' : ''}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: '0 44px',
        transition: 'background 0.5s ease, border-color 0.5s ease',
        background: scrolled ? undefined : 'transparent',
        borderBottom: scrolled ? undefined : '1px solid transparent',
      }}
    >
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Wordmark */}
        <a href="#" style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontSize: '20px',
              fontWeight: 300,
              color: 'var(--color-snow)',
              letterSpacing: '0.01em',
            }}
          >
            {wordmark}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '14px',
              fontWeight: 600,
              color: 'var(--color-amber)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            KT
          </span>
        </a>

        {/* Links */}
        <nav style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          {links.map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="nav-link">
              {l}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a
          href="#contact"
          className="btn-amber"
          style={{ padding: '9px 20px', fontSize: '12px' }}
        >
          Book a shoot
        </a>
      </div>
    </header>
  )
}
