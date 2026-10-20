import type { ReactNode } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ArrowUpRight, Moon, Search, Sun } from 'lucide-react'
import { SUITE } from '../data/apps'
import { useUI } from '../ui'
import OrbitMark from './OrbitMark'

const NAV = [
  { to: '/', label: 'Suite' },
  { to: '/apps', label: 'Apps' },
  { to: '/insights', label: 'Insights' },
  { to: '/roadmap', label: 'Roadmap' },
]

const today = new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })

function NavItem({ to, label, compact = false }: { to: string; label: string; compact?: boolean }) {
  return (
    <NavLink
      to={to}
      end={to === '/'}
      className={({ isActive }) =>
        `relative whitespace-nowrap py-1 text-[14px] font-medium transition-colors ${isActive ? 'text-ink' : 'text-muted hover:text-ink'} after:absolute ${compact ? 'after:-bottom-[11px]' : 'after:-bottom-[17px]'} after:left-0 after:h-[2px] after:bg-orange after:transition-all ${isActive ? 'after:w-full' : 'after:w-0'}`
      }
    >
      {label}
    </NavLink>
  )
}

function Header() {
  const { theme, toggleTheme, setSearchOpen } = useUI()
  const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/i.test(navigator.userAgent)
  return (
    <header className="sticky top-0 z-50 border-b rule bg-paper/85 backdrop-blur-md">
      <div className="hidden border-b rule sm:block">
        <div className="wrap flex h-8 items-center justify-between font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted">
          <span>Community Matters 2 Inc. — Orbit 360</span>
          <span>
            {today} · {SUITE.filter((a) => a.status === 'live').length} apps live
          </span>
        </div>
      </div>
      <div className="wrap flex h-16 items-center gap-6">
        <Link to="/" className="flex items-center gap-2.5 text-ink" aria-label="Orbit 360 home">
          <OrbitMark size={30} />
          <span className="font-display text-[21px] font-semibold tracking-tight">
            Orbit<span className="ml-1 font-normal italic text-orange">360</span>
          </span>
        </Link>
        <nav className="ml-6 hidden items-center gap-7 md:flex">
          {NAV.map((n) => (
            <NavItem key={n.to} {...n} />
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={() => setSearchOpen(true)}
            className="flex h-9 items-center gap-2 rounded-[6px] border rule-strong px-3 text-[13px] text-muted transition hover:border-ink hover:text-ink"
          >
            <Search size={15} />
            <span className="hidden sm:inline">Search apps</span>
            <kbd className="ml-2 hidden font-mono text-[10px] lg:inline">{isMac ? '⌘K' : 'Ctrl K'}</kbd>
          </button>
          <button
            onClick={toggleTheme}
            className="grid h-9 w-9 place-items-center rounded-[6px] border rule-strong text-muted transition hover:border-ink hover:text-ink"
            aria-label={theme === 'paper' ? 'Switch to night theme' : 'Switch to paper theme'}
            title={theme === 'paper' ? 'Night' : 'Paper'}
          >
            {theme === 'paper' ? <Moon size={15} /> : <Sun size={15} />}
          </button>
        </div>
      </div>
      <nav className="no-scrollbar flex gap-6 overflow-x-auto border-t rule px-4 py-3 md:hidden">
        {NAV.map((n) => (
          <NavItem key={n.to} {...n} compact />
        ))}
      </nav>
    </header>
  )
}

function Footer() {
  return (
    <footer className="relative mt-28 border-t rule">
      <div className="wrap grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <OrbitMark size={34} />
            <span className="font-display text-[26px] font-semibold tracking-tight">
              Orbit<span className="ml-1 font-normal italic text-orange">360</span>
            </span>
          </div>
          <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-muted">
            The home for every Community Matters 2 application. Outcomes, Records, Behavioral Insights &amp; Tracking.
          </p>
        </div>
        <div>
          <div className="eyebrow mb-4">The suite</div>
          <ul className="space-y-2 text-[14px]">
            {SUITE.slice(0, 5).map((a) => (
              <li key={a.id}>
                <Link to={`/apps/${a.id}`} className="link-u">
                  {a.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="eyebrow mb-4">Explore</div>
          <ul className="space-y-2 text-[14px]">
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
        <div className="wrap flex flex-col justify-between gap-2 py-5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted sm:flex-row">
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
    <div className="grain relative min-h-screen">
      <Header />
      <main className="relative z-[1]">{children}</main>
      <Footer />
    </div>
  )
}
