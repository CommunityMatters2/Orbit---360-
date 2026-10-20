import { motion } from 'framer-motion'
import { ArrowRight, Clock, Command, Pin, Plus, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useApps } from '../store/useApps'
import OrbitSystem from '../components/OrbitSystem'
import AppCard from '../components/AppCard'
import AppIcon from '../components/AppIcon'

const PILLARS = [
  { letter: 'O', word: 'Outcomes', color: '#1E5BD8', text: 'See what changes for the youth and families we serve.' },
  { letter: 'R', word: 'Records', color: '#6CC04A', text: 'One trusted home for people, programs and places.' },
  { letter: 'BI', word: 'Behavioral Insights', color: '#F58220', text: 'Understand what the community tells us, live.' },
  { letter: 'T', word: 'Tracking', color: '#38BDF8', text: 'Follow every camp day, course and project.' },
]

function greeting() {
  const h = new Date().getHours()
  return h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening'
}

export default function Home() {
  const { apps, recent, setDetails, setEditing, setPaletteOpen, launch } = useApps()
  const pinned = apps.filter((a) => a.pinned)
  const recentApps = recent.map((id) => apps.find((a) => a.id === id)).filter((a): a is NonNullable<typeof a> => !!a)
  const live = apps.filter((a) => a.status === 'live').length
  const building = apps.filter((a) => a.status !== 'live').length
  const categories = new Set(apps.map((a) => a.category)).size

  return (
    <div className="mx-auto max-w-7xl">
      {/* HERO */}
      <section className="relative grid items-center gap-6 lg:grid-cols-[1fr_1.1fr] lg:gap-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative z-10 pt-4 lg:pt-0">
          <div className="glass inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium">
            <Sparkles size={14} className="text-orbit-orange" />
            {greeting()} — welcome to the CM2 suite
          </div>
          <h1 className="mt-5 font-display text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl xl:text-7xl">
            Every CM2 app.
            <br />
            <span className="gradient-text">One orbit.</span>
          </h1>
          <p className="mt-5 max-w-lg text-lg text-muted">
            Orbit 360 brings every Community Matters 2 tool into one launchpad — camps, academy, surveys, live walls and more. Open anything in a click, and
            add new apps as the community grows.
          </p>

          <div className="mt-6 flex flex-wrap gap-1.5 font-display text-sm font-semibold">
            {PILLARS.map((p) => (
              <span key={p.word} className="rounded-lg px-2.5 py-1" style={{ color: p.color, background: `${p.color}18` }}>
                {p.word.split(' ').map((w, i) => (
                  <span key={w}>
                    {i > 0 && ' '}
                    <span className="font-bold underline decoration-2 underline-offset-4">{w[0]}</span>
                    {w.slice(1)}
                  </span>
                ))}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/apps" className="btn-primary px-5 py-3 text-[15px]">
              Explore the suite <ArrowRight size={17} />
            </Link>
            <button onClick={() => setEditing('new')} className="btn-ghost px-5 py-3 text-[15px]">
              <Plus size={17} /> Add an app
            </button>
            <button onClick={() => setPaletteOpen(true)} className="btn-ghost hidden px-4 py-3 sm:inline-flex" title="Command palette">
              <Command size={16} /> K
            </button>
          </div>

          <dl className="mt-10 grid max-w-md grid-cols-3 gap-3">
            {[
              { k: 'Apps live', v: live, c: '#6CC04A' },
              { k: 'In the works', v: building, c: '#F58220' },
              { k: 'Categories', v: categories, c: '#4F8BFF' },
            ].map((s) => (
              <div key={s.k} className="glass rounded-2xl p-4">
                <dt className="text-[11px] uppercase tracking-wider text-muted">{s.k}</dt>
                <dd className="mt-1 font-display text-3xl font-bold" style={{ color: s.c }}>
                  {s.v}
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, ease: 'easeOut' }} className="relative">
          <OrbitSystem apps={apps} onSelect={setDetails} />
        </motion.div>
      </section>

      {/* PINNED */}
      <section className="mt-16">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-orbit-orange">
              <Pin size={13} /> Pinned
            </div>
            <h2 className="mt-1 font-display text-2xl font-bold">Your launchpad</h2>
          </div>
          <Link to="/apps" className="flex items-center gap-1 text-sm text-muted hover:text-[var(--text)]">
            All apps <ArrowRight size={14} />
          </Link>
        </div>
        {pinned.length ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {pinned.map((a) => (
              <AppCard key={a.id} app={a} />
            ))}
          </div>
        ) : (
          <div className="glass rounded-2xl p-8 text-center text-muted">Pin apps from the library to keep them here.</div>
        )}
      </section>

      {/* RECENT */}
      {recentApps.length > 0 && (
        <section className="mt-14">
          <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            <Clock size={13} /> Recently launched
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
            {recentApps.map((a) => (
              <button key={a.id} onClick={() => launch(a)} className="glass flex shrink-0 items-center gap-3 rounded-2xl py-2.5 pl-2.5 pr-5 transition hover:-translate-y-0.5">
                <AppIcon app={a} size={36} />
                <span className="text-sm font-medium">{a.name}</span>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* PILLARS */}
      <section className="mt-16">
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-orbit-green">What ORBIT stands for</div>
        <h2 className="mt-1 font-display text-2xl font-bold">Outcomes, Records, Behavioral Insights &amp; Tracking</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.word}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass group relative overflow-hidden rounded-2xl p-6"
            >
              <div className="absolute -right-6 -top-8 font-display text-[120px] font-bold leading-none opacity-[0.08] transition group-hover:opacity-20" style={{ color: p.color }}>
                {p.letter}
              </div>
              <div className="h-1 w-10 rounded-full" style={{ background: p.color }} />
              <h3 className="mt-4 font-display text-lg font-semibold">{p.word}</h3>
              <p className="mt-2 text-sm text-muted">{p.text}</p>
            </motion.div>
          ))}
        </div>
        <Link to="/insights" className="mt-5 inline-flex items-center gap-1 text-sm text-muted hover:text-[var(--text)]">
          Open Insights <ArrowRight size={14} />
        </Link>
      </section>

      <footer className="mt-20 flex flex-col items-center gap-3 border-t border-soft pt-8 text-center text-xs text-muted sm:flex-row sm:justify-between sm:text-left">
        <div className="flex items-center gap-3">
          <img src="/logos/cm2.png" alt="" className="h-8 w-8 rounded-full bg-white" />
          <span>Orbit 360 · Community Matters 2 Inc.</span>
        </div>
        <a href="https://www.communitymatters2.org/" target="_blank" rel="noreferrer" className="hover:text-[var(--text)]">
          communitymatters2.org
        </a>
      </footer>
    </div>
  )
}
