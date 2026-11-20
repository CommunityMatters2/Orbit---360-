import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Command } from 'lucide-react'
import { grad, PILLARS, SUITE, tone, type Tone } from '../data/apps'
import Orrery from '../components/Orrery'
import AppIcon from '../components/AppIcon'
import AppTile from '../components/AppTile'
import { useUI } from '../ui'

export default function Home() {
  const { setSearchOpen } = useUI()
  const [active, setActive] = useState<string | null>(null)
  const live = SUITE.filter((a) => a.status === 'live').length
  const stats: { n: number; l: string; t: Tone }[] = [
    { n: SUITE.length, l: 'Apps in the suite', t: 'plum' },
    { n: live, l: 'Live right now', t: 'green' },
    { n: SUITE.length - live, l: 'In development', t: 'orange' },
    { n: new Set(SUITE.map((a) => a.category)).size, l: 'Areas served', t: 'teal' },
  ]

  // Launch deck layout: one hero tile, four compact tiles beside it, the rest share the last row.
  const hero = SUITE.find((a) => a.featured) ?? SUITE[0]
  const rest = SUITE.filter((a) => a !== hero)
  const tail = rest.slice(4)
  const tailSpan = tail.length === 1 ? 'lg:col-span-4' : tail.length === 2 ? 'lg:col-span-2' : tail.length === 4 ? '' : ''

  return (
    <>
      {/* HERO */}
      <section className="wrap grid items-center gap-8 pb-8 pt-10 lg:grid-cols-[1.05fr_1fr] lg:gap-4 lg:pt-16">
        <div className="min-w-0">
          <div className="rise chip text-ink">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-green opacity-70" />
              <span className="relative h-2 w-2 rounded-full bg-green shadow-[0_0_10px_rgb(var(--a-green))]" />
            </span>
            All systems online · {String(live).padStart(2, '0')}/{String(SUITE.length).padStart(2, '0')} apps live
          </div>
          <h1 className="rise mt-7 text-[36px] font-bold leading-[1.02] sm:text-[52px] xl:text-[64px]" style={{ animationDelay: '80ms' }}>
            Every Community Matters&nbsp;2 tool, <em>in one orbit.</em>
          </h1>
          <p className="rise mt-6 max-w-[34rem] text-[17px] leading-relaxed text-muted" style={{ animationDelay: '160ms' }}>
            Orbit 360 is the launchpad for the apps that power our programs: youth camp, academy, community surveys, live displays and more. Pick one and
            launch.
          </p>
          <div className="rise mt-8 flex flex-wrap items-center gap-3" style={{ animationDelay: '240ms' }}>
            <a href="#deck" className="btn-ink">
              Open the launch deck <ArrowRight size={16} className="arrow-r" />
            </a>
            <button onClick={() => setSearchOpen(true)} className="btn-line">
              <Command size={15} /> Quick find
            </button>
          </div>
          <div className="rise mt-9 grid max-w-[34rem] grid-cols-2 gap-2 sm:grid-cols-4" style={{ animationDelay: '320ms' }}>
            {PILLARS.map((p) => (
              <Link
                key={p.key}
                to={`/insights#${p.key}`}
                className="group rounded-[14px] border px-3 py-2.5 transition-colors"
                style={{ borderColor: tone(p.tone, 0.3), background: tone(p.tone, 0.08) }}
              >
                <span className="block font-display text-[18px] font-bold leading-none" style={{ color: tone(p.tone) }}>
                  {p.letter}
                </span>
                <span className="mt-1.5 block truncate font-mono text-[9.5px] uppercase tracking-[0.12em] text-muted group-hover:text-ink">{p.title}</span>
              </Link>
            ))}
          </div>
        </div>
        <Orrery apps={SUITE} active={active} onActive={setActive} />
      </section>

      {/* SIGNAL STRIP */}
      <section className="relative -left-[2%] my-6 w-[104%] -rotate-[1.2deg] overflow-hidden border-y rule bg-spectrum py-3 text-white shadow-[0_20px_60px_-30px_rgb(var(--a-pink))]" aria-label="Apps in the suite">
        <div className="marquee flex w-max gap-10 whitespace-nowrap font-display text-[15px] font-semibold uppercase tracking-tight sm:text-[18px]">
          {[...SUITE, ...SUITE].map((a, i) => (
            <span key={i} className="flex items-center gap-10" aria-hidden={i >= SUITE.length}>
              {a.name}
              <span className="text-[12px] opacity-70">✦</span>
            </span>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="wrap mt-14">
        <dl className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {stats.map((s) => (
            <div key={s.l} className="card relative overflow-hidden p-5 sm:p-6">
              <span className="absolute -left-10 -top-10 h-32 w-32 rounded-full blur-2xl" style={{ background: tone(s.t, 0.35) }} />
              <dt className="eyebrow relative">{s.l}</dt>
              <dd
                className="relative mt-3 font-display text-[48px] font-bold leading-none tracking-tighter sm:text-[60px]"
                style={{ background: grad(s.t), WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}
              >
                {String(s.n).padStart(2, '0')}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* LAUNCH DECK */}
      <section id="deck" className="wrap mt-24 scroll-mt-28">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="eyebrow">Launch deck</div>
            <h2 className="mt-3 text-[30px] font-bold leading-tight sm:text-[44px]">
              The whole suite, <em>ready to launch.</em>
            </h2>
          </div>
          <Link to="/apps" className="group inline-flex items-center gap-1.5 text-[14px] font-semibold">
            <span className="link-u">Browse by area</span> <ArrowRight size={15} className="arrow-r" />
          </Link>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <AppTile app={hero} hero className="sm:col-span-2 lg:row-span-2" onHover={setActive} />
          {rest.slice(0, 4).map((a) => (
            <AppTile key={a.id} app={a} onHover={setActive} />
          ))}
          {tail.map((a) => (
            <AppTile key={a.id} app={a} className={tailSpan} onHover={setActive} />
          ))}
        </div>
      </section>

      {/* PILLARS */}
      <section className="wrap mt-28">
        <div className="eyebrow">What ORBIT stands for</div>
        <h2 className="mt-3 max-w-3xl text-[30px] font-bold leading-tight sm:text-[44px]">
          Four ways the suite helps us <em>see the whole community.</em>
        </h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p) => {
            const apps = SUITE.filter((a) => a.pillars.includes(p.key))
            return (
              <Link key={p.key} to={`/insights#${p.key}`} className="card card-hover group relative isolate overflow-hidden p-6">
                <span className="absolute -bottom-16 -right-16 -z-10 h-48 w-48 rounded-full blur-3xl" style={{ background: tone(p.tone, 0.4) }} />
                <div
                  className="font-display text-[64px] font-extrabold leading-none tracking-tighter"
                  style={{ background: grad(p.tone), WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}
                >
                  {p.letter}
                </div>
                <h3 className="mt-5 text-[18px] font-semibold">{p.title}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{p.text}</p>
                <div className="mt-6 flex items-center justify-between">
                  <span className="flex -space-x-2">
                    {apps.map((a) => (
                      <span key={a.id} className="rounded-[12px] ring-2 ring-surface">
                        <AppIcon app={a} size={30} />
                      </span>
                    ))}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[13px] font-semibold" style={{ color: tone(p.tone) }}>
                    {apps.length} apps <ArrowRight size={14} className="arrow-r" />
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* CLOSING BAND */}
      <section className="wrap mt-28">
        <div className="relative isolate overflow-hidden rounded-[28px] bg-spectrum p-[2px] shadow-[0_40px_100px_-40px_rgb(var(--a-plum))]">
          <div className="relative overflow-hidden rounded-[26px] bg-[#0A0F26] px-6 py-14 text-white sm:px-14 sm:py-16">
            <span className="absolute -right-24 -top-24 -z-0 h-80 w-80 rounded-full bg-spectrum opacity-40 blur-3xl" />
            <svg className="spin-slow absolute -right-20 -top-20 h-[380px] w-[380px] opacity-25" viewBox="0 0 200 200" aria-hidden>
              <circle cx="100" cy="100" r="30" fill="none" stroke="white" />
              <ellipse cx="100" cy="100" rx="90" ry="34" fill="none" stroke="white" transform="rotate(-16 100 100)" />
              <ellipse cx="100" cy="100" rx="64" ry="24" fill="none" stroke="white" strokeDasharray="2 4" transform="rotate(-16 100 100)" />
            </svg>
            <div className="relative max-w-2xl">
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/60">Community Matters 2 Inc.</div>
              <h2 className="mt-4 text-[28px] font-bold leading-tight sm:text-[42px]">
                Built for the community, <em>by the community.</em>
              </h2>
              <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-white/70">
                Every app in Orbit 360 exists to serve the youth, families and neighbors of Community Matters 2. Learn more about our mission and how to get involved.
              </p>
              <a href="https://www.communitymatters2.org/" target="_blank" rel="noreferrer" className="btn mt-8 bg-white text-[#0A0F26] hover:bg-white/90">
                Visit communitymatters2.org <ArrowUpRight size={16} className="arrow" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
