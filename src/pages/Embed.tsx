import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ExternalLink, RotateCw } from 'lucide-react'
import { useApps } from '../store/useApps'
import AppIcon from '../components/AppIcon'

export default function Embed() {
  const { id } = useParams()
  const { apps, markRecent } = useApps()
  const app = apps.find((a) => a.id === id)
  const [key, setKey] = useState(0)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (app) markRecent(app.id)
  }, [app, markRecent])

  if (!app || !app.url) {
    return (
      <div className="grid min-h-screen place-items-center p-6 text-center">
        <div>
          <h1 className="font-display text-2xl font-bold">This app is not in orbit</h1>
          <p className="mt-2 text-muted">It may have been removed or has no link yet.</p>
          <Link to="/apps" className="btn-primary mt-6">
            Back to apps
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen flex-col p-3 pb-24 lg:pb-3">
      <div className="glass flex h-14 shrink-0 items-center gap-3 rounded-2xl px-3">
        <Link to="/apps" className="grid h-9 w-9 place-items-center rounded-xl text-muted hover:bg-white/10" aria-label="Back">
          <ArrowLeft size={18} />
        </Link>
        <AppIcon app={app} size={32} />
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-semibold">{app.name}</div>
          <div className="truncate text-xs text-muted">{app.url}</div>
        </div>
        <button
          onClick={() => {
            setLoaded(false)
            setKey((k) => k + 1)
          }}
          className="grid h-9 w-9 place-items-center rounded-xl text-muted hover:bg-white/10"
          aria-label="Reload"
        >
          <RotateCw size={16} />
        </button>
        <a href={app.url} target="_blank" rel="noreferrer" className="btn-ghost h-9 px-3">
          <ExternalLink size={15} /> <span className="hidden sm:inline">New tab</span>
        </a>
      </div>
      <div className="relative mt-3 flex-1 overflow-hidden rounded-2xl border border-soft bg-white">
        {!loaded && (
          <div className="absolute inset-0 grid place-items-center" style={{ background: 'var(--panel-solid)' }}>
            <div className="text-center">
              <div className="mx-auto h-12 w-12 animate-spin rounded-full border-2 border-orbit-blue border-t-transparent" />
              <p className="mt-4 text-sm text-muted">Docking with {app.name}…</p>
              <p className="mt-1 max-w-xs text-xs text-muted">
                If it doesn’t appear, the site may block being shown inside other pages.{' '}
                <a href={app.url} target="_blank" rel="noreferrer" className="text-orbit-orange underline">
                  Open it in a new tab
                </a>
                .
              </p>
            </div>
          </div>
        )}
        <iframe key={key} src={app.url} title={app.name} onLoad={() => setLoaded(true)} className="h-full w-full" allow="clipboard-write; fullscreen" />
      </div>
    </div>
  )
}
