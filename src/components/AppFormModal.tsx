import { useEffect, useState, type FormEvent } from 'react'
import { ImagePlus, Rocket, X } from 'lucide-react'
import { BRAND_COLORS, CATEGORIES, STATUS_META, type AppStatus, type OrbitApp } from '../data/apps'
import { useApps } from '../store/useApps'
import AppIcon from './AppIcon'
import Modal from './Modal'

type Draft = Omit<OrbitApp, 'id'>
const EMPTY: Draft = { name: '', short: '', url: '', description: '', category: 'Programs', status: 'live', color: '#1E5BD8', tags: [] }

export default function AppFormModal() {
  const { editing, setEditing, addApp, updateApp } = useApps()
  const [d, setD] = useState<Draft>(EMPTY)
  const [tags, setTags] = useState('')
  const [err, setErr] = useState('')
  // An edit target without an id is a prefilled new app (e.g. promoted from the Lab).
  const editId = editing && editing !== 'new' && editing.id ? editing.id : null

  useEffect(() => {
    if (editing === 'new') {
      setD(EMPTY)
      setTags('')
    } else if (editing) {
      setD({ ...EMPTY, ...editing })
      setTags((editing.tags || []).join(', '))
    }
    setErr('')
  }, [editing])

  const close = () => setEditing(null)
  const set = <K extends keyof Draft>(k: K, v: Draft[K]) => setD((x) => ({ ...x, [k]: v }))

  const onLogo = (file?: File) => {
    if (!file) return
    if (file.size > 400_000) return setErr('Logo must be under 400 KB.')
    const r = new FileReader()
    r.onload = () => set('logo', String(r.result))
    r.readAsDataURL(file)
  }

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (!d.name.trim()) return setErr('Give the app a name.')
    let url = d.url.trim()
    if (url && !/^https?:\/\//i.test(url)) url = 'https://' + url
    if (url) {
      try {
        new URL(url)
      } catch {
        return setErr('That link does not look like a valid URL.')
      }
    }
    const initials = d.name
      .trim()
      .split(/\s+/)
      .map((w) => w[0])
      .join('')
      .slice(0, 2)
    const out: Draft = {
      ...d,
      name: d.name.trim(),
      url,
      short: (d.short || initials).toUpperCase(),
      tags: tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
    }
    const { id: _ignore, ...rest } = out as OrbitApp
    void _ignore
    if (editId) updateApp(editId, rest)
    else addApp(rest)
    close()
  }

  const preview: OrbitApp = { ...d, id: 'preview', short: d.short || d.name.slice(0, 2).toUpperCase() || '?' }

  return (
    <Modal open={editing !== null} onClose={close} className="w-full max-w-2xl">
      <form
        onSubmit={submit}
        className="max-h-[90vh] overflow-y-auto rounded-3xl border border-soft p-6 shadow-2xl scrollbar-thin sm:p-8"
        style={{ background: 'var(--panel-solid)' }}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-orbit-orange">{editId ? 'Edit app' : 'Launch a new app'}</div>
            <h2 className="mt-1 font-display text-2xl font-bold">{editId ? d.name || 'Edit app' : 'Add to Orbit 360'}</h2>
          </div>
          <button type="button" onClick={close} className="rounded-full p-2 text-muted hover:bg-white/10" aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-4 rounded-2xl border border-soft p-4">
          <AppIcon app={preview} size={64} />
          <div className="min-w-0 flex-1">
            <div className="truncate font-display font-semibold">{d.name || 'Your app name'}</div>
            <div className="text-xs text-muted">
              {d.category} · {STATUS_META[d.status].label}
            </div>
          </div>
          <div className="flex items-center gap-3">
            {d.logo && (
              <button type="button" className="text-xs text-muted hover:underline" onClick={() => set('logo', undefined)}>
                Remove logo
              </button>
            )}
            <label className="btn-ghost cursor-pointer">
              <ImagePlus size={15} /> Logo
              <input type="file" accept="image/*" className="hidden" onChange={(e) => onLogo(e.target.files?.[0])} />
            </label>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-6">
          <div className="sm:col-span-4">
            <label className="label" htmlFor="f-name">
              Name
            </label>
            <input id="f-name" className="input" value={d.name} onChange={(e) => set('name', e.target.value)} placeholder="e.g. Volunteer Hub" autoFocus />
          </div>
          <div className="sm:col-span-2">
            <label className="label" htmlFor="f-short">
              Monogram
            </label>
            <input id="f-short" className="input" maxLength={3} value={d.short} onChange={(e) => set('short', e.target.value)} placeholder="VH" />
          </div>
          <div className="sm:col-span-6">
            <label className="label" htmlFor="f-url">
              Link
            </label>
            <input id="f-url" className="input" value={d.url} onChange={(e) => set('url', e.target.value)} placeholder="https://your-app.vercel.app" />
          </div>
          <div className="sm:col-span-6">
            <label className="label" htmlFor="f-desc">
              Description
            </label>
            <textarea
              id="f-desc"
              className="input min-h-[84px] resize-y"
              value={d.description}
              onChange={(e) => set('description', e.target.value)}
              placeholder="What does this app do for the community?"
            />
          </div>
          <div className="sm:col-span-3">
            <label className="label" htmlFor="f-cat">
              Category
            </label>
            <select id="f-cat" className="input" value={d.category} onChange={(e) => set('category', e.target.value)}>
              {CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-3">
            <span className="label">Status</span>
            <div className="grid grid-cols-4 gap-1 rounded-xl border border-soft p-1">
              {(Object.keys(STATUS_META) as AppStatus[]).map((s) => (
                <button
                  type="button"
                  key={s}
                  onClick={() => set('status', s)}
                  className="rounded-lg px-1 py-1.5 text-[11px] font-semibold transition"
                  style={d.status === s ? { background: `${STATUS_META[s].color}26`, color: STATUS_META[s].color } : { color: 'var(--muted)' }}
                >
                  {s === 'building' ? 'Building' : STATUS_META[s].label}
                </button>
              ))}
            </div>
          </div>
          <div className="sm:col-span-3">
            <span className="label">Accent color</span>
            <div className="flex flex-wrap items-center gap-2">
              {BRAND_COLORS.map((c) => (
                <button
                  type="button"
                  key={c}
                  onClick={() => set('color', c)}
                  className="h-7 w-7 rounded-full transition hover:scale-110"
                  style={{ background: c, boxShadow: d.color === c ? `0 0 0 2px var(--panel-solid), 0 0 0 4px ${c}` : 'none' }}
                  aria-label={`Color ${c}`}
                />
              ))}
              <input
                type="color"
                value={d.color}
                onChange={(e) => set('color', e.target.value)}
                className="h-7 w-7 cursor-pointer rounded-full border-0 bg-transparent"
                aria-label="Custom color"
              />
            </div>
          </div>
          <div className="sm:col-span-3">
            <label className="label" htmlFor="f-tags">
              Tags
            </label>
            <input id="f-tags" className="input" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="youth, volunteers" />
          </div>
        </div>

        {err && <div className="mt-4 rounded-xl bg-red-500/10 px-4 py-2.5 text-sm text-red-400">{err}</div>}

        <div className="mt-8 flex justify-end gap-2">
          <button type="button" onClick={close} className="btn-ghost">
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            <Rocket size={15} /> {editId ? 'Save changes' : 'Launch into Orbit'}
          </button>
        </div>
      </form>
    </Modal>
  )
}
