import { STATUS_META, type AppStatus } from '../data/apps'

export default function StatusBadge({ status }: { status: AppStatus }) {
  const m = STATUS_META[status]
  return (
    <span className="chip" style={{ color: m.color, background: `${m.color}1f`, border: `1px solid ${m.color}40` }}>
      <span className="relative flex h-1.5 w-1.5">
        {status === 'live' && <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-70" style={{ background: m.color }} />}
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ background: m.color }} />
      </span>
      {m.label}
    </span>
  )
}
