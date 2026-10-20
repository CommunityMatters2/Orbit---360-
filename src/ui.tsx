import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

type Theme = 'paper' | 'night'

interface UI {
  theme: Theme
  toggleTheme: () => void
  searchOpen: boolean
  setSearchOpen: (v: boolean) => void
}

const Ctx = createContext<UI | null>(null)

export function UIProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => (document.documentElement.dataset.theme as Theme) || 'paper')
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'night' ? '#0C101E' : '#F4F1EA')
    try {
      localStorage.setItem('orbit360.theme', theme)
    } catch {
      /* storage unavailable */
    }
  }, [theme])

  const value = useMemo(
    () => ({ theme, toggleTheme: () => setTheme((t) => (t === 'paper' ? 'night' : 'paper')), searchOpen, setSearchOpen }),
    [theme, searchOpen],
  )
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useUI() {
  const c = useContext(Ctx)
  if (!c) throw new Error('useUI must be used inside UIProvider')
  return c
}
