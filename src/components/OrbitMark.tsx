// The Orbit 360 mark: a spectrum ring with a tilted orbit and two satellites.
export default function OrbitMark({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden className="shrink-0">
      <defs>
        <linearGradient id="om-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="rgb(var(--a-orange))" />
          <stop offset=".35" stopColor="rgb(var(--a-pink))" />
          <stop offset=".65" stopColor="rgb(var(--a-plum))" />
          <stop offset="1" stopColor="rgb(var(--a-teal))" />
        </linearGradient>
      </defs>
      <ellipse cx="20" cy="20" rx="18" ry="7" fill="none" stroke="currentColor" strokeOpacity=".4" strokeWidth="1.2" transform="rotate(-24 20 20)" />
      <circle cx="20" cy="20" r="8" fill="none" stroke="url(#om-g)" strokeWidth="3.2" />
      <circle cx="20" cy="20" r="2.6" fill="currentColor" />
      <circle cx="36" cy="12.6" r="2.8" fill="rgb(var(--a-gold))" />
      <circle cx="4" cy="27.4" r="2.3" fill="rgb(var(--a-teal))" />
    </svg>
  )
}
