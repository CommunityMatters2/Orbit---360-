// Line-drawn mark: a core, one orbit, and the three ORBIT colors.
export default function OrbitMark({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden className="shrink-0">
      <ellipse cx="20" cy="20" rx="17" ry="7" fill="none" stroke="currentColor" strokeOpacity=".45" strokeWidth="1.1" transform="rotate(-20 20 20)" />
      <circle cx="20" cy="20" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="20" cy="20" r="2.2" fill="rgb(var(--a-blue))" />
      <circle cx="35.6" cy="14.4" r="2.4" fill="rgb(var(--a-orange))" />
      <circle cx="4.6" cy="25.4" r="2" fill="rgb(var(--a-green))" />
    </svg>
  )
}
