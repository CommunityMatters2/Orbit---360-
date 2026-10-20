import { useMemo, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Plus, Search, SlidersHorizontal } from 'lucide-react'
import { STATUS_META, type AppStatus } from '../data/apps'
import { useApps } from '../store/useApps'
import AppCard from '../components/AppCard'

export default function Apps() {
  const { apps, setEditing } = useApps()
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('All')
  const [status, setStatus] = useState<AppStatus | 'all'>('all')
  const [manage, setManage] = useState(false)

  const cats = useMemo(() => ['All', ...Array.from(new Set(apps.map((a) => a.category)))], [apps])
  const shown = apps.filter((a) => {
    const s = q.trim().toLowerCase()
    const hit = !s || [a.name, a.description, a.category, ...(a.tags || [])].join(' ').toLowerCase().includes(s)
    return hit && (cat === 'All' || a.category === cat) && (status === 'all' || a.status === status)
  })

  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-orbit-blue dark:text-blue-300">Library</div>
          <h1 className="mt-1 font-display text-4xl font-bold tracking-tight">All apps</h1>
          <p className="mt-2 text-muted">
            {apps.length} apps in orbit · {apps.filter((a) => a.status === 'live').length} live
          </p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setManage((m) => !m)} className={`btn-ghost ${manage ? '!border-orbit-orange text-orbit-orange' : ''}`}>
            <SlidersHorizontal size={15} /> {manage ? 'Done' : 'Manage'}
          </button>
          <button onClick={() => setEditing('new')} className="btn-primary">
            <Plus size={15} /> Add app
          </button>
        </div>
      </div>

      <div className="glass mt-8 flex flex-col gap-3 rounded-2xl p-3 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Filter by name, tag or category" className="input !bg-transparent pl-9" />
        </div>
        <div className="flex gap-1 overflow-x-auto scrollbar-thin">
          {(['all', ...Object.keys(STATUS_META)] as (AppStatus | 'all')[]).map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-semibold transition ${status === s ? 'bg-orbit-blue text-white' : 'text-muted hover:bg-white/10'}`}
            >
              {s === 'all' ? 'Any status' : STATUS_META[s].label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
        {cats.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`whitespace-nowrap rounded-full border px-4 py-1.5 text-sm transition ${cat === c ? 'border-orbit-orange bg-orbit-orange/15 text-orbit-orange' : 'border-soft text-muted hover:text-[var(--text)]'}`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence>
          {shown.map((a) => (
            <AppCard key={a.id} app={a} manage={manage} />
          ))}
        </AnimatePresence>
        <button
          onClick={() => setEditing('new')}
          className="group grid min-h-[220px] place-items-center rounded-2xl border-2 border-dashed border-soft text-muted transition hover:border-orbit-blue/60 hover:text-[var(--text)]"
        >
          <div className="text-center">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl border border-soft transition group-hover:rotate-90 group-hover:bg-orbit-blue group-hover:text-white">
              <Plus size={24} />
            </div>
            <div className="mt-3 font-display font-semibold">Launch a new app</div>
            <div className="text-xs">Add any CM2 tool to the suite</div>
          </div>
        </button>
      </div>
      {shown.length === 0 && <p className="mt-6 text-center text-muted">No apps match these filters.</p>}
    </div>
  )
}
