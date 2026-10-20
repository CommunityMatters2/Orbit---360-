import { useEffect, useRef } from 'react'

// Slowly drifting, twinkling star canvas behind the whole app.
export default function Starfield({ theme }: { theme: 'dark' | 'light' }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current!
    const ctx = canvas.getContext('2d')!
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let w = 0
    let h = 0
    let raf = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    type Star = { x: number; y: number; r: number; s: number; p: number }
    let stars: Star[] = []

    const resize = () => {
      w = canvas.width = window.innerWidth * dpr
      h = canvas.height = window.innerHeight * dpr
      canvas.style.width = window.innerWidth + 'px'
      canvas.style.height = window.innerHeight + 'px'
      const count = Math.round((window.innerWidth * window.innerHeight) / 5200)
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: (Math.random() * 1.2 + 0.25) * dpr,
        s: Math.random() * 0.15 + 0.03,
        p: Math.random() * Math.PI * 2,
      }))
    }
    resize()
    window.addEventListener('resize', resize)

    const color = theme === 'dark' ? '255,255,255' : '11,27,77'
    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h)
      for (const st of stars) {
        if (!reduce) {
          st.y -= st.s * dpr
          if (st.y < 0) st.y = h
        }
        const a = (theme === 'dark' ? 0.55 : 0.18) + Math.sin(t / 900 + st.p) * (theme === 'dark' ? 0.35 : 0.1)
        ctx.beginPath()
        ctx.fillStyle = `rgba(${color},${Math.max(0, a)})`
        ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2)
        ctx.fill()
      }
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [theme])

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          background:
            theme === 'dark'
              ? 'radial-gradient(1200px 700px at 75% -10%, rgba(30,91,216,.35), transparent 60%), radial-gradient(900px 600px at -10% 110%, rgba(108,192,74,.14), transparent 60%), radial-gradient(700px 500px at 110% 90%, rgba(245,130,32,.14), transparent 60%), #050a1f'
              : 'radial-gradient(1200px 700px at 75% -10%, rgba(30,91,216,.16), transparent 60%), radial-gradient(900px 600px at -10% 110%, rgba(108,192,74,.12), transparent 60%), radial-gradient(700px 500px at 110% 90%, rgba(245,130,32,.12), transparent 60%), #f4f6fb',
        }}
      />
      <canvas ref={ref} className="absolute inset-0" />
    </div>
  )
}
