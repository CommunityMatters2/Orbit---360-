import { motion } from 'framer-motion'
import { ArrowUpRight, ChevronLeft, ChevronRight, MonitorPlay, Pencil, Pin, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import type { OrbitApp } from '../data/apps'
import { useApps } from '../store/useApps'
import AppIcon from './AppIcon'
import StatusBadge from './StatusBadge'

export default function AppCard({ app, manage = false, compact = false }: { app: OrbitApp; manage?: boolean; compact?: boolean }) {
  const { launch, setDetails, togglePin, setEditing, removeApp, moveApp } = useApps()
  const nav = useNavigate()

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      whileHover={{ y: -4 }}
      className="glass group relative flex flex-col overflow-hidden rounded-2xl p-5"
    >
      {/* accent glow */}
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-30 blur-3xl transition-opacity duration-500 group-hover:opacity-70"
        style={{ background: app.color }}
      />
      <div className="relative flex items-start gap-4">
        <button onClick={() => setDetails(app)} aria-label={`Details for ${app.name}`}>
          <AppIcon app={app} size={compact ? 44 : 54} />
        </button>
        <div className="min-w-0 flex-1">
          <button onClick={() => setDetails(app)} className="block text-left">
            <h3 className="font-display text-[15px] font-semibold leading-snug hover:underline">{app.name}</h3>
          </button>
          <div className="mt-1.5 flex flex-wrap items-center gap-2">
            <StatusBadge status={app.status} />
            <span className="text-xs text-muted">{app.category}</span>
          </div>
        </div>
        <button
          onClick={() => togglePin(app.id)}
          className={`rounded-lg p-1.5 transition hover:bg-white/10 ${app.pinned ? 'text-orbit-orange' : 'text-muted opacity-0 group-hover:opacity-100 focus:opacity-100'}`}
          aria-label={app.pinned ? 'Unpin' : 'Pin'}
          title={app.pinned ? 'Unpin' : 'Pin to home'}
        >
          <Pin size={16} fill={app.pinned ? "currentColor" : "none"} />
        </button>
      </div>

      {!compact && <p className="relative mt-4 line-clamp-2 text-sm text-muted">{app.description}</p>}

      <div className="relative mt-auto flex items-center gap-2 pt-5">
        {app.url ? (
          <>
            <button onClick={() => launch(app)} className="btn-primary flex-1 py-2">
              Launch <ArrowUpRight size={15} />
            </button>
            <button onClick={() => nav(`/open/${app.id}`)} className="btn-ghost px-3 py-2" title="Open inside Orbit">
              <MonitorPlay size={16} />
            </button>
          </>
        ) : (
          <button onClick={() => setEditing(app)} className="btn-ghost flex-1 py-2">
            Add link when ready
          </button>
        )}
      </div>

      {manage && (
        <div className="relative mt-3 flex items-center justify-between border-t border-soft pt-3 text-muted">
          <div className="flex gap-1">
            <button onClick={() => moveApp(app.id, -1)} className="rounded-lg p-1.5 hover:bg-white/10" title="Move left" aria-label="Move left">
              <ChevronLeft size={16} />
            </button>
            <button onClick={() => moveApp(app.id, 1)} className="rounded-lg p-1.5 hover:bg-white/10" title="Move right" aria-label="Move right">
              <ChevronRight size={16} />
            </button>
          </div>
          <div className="flex gap-1">
            <button onClick={() => setEditing(app)} className="rounded-lg p-1.5 hover:bg-white/10" title="Edit" aria-label="Edit">
              <Pencil size={16} />
            </button>
            <button
              onClick={() => confirm(`Remove "${app.name}" from Orbit 360?`) && removeApp(app.id)}
              className="rounded-lg p-1.5 hover:bg-red-500/15 hover:text-red-400"
              title="Remove"
              aria-label="Remove"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      )}
    </motion.div>
  )
}
