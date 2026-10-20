import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { OrbitApp } from '../data/apps'
import { STATUS_META } from '../data/apps'
import AppIcon from './AppIcon'

// Three tilted rings, like the Orbit logo: blue, green, orange.
const RINGS = [
  { color: '#1E5BD8', rx: 0.3, ry: 0.11, tilt: -8, speed: 0.00016 },
  { color: '#6CC04A', rx: 0.41, ry: 0.15, tilt: 18, speed: -0.00011 },
  { color: '#F58220', rx: 0.49, ry: 0.19, tilt: -24, speed: 0.00008 },
]

interface Props {
  apps: OrbitApp[]
  onSelect: (app: OrbitApp) => void
}

export default function OrbitSystem({ apps, onSelect }: Props) {
  const wrap = useRef<HTMLDivElement>(null)
  const nodes = useRef<(HTMLButtonElement | null)[]>([])
  const [size, setSize] = useState(560)
  const [hover, setHover] = useState<OrbitApp | null>(null)
  const paused = useRef(false)

  // Assign each app to a ring and a starting angle spread evenly.
  const placed = useMemo(() => {
    const perRing: OrbitApp[][] = [[], [], []]
    apps.forEach((a, i) => perRing[i % 3].push(a))
    return perRing.flatMap((list, ring) =>
      list.map((app, k) => ({ app, ring, offset: (k / list.length) * Math.PI * 2 + ring * 0.9 })),
    )
  }, [apps])

  useEffect(() => {
    const el = wrap.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setSize(e.contentRect.width))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0
    let last = performance.now()
    let t = 0
    const tick = (now: number) => {
      const dt = now - last
      last = now
      if (!paused.current && !reduce) t += dt
      const c = size / 2
      placed.forEach((p, i) => {
        const el = nodes.current[i]
        if (!el) return
        const r = RINGS[p.ring]
        const theta = p.offset + t * r.speed
        const x0 = Math.cos(theta) * r.rx * size
        const y0 = Math.sin(theta) * r.ry * size
        const rad = (r.tilt * Math.PI) / 180
        const x = x0 * Math.cos(rad) - y0 * Math.sin(rad)
        const y = x0 * Math.sin(rad) + y0 * Math.cos(rad)
        const depth = Math.sin(theta) // -1 back … 1 front
        const scale = 0.78 + (depth + 1) * 0.16
        el.style.transform = `translate(${c + x}px, ${c + y}px) translate(-50%, -50%) scale(${scale})`
        el.style.zIndex = String(depth > 0 ? 30 + Math.round(depth * 10) : 5 + Math.round((depth + 1) * 5))
        el.style.opacity = String(0.55 + (depth + 1) * 0.225)
        el.style.filter = depth < -0.2 ? `blur(${(-depth - 0.2) * 1.2}px)` : 'none'
      })
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [placed, size])

  const planet = Math.max(44, Math.min(68, size * 0.11))

  return (
    <div ref={wrap} className="relative mx-auto aspect-square w-full max-w-[620px] select-none">
      {/* Rings */}
      <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox={`0 0 ${size} ${size}`} aria-hidden>
        <defs>
          {RINGS.map((r, i) => (
            <linearGradient key={i} id={`ring-${i}`} x1="0" x2="1">
              <stop offset="0%" stopColor={r.color} stopOpacity="0.05" />
              <stop offset="50%" stopColor={r.color} stopOpacity="0.9" />
              <stop offset="100%" stopColor={r.color} stopOpacity="0.05" />
            </linearGradient>
          ))}
        </defs>
        {RINGS.map((r, i) => (
          <ellipse
            key={i}
            cx={size / 2}
            cy={size / 2}
            rx={r.rx * size}
            ry={r.ry * size}
            fill="none"
            stroke={`url(#ring-${i})`}
            strokeWidth={2}
            transform={`rotate(${r.tilt} ${size / 2} ${size / 2})`}
          />
        ))}
      </svg>

      {/* Core */}
      <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
        <div className="relative grid place-items-center" style={{ width: size * 0.3, height: size * 0.3 }}>
          <div className="absolute inset-[-30%] animate-pulseglow rounded-full" style={{ background: 'radial-gradient(circle, var(--glow), transparent 65%)' }} />
          <div className="absolute inset-0 rounded-full border-[5px] border-orbit-blue bg-white shadow-[0_0_60px_-10px_rgba(30,91,216,.9)]" />
          <img src="/logos/cm2.png" alt="Community Matters 2" className="relative z-10 h-[88%] w-[88%] rounded-full object-cover" draggable={false} />
        </div>
      </div>

      {/* Planets */}
      {placed.map((p, i) => (
        <button
          key={p.app.id}
          ref={(el) => (nodes.current[i] = el)}
          onMouseEnter={() => {
            paused.current = true
            setHover(p.app)
          }}
          onMouseLeave={() => {
            paused.current = false
            setHover(null)
          }}
          onFocus={() => {
            paused.current = true
            setHover(p.app)
          }}
          onBlur={() => {
            paused.current = false
            setHover(null)
          }}
          onClick={() => onSelect(p.app)}
          className="group absolute left-0 top-0 rounded-[30%] outline-none transition-[box-shadow] focus-visible:ring-2 focus-visible:ring-white"
          style={{ willChange: 'transform' }}
          aria-label={p.app.name}
        >
          <div className="transition-transform duration-300 group-hover:scale-125">
            <AppIcon app={p.app} size={planet} />
          </div>
        </button>
      ))}

      {/* Hover preview */}
      <AnimatePresence>
        {hover && (
          <motion.div
            key={hover.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="glass pointer-events-none absolute bottom-0 left-1/2 z-50 w-[min(92%,360px)] -translate-x-1/2 rounded-2xl p-4 shadow-2xl"
          >
            <div className="flex items-center gap-3">
              <AppIcon app={hover} size={40} />
              <div className="min-w-0">
                <div className="truncate font-display font-semibold">{hover.name}</div>
                <div className="text-xs" style={{ color: STATUS_META[hover.status].color }}>
                  {hover.category} · {STATUS_META[hover.status].label}
                </div>
              </div>
            </div>
            <p className="mt-2 line-clamp-2 text-sm text-muted">{hover.description}</p>
            <div className="mt-2 text-[11px] uppercase tracking-wider text-muted">Click to open</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
