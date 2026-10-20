import { BarChart3, ClipboardList, Eye, Plug, Route } from 'lucide-react'
import { useApps } from '../store/useApps'
import AppIcon from '../components/AppIcon'

// Each ORBIT pillar and which app categories feed it.
const PILLARS = [
  {
    key: 'O',
    title: 'Outcomes',
    color: '#1E5BD8',
    icon: BarChart3,
    blurb: 'Program results across camp and academy — attendance, completion and growth.',
    feeds: ['Programs', 'Education'],
    modules: ['Program completion', 'Youth growth over time', 'Attendance trends'],
  },
  {
    key: 'R',
    title: 'Records',
    color: '#6CC04A',
    icon: ClipboardList,
    blurb: 'A single source of truth for participants, facilities and the organization.',
    feeds: ['Organization', 'Facilities', 'Programs'],
    modules: ['Participant directory', 'Facility records', 'Documents'],
  },
  {
    key: 'BI',
    title: 'Behavioral Insights',
    color: '#F58220',
    icon: Eye,
    blurb: 'What the community says and how it engages — survey and live-wall signals.',
    feeds: ['Engagement', 'Media'],
    modules: ['Survey themes', 'Sentiment on the live wall', 'Engagement by channel'],
  },
  {
    key: 'T',
    title: 'Tracking',
    color: '#38BDF8',
    icon: Route,
    blurb: 'Follow daily activity: camp check-ins, course progress and project milestones.',
    feeds: ['Programs', 'Education', 'Facilities'],
    modules: ['Daily check-ins', 'Course progress', 'Project milestones'],
  },
]

export default function Insights() {
  const { apps, setDetails } = useApps()

  return (
    <div className="mx-auto max-w-7xl">
      <div className="text-xs font-semibold uppercase tracking-[0.2em] text-orbit-orange">Insights</div>
      <h1 className="mt-1 font-display text-4xl font-bold tracking-tight">
        The <span className="gradient-text">ORBIT</span> view
      </h1>
      <p className="mt-2 max-w-2xl text-muted">
        Outcomes, Records, Behavioral Insights &amp; Tracking. Each pillar shows the apps that feed it. Dashboards light up here as data sources are connected.
      </p>

      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        {PILLARS.map((p) => {
          const sources = apps.filter((a) => p.feeds.includes(a.category))
          const Icon = p.icon
          return (
            <section key={p.key} className="glass relative overflow-hidden rounded-3xl p-6">
              <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full opacity-25 blur-3xl" style={{ background: p.color }} />
              <div className="relative flex items-start gap-4">
                <div className="grid h-12 w-12 place-items-center rounded-2xl text-white" style={{ background: p.color, boxShadow: `0 10px 30px -10px ${p.color}` }}>
                  <Icon size={22} />
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-xl font-bold" style={{ color: p.color }}>
                      {p.key}
                    </span>
                    <h2 className="font-display text-xl font-semibold">{p.title}</h2>
                  </div>
                  <p className="mt-1 text-sm text-muted">{p.blurb}</p>
                </div>
              </div>

              <div className="relative mt-6 grid gap-2 sm:grid-cols-3">
                {p.modules.map((m) => (
                  <div key={m} className="rounded-xl border border-dashed border-soft p-3">
                    <div className="text-sm font-medium">{m}</div>
                    <div className="mt-3 flex h-10 items-end gap-1 opacity-40" aria-hidden>
                      {[3, 5, 4, 7, 6, 8].map((h, i) => (
                        <div key={i} className="flex-1 rounded-sm" style={{ height: `${h * 10}%`, background: p.color, opacity: 0.25 + i * 0.1 }} />
                      ))}
                    </div>
                    <div className="mt-2 text-[11px] uppercase tracking-wider text-muted">No data connected</div>
                  </div>
                ))}
              </div>

              <div className="relative mt-6">
                <div className="label flex items-center gap-1.5">
                  <Plug size={12} /> Feeding apps
                </div>
                {sources.length ? (
                  <div className="flex flex-wrap gap-2">
                    {sources.map((a) => (
                      <button key={a.id} onClick={() => setDetails(a)} className="flex items-center gap-2 rounded-full border border-soft py-1 pl-1 pr-3 text-xs transition hover:border-orbit-blue/50">
                        <AppIcon app={a} size={22} />
                        {a.name}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-muted">No apps in these categories yet.</div>
                )}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}
