import type { ReactNode } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ArrowUpRight, Moon, Search, Sun } from 'lucide-react'
import { SUITE, tone } from '../data/apps'
import { useUI } from '../ui'
import OrbitMark from './OrbitMark'

const NAV = [
  { to: '/', label: 'Suite' },
  { to: '/apps', label: 'Apps' },
  { to: '/insights', label: 'Insights' },
  { to: '/roadmap', label: 'Roadmap' },
]

const today = new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })

function NavItem({ to, label }: { to: string; label: string }) {
  return (
    <NavLink
      to={to}
      end={to === '/'}
      className={({ isActive }) =>
        `relative whitespace-nowrap rounded-full px-4 py-2 text-[13.5px] font-semibold transition-colors ${
          isActive ? 'bg-ink text-paper shadow-[0_6px_20px_-8px_rgb(var(--a-plum))]' : 'text-muted hover:bg-ink/[0.06] hover:text-ink'
        }`
      }
    >
      {label}
    </NavLink>
  )
}

function Wordmark({ size = 20 }: { size?: number }) {
  return (
    <span className="font-display font-bold tracking-tight" style={{ fontSize: size }}>
      Orbit<span className="text-spectrum ml-1">360</span>
    </span>
  )
}

function Header() {
  const { theme, toggleTheme, setSearchOpen } = useUI()
  const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/i.test(navigator.userAgent)
  const live = SUITE.filter((a) => a.status === 'live').length
  return (
    <header className="sticky top-0 z-50 border-b rule bg-paper/70 backdrop-blur-xl">
      <div className="h-[2px] bg-spectrum" />
      <div className="hidden border-b rule sm:block">
        <div className="wrap flex h-8 items-center justify-between font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted">
          <span className="flex items-center gap-2">
            <span className="blink h-1.5 w-1.5 rounded-full bg-green shadow-[0_0_8px_rgb(var(--a-green))]" />
            Community Matters 2 Inc. · Orbit 360 control
          </span>
          <span className="flex items-center gap-3">
            <span className="flex gap-1" aria-hidden>
              {SUITE.map((a) => (
                <span key={a.id} className="h-1.5 w-3 rounded-full" style={{ background: tone(a.tone, a.status === 'live' ? 1 : 0.3) }} />
              ))}
            </span>
            {today} · {live} apps live
          </span>
        </div>
      </div>
      <div className="wrap flex h-16 items-center gap-4">
        <Link to="/" className="flex items-center gap-2.5 text-ink" aria-label="Orbit 360 home">
          <OrbitMark size={32} />
          <Wordmark />
        </Link>
        <nav className="ml-6 hidden items-center gap-1 rounded-full border rule bg-surface/50 p-1 md:flex">
          {NAV.map((n) => (
            <NavItem key={n.to} {...n} />
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={() => setSearchOpen(true)}
            className="flex h-10 items-center gap-2 rounded-full border rule-strong bg-surface/50 px-4 text-[13px] text-muted transition hover:border-teal hover:text-ink"
          >
            <Search size={15} />
            <span className="hidden sm:inline">Search apps</span>
            <kbd className="ml-2 hidden rounded-md border rule px-1.5 py-0.5 font-mono text-[10px] lg:inline">{isMac ? '⌘K' : 'Ctrl K'}</kbd>
          </button>
          <button
            onClick={toggleTheme}
            className="grid h-10 w-10 place-items-center rounded-full border rule-strong bg-surface/50 text-muted transition hover:border-gold hover:text-gold"
            aria-label={theme === 'paper' ? 'Switch to night theme' : 'Switch to day theme'}
            title={theme === 'paper' ? 'Night' : 'Day'}
          >
            {theme === 'paper' ? <Moon size={16} /> : <Sun size={16} />}
          </button>
        </div>
      </div>
      <nav className="no-scrollbar flex gap-1 overflow-x-auto border-t rule px-4 py-2 md:hidden">
        {NAV.map((n) => (
          <NavItem key={n.to} {...n} />
        ))}
      </nav>
    </header>
  )
}

function Footer() {
  return (
    <footer className="relative z-[1] mt-28 border-t rule bg-surface/40 backdrop-blur-xl">
      <div className="h-[2px] bg-spectrum opacity-70" />
      <div className="wrap grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <OrbitMark size={36} />
            <Wordmark size={24} />
          </div>
          <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-muted">
            The launchpad for every Community Matters 2 application. Outcomes, Records, Behavioral Insights &amp; Tracking.
          </p>
        </div>
        <div>
          <div className="eyebrow mb-4">The suite</div>
          <ul className="space-y-2.5 text-[14px]">
            {SUITE.slice(0, 5).map((a) => (
              <li key={a.id} className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full" style={{ background: tone(a.tone), boxShadow: `0 0 8px ${tone(a.tone)}` }} />
                <Link to={`/apps/${a.id}`} className="link-u">
                  {a.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="eyebrow mb-4">Explore</div>
          <ul className="space-y-2.5 text-[14px]">
            {NAV.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="link-u">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="eyebrow mb-4">Community Matters 2</div>
          <a href="https://www.communitymatters2.org/" target="_blank" rel="noreferrer" className="group inline-flex items-center gap-1 text-[14px]">
            <span className="link-u">communitymatters2.org</span> <ArrowUpRight size={14} className="arrow" />
          </a>
        </div>
      </div>
      <div className="border-t rule">
        <div className="wrap flex flex-col justify-between gap-2 py-5 font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted sm:flex-row">
          <span>© {new Date().getFullYear()} Community Matters 2 Inc.</span>
          <span>Outcomes · Records · Behavioral Insights · Tracking</span>
        </div>
      </div>
    </footer>
  )
}

export default function Shell({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()
  if (pathname.startsWith('/open/')) return <>{children}</>
  return (
    <div className="space relative min-h-screen">
      <Header />
      <main className="relative z-[1]">{children}</main>
      <Footer />
    </div>
  )
}
