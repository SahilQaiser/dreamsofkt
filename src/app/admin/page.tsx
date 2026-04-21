'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (res.ok) {
        router.push('/admin/dashboard')
      } else {
        setError('Incorrect password.')
        setLoading(false)
      }
    } catch {
      setError('Something went wrong.')
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        minHeight: '100svh',
        background: 'var(--color-void)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '360px',
          background: 'var(--color-surface)',
          border: '1px solid var(--color-rim-2)',
          borderRadius: '16px',
          padding: '40px 36px',
        }}
      >
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '5px', marginBottom: '8px' }}>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                fontSize: '20px',
                fontWeight: 300,
                color: 'var(--color-snow)',
              }}
            >
              Dreams of
            </span>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '13px',
                fontWeight: 600,
                color: 'var(--color-amber)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              KT
            </span>
          </div>
          <p style={{ fontSize: '12px', color: 'var(--color-mist)', letterSpacing: '0.04em' }}>
            Admin dashboard
          </p>
        </div>

        <form onSubmit={submit}>
          <label className="admin-label" htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            className="form-input"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoFocus
            style={{ marginTop: '6px', marginBottom: error ? '10px' : '20px' }}
          />
          {error && (
            <p style={{ fontSize: '12px', color: '#f87171', marginBottom: '14px' }}>{error}</p>
          )}
          <button
            type="submit"
            className="btn-amber"
            disabled={loading}
            style={{ width: '100%', justifyContent: 'center', opacity: loading ? 0.6 : undefined }}
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}
