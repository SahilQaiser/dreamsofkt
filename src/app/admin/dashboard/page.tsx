'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import type { HeroSettings, ReelSettings, VideoItem } from '@/types/content'

const TYPE_OPTIONS = ['none', 'youtube', 'r2'] as const
const BLANK_VIDEO: Omit<VideoItem, 'id' | 'order'> = {
  title: '',
  location: '',
  duration: '',
  tags: [],
  type: 'gradient',
  src: '',
  thumbnail: '',
  wide: false,
}

async function apiFetch(url: string, options?: RequestInit) {
  const res = await fetch(url, options)
  const data = await res.json()
  if (!res.ok) throw new Error(data.error ?? `Request failed (${res.status})`)
  return data
}

function Label({ children }: { children: React.ReactNode }) {
  return <label className="admin-label">{children}</label>
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <Label>{label}</Label>
      {children}
    </div>
  )
}

function ErrMsg({ msg }: { msg: string }) {
  return <p style={{ fontSize: '12px', color: '#f87171', marginTop: '8px' }}>{msg}</p>
}

export default function Dashboard() {
  const router = useRouter()
  const [hero, setHero] = useState<HeroSettings>({ type: 'none', src: '' })
  const [reel, setReel] = useState<ReelSettings>({ type: 'none', src: '', duration: '', title: '', subtitle: '' })
  const [videos, setVideos] = useState<VideoItem[]>([])
  const [loadErr, setLoadErr] = useState('')
  const [settingsErr, setSettingsErr] = useState('')
  const [savingSettings, setSavingSettings] = useState(false)
  const [addingVideo, setAddingVideo] = useState(false)
  const [addErr, setAddErr] = useState('')
  const [newVideo, setNewVideo] = useState({ ...BLANK_VIDEO })
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editDraft, setEditDraft] = useState<Partial<VideoItem>>({})
  const [editErr, setEditErr] = useState('')

  const load = useCallback(async () => {
    setLoadErr('')
    try {
      const [s, v] = await Promise.all([
        apiFetch('/api/admin/settings'),
        apiFetch('/api/admin/videos'),
      ])
      if (s.hero) setHero(s.hero)
      if (s.featuredReel) setReel(s.featuredReel)
      if (v.videos) setVideos(v.videos)
    } catch (e) {
      setLoadErr(e instanceof Error ? e.message : 'Failed to load data.')
    }
  }, [])

  useEffect(() => { load() }, [load])

  const logout = async () => {
    await fetch('/api/admin/login', { method: 'DELETE' })
    router.push('/admin')
  }

  const saveSettings = async () => {
    setSavingSettings(true)
    setSettingsErr('')
    try {
      await apiFetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hero, featuredReel: reel }),
      })
    } catch (e) {
      setSettingsErr(e instanceof Error ? e.message : 'Save failed.')
    } finally {
      setSavingSettings(false)
    }
  }

  const addVideo = async () => {
    setAddErr('')
    try {
      const data = await apiFetch('/api/admin/videos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newVideo),
      })
      setVideos((v) => [...v, data.video])
      setNewVideo({ ...BLANK_VIDEO })
      setAddingVideo(false)
    } catch (e) {
      setAddErr(e instanceof Error ? e.message : 'Could not add video.')
    }
  }

  const saveEdit = async (id: string) => {
    setEditErr('')
    try {
      const data = await apiFetch(`/api/admin/videos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editDraft),
      })
      setVideos((v) => v.map((x) => (x.id === id ? data.video : x)))
      setEditingId(null)
      setEditDraft({})
    } catch (e) {
      setEditErr(e instanceof Error ? e.message : 'Save failed.')
    }
  }

  const deleteVideo = async (id: string) => {
    if (!confirm('Delete this video?')) return
    try {
      await apiFetch(`/api/admin/videos/${id}`, { method: 'DELETE' })
      setVideos((v) => v.filter((x) => x.id !== id).map((x, i) => ({ ...x, order: i })))
    } catch {
      alert('Delete failed — please try again.')
    }
  }

  const moveVideo = async (id: string, dir: -1 | 1) => {
    const sorted = [...videos].sort((a, b) => a.order - b.order)
    const idx = sorted.findIndex((v) => v.id === id)
    const targetIdx = idx + dir
    if (targetIdx < 0 || targetIdx >= sorted.length) return
    const currentOrder = sorted[idx].order
    const targetOrder = sorted[targetIdx].order
    try {
      await apiFetch(`/api/admin/videos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order: targetOrder }),
      })
      setVideos((v) =>
        v.map((x) => {
          if (x.id === id) return { ...x, order: targetOrder }
          if (x.order === targetOrder) return { ...x, order: currentOrder }
          return x
        })
      )
    } catch {
      // reorder failure is non-critical — state unchanged
    }
  }

  const sortedVideos = [...videos].sort((a, b) => a.order - b.order)

  return (
    <div className="admin-shell">
      {/* Header */}
      <header className="admin-header">
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '18px', fontWeight: 300, color: 'var(--color-snow)' }}>
            Dreams of
          </span>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 600, color: 'var(--color-amber)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            KT
          </span>
          <span style={{ fontSize: '11px', color: 'var(--color-mist)', marginLeft: '8px', letterSpacing: '0.06em' }}>
            / Admin
          </span>
        </div>
        <button className="admin-btn-ghost" onClick={logout}>Sign out</button>
      </header>

      <main style={{ padding: '32px 0 64px', maxWidth: '860px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>

        {loadErr && (
          <div style={{ margin: '0 40px', padding: '14px 18px', background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.25)', borderRadius: '10px' }}>
            <p style={{ fontSize: '13px', color: '#f87171' }}>{loadErr}</p>
          </div>
        )}

        {/* ── Hero Video ── */}
        <div className="admin-card">
          <p className="admin-section-title">Hero video</p>
          <p style={{ fontSize: '12px', color: 'var(--color-mist)', marginBottom: '20px' }}>
            Full-screen background loop on the homepage.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
            <Field label="Type">
              <select className="form-input" value={hero.type} onChange={(e) => setHero({ ...hero, type: e.target.value as HeroSettings['type'] })} style={{ appearance: 'none' }}>
                {TYPE_OPTIONS.map((t) => (
                  <option key={t} value={t}>{t === 'none' ? 'None (gradient)' : t === 'youtube' ? 'YouTube' : 'R2 / Direct URL'}</option>
                ))}
              </select>
            </Field>
            <Field label={hero.type === 'youtube' ? 'YouTube video ID' : 'Video URL'}>
              <input className="form-input" placeholder={hero.type === 'youtube' ? 'dQw4w9WgXcQ' : 'https://…'} value={hero.src} onChange={(e) => setHero({ ...hero, src: e.target.value })} disabled={hero.type === 'none'} />
            </Field>
          </div>
          {settingsErr && <ErrMsg msg={settingsErr} />}
          <button className="admin-btn" onClick={saveSettings} disabled={savingSettings}>
            {savingSettings ? 'Saving…' : 'Save'}
          </button>
        </div>

        {/* ── Featured Reel ── */}
        <div className="admin-card">
          <p className="admin-section-title">Featured reel</p>
          <p style={{ fontSize: '12px', color: 'var(--color-mist)', marginBottom: '20px' }}>
            Large clickable reel card below the hero.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
            <Field label="Type">
              <select className="form-input" value={reel.type} onChange={(e) => setReel({ ...reel, type: e.target.value as ReelSettings['type'] })} style={{ appearance: 'none' }}>
                {TYPE_OPTIONS.map((t) => (
                  <option key={t} value={t}>{t === 'none' ? 'None' : t === 'youtube' ? 'YouTube' : 'R2 / Direct URL'}</option>
                ))}
              </select>
            </Field>
            <Field label={reel.type === 'youtube' ? 'YouTube video ID' : 'Video URL'}>
              <input className="form-input" placeholder={reel.type === 'youtube' ? 'dQw4w9WgXcQ' : 'https://…'} value={reel.src} onChange={(e) => setReel({ ...reel, src: e.target.value })} disabled={reel.type === 'none'} />
            </Field>
            <Field label="Duration label">
              <input className="form-input" placeholder="04:17" value={reel.duration} onChange={(e) => setReel({ ...reel, duration: e.target.value })} />
            </Field>
            <Field label="Title">
              <input className="form-input" placeholder="Dreams of KT" value={reel.title} onChange={(e) => setReel({ ...reel, title: e.target.value })} />
            </Field>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <Field label="Subtitle">
              <input className="form-input" placeholder="40+ Locations · 7 Continents · 2024" value={reel.subtitle} onChange={(e) => setReel({ ...reel, subtitle: e.target.value })} />
            </Field>
          </div>
          {settingsErr && <ErrMsg msg={settingsErr} />}
          <button className="admin-btn" onClick={saveSettings} disabled={savingSettings}>
            {savingSettings ? 'Saving…' : 'Save'}
          </button>
        </div>

        {/* ── Portfolio Videos ── */}
        <div className="admin-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <p className="admin-section-title" style={{ marginBottom: 0 }}>Portfolio videos</p>
            <button className="admin-btn" onClick={() => { setAddingVideo(true); setAddErr('') }} disabled={addingVideo}>
              + Add video
            </button>
          </div>

          {/* Add video form */}
          {addingVideo && (
            <div style={{ background: 'var(--color-surface-2)', borderRadius: '10px', padding: '20px', marginBottom: '16px', border: '1px solid var(--color-rim-2)' }}>
              <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-sky)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '16px' }}>New video</p>
              <VideoForm
                data={newVideo}
                onChange={(f, v) => setNewVideo((p) => ({ ...p, [f]: v }))}
              />
              {addErr && <ErrMsg msg={addErr} />}
              <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
                <button className="admin-btn" onClick={addVideo}>Add</button>
                <button className="admin-btn-ghost" onClick={() => { setAddingVideo(false); setNewVideo({ ...BLANK_VIDEO }); setAddErr('') }}>Cancel</button>
              </div>
            </div>
          )}

          {/* Video list */}
          {sortedVideos.length === 0 && !addingVideo && (
            <p style={{ fontSize: '13px', color: 'var(--color-mist)', textAlign: 'center', padding: '32px 0' }}>
              No videos yet. Add one above.
            </p>
          )}

          {sortedVideos.map((v, i) => (
            <div key={v.id} className="admin-video-row">
              {/* Thumbnail swatch */}
              <div
                style={{
                  width: '52px',
                  height: '36px',
                  borderRadius: '6px',
                  flexShrink: 0,
                  background: v.type === 'gradient' ? v.src : 'var(--color-surface-2)',
                  backgroundImage: v.type === 'youtube'
                    ? `url(https://img.youtube.com/vi/${v.src}/default.jpg)`
                    : v.thumbnail ? `url(${v.thumbnail})` : undefined,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  border: '1px solid var(--color-rim)',
                }}
              />

              {editingId === v.id ? (
                <div style={{ flex: 1 }}>
                  <VideoForm
                    data={{ ...v, ...editDraft }}
                    onChange={(f, val) => setEditDraft((p) => ({ ...p, [f]: val }))}
                  />
                  {editErr && <ErrMsg msg={editErr} />}
                  <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                    <button className="admin-btn" onClick={() => saveEdit(v.id)}>Save</button>
                    <button className="admin-btn-ghost" onClick={() => { setEditingId(null); setEditDraft({}); setEditErr('') }}>Cancel</button>
                  </div>
                </div>
              ) : (
                <>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '13px', fontWeight: 500, color: 'var(--color-snow)' }}>{v.title}</p>
                    <p style={{ fontSize: '11px', color: 'var(--color-mist)', marginTop: '2px' }}>
                      {v.location} · {v.type.toUpperCase()} · {v.duration}
                      {v.wide && <span style={{ marginLeft: '6px', color: 'var(--color-sky)' }}>wide</span>}
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexShrink: 0 }}>
                    <button className="admin-btn-ghost" style={{ padding: '4px 8px' }} onClick={() => moveVideo(v.id, -1)} disabled={i === 0}>↑</button>
                    <button className="admin-btn-ghost" style={{ padding: '4px 8px' }} onClick={() => moveVideo(v.id, 1)} disabled={i === sortedVideos.length - 1}>↓</button>
                    <button className="admin-btn-ghost" onClick={() => { setEditingId(v.id); setEditDraft({}); setEditErr('') }}>Edit</button>
                    <button className="admin-btn-danger" onClick={() => deleteVideo(v.id)}>Delete</button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

function VideoForm({
  data,
  onChange,
}: {
  data: Partial<VideoItem> & { type: VideoItem['type']; src: string }
  onChange: (field: string, value: unknown) => void
}) {
  const tagsString = Array.isArray(data.tags) ? data.tags.join(', ') : (data.tags ?? '')

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
      <Field label="Title">
        <input className="form-input" value={data.title ?? ''} onChange={(e) => onChange('title', e.target.value)} placeholder="Norwegian Fjords" />
      </Field>
      <Field label="Location">
        <input className="form-input" value={data.location ?? ''} onChange={(e) => onChange('location', e.target.value)} placeholder="Norway" />
      </Field>
      <Field label="Type">
        <select className="form-input" value={data.type} onChange={(e) => onChange('type', e.target.value)} style={{ appearance: 'none' }}>
          <option value="youtube">YouTube</option>
          <option value="r2">R2 / Direct URL</option>
          <option value="gradient">Gradient (placeholder)</option>
        </select>
      </Field>
      <Field label={data.type === 'youtube' ? 'YouTube video ID' : data.type === 'r2' ? 'Video URL' : 'CSS gradient'}>
        <input
          className="form-input"
          value={data.src ?? ''}
          onChange={(e) => onChange('src', e.target.value)}
          placeholder={data.type === 'youtube' ? 'dQw4w9WgXcQ' : data.type === 'r2' ? 'https://…' : 'linear-gradient(…)'}
        />
      </Field>
      <Field label="Duration">
        <input className="form-input" value={data.duration ?? ''} onChange={(e) => onChange('duration', e.target.value)} placeholder="3:42" />
      </Field>
      <Field label="Tags (comma-separated)">
        <input
          className="form-input"
          value={tagsString}
          onChange={(e) => onChange('tags', e.target.value.split(',').map((t) => t.trim()).filter(Boolean))}
          placeholder="Landscape, 4K"
        />
      </Field>
      {data.type !== 'gradient' && (
        <Field label="Thumbnail URL (optional)">
          <input className="form-input" value={data.thumbnail ?? ''} onChange={(e) => onChange('thumbnail', e.target.value)} placeholder="Leave blank for auto" />
        </Field>
      )}
      <Field label="Wide card (spans 2 cols)">
        <select className="form-input" value={data.wide ? 'yes' : 'no'} onChange={(e) => onChange('wide', e.target.value === 'yes')} style={{ appearance: 'none' }}>
          <option value="no">No</option>
          <option value="yes">Yes</option>
        </select>
      </Field>
    </div>
  )
}
