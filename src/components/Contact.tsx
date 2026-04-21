'use client'

import { useState } from 'react'

type Status = 'idle' | 'sending' | 'sent' | 'error'

const PROJECT_TYPES = [
  'Aerial Cinematography',
  'Real Estate / Architecture',
  'Event Coverage',
  'Post-Production / Editing',
  'Other',
]

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    project: '',
    location: '',
    message: '',
  })
  const [status, setStatus] = useState<Status>('idle')

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((p) => ({ ...p, [field]: e.target.value }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setStatus(res.ok ? 'sent' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section
      id="contact"
      style={{
        background: 'var(--color-void)',
        paddingTop: '112px',
        paddingBottom: '112px',
        borderTop: '1px solid var(--color-rim)',
      }}
    >
      <div className="container">
        <div className="contact-grid">
          {/* Left: intro */}
          <div>
            <span className="eyebrow" style={{ marginBottom: '28px', display: 'flex' }}>
              Let&apos;s work together
            </span>

            <h2 style={{ color: 'var(--color-snow)', marginBottom: '24px' }}>
              Book your{' '}
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontStyle: 'italic',
                  fontWeight: 300,
                  color: 'var(--color-amber)',
                }}
              >
                shoot
              </span>
            </h2>

            <p
              style={{
                fontSize: '15px',
                lineHeight: 1.75,
                color: 'var(--color-mist)',
                marginBottom: '40px',
              }}
            >
              Tell me about your project — where it is, what you&apos;re shooting, and
              when you need it. I&apos;ll get back within 24 hours with a quote and
              availability.
            </p>

            {/* Contact details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {[
                {
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  ),
                  label: 'Email',
                  value: 'hello@dreamsofkt.com',
                },
                {
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  ),
                  label: 'Base',
                  value: 'Dubai, UAE — available worldwide',
                },
                {
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  ),
                  label: 'Response time',
                  value: 'Within 24 hours',
                },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}
                >
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '8px',
                      border: '1px solid var(--color-rim-2)',
                      background: 'var(--color-surface)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-sky)',
                      flexShrink: 0,
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-mist)', marginBottom: '2px' }}>
                      {item.label}
                    </p>
                    <p style={{ fontSize: '13px', color: 'var(--color-snow)' }}>{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div
            style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-rim)',
              borderRadius: '20px',
              padding: '40px',
            }}
          >
            {status === 'sent' ? (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  padding: '60px 0',
                  gap: '16px',
                }}
              >
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background: 'rgba(245,158,11,0.12)',
                    border: '1px solid rgba(245,158,11,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-amber)',
                  }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 style={{ color: 'var(--color-snow)' }}>Message sent</h3>
                <p style={{ fontSize: '14px', color: 'var(--color-mist)', lineHeight: 1.65 }}>
                  Thanks for reaching out — I&apos;ll be in touch within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={submit}>
                <div className="contact-form-inner" style={{ marginBottom: '12px' }}>
                  <div>
                    <label
                      htmlFor="name"
                      style={{ display: 'block', fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-mist)', marginBottom: '6px' }}
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      className="form-input"
                      type="text"
                      placeholder="Your name"
                      value={form.name}
                      onChange={set('name')}
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      style={{ display: 'block', fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-mist)', marginBottom: '6px' }}
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      className="form-input"
                      type="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={set('email')}
                      required
                    />
                  </div>
                </div>

                <div className="contact-form-inner" style={{ marginBottom: '12px' }}>
                  <div>
                    <label
                      htmlFor="project"
                      style={{ display: 'block', fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-mist)', marginBottom: '6px' }}
                    >
                      Project type
                    </label>
                    <select
                      id="project"
                      className="form-input"
                      value={form.project}
                      onChange={set('project')}
                      style={{ appearance: 'none', cursor: 'pointer' }}
                    >
                      <option value="" disabled>Select type…</option>
                      {PROJECT_TYPES.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="location"
                      style={{ display: 'block', fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-mist)', marginBottom: '6px' }}
                    >
                      Shoot location
                    </label>
                    <input
                      id="location"
                      className="form-input"
                      type="text"
                      placeholder="City, Country"
                      value={form.location}
                      onChange={set('location')}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <label
                    htmlFor="message"
                    style={{ display: 'block', fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-mist)', marginBottom: '6px' }}
                  >
                    Tell me about your project
                  </label>
                  <textarea
                    id="message"
                    className="form-input"
                    rows={5}
                    placeholder="Dates, vision, deliverables…"
                    value={form.message}
                    onChange={set('message')}
                    required
                    style={{ resize: 'none' }}
                  />
                </div>

                {status === 'error' && (
                  <p style={{ fontSize: '12px', color: '#f87171', marginBottom: '16px' }}>
                    Something went wrong — please try again or email directly.
                  </p>
                )}

                <button
                  type="submit"
                  className="btn-amber"
                  disabled={status === 'sending'}
                  style={{ width: '100%', justifyContent: 'center', opacity: status === 'sending' ? 0.6 : undefined }}
                >
                  {status === 'sending' ? 'Sending…' : 'Send enquiry'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
