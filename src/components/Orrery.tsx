import { useEffect, useMemo, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { indexOf, tone, type OrbitApp } from '../data/apps'

// An instrument-style drawing of the suite: apps travel on three orbits around the CM2 core.
const V = 600 // viewBox size
const C = V / 2
const TILT = -14
const ORBITS = [
  { rx: 132, speed: 0.000105, dash: '' },
  { rx: 196, speed: -0.00007, dash: '2 5' },
  { rx: 258, speed: 0.000048, dash: '' },
]
const RY = 0.4

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
        const front = Math.sin(th) > 0
        // behind the core when on the far side and close to the middle
        const hidden = !front && Math.abs(x0) < 70
        el.style.left = `${(x / V) * 100}%`
        el.style.top = `${(y / V) * 100}%`
        el.dataset.side = x > C + 40 ? 'left' : 'right'
        el.style.zIndex = front ? '30' : '10'
        el.style.opacity = hidden ? '0.25' : front ? '1' : '0.7'
      })
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(raf)
  }, [placed])

  const ticks = Array.from({ length: 72 }, (_, i) => i * 5)

  return (
    <figure className="fade relative mx-auto w-full max-w-[600px] select-none">
      <div className="relative aspect-square w-full text-ink">
        <svg viewBox={`0 0 ${V} ${V}`} className="absolute inset-0 h-full w-full" aria-hidden>
          {/* outer dial */}
          <circle cx={C} cy={C} r={290} fill="none" stroke="currentColor" strokeOpacity=".16" />
          <circle cx={C} cy={C} r={276} fill="none" stroke="currentColor" strokeOpacity=".08" />
          {ticks.map((d) => {
            const a = (d * Math.PI) / 180
            const long = d % 30 === 0
            const r1 = 290
            const r2 = long ? 280 : 285
            return (
              <line
                key={d}
                x1={C + Math.cos(a) * r1}
                y1={C + Math.sin(a) * r1}
                x2={C + Math.cos(a) * r2}
                y2={C + Math.sin(a) * r2}
                stroke="currentColor"
                strokeOpacity={long ? 0.4 : 0.18}
              />
            )
          })}
          {[
            ['000', C, 22],
            ['090', V - 16, C + 4],
            ['180', C, V - 12],
            ['270', 16, C + 4],
          ].map(([l, x, y]) => (
            <text key={l} x={x} y={y} textAnchor="middle" className="font-mono" fontSize="10" fill="currentColor" fillOpacity=".45" letterSpacing="1">
              {l}
            </text>
          ))}
          {/* crosshair */}
          <line x1={C - 290} y1={C} x2={C + 290} y2={C} stroke="currentColor" strokeOpacity=".06" />
          <line x1={C} y1={C - 290} x2={C} y2={C + 290} stroke="currentColor" strokeOpacity=".06" />
          {/* orbits */}
          {ORBITS.map((o, i) => (
            <ellipse
              key={i}
              cx={C}
              cy={C}
              rx={o.rx}
              ry={o.rx * RY}
              fill="none"
              stroke="currentColor"
              strokeOpacity={i === 1 ? 0.3 : 0.2}
              strokeDasharray={o.dash}
              transform={`rotate(${TILT} ${C} ${C})`}
            />
          ))}
          {/* core rings */}
          <circle cx={C} cy={C} r={74} fill="rgb(var(--paper))" stroke="currentColor" strokeOpacity=".25" />
          <circle cx={C} cy={C} r={82} fill="none" stroke="currentColor" strokeOpacity=".1" strokeDasharray="1 4" />
        </svg>

        {/* core */}
        <div className="absolute left-1/2 top-1/2 z-20 aspect-square w-[21%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full bg-white shadow-[0_0_0_1px_rgb(var(--ink)/0.15)]">
          <img src="/logos/cm2.png" alt="Community Matters 2" className="h-full w-full object-cover" draggable={false} />
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
              className="group absolute -translate-x-1/2 -translate-y-1/2 rounded-full p-2 transition-opacity duration-300"
              aria-label={p.app.name}
            >
              <span
                className="block rounded-full transition-transform duration-300"
                style={{
                  width: 14,
                  height: 14,
                  background: tone(p.app.tone),
                  boxShadow: `0 0 0 3px rgb(var(--paper)), 0 0 0 ${on ? 8 : 4}px ${tone(p.app.tone, on ? 0.35 : 0.22)}`,
                  transform: on ? 'scale(1.25)' : 'none',
                }}
              />
              <span className="pointer-events-none absolute left-full top-1/2 ml-1 -translate-y-1/2 whitespace-nowrap font-mono text-[10px] tracking-[0.1em] text-muted">
                {on ? '' : indexOf(p.app)}
              </span>
              {on && (
                <span className="card pointer-events-none absolute left-full top-1/2 ml-2 -translate-y-1/2 group-data-[side=left]:left-auto group-data-[side=left]:right-full group-data-[side=left]:ml-0 group-data-[side=left]:mr-2 group-data-[side=left]:text-right whitespace-nowrap px-3 py-2 text-left shadow-[0_12px_30px_-18px_rgb(var(--ink)/0.6)]">
                  <span className="block font-mono text-[10px] tracking-[0.12em] text-muted">
                    {indexOf(p.app)} · {p.app.category.toUpperCase()}
                  </span>
                  <span className="block font-display text-[15px] font-medium">{p.app.name}</span>
                </span>
              )}
            </button>
          )
        })}
      </div>
      <figcaption className="mt-3 flex justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
        <span>Fig. 1 — The CM2 suite in orbit</span>
        <span>{apps.length} bodies</span>
      </figcaption>
    </figure>
  )
}
