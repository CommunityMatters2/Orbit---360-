import { ArrowUpRight, Copy, ExternalLink, MonitorPlay, Pencil, Pin, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useApps } from '../store/useApps'
import AppIcon from './AppIcon'
import Modal from './Modal'
import StatusBadge from './StatusBadge'

export default function AppDrawer() {
  const { details, setDetails, launch, setEditing, togglePin, apps } = useApps()
  const nav = useNavigate()
  const [copied, setCopied] = useState(false)
  // keep the drawer in sync with live edits
  const app = details ? (apps.find((a) => a.id === details.id) ?? details) : null
  const close = () => setDetails(null)

  return (
    <Modal open={!!app} onClose={close} side="right" className="h-full w-full max-w-md">
      {app && (
        <div className="relative h-full overflow-y-auto scrollbar-thin" style={{ background: 'var(--panel-solid)' }}>
          <div className="relative h-44 overflow-hidden" style={{ background: `linear-gradient(135deg, ${app.color}, #0b1b4d)` }}>
            <div className="absolute inset-0 opacity-40" style={{ background: 'radial-gradient(circle at 80% 20%, #fff3, transparent 50%)' }} />
            <svg className="absolute -bottom-10 -right-10 h-56 w-56 opacity-30" viewBox="0 0 100 100" aria-hidden>
              <ellipse cx="50" cy="50" rx="46" ry="18" fill="none" stroke="#fff" strokeWidth="1" transform="rotate(-25 50 50)" />
              <ellipse cx="50" cy="50" rx="34" ry="12" fill="none" stroke="#fff" strokeWidth="1" transform="rotate(20 50 50)" />
            </svg>
            <button onClick={close} className="absolute right-4 top-4 rounded-full bg-black/25 p-2 text-white hover:bg-black/40" aria-label="Close">
              <X size={18} />
            </button>
          </div>
          <div className="relative -mt-10 px-6 pb-8">
            <AppIcon app={app} size={80} />
            <h2 className="mt-4 font-display text-2xl font-bold">{app.name}</h2>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <StatusBadge status={app.status} />
              <span className="text-sm text-muted">{app.category}</span>
            </div>
            <p className="mt-5 leading-relaxed text-muted">{app.description || 'No description yet.'}</p>

            {app.tags && app.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {app.tags.map((t) => (
                  <span key={t} className="rounded-full border border-soft px-2.5 py-0.5 text-xs text-muted">
                    #{t}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-6 grid gap-2">
              {app.url ? (
                <>
                  <button onClick={() => launch(app)} className="btn-primary py-3">
                    Launch app <ArrowUpRight size={16} />
                  </button>
                  <button
                    onClick={() => {
                      close()
                      nav(`/open/${app.id}`)
                    }}
                    className="btn-ghost py-3"
                  >
                    <MonitorPlay size={16} /> Open inside Orbit
                  </button>
                </>
              ) : (
                <div className="rounded-xl border border-dashed border-soft p-4 text-sm text-muted">
                  This app is still in development and has no link yet. Edit it to add the URL when it goes live.
                </div>
              )}
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => setEditing(app)} className="btn-ghost">
                  <Pencil size={15} /> Edit
                </button>
                <button onClick={() => togglePin(app.id)} className="btn-ghost">
                  <Pin size={15} fill={app.pinned ? 'currentColor' : 'none'} /> {app.pinned ? 'Pinned' : 'Pin'}
                </button>
              </div>
            </div>

            {app.url && (
              <div className="mt-6 rounded-xl border border-soft p-3">
                <div className="label">Link</div>
                <div className="flex items-center gap-2">
                  <a href={app.url} target="_blank" rel="noreferrer" className="min-w-0 flex-1 truncate text-sm text-orbit-blue hover:underline dark:text-blue-300">
                    {app.url}
                  </a>
                  <button
                    onClick={() => {
                      navigator.clipboard?.writeText(app.url)
                      setCopied(true)
                      setTimeout(() => setCopied(false), 1200)
                    }}
                    className="rounded-lg p-1.5 text-muted hover:bg-white/10"
                    title="Copy link"
                    aria-label="Copy link"
                  >
                    {copied ? <span className="text-xs text-orbit-green">Copied</span> : <Copy size={15} />}
                  </button>
                  <a href={app.url} target="_blank" rel="noreferrer" className="rounded-lg p-1.5 text-muted hover:bg-white/10" aria-label="Open link">
                    <ExternalLink size={15} />
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </Modal>
  )
}
