import type { ReactNode } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { FlaskConical, Home, LayoutGrid, LineChart, Moon, Plus, Search, Settings, Sun } from 'lucide-react'
import { useApps } from '../store/useApps'
import OrbitMark from './OrbitMark'

const NAV = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/apps', label: 'Apps', icon: LayoutGrid },
  { to: '/insights', label: 'Insights', icon: LineChart },
  { to: '/lab', label: 'Lab', icon: FlaskConical },
  { to: '/settings', label: 'Settings', icon: Settings },
]

function Sidebar() {
  const { apps } = useApps()
  const pinned = apps.filter((a) => a.pinned)
  return (
    <aside className="glass fixed inset-y-3 left-3 z-40 hidden w-[76px] flex-col items-center rounded-3xl py-5 lg:flex">
      <NavLink to="/" className="mb-6" aria-label="Orbit 360 home">
        <OrbitMark size={44} />
      </NavLink>
      <nav className="flex flex-col gap-1.5">
        {NAV.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `group relative grid h-12 w-12 place-items-center rounded-2xl transition ${isActive ? 'bg-orbit-blue text-white shadow-[0_8px_24px_-8px_#1E5BD8]' : 'text-muted hover:bg-white/10 hover:text-[var(--text)]'}`
            }
          >
            <Icon size={20} />
            <span className="glass pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-lg px-2.5 py-1 text-xs font-medium text-[var(--text)] opacity-0 transition group-hover:opacity-100">
              {label}
            </span>
          </NavLink>
        ))}
      </nav>
      {pinned.length > 0 && (
        <>
          <div className="my-5 h-px w-8 bg-[var(--border)]" />
          <div className="flex flex-col gap-2 overflow-y-auto scrollbar-thin">
            {pinned.slice(0, 6).map((a) => (
              <a
                key={a.id}
                href={a.url || undefined}
                target="_blank"
                rel="noreferrer"
                title={a.name}
                className="grid h-10 w-10 place-items-center overflow-hidden rounded-xl font-display text-xs font-bold text-white transition hover:scale-110"
                style={{ background: a.logo ? '#fff' : a.color }}
              >
                {a.logo ? <img src={a.logo} alt="" className="h-8 w-8 object-contain" /> : a.short}
              </a>
            ))}
          </div>
        </>
      )}
    </aside>
  )
}

function MobileNav() {
  return (
    <nav className="glass fixed inset-x-3 bottom-3 z-40 flex justify-around rounded-2xl px-2 py-1.5 lg:hidden">
      {NAV.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          className={({ isActive }) => `flex flex-col items-center gap-0.5 rounded-xl px-3 py-1.5 text-[10px] font-medium ${isActive ? 'text-orbit-orange' : 'text-muted'}`}
        >
          <Icon size={19} />
          {label}
        </NavLink>
      ))}
    </nav>
  )
}

function TopBar() {
  const { setPaletteOpen, setEditing, theme, toggleTheme } = useApps()
  const isMac = typeof navigator !== 'undefined' && /Mac/i.test(navigator.platform)
  return (
    <header className="sticky top-0 z-30 px-4 pt-3 sm:px-6 lg:pl-[108px]">
      <div className="glass flex h-14 items-center gap-3 rounded-2xl px-3 sm:px-4">
        <NavLink to="/" className="flex items-center gap-2 lg:hidden">
          <OrbitMark size={30} />
        </NavLink>
        <div className="hidden items-baseline gap-2 sm:flex">
          <span className="font-display text-lg font-bold tracking-tight">
            ORBIT <span className="gradient-text">360</span>
          </span>
          <span className="hidden text-xs text-muted md:inline">by Community Matters 2</span>
        </div>
        <button
          onClick={() => setPaletteOpen(true)}
          className="ml-auto flex h-10 w-full max-w-sm items-center gap-2 rounded-xl border border-soft px-3 text-sm text-muted transition hover:border-orbit-blue/50"
        >
          <Search size={16} />
          <span className="flex-1 truncate text-left">Search the suite…</span>
          <kbd className="hidden rounded-md border border-soft px-1.5 py-0.5 text-[10px] sm:inline">{isMac ? '⌘' : 'Ctrl'} K</kbd>
        </button>
        <button onClick={toggleTheme} className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-soft text-muted hover:text-[var(--text)]" aria-label="Toggle theme">
          {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
        </button>
        <button onClick={() => setEditing('new')} className="btn-primary h-10 shrink-0 px-3 sm:px-4">
          <Plus size={16} /> <span className="hidden sm:inline">Add app</span>
        </button>
      </div>
    </header>
  )
}

export default function Shell({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()
  const full = pathname.startsWith('/open/')
  return (
    <div className="min-h-screen">
      <Sidebar />
      {!full && <TopBar />}
      <main className={full ? 'lg:pl-[92px]' : 'px-4 pb-28 pt-6 sm:px-6 lg:pb-12 lg:pl-[108px]'}>{children}</main>
      <MobileNav />
    </div>
  )
}
