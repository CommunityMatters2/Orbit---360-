import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { indexOf, SUITE, tone } from '../data/apps'
import AppIcon from '../components/AppIcon'
import StatusBadge from '../components/StatusBadge'

export default function Apps() {
  const cats = ['All', ...Array.from(new Set(SUITE.map((a) => a.category)))]
  const [cat, setCat] = useState('All')
  const shown = SUITE.filter((a) => cat === 'All' || a.category === cat)

  return (
    <div className="wrap pt-14 sm:pt-20">
      <header className="rise grid gap-6 border-b rule-strong pb-10 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <div className="eyebrow">The suite · {String(SUITE.length).padStart(2, '0')} apps</div>
          <h1 className="mt-4 text-[48px] font-normal leading-none sm:text-[68px]">
            All <em className="italic">apps</em>
          </h1>
        </div>
        <p className="max-w-sm text-[15px] leading-relaxed text-muted">Every application in Orbit 360. Choose one to learn more, or open it straight away.</p>
      </header>

      <div className="no-scrollbar mt-6 flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Filter by area">
        {cats.map((c) => {
          const n = c === 'All' ? SUITE.length : SUITE.filter((a) => a.category === c).length
          const on = cat === c
          return (
            <button
              key={c}
              role="tab"
              aria-selected={on}
              onClick={() => setCat(c)}
              className={`flex h-9 shrink-0 items-center gap-2 rounded-full border px-4 text-[13px] font-medium transition-colors ${on ? 'border-ink bg-ink text-paper' : 'rule-strong text-muted hover:border-ink hover:text-ink'}`}
            >
              {c}
              <span className={`font-mono text-[10px] ${on ? 'opacity-70' : ''}`}>{n}</span>
            </button>
          )
        })}
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((a, i) => (
          <article key={a.id} className="rise card card-hover group relative flex flex-col p-6" style={{ animationDelay: `${i * 50}ms` }}>
            <span className="absolute inset-x-6 top-0 h-[2px] rounded-b" style={{ background: tone(a.tone) }} />
            <div className="flex items-start justify-between">
              <AppIcon app={a} size={52} />
              <span className="font-mono text-[11px] text-muted">{indexOf(a)}</span>
            </div>
            <h2 className="mt-6 text-[24px] font-normal leading-tight">
              <Link to={`/apps/${a.id}`} className="after:absolute after:inset-0">
                {a.name}
              </Link>
            </h2>
            <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{a.tagline}</p>
            <div className="min-h-7 flex-1" />
            <div className="flex items-center justify-between gap-3 border-t rule pt-4">
              <div className="flex flex-col gap-1">
                <StatusBadge status={a.status} />
                <span className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted">{a.category}</span>
              </div>
              {a.url ? (
                <a
                  href={a.url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn relative z-10 h-9 border rule-strong px-3.5 text-[13px] hover:border-ink"
                  aria-label={`Open ${a.name} in a new tab`}
                >
                  Open <ArrowUpRight size={14} className="arrow" />
                </a>
              ) : (
                <span className="inline-flex items-center gap-1 text-[13px] text-muted">
                  Details <ArrowRight size={14} className="arrow-r" />
                </span>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
