import { ROADMAP, STAGES } from '../data/roadmap'

const STAGE_TONE = { planned: 'plum', building: 'orange', live: 'green' } as const

export default function Roadmap() {
  return (
    <div className="wrap pt-14 sm:pt-20">
      <header className="rise grid gap-6 border-b rule-strong pb-10 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <div className="eyebrow">Roadmap</div>
          <h1 className="mt-4 text-[48px] font-normal leading-none sm:text-[68px]">
            What’s <em className="italic">next</em>
          </h1>
        </div>
        <p className="max-w-sm text-[15px] leading-relaxed text-muted">Where the suite is headed. Community Matters 2 updates this as work moves forward.</p>
      </header>

      <div className="mt-10 grid gap-8 lg:grid-cols-3 lg:gap-0">
        {STAGES.map((s, i) => {
          const items = ROADMAP.filter((r) => r.stage === s.key)
          const t = `rgb(var(--a-${STAGE_TONE[s.key]}))`
          return (
            <section key={s.key} className={`rise lg:px-6 ${i > 0 ? 'lg:border-l rule' : 'lg:pl-0'}`} style={{ animationDelay: `${i * 80}ms` }}>
              <div className="flex items-baseline justify-between border-b rule-strong pb-3">
                <h2 className="flex items-center gap-2.5 text-[24px] font-normal">
                  <span className="h-2 w-2 rounded-full" style={{ background: t }} />
                  {s.title}
                </h2>
                <span className="font-mono text-[11px] text-muted">{String(items.length).padStart(2, '0')}</span>
              </div>
              <p className="eyebrow mt-3">{s.text}</p>
              <ul className="mt-5 space-y-3">
                {items.map((r) => (
                  <li key={r.title} className="card p-5" style={{ boxShadow: `inset 2px 0 0 ${t}` }}>
                    <div className="font-display text-[18px] leading-snug">{r.title}</div>
                    <div className="mt-1 text-[14px] text-muted">{r.note}</div>
                  </li>
                ))}
              </ul>
            </section>
          )
        })}
      </div>
    </div>
  )
}
