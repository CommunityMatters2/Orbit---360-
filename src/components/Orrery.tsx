import { useEffect, useMemo, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { grad, indexOf, STATUS_LABEL, tone, type OrbitApp } from '../data/apps'
import AppIcon from './AppIcon'

// Mission-control view of the suite: every app travels on one of three lit orbits around the CM2 core.
const V = 600 // viewBox size
const C = V / 2
const TILT = -16
const ORBITS = [
  { rx: 126, speed: 0.000105, from: 'orange', to: 'pink' },
  { rx: 186, speed: -0.00007, from: 'plum', to: 'blue' },
  { rx: 242, speed: 0.000048, from: 'teal', to: 'gold' },
]
const RY = 0.42

interface Props {
  apps: OrbitApp[]
  active: string | null
  onActive: (id: string | null) => void
}

export default function Orrery({ apps, active, onActive }: Props) {
  const nav = useNavigate()
  const nodes = useRef<(HTMLButtonElement | null)[]>([])
  const activeRef = useRef(active)
  activeRef.current = active

  const placed = useMemo(() => {
    const rings: OrbitApp[][] = [[], [], []]
    apps.forEach((a, i) => rings[i % 3].push(a))
    return rings.flatMap((list, r) => list.map((app, k) => ({ app, r, offset: (k / list.length) * Math.PI * 2 + r * 1.1 + 0.4 })))
  }, [apps])

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const rad = (TILT * Math.PI) / 180
    let raf = 0
    let t = 0
    let last = performance.now()
    const frame = (now: number) => {
      if (!activeRef.current && !reduce) t += now - last
      last = now
      placed.forEach((p, i) => {
        const el = nodes.current[i]
        if (!el) return
        const o = ORBITS[p.r]
        const th = p.offset + t * o.speed
        const x0 = Math.cos(th) * o.rx
        const y0 = Math.sin(th) * o.rx * RY
        const x = C + x0 * Math.cos(rad) - y0 * Math.sin(rad)
        const y = C + x0 * Math.sin(rad) + y0 * Math.cos(rad)
        const depth = (Math.sin(th) + 1) / 2 // 0 = far side, 1 = near side
        const hidden = depth < 0.5 && Math.abs(x0) < 74
        const on = activeRef.current === p.app.id
        el.style.left = `${(x / V) * 100}%`
        el.style.top = `${(y / V) * 100}%`
        el.dataset.side = x > C + 40 ? 'left' : 'right'
        el.style.zIndex = on ? '40' : depth > 0.5 ? '30' : '10'
        el.style.opacity = hidden ? '0.2' : String(0.55 + depth * 0.45)
        el.style.transform = `translate(-50%, -50%) scale(${on ? 1.2 : 0.72 + depth * 0.32})`
      })
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(raf)
  }, [placed])

  const ticks = Array.from({ length: 120 }, (_, i) => i * 3)

  return (
    <figure className="fade relative mx-auto w-full max-w-[620px] select-none">
      <div className="relative aspect-square w-full text-ink">
        {/* spectrum halo + radar sweep */}
        <div
          className="spin-slow absolute inset-[2.5%] rounded-full opacity-70"
          style={{
            background: 'conic-gradient(from 0deg, rgb(var(--a-orange)), rgb(var(--a-pink)), rgb(var(--a-plum)), rgb(var(--a-blue)), rgb(var(--a-teal)), rgb(var(--a-gold)), rgb(var(--a-orange)))',
            mask: 'radial-gradient(closest-side, transparent 96.6%, #000 97.2%, #000 99%, transparent 99.6%)',
            WebkitMask: 'radial-gradient(closest-side, transparent 96.6%, #000 97.2%, #000 99%, transparent 99.6%)',
          }}
        />
        <div
          className="spin-sweep absolute inset-[3.5%] rounded-full"
          style={{
            background: 'conic-gradient(from 0deg, transparent 0deg 290deg, rgb(var(--a-teal) / 0.05) 320deg, rgb(var(--a-teal) / 0.28) 359deg, transparent 360deg)',
          }}
        />
        <div className="absolute inset-[22%] rounded-full blur-3xl" style={{ background: 'radial-gradient(circle, rgb(var(--a-plum) / calc(0.35 * var(--glow))), transparent 70%)' }} />

        <svg viewBox={`0 0 ${V} ${V}`} className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
          <defs>
            {ORBITS.map((o, i) => (
              <linearGradient key={i} id={`orb-${i}`} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor={`rgb(var(--a-${o.from}))`} />
                <stop offset="1" stopColor={`rgb(var(--a-${o.to}))`} />
              </linearGradient>
            ))}
            <filter id="orb-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" />
            </filter>
          </defs>
          {/* dial */}
          {ticks.map((d) => {
            const a = (d * Math.PI) / 180
            const long = d % 30 === 0
            const r1 = 272
            const r2 = long ? 258 : 266
            return (
              <line
                key={d}
                x1={C + Math.cos(a) * r1}
                y1={C + Math.sin(a) * r1}
                x2={C + Math.cos(a) * r2}
                y2={C + Math.sin(a) * r2}
                stroke="currentColor"
                strokeOpacity={long ? 0.55 : 0.16}
                strokeWidth={long ? 1.5 : 1}
              />
            )
          })}
          {[
            ['000', C, 50],
            ['090', V - 46, C + 4],
            ['180', C, V - 42],
            ['270', 46, C + 4],
          ].map(([l, x, y]) => (
            <text key={l} x={x} y={y} textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="currentColor" fillOpacity=".5" letterSpacing="1">
              {l}
            </text>
          ))}
          <line x1={C - 250} y1={C} x2={C + 250} y2={C} stroke="currentColor" strokeOpacity=".07" strokeDasharray="2 6" />
          <line x1={C} y1={C - 250} x2={C} y2={C + 250} stroke="currentColor" strokeOpacity=".07" strokeDasharray="2 6" />
          {/* orbits: a blurred glow pass under a crisp line */}
          {ORBITS.map((o, i) => (
            <g key={i} transform={`rotate(${TILT} ${C} ${C})`}>
              <ellipse cx={C} cy={C} rx={o.rx} ry={o.rx * RY} fill="none" stroke={`url(#orb-${i})`} strokeWidth="4" strokeOpacity={0.5} filter="url(#orb-glow)" style={{ opacity: 'var(--glow)' }} />
              <ellipse cx={C} cy={C} rx={o.rx} ry={o.rx * RY} fill="none" stroke={`url(#orb-${i})`} strokeWidth="1.6" strokeDasharray={i === 1 ? '3 6' : ''} />
            </g>
          ))}
        </svg>

        {/* core */}
        <div className="absolute left-1/2 top-1/2 z-20 aspect-square w-[25%] -translate-x-1/2 -translate-y-1/2">
          <div className="spin-slow absolute -inset-[7%] rounded-full" style={{ background: 'conic-gradient(rgb(var(--a-orange)), rgb(var(--a-gold)), rgb(var(--a-green)), rgb(var(--a-teal)), rgb(var(--a-blue)), rgb(var(--a-plum)), rgb(var(--a-pink)), rgb(var(--a-orange)))' }} />
          <div className="absolute -inset-[7%] rounded-full blur-xl" style={{ background: 'conic-gradient(rgb(var(--a-orange)), rgb(var(--a-teal)), rgb(var(--a-plum)), rgb(var(--a-orange)))', opacity: 'calc(0.6 * var(--glow))' }} />
          <div className="absolute inset-0 overflow-hidden rounded-full bg-white ring-4 ring-paper">
            <img src="/logos/cm2.png" alt="Community Matters 2" className="h-full w-full object-cover" draggable={false} />
          </div>
        </div>

        {/* bodies */}
        {placed.map((p, i) => {
          const on = active === p.app.id
          return (
            <button
              key={p.app.id}
              ref={(el) => {
                nodes.current[i] = el
              }}
              onMouseEnter={() => onActive(p.app.id)}
              onMouseLeave={() => onActive(null)}
              onFocus={() => onActive(p.app.id)}
              onBlur={() => onActive(null)}
              onClick={() => nav(`/apps/${p.app.id}`)}
              className="group absolute rounded-full p-1 transition-[opacity] duration-300 will-change-transform"
              aria-label={p.app.name}
            >
              <span className="relative block rounded-[14px]" style={{ boxShadow: on ? `0 0 0 3px rgb(var(--paper)), 0 0 0 5px ${tone(p.app.tone)}, 0 0 40px ${tone(p.app.tone, 0.8)}` : `0 0 22px ${tone(p.app.tone, 0.45)}`, borderRadius: 14 }}>
                <AppIcon app={p.app} size={44} />
              </span>
              {on && (
                <span className="card pointer-events-none absolute left-full top-1/2 ml-3 w-max max-w-[220px] -translate-y-1/2 overflow-hidden px-4 py-3 text-left group-data-[side=left]:left-auto group-data-[side=left]:right-full group-data-[side=left]:ml-0 group-data-[side=left]:mr-3">
                  <span className="absolute inset-x-0 top-0 h-[3px]" style={{ background: grad(p.app.tone, 1, 90) }} />
                  <span className="block font-mono text-[10px] tracking-[0.14em] text-muted">
                    {indexOf(p.app)} · {p.app.category.toUpperCase()} · {STATUS_LABEL[p.app.status].toUpperCase()}
                  </span>
                  <span className="mt-1 block font-display text-[14px] font-semibold leading-snug">{p.app.name}</span>
                </span>
              )}
            </button>
          )
        })}
      </div>
    </figure>
  )
}
