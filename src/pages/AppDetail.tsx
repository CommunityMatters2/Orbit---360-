import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Copy, PanelsTopLeft } from 'lucide-react'
import { findApp, indexOf, PILLARS, SUITE, tone } from '../data/apps'
import AppIcon from '../components/AppIcon'
import StatusBadge from '../components/StatusBadge'
import NotFound from './NotFound'

export default function AppDetail() {
  const { id } = useParams()
  const app = findApp(id)
  const [copied, setCopied] = useState(false)
  if (!app) return <NotFound />

  const i = SUITE.indexOf(app)
  const next = SUITE[(i + 1) % SUITE.length]
  const related = SUITE.filter((a) => a.id !== app.id && a.pillars.some((p) => app.pillars.includes(p))).slice(0, 3)

  return (
    <div className="wrap pt-10 sm:pt-14">
      <Link to="/apps" className="group inline-flex items-center gap-1.5 text-[13px] font-medium text-muted hover:text-ink">
        <ArrowLeft size={15} /> All apps
      </Link>

      <section className="rise mt-8 grid gap-12 border-b rule-strong pb-14 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <div className="flex items-center gap-4">
            <AppIcon app={app} size={72} />
            <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
              No. {indexOf(app)}
              <br />
              {app.category}
            </div>
          </div>
          <h1 className="mt-8 text-[44px] font-normal leading-[1.04] sm:text-[64px]">{app.name}</h1>
          <p className="mt-6 max-w-2xl text-[18px] leading-relaxed text-muted">{app.description}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            {app.url ? (
              <>
                <a href={app.url} target="_blank" rel="noreferrer" className="btn-ink">
                  Open {app.name.length > 22 ? 'app' : app.name} <ArrowUpRight size={16} className="arrow" />
                </a>
                <Link to={`/open/${app.id}`} className="btn-line">
                  <PanelsTopLeft size={16} /> View inside Orbit
                </Link>
              </>
            ) : (
              <div className="rounded-[8px] border border-dashed rule-strong px-5 py-4 text-[15px] text-muted">
                This app is in development. It will open here as soon as it launches.
              </div>
            )}
          </div>
        </div>

        <dl className="self-end text-[14px]">
          {[
            ['Status', <StatusBadge key="s" status={app.status} />],
            ['Area', app.category],
            [
              'Supports',
              <span key="p" className="flex flex-wrap justify-end gap-x-3 gap-y-1">
                {PILLARS.filter((p) => app.pillars.includes(p.key)).map((p) => (
                  <span key={p.key} className="inline-flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: tone(p.tone) }} />
                    {p.title}
                  </span>
                ))}
              </span>,
            ],
            [
              'Address',
              app.url ? (
                <span key="u" className="flex items-center justify-end gap-2">
                  <a href={app.url} target="_blank" rel="noreferrer" className="link-u max-w-[220px] truncate">
                    {app.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                  </a>
                  <button
                    onClick={() => {
                      navigator.clipboard?.writeText(app.url).then(
                        () => {
                          setCopied(true)
                          setTimeout(() => setCopied(false), 1400)
                        },
                        () => undefined,
                      )
                    }}
                    className="text-muted hover:text-ink"
                    aria-label="Copy link"
                    title="Copy link"
                  >
                    {copied ? <Check size={14} className="text-green" /> : <Copy size={14} />}
                  </button>
                </span>
              ) : (
                'Coming soon'
              ),
            ],
          ].map(([k, v]) => (
            <div key={String(k)} className="flex items-center justify-between gap-6 border-t rule py-4 first:border-t-0 lg:first:border-t">
              <dt className="eyebrow">{k}</dt>
              <dd className="text-right">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      {related.length > 0 && (
        <section className="mt-16">
          <div className="eyebrow">Works alongside</div>
          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            {related.map((a) => (
              <Link key={a.id} to={`/apps/${a.id}`} className="card card-hover group flex items-center gap-4 p-5">
                <AppIcon app={a} size={44} />
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-display text-[18px]">{a.name}</span>
                  <span className="block truncate text-[13px] text-muted">{a.category}</span>
                </span>
                <ArrowRight size={16} className="arrow-r text-muted" />
              </Link>
            ))}
          </div>
        </section>
      )}

      <Link to={`/apps/${next.id}`} className="group mt-16 flex items-center justify-between border-y rule py-8">
        <span>
          <span className="eyebrow">Next · {indexOf(next)}</span>
          <span className="mt-2 block font-display text-[28px] sm:text-[36px]">{next.name}</span>
        </span>
        <ArrowRight size={26} className="arrow-r text-muted group-hover:text-ink" />
      </Link>
    </div>
  )
}
