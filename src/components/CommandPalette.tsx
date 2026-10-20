import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowUpRight, CornerDownLeft, Search } from 'lucide-react'
import { indexOf, SUITE } from '../data/apps'
import { useUI } from '../ui'
import AppIcon from './AppIcon'

const PAGES = [
  { label: 'Suite overview', to: '/' },
  { label: 'All apps', to: '/apps' },
  { label: 'Insights', to: '/insights' },
  { label: 'Roadmap', to: '/roadmap' },
]

type Row = { key: string; label: string; sub: string; go: () => void; app?: (typeof SUITE)[number] }

export default function CommandPalette() {
  const { searchOpen, setSearchOpen } = useUI()
  const nav = useNavigate()
  const [q, setQ] = useState('')
  const [idx, setIdx] = useState(0)
  const input = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setSearchOpen(!searchOpen)
      } else if (e.key === 'Escape') {
        setSearchOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
    }
  }, [searchOpen, setSearchOpen])

  useEffect(() => {
    if (searchOpen) {
      setQ('')
      setIdx(0)
      requestAnimationFrame(() => input.current?.focus())
    }
  }, [searchOpen])

  const rows = useMemo<Row[]>(() => {
    const s = q.trim().toLowerCase()
    const apps: Row[] = SUITE.filter((a) => !s || [a.name, a.category, a.tagline].join(' ').toLowerCase().includes(s)).map((a) => ({
      key: a.id,
      label: a.name,
      sub: `${indexOf(a)} · ${a.category}`,
      go: () => nav(`/apps/${a.id}`),
      app: a,
    }))
    const pages: Row[] = PAGES.filter((p) => !s || p.label.toLowerCase().includes(s)).map((p) => ({ key: p.to, label: p.label, sub: 'Page', go: () => nav(p.to) }))
    return [...apps, ...pages]
  }, [q, nav])

  useEffect(() => {
    setIdx(0)
  }, [q])

  if (!searchOpen) return null

  const run = (r?: Row) => {
    if (!r) return
    setSearchOpen(false)
    r.go()
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[12vh]" role="dialog" aria-modal="true" aria-label="Search">
      <div className="fade absolute inset-0 bg-ink/30 backdrop-blur-[2px]" onClick={() => setSearchOpen(false)} />
      <div className="rise relative w-full max-w-xl overflow-hidden rounded-[10px] border rule-strong bg-surface shadow-[0_30px_80px_-30px_rgb(var(--ink)/0.6)]">
        <div className="flex items-center gap-3 border-b rule px-4">
          <Search size={17} className="text-muted" />
          <input
            ref={input}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown') {
                e.preventDefault()
                setIdx((i) => Math.min(i + 1, rows.length - 1))
              } else if (e.key === 'ArrowUp') {
                e.preventDefault()
                setIdx((i) => Math.max(i - 1, 0))
              } else if (e.key === 'Enter') run(rows[idx])
            }}
            placeholder="Find an app or page"
            className="h-14 flex-1 bg-transparent text-[16px] outline-none placeholder:text-muted"
          />
          <kbd className="font-mono text-[10px] text-muted">ESC</kbd>
        </div>
        <ul className="max-h-[52vh] overflow-y-auto p-2">
          {rows.length === 0 && <li className="px-3 py-10 text-center text-[14px] text-muted">Nothing matches “{q}”.</li>}
          {rows.map((r, n) => (
            <li key={r.key}>
              <button
                onMouseMove={() => setIdx(n)}
                onClick={() => run(r)}
                className={`flex w-full items-center gap-3 rounded-[6px] px-3 py-2.5 text-left transition-colors ${n === idx ? 'bg-ink/[0.06]' : ''}`}
              >
                {r.app ? <AppIcon app={r.app} size={30} /> : <span className="grid h-[30px] w-[30px] place-items-center rounded-md border rule text-muted">→</span>}
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[14px] font-medium">{r.label}</span>
                  <span className="block font-mono text-[10.5px] uppercase tracking-[0.1em] text-muted">{r.sub}</span>
                </span>
                {n === idx && (r.app ? <ArrowUpRight size={15} className="text-muted" /> : <CornerDownLeft size={14} className="text-muted" />)}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
