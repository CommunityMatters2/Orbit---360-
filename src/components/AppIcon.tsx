import { tone, type OrbitApp } from '../data/apps'

export default function AppIcon({ app, size = 48 }: { app: OrbitApp; size?: number }) {
  const box = { width: size, height: size, borderRadius: Math.round(size * 0.22) }
  if (app.logo) {
    return (
      <span className="grid shrink-0 place-items-center overflow-hidden border bg-white rule" style={box}>
        <img src={app.logo} alt="" className="h-[82%] w-[82%] object-contain" draggable={false} />
      </span>
    )
  }
  return (
    <span
      className="grid shrink-0 place-items-center font-display font-semibold"
      style={{ ...box, fontSize: size * 0.4, color: tone(app.tone), background: tone(app.tone, 0.1), boxShadow: `inset 0 0 0 1px ${tone(app.tone, 0.28)}` }}
      aria-hidden
    >
      {app.short}
    </span>
  )
}
