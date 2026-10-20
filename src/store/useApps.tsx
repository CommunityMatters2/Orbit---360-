import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { SEED_APPS, type OrbitApp } from '../data/apps'

export type Stage = 'idea' | 'building' | 'live'
export interface LabItem {
  id: string
  title: string
  note: string
  stage: Stage
}

const SEED_LAB: LabItem[] = [
  { id: 'lab-1', title: 'Unified sign-in across CM2 apps', note: 'One account for every app in Orbit 360.', stage: 'idea' },
  { id: 'lab-2', title: 'Outcomes dashboard', note: 'Program outcomes pulled from camp + academy data.', stage: 'idea' },
  { id: 'lab-3', title: 'Community Center 2D & 3D block', note: 'Interactive model of the future center.', stage: 'building' },
  { id: 'lab-4', title: 'Community Input Survey', note: 'Collecting community voice.', stage: 'live' },
  { id: 'lab-5', title: 'Opinion Live Wall', note: 'Live display of responses.', stage: 'live' },
]

const KEYS = { apps: 'orbit360.apps.v1', recent: 'orbit360.recent.v1', lab: 'orbit360.lab.v1', theme: 'orbit360.theme' }

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}
function save(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* storage full or blocked — keep working in memory */
  }
}

export const uid = () => Math.random().toString(36).slice(2, 10)

interface Ctx {
  apps: OrbitApp[]
  recent: string[]
  lab: LabItem[]
  theme: 'dark' | 'light'
  addApp: (a: Omit<OrbitApp, 'id'>) => void
  updateApp: (id: string, patch: Partial<OrbitApp>) => void
  removeApp: (id: string) => void
  togglePin: (id: string) => void
  moveApp: (id: string, dir: -1 | 1) => void
  launch: (app: OrbitApp) => void
  markRecent: (id: string) => void
  resetApps: () => void
  importApps: (list: OrbitApp[]) => void
  setLab: (items: LabItem[]) => void
  toggleTheme: () => void
  paletteOpen: boolean
  setPaletteOpen: (v: boolean) => void
  editing: OrbitApp | null | 'new'
  setEditing: (v: OrbitApp | null | 'new') => void
  details: OrbitApp | null
  setDetails: (v: OrbitApp | null) => void
}

const AppsContext = createContext<Ctx | null>(null)

export function AppsProvider({ children }: { children: ReactNode }) {
  const [apps, setApps] = useState<OrbitApp[]>(() => load(KEYS.apps, SEED_APPS))
  const [recent, setRecent] = useState<string[]>(() => load(KEYS.recent, []))
  const [lab, setLabState] = useState<LabItem[]>(() => load(KEYS.lab, SEED_LAB))
  const [theme, setTheme] = useState<'dark' | 'light'>(() => load(KEYS.theme, 'dark'))
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [editing, setEditing] = useState<OrbitApp | null | 'new'>(null)
  const [details, setDetails] = useState<OrbitApp | null>(null)

  useEffect(() => save(KEYS.apps, apps), [apps])
  useEffect(() => save(KEYS.recent, recent), [recent])
  useEffect(() => save(KEYS.lab, lab), [lab])
  useEffect(() => {
    save(KEYS.theme, theme)
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  const markRecent = useCallback((id: string) => {
    setRecent((r) => [id, ...r.filter((x) => x !== id)].slice(0, 6))
  }, [])

  const launch = useCallback(
    (app: OrbitApp) => {
      if (!app.url) return
      markRecent(app.id)
      window.open(app.url, '_blank', 'noopener,noreferrer')
    },
    [markRecent],
  )

  const value = useMemo<Ctx>(
    () => ({
      apps,
      recent,
      lab,
      theme,
      addApp: (a) => setApps((list) => [...list, { ...a, id: uid() }]),
      updateApp: (id, patch) => setApps((list) => list.map((x) => (x.id === id ? { ...x, ...patch } : x))),
      removeApp: (id) => {
        setApps((list) => list.filter((x) => x.id !== id))
        setRecent((r) => r.filter((x) => x !== id))
      },
      togglePin: (id) => setApps((list) => list.map((x) => (x.id === id ? { ...x, pinned: !x.pinned } : x))),
      moveApp: (id, dir) =>
        setApps((list) => {
          const i = list.findIndex((x) => x.id === id)
          const j = i + dir
          if (i < 0 || j < 0 || j >= list.length) return list
          const next = [...list]
          ;[next[i], next[j]] = [next[j], next[i]]
          return next
        }),
      launch,
      markRecent,
      resetApps: () => {
        setApps(SEED_APPS)
        setRecent([])
        setLabState(SEED_LAB)
      },
      importApps: (list) => setApps(list),
      setLab: setLabState,
      toggleTheme: () => setTheme((t) => (t === 'dark' ? 'light' : 'dark')),
      paletteOpen,
      setPaletteOpen,
      editing,
      setEditing,
      details,
      setDetails,
    }),
    [apps, recent, lab, theme, launch, markRecent, paletteOpen, editing, details],
  )

  return <AppsContext.Provider value={value}>{children}</AppsContext.Provider>
}

export function useApps() {
  const ctx = useContext(AppsContext)
  if (!ctx) throw new Error('useApps must be used inside AppsProvider')
  return ctx
}
