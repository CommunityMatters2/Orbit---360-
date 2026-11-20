import { grad, tone, type OrbitApp } from '../data/apps'

export default function AppIcon({ app, size = 48 }: { app: OrbitApp; size?: number }) {
  const box = { width: size, height: size, borderRadius: Math.round(size * 0.3) }
  if (app.logo) {
    return (
      <span
        className="grid shrink-0 place-items-center overflow-hidden bg-white"
        style={{ ...box, boxShadow: `0 0 0 2px ${tone(app.tone, 0.7)}, 0 8px 24px -8px ${tone(app.tone, 0.6)}` }}
      >
        <img src={app.logo} alt="" className="h-[82%] w-[82%] object-contain" draggable={false} />
      </span>
    )
  }
  return (
    <span
      className="grid shrink-0 place-items-center font-display font-bold tracking-tight text-white"
      style={{
        ...box,
        fontSize: size * 0.34,
        background: grad(app.tone),
        boxShadow: `inset 0 1px 0 rgb(255 255 255 / 0.35), 0 8px 24px -8px ${tone(app.tone, 0.7)}`,
        textShadow: '0 1px 2px rgb(0 0 0 / 0.25)',
      }}
      aria-hidden
    >
      {app.short}
    </span>
  )
}
