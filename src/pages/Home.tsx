import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { indexOf, PILLARS, SUITE, tone } from '../data/apps'
import Orrery from '../components/Orrery'
import AppIcon from '../components/AppIcon'
import StatusBadge from '../components/StatusBadge'

export default function Home() {
  const [active, setActive] = useState<string | null>(null)
  const live = SUITE.filter((a) => a.status === 'live').length
  const stats = [
    { n: SUITE.length, l: 'Apps in the suite' },
    { n: live, l: 'Live today' },
    { n: SUITE.length - live, l: 'In development' },
    { n: new Set(SUITE.map((a) => a.category)).size, l: 'Areas served' },
  ]

  return (
    <>
      {/* HERO */}
      <section className="wrap grid items-center gap-10 pb-10 pt-12 lg:grid-cols-[1.05fr_1fr] lg:gap-6 lg:pt-20">
        <div>
          <div className="rise eyebrow flex flex-wrap gap-x-3 gap-y-1">
            {PILLARS.map((p) => (
              <span key={p.key} className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: tone(p.tone) }} />
                {p.title}
              </span>
            ))}
          </div>
          <h1 className="rise mt-7 text-[46px] font-normal leading-[1.02] sm:text-[64px] xl:text-[80px]" style={{ animationDelay: '80ms' }}>
            Every Community Matters&nbsp;2 tool, <em className="font-light italic text-orange">in one orbit.</em>
          </h1>
          <p className="rise mt-7 max-w-[34rem] text-[17px] leading-relaxed text-muted" style={{ animationDelay: '160ms' }}>
            Orbit 360 is the home for the applications that power our programs: youth camp, academy, community surveys, live displays and more.
            Find one, open it, and get to work.
          </p>
          <div className="rise mt-9 flex flex-wrap items-center gap-3" style={{ animationDelay: '240ms' }}>
            <Link to="/apps" className="btn-ink">
              Browse the suite <ArrowRight size={16} className="arrow-r" />
            </Link>
            <a href="https://www.communitymatters2.org/" target="_blank" rel="noreferrer" className="btn-line">
              About Community Matters 2 <ArrowUpRight size={16} className="arrow" />
            </a>
          </div>
        </div>
        <Orrery apps={SUITE} active={active} onActive={setActive} />
      </section>

      {/* STATS */}
      <section className="wrap">
        <dl className="grid grid-cols-2 border-y rule md:grid-cols-4">
          {stats.map((s, i) => (
            <div key={s.l} className={`px-1 py-7 sm:px-6 ${i % 2 ? 'border-l rule' : ''} ${i > 1 ? 'border-t rule md:border-t-0' : ''} ${i === 2 ? 'md:border-l' : ''}`}>
              <dt className="eyebrow">{s.l}</dt>
              <dd className="mt-2 font-display text-[44px] font-light leading-none tracking-tight">{String(s.n).padStart(2, '0')}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* INDEX */}
      <section className="wrap mt-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="eyebrow">Index</div>
            <h2 className="mt-3 text-[36px] font-normal leading-tight sm:text-[44px]">The suite</h2>
          </div>
          <Link to="/apps" className="group inline-flex items-center gap-1.5 text-[14px] font-medium">
            <span className="link-u">View as cards</span> <ArrowRight size={15} className="arrow-r" />
          </Link>
        </div>

        <ol className="mt-10 border-t rule-strong">
          {SUITE.map((a) => {
            const on = active === a.id
            return (
              <li key={a.id} className="border-b rule" onMouseEnter={() => setActive(a.id)} onMouseLeave={() => setActive(null)}>
                <Link
                  to={`/apps/${a.id}`}
                  onFocus={() => setActive(a.id)}
                  onBlur={() => setActive(null)}
                  className="group relative grid grid-cols-[auto_1fr_auto] items-center gap-4 py-5 transition-[padding] duration-300 sm:grid-cols-[3rem_auto_1fr_10rem_10rem_auto] sm:gap-6 sm:hover:pl-3"
                >
                  <span
                    className="absolute inset-y-0 left-0 w-[2px] origin-top transition-transform duration-300"
                    style={{ background: tone(a.tone), transform: on ? 'scaleY(1)' : 'scaleY(0)' }}
                  />
                  <span className="hidden font-mono text-[12px] text-muted sm:block">{indexOf(a)}</span>
                  <AppIcon app={a} size={44} />
                  <span className="min-w-0">
                    <span className="block truncate font-display text-[20px] leading-snug sm:text-[24px]">{a.name}</span>
                    <span className="block truncate text-[14px] text-muted">{a.tagline}</span>
                  </span>
                  <span className="hidden font-mono text-[11px] uppercase tracking-[0.12em] text-muted sm:block">{a.category}</span>
                  <span className="hidden sm:block">
                    <StatusBadge status={a.status} />
                  </span>
                  <ArrowRight size={18} className="arrow-r text-muted group-hover:text-ink" />
                </Link>
              </li>
            )
          })}
        </ol>
      </section>

      {/* PILLARS */}
      <section className="wrap mt-28">
        <div className="eyebrow">What ORBIT stands for</div>
        <h2 className="mt-3 max-w-3xl text-[36px] font-normal leading-tight sm:text-[44px]">
          Four ways the suite helps us <em className="italic">see the whole community.</em>
        </h2>
        <div className="mt-12 grid border-t rule-strong sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p, i) => (
            <Link
              key={p.key}
              to={`/insights#${p.key}`}
              className={`group relative py-8 pr-6 sm:px-6 ${i > 0 ? 'border-t rule sm:border-t-0' : ''} ${i % 2 ? 'sm:border-l' : ''} ${i === 2 ? 'sm:border-t lg:border-l lg:border-t-0' : ''} ${i === 3 ? 'sm:border-t lg:border-t-0' : ''} rule`}
            >
              <div className="font-display text-[72px] font-light italic leading-none" style={{ color: tone(p.tone) }}>
                {p.letter}
              </div>
              <h3 className="mt-6 text-[22px] font-medium">{p.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{p.text}</p>
              <span className="mt-5 inline-flex items-center gap-1 text-[13px] font-medium text-muted group-hover:text-ink">
                {SUITE.filter((a) => a.pillars.includes(p.key)).length} apps <ArrowRight size={14} className="arrow-r" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* CLOSING BAND */}
      <section className="wrap mt-28">
        <div className="relative overflow-hidden rounded-[12px] border border-white/10 bg-[#101935] px-6 py-14 text-[#ECE8DE] sm:px-14">
          <svg className="absolute -right-24 -top-24 h-[420px] w-[420px] opacity-[0.14]" viewBox="0 0 200 200" aria-hidden>
            <circle cx="100" cy="100" r="30" fill="none" stroke="currentColor" />
            <ellipse cx="100" cy="100" rx="90" ry="34" fill="none" stroke="currentColor" transform="rotate(-14 100 100)" />
            <ellipse cx="100" cy="100" rx="64" ry="24" fill="none" stroke="currentColor" strokeDasharray="2 4" transform="rotate(-14 100 100)" />
          </svg>
          <div className="relative max-w-2xl">
            <div className="font-mono text-[11px] uppercase tracking-[0.16em] opacity-60">Community Matters 2 Inc.</div>
            <h2 className="mt-4 text-[34px] font-normal leading-tight sm:text-[44px]">
              Built for the community, <em className="italic text-[#F29A55]">by the community.</em>
            </h2>
            <p className="mt-4 max-w-xl text-[16px] leading-relaxed opacity-70">
              Every app in Orbit 360 exists to serve the youth, families and neighbors of Community Matters 2. Learn more about our mission and how to get involved.
            </p>
            <a
              href="https://www.communitymatters2.org/"
              target="_blank"
              rel="noreferrer"
              className="btn mt-8 bg-[#ECE8DE] text-[#101935] hover:bg-white"
            >
              Visit communitymatters2.org <ArrowUpRight size={16} className="arrow" />
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
