// Small vector version of the Orbit logo mark for the sidebar / headers.
export default function OrbitMark({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden>
      <defs>
        <radialGradient id="om-core" cx="40%" cy="35%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#c9d4f2" />
        </radialGradient>
      </defs>
      <ellipse cx="32" cy="32" rx="28" ry="11" fill="none" stroke="#6CC04A" strokeWidth="2.5" transform="rotate(-28 32 32)" />
      <ellipse cx="32" cy="32" rx="28" ry="11" fill="none" stroke="#F58220" strokeWidth="2.5" transform="rotate(28 32 32)" />
      <circle cx="32" cy="32" r="13.5" fill="url(#om-core)" stroke="#1E5BD8" strokeWidth="3.5" />
      <text x="32" y="36.5" textAnchor="middle" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="12" fill="#0B1B4D">CM</text>
      <circle cx="56" cy="19" r="3.6" fill="#F58220" />
      <circle cx="8" cy="19" r="3.2" fill="#6CC04A" />
      <circle cx="20" cy="56" r="3" fill="#1E5BD8" />
    </svg>
  )
}
