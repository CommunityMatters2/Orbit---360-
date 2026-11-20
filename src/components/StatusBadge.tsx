import { STATUS_LABEL, STATUS_TONE, tone, type AppStatus } from '../data/apps'

export default function StatusBadge({ status }: { status: AppStatus }) {
  const t = STATUS_TONE[status]
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full px-2.5 py-1 font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em]"
      style={{ color: tone(t), background: tone(t, 0.12), boxShadow: `inset 0 0 0 1px ${tone(t, 0.3)}` }}
    >
      <span className="relative flex h-1.5 w-1.5">
        {status === 'live' && <span className="absolute inset-0 animate-ping rounded-full opacity-70" style={{ background: tone(t) }} />}
        <span className="relative h-1.5 w-1.5 rounded-full" style={{ background: tone(t), boxShadow: `0 0 8px ${tone(t)}` }} />
      </span>
      {STATUS_LABEL[status]}
    </span>
  )
}
