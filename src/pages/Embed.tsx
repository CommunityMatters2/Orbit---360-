import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight, RotateCw } from 'lucide-react'
import { findApp } from '../data/apps'
import AppIcon from '../components/AppIcon'
import OrbitMark from '../components/OrbitMark'
import NotFound from './NotFound'

export default function Embed() {
  const { id } = useParams()
  const app = findApp(id)
  const [key, setKey] = useState(0)
  const [loaded, setLoaded] = useState(false)
  if (!app || !app.url) return <NotFound />

  return (
    <div className="flex h-[100dvh] flex-col bg-paper">
      <div className="flex h-14 shrink-0 items-center gap-3 border-b rule px-3 sm:px-5">
        <Link to={`/apps/${app.id}`} className="grid h-9 w-9 place-items-center rounded-[6px] text-muted hover:bg-ink/5 hover:text-ink" aria-label="Back">
          <ArrowLeft size={18} />
        </Link>
        <Link to="/" className="hidden text-ink sm:block" aria-label="Orbit 360 home">
          <OrbitMark size={26} />
        </Link>
        <span className="hidden h-5 w-px bg-ink/15 sm:block" />
        <AppIcon app={app} size={28} />
        <div className="min-w-0 flex-1">
          <div className="truncate text-[14px] font-semibold">{app.name}</div>
          <div className="truncate font-mono text-[10.5px] text-muted">{app.url.replace(/^https?:\/\//, '')}</div>
        </div>
        <button
          onClick={() => {
            setLoaded(false)
            setKey((k) => k + 1)
          }}
          className="grid h-9 w-9 place-items-center rounded-[6px] text-muted hover:bg-ink/5 hover:text-ink"
          aria-label="Reload"
        >
          <RotateCw size={15} />
        </button>
        <a href={app.url} target="_blank" rel="noreferrer" className="btn h-9 border rule-strong px-3 text-[13px] hover:border-ink">
          <span className="hidden sm:inline">New tab</span> <ArrowUpRight size={14} className="arrow" />
        </a>
      </div>
      <div className="relative flex-1 bg-white">
        {!loaded && (
          <div className="absolute inset-0 grid place-items-center bg-paper">
            <div className="max-w-xs text-center">
              <div className="mx-auto h-10 w-10 animate-spin rounded-full border border-ink/15 border-t-ink" />
              <p className="mt-5 text-[14px]">Opening {app.name}…</p>
              <p className="mt-2 text-[13px] text-muted">
                If nothing appears, this site may not allow being shown inside other pages.{' '}
                <a href={app.url} target="_blank" rel="noreferrer" className="text-orange underline underline-offset-2">
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
