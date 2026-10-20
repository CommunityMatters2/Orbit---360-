import { useRef, useState, type ReactNode } from 'react'
import { Download, Moon, RotateCcw, Sun, Upload } from 'lucide-react'
import type { OrbitApp } from '../data/apps'
import { useApps } from '../store/useApps'

export default function Settings() {
  const { apps, theme, toggleTheme, resetApps, importApps } = useApps()
  const file = useRef<HTMLInputElement>(null)
  const [msg, setMsg] = useState('')

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(apps, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'orbit360-apps.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const onImport = async (f?: File) => {
    if (!f) return
    try {
      const data = JSON.parse(await f.text())
      if (!Array.isArray(data) || !data.every((x) => x && typeof x.id === 'string' && typeof x.name === 'string')) throw new Error()
      importApps(data as OrbitApp[])
      setMsg(`Imported ${data.length} apps.`)
    } catch {
      setMsg('That file is not a valid Orbit 360 app list.')
    }
    if (file.current) file.current.value = ''
  }

  const Row = ({ title, text, children }: { title: string; text: string; children: ReactNode }) => (
    <div className="flex flex-col gap-3 border-b border-soft py-5 last:border-0 sm:flex-row sm:items-center">
      <div className="flex-1">
        <div className="font-medium">{title}</div>
        <div className="text-sm text-muted">{text}</div>
      </div>
      <div className="flex gap-2">{children}</div>
    </div>
  )

  return (
    <div className="mx-auto max-w-3xl">
      <div className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Settings</div>
      <h1 className="mt-1 font-display text-4xl font-bold tracking-tight">Mission control</h1>

      <div className="glass mt-8 rounded-3xl px-6">
        <Row title="Appearance" text="Switch between deep-space dark and daylight.">
          <button onClick={toggleTheme} className="btn-ghost">
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />} {theme === 'dark' ? 'Light mode' : 'Dark mode'}
          </button>
        </Row>
        <Row title="Export apps" text="Download the app list as JSON — to back it up or share it with the team.">
          <button onClick={exportJson} className="btn-ghost">
            <Download size={15} /> Export
          </button>
        </Row>
        <Row title="Import apps" text="Load an app list exported from another Orbit 360. This replaces the current list.">
          <input ref={file} type="file" accept="application/json" className="hidden" onChange={(e) => onImport(e.target.files?.[0])} />
          <button onClick={() => file.current?.click()} className="btn-ghost">
            <Upload size={15} /> Import
          </button>
        </Row>
        <Row title="Reset to defaults" text="Restore the original CM2 apps and Lab board. Apps you added will be removed.">
          <button
            onClick={() => {
              if (confirm('Reset Orbit 360 to the default apps?')) {
                resetApps()
                setMsg('Reset to the default CM2 suite.')
              }
            }}
            className="btn-ghost hover:!border-red-400 hover:text-red-400"
          >
            <RotateCcw size={15} /> Reset
          </button>
        </Row>
      </div>
      {msg && <div className="mt-4 rounded-xl bg-orbit-blue/10 px-4 py-3 text-sm">{msg}</div>}

      <div className="glass mt-6 flex items-center gap-5 rounded-3xl p-6">
        <img src="/logos/orbit.png" alt="ORBIT — Outcomes, Records, Behavioral Insights & Tracking" className="h-16 rounded-xl bg-white object-contain p-2" />
        <div className="text-sm text-muted">
          <div className="font-display text-base font-semibold text-[var(--text)]">Orbit 360 · v0.1</div>
          Apps you add are saved in this browser. A shared database can be connected later so the whole team sees the same suite.
        </div>
      </div>
    </div>
  )
}
