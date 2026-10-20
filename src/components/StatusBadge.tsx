import { STATUS_LABEL, STATUS_TONE, tone, type AppStatus } from '../data/apps'

export default function StatusBadge({ status }: { status: AppStatus }) {
  const t = STATUS_TONE[status]
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.12em]" style={{ color: tone(t) }}>
      <span className="relative flex h-1.5 w-1.5">
        {status === 'live' && <span className="absolute inset-0 animate-ping rounded-full opacity-60" style={{ background: tone(t) }} />}
        <span className="relative h-1.5 w-1.5 rounded-full" style={{ background: tone(t) }} />
      </span>
      {STATUS_LABEL[status]}
    </span>
  )
}
