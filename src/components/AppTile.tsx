import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { grad, indexOf, PILLARS, tone, type OrbitApp } from '../data/apps'
import AppIcon from './AppIcon'
import StatusBadge from './StatusBadge'

// A launch-deck tile: each app glows in its own gradient. `hero` tiles are larger.
export default function AppTile({ app, hero = false, className = '', onHover }: { app: OrbitApp; hero?: boolean; className?: string; onHover?: (id: string | null) => void }) {
  const pillars = PILLARS.filter((p) => app.pillars.includes(p.key))
  return (
    <article
      className={`card card-hover group relative isolate flex min-w-0 flex-col overflow-hidden p-6 ${hero ? 'sm:p-8' : ''} ${className}`}
      onMouseEnter={() => onHover?.(app.id)}
      onMouseLeave={() => onHover?.(null)}
    >
      {/* color field */}
      <span className="absolute inset-x-0 top-0 -z-10 h-[3px]" style={{ background: grad(app.tone, 1, 90) }} />
      <span
        className="absolute -right-16 -top-20 -z-10 h-64 w-64 rounded-full blur-3xl transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: grad(app.tone, 0.55), opacity: 0.55 }}
      />
      {hero && (
        <span
          className="pointer-events-none absolute -bottom-10 -right-4 -z-10 font-display font-extrabold leading-none tracking-tighter"
          style={{ fontSize: 220, background: grad(app.tone, 0.16), WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}
          aria-hidden
        >
          {app.short}
        </span>
      )}

      <div className="flex items-start justify-between gap-3">
        <AppIcon app={app} size={hero ? 68 : 52} />
        <span className="chip text-muted">
          <span className="text-ink">{indexOf(app)}</span> · {app.category}
        </span>
      </div>

      <h3 className={`mt-6 font-semibold leading-[1.15] ${hero ? 'text-[26px] sm:text-[34px]' : 'text-[18px] sm:text-[19px]'}`}>
        <Link to={`/apps/${app.id}`} className="after:absolute after:inset-0">
          {app.name}
        </Link>
      </h3>
      <p className={`mt-2 leading-relaxed text-muted ${hero ? 'max-w-md text-[16px]' : 'text-[14px]'}`}>{hero ? app.description : app.tagline}</p>

      {hero && (
        <div className="mt-5 flex flex-wrap gap-2">
          {pillars.map((p) => (
            <span key={p.key} className="chip" style={{ color: tone(p.tone), borderColor: tone(p.tone, 0.35), background: tone(p.tone, 0.1) }}>
              {p.title}
            </span>
          ))}
        </div>
      )}

      <div className="min-h-6 flex-1" />
      <div className="mt-4 flex items-center justify-between gap-3 border-t rule pt-4">
        <StatusBadge status={app.status} />
        {app.url ? (
          <a
            href={app.url}
            target="_blank"
            rel="noreferrer"
            className="btn relative z-10 h-9 px-4 text-[13px] text-white"
            style={{ background: grad(app.tone), boxShadow: `0 8px 22px -10px ${tone(app.tone, 0.9)}` }}
            aria-label={`Launch ${app.name} in a new tab`}
          >
            Launch <ArrowUpRight size={14} className="arrow" />
          </a>
        ) : (
          <span className="inline-flex items-center gap-1 text-[13px] font-medium text-muted">
            Details <ArrowRight size={14} className="arrow-r" />
          </span>
        )}
      </div>
    </article>
  )
}
