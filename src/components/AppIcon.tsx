import type { OrbitApp } from '../data/apps'

export default function AppIcon({ app, size = 48, className = '' }: { app: OrbitApp; size?: number; className?: string }) {
  const style = { width: size, height: size, borderRadius: size * 0.3 }
  if (app.logo) {
    return (
      <div className={`grid shrink-0 place-items-center overflow-hidden bg-white ${className}`} style={{ ...style, boxShadow: `0 0 0 1px ${app.color}55, 0 8px 24px -8px ${app.color}` }}>
        <img src={app.logo} alt="" className="h-[86%] w-[86%] object-contain" draggable={false} />
      </div>
    )
  }
  return (
    <div
      className={`relative grid shrink-0 place-items-center overflow-hidden font-display font-bold text-white ${className}`}
      style={{
        ...style,
        fontSize: size * 0.36,
        background: `radial-gradient(circle at 30% 25%, ${app.color}, ${app.color}cc 45%, #0b1b4d 120%)`,
        boxShadow: `inset 0 1px 0 rgba(255,255,255,.35), 0 8px 24px -8px ${app.color}`,
      }}
    >
      <span className="relative z-10 drop-shadow">{app.short || app.name.slice(0, 2).toUpperCase()}</span>
      <span className="absolute -right-1/4 -top-1/4 h-3/4 w-3/4 rounded-full bg-white/20 blur-md" />
    </div>
  )
}
