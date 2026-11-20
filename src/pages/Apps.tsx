import { useState } from 'react'
import { SUITE, tone } from '../data/apps'
import AppTile from '../components/AppTile'

export default function Apps() {
  const cats = ['All', ...Array.from(new Set(SUITE.map((a) => a.category)))]
  const [cat, setCat] = useState('All')
  const shown = SUITE.filter((a) => cat === 'All' || a.category === cat)

  return (
    <div className="wrap pt-14 sm:pt-20">
      <header className="rise grid gap-6 border-b rule-strong pb-10 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <div className="eyebrow">The suite · {String(SUITE.length).padStart(2, '0')} apps</div>
          <h1 className="mt-4 text-[44px] font-bold leading-none sm:text-[64px]">
            All <em>apps</em>
          </h1>
        </div>
        <p className="max-w-sm text-[15px] leading-relaxed text-muted">Every application in Orbit 360. Choose one to learn more, or launch it straight away.</p>
      </header>

      <div className="no-scrollbar mt-6 flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Filter by area">
        {cats.map((c) => {
          const apps = c === 'All' ? SUITE : SUITE.filter((a) => a.category === c)
          const t = c === 'All' ? null : apps[0].tone
          const on = cat === c
          return (
            <button
              key={c}
              role="tab"
              aria-selected={on}
              onClick={() => setCat(c)}
              className={`flex h-10 shrink-0 items-center gap-2 rounded-full border px-4 text-[13px] font-semibold transition-all ${on ? 'text-white' : 'rule-strong text-muted hover:text-ink'}`}
              style={
                on
                  ? {
                      background: t ? tone(t) : 'linear-gradient(100deg, rgb(var(--a-orange)), rgb(var(--a-pink)), rgb(var(--a-plum)))',
                      borderColor: 'transparent',
                      boxShadow: `0 8px 24px -10px ${t ? tone(t) : 'rgb(var(--a-pink))'}`,
                    }
                  : undefined
              }
            >
              {t && !on && <span className="h-2 w-2 rounded-full" style={{ background: tone(t) }} />}
              {c}
              <span className={`font-mono text-[10px] ${on ? 'opacity-80' : ''}`}>{apps.length}</span>
            </button>
          )
        })}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((a, i) => (
          <div key={a.id} className="rise flex" style={{ animationDelay: `${i * 50}ms` }}>
            <AppTile app={a} className="w-full" />
          </div>
        ))}
      </div>
    </div>
  )
}
