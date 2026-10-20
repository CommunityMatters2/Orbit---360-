import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { PILLARS, SUITE, tone } from '../data/apps'
import AppIcon from '../components/AppIcon'

const MODULES: Record<string, string[]> = {
  outcomes: ['Program completion', 'Youth growth over time', 'Attendance trends'],
  records: ['Participant directory', 'Facility records', 'Organization documents'],
  insights: ['Survey themes', 'Live wall sentiment', 'Engagement by channel'],
  tracking: ['Daily camp check-ins', 'Course progress', 'Project milestones'],
}

export default function Insights() {
  const { hash } = useLocation()
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [hash])

  return (
    <div className="wrap pt-14 sm:pt-20">
      <header className="rise grid gap-6 border-b rule-strong pb-10 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <div className="eyebrow">Insights</div>
          <h1 className="mt-4 text-[48px] font-normal leading-none sm:text-[68px]">
            The <em className="italic">ORBIT</em> view
          </h1>
        </div>
        <p className="max-w-sm text-[15px] leading-relaxed text-muted">
          Each pillar shows the apps that feed it. Dashboards will appear here as the data behind each app comes online.
        </p>
      </header>

      <div>
        {PILLARS.map((p, i) => {
          const apps = SUITE.filter((a) => a.pillars.includes(p.key))
          return (
            <section key={p.key} id={p.key} className="rise grid scroll-mt-32 gap-8 border-b rule py-14 lg:grid-cols-[18rem_1fr]" style={{ animationDelay: `${i * 70}ms` }}>
              <div>
                <div className="font-display text-[88px] font-light italic leading-none" style={{ color: tone(p.tone) }}>
                  {p.letter}
                </div>
                <h2 className="mt-4 text-[30px] font-normal">{p.title}</h2>
                <p className="mt-2 max-w-xs text-[15px] leading-relaxed text-muted">{p.text}</p>
              </div>
              <div>
                <div className="grid gap-4 sm:grid-cols-3">
                  {MODULES[p.key].map((m) => (
                    <div key={m} className="card relative overflow-hidden p-5">
                      <div className="text-[15px] font-medium">{m}</div>
                      <svg viewBox="0 0 120 36" className="mt-6 h-9 w-full" aria-hidden>
                        <path d="M0 30 L120 30" stroke="currentColor" strokeOpacity=".15" strokeDasharray="2 3" />
                        <path d="M0 30 C 20 28, 30 20, 50 22 S 85 10, 120 8" fill="none" stroke={tone(p.tone, 0.35)} strokeWidth="1.5" strokeDasharray="3 3" />
                      </svg>
                      <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">Coming soon</div>
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <div className="eyebrow mb-3">Fed by</div>
                  <div className="flex flex-wrap gap-2">
                    {apps.map((a) => (
                      <Link key={a.id} to={`/apps/${a.id}`} className="group flex items-center gap-2.5 rounded-full border rule-strong py-1 pl-1 pr-4 text-[13px] transition-colors hover:border-ink">
                        <AppIcon app={a} size={26} />
                        {a.name}
                        <ArrowRight size={13} className="arrow-r text-muted" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}
