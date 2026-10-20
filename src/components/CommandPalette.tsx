import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { CornerDownLeft, FlaskConical, Home, LayoutGrid, LineChart, Moon, Plus, Search, Settings } from 'lucide-react'
import { useApps } from '../store/useApps'
import AppIcon from './AppIcon'
import Modal from './Modal'

interface Item {
  id: string
  label: string
  hint: string
  icon: ReactNode
  run: () => void
  group: 'Apps' | 'Actions'
}

export default function CommandPalette() {
  const { apps, paletteOpen, setPaletteOpen, launch, setEditing, toggleTheme } = useApps()
  const nav = useNavigate()
  const [q, setQ] = useState('')
  const [idx, setIdx] = useState(0)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setPaletteOpen(!paletteOpen)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [paletteOpen, setPaletteOpen])

  useEffect(() => {
    if (paletteOpen) {
      setQ('')
      setIdx(0)
    }
  }, [paletteOpen])

  const close = () => setPaletteOpen(false)

  const items = useMemo<Item[]>(() => {
    const go = (path: string) => () => nav(path)
    const actions: Item[] = [
      { id: 'a-add', label: 'Add a new app', hint: 'Create', icon: <Plus size={16} />, run: () => setEditing('new'), group: 'Actions' },
      { id: 'a-home', label: 'Go to Home', hint: 'Navigate', icon: <Home size={16} />, run: go('/'), group: 'Actions' },
      { id: 'a-apps', label: 'Go to All Apps', hint: 'Navigate', icon: <LayoutGrid size={16} />, run: go('/apps'), group: 'Actions' },
      { id: 'a-ins', label: 'Go to Insights', hint: 'Navigate', icon: <LineChart size={16} />, run: go('/insights'), group: 'Actions' },
      { id: 'a-lab', label: 'Go to Orbit Lab', hint: 'Navigate', icon: <FlaskConical size={16} />, run: go('/lab'), group: 'Actions' },
      { id: 'a-set', label: 'Go to Settings', hint: 'Navigate', icon: <Settings size={16} />, run: go('/settings'), group: 'Actions' },
      { id: 'a-theme', label: 'Toggle light / dark', hint: 'Theme', icon: <Moon size={16} />, run: toggleTheme, group: 'Actions' },
    ]
    const appItems: Item[] = apps.map((a) => ({
      id: a.id,
      label: a.name,
      hint: a.url ? 'Launch' : 'Details',
      icon: <AppIcon app={a} size={26} />,
      run: () => (a.url ? launch(a) : nav('/apps')),
      group: 'Apps',
    }))
    const all = [...appItems, ...actions]
    const s = q.trim().toLowerCase()
    if (!s) return all
    return all.filter((i) => {
      const app = apps.find((a) => a.id === i.id)
      const hay = [i.label, app?.category, app?.description, ...(app?.tags || [])].join(' ').toLowerCase()
      return hay.includes(s)
    })
  }, [apps, q, nav, launch, setEditing, toggleTheme])

  useEffect(() => setIdx(0), [q])
  useEffect(() => {
    listRef.current?.querySelector(`[data-idx="${idx}"]`)?.scrollIntoView({ block: 'nearest' })
  }, [idx])

  const run = (i?: Item) => {
    if (!i) return
    close()
    i.run()
  }

  let lastGroup = ''
  return (
    <Modal open={paletteOpen} onClose={close} side="top" className="w-full max-w-xl">
      <div className="overflow-hidden rounded-2xl border border-soft shadow-2xl" style={{ background: 'var(--panel-solid)' }}>
        <div className="flex items-center gap-3 border-b border-soft px-4">
          <Search size={18} className="text-muted" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown') {
                e.preventDefault()
                setIdx((i) => Math.min(i + 1, items.length - 1))
              } else if (e.key === 'ArrowUp') {
                e.preventDefault()
                setIdx((i) => Math.max(i - 1, 0))
              } else if (e.key === 'Enter') {
                run(items[idx])
              }
            }}
            placeholder="Search apps or type a command…"
            className="h-14 flex-1 bg-transparent text-[15px] outline-none placeholder:text-[var(--muted)]"
          />
          <kbd className="rounded-md border border-soft px-1.5 py-0.5 text-[10px] text-muted">ESC</kbd>
        </div>
        <div ref={listRef} className="max-h-[50vh] overflow-y-auto p-2 scrollbar-thin">
          {items.length === 0 && <div className="px-3 py-10 text-center text-sm text-muted">Nothing in orbit matches “{q}”.</div>}
          {items.map((i, n) => {
            const header = i.group !== lastGroup
            lastGroup = i.group
            return (
              <div key={i.id}>
                {header && <div className="px-3 pb-1 pt-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">{i.group}</div>}
                <button
                  data-idx={n}
                  onMouseMove={() => setIdx(n)}
                  onClick={() => run(i)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition ${n === idx ? 'bg-orbit-blue/15' : ''}`}
                >
                  <span className="grid w-7 place-items-center text-muted">{i.icon}</span>
                  <span className="flex-1 truncate">{i.label}</span>
                  <span className="flex items-center gap-1 text-xs text-muted">
                    {i.hint} {n === idx && <CornerDownLeft size={12} />}
                  </span>
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </Modal>
  )
}
