import { useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Lightbulb, Plus, Rocket, Trash2, Wrench } from 'lucide-react'
import { uid, useApps, type Stage } from '../store/useApps'

const STAGES: { key: Stage; title: string; color: string; icon: typeof Lightbulb; hint: string }[] = [
  { key: 'idea', title: 'Ideas', color: '#A78BFA', icon: Lightbulb, hint: 'Things the community could use' },
  { key: 'building', title: 'Building', color: '#F58220', icon: Wrench, hint: 'In development now' },
  { key: 'live', title: 'Live', color: '#6CC04A', icon: Rocket, hint: 'Shipped and in orbit' },
]
const ORDER: Stage[] = ['idea', 'building', 'live']

export default function Lab() {
  const { lab, setLab, setEditing } = useApps()
  const [title, setTitle] = useState('')
  const [note, setNote] = useState('')

  const add = (e: FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    setLab([...lab, { id: uid(), title: title.trim(), note: note.trim(), stage: 'idea' }])
    setTitle('')
    setNote('')
  }
  const move = (id: string, dir: -1 | 1) =>
    setLab(
      lab.map((i) => {
        if (i.id !== id) return i
        const n = ORDER.indexOf(i.stage) + dir
        return n < 0 || n > 2 ? i : { ...i, stage: ORDER[n] }
      }),
    )
  const remove = (id: string) => setLab(lab.filter((i) => i.id !== id))

  return (
    <div className="mx-auto max-w-7xl">
      <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A78BFA]">Orbit Lab</div>
      <h1 className="mt-1 font-display text-4xl font-bold tracking-tight">Develop the suite</h1>
      <p className="mt-2 max-w-2xl text-muted">Plan what comes next. Capture an idea, move it into building, and when it ships, add it to the suite in one click.</p>

      <form onSubmit={add} className="glass mt-8 grid gap-3 rounded-2xl p-3 md:grid-cols-[1fr_1.4fr_auto]">
        <input className="input" placeholder="New idea, e.g. Volunteer sign-up" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input className="input" placeholder="Short note (optional)" value={note} onChange={(e) => setNote(e.target.value)} />
        <button className="btn-primary" type="submit">
          <Plus size={15} /> Add idea
        </button>
      </form>

      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        {STAGES.map((s) => {
          const items = lab.filter((i) => i.stage === s.key)
          const Icon = s.icon
          return (
            <section key={s.key} className="glass flex flex-col rounded-3xl p-4 lg:min-h-[320px]">
              <header className="mb-3 flex items-center gap-3 px-1">
                <div className="grid h-9 w-9 place-items-center rounded-xl" style={{ background: `${s.color}22`, color: s.color }}>
                  <Icon size={17} />
                </div>
                <div className="flex-1">
                  <h2 className="font-display font-semibold">{s.title}</h2>
                  <div className="text-xs text-muted">{s.hint}</div>
                </div>
                <span className="rounded-full px-2 py-0.5 text-xs font-semibold" style={{ background: `${s.color}22`, color: s.color }}>
                  {items.length}
                </span>
              </header>
              <div className="flex flex-1 flex-col gap-2">
                <AnimatePresence initial={false}>
                  {items.map((i) => (
                    <motion.div
                      key={i.id}
                      layout
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      className="group rounded-2xl border border-soft p-3.5"
                      style={{ background: 'var(--panel)', borderLeft: `3px solid ${s.color}` }}
                    >
                      <div className="font-medium">{i.title}</div>
                      {i.note && <div className="mt-1 text-sm text-muted">{i.note}</div>}
                      <div className="mt-3 flex items-center gap-1 text-muted">
                        <button onClick={() => move(i.id, -1)} disabled={s.key === 'idea'} className="rounded-lg p-1.5 hover:bg-white/10 disabled:opacity-30" aria-label="Move back">
                          <ArrowLeft size={15} />
                        </button>
                        <button onClick={() => move(i.id, 1)} disabled={s.key === 'live'} className="rounded-lg p-1.5 hover:bg-white/10 disabled:opacity-30" aria-label="Move forward">
                          <ArrowRight size={15} />
                        </button>
                        {s.key === 'live' && (
                          <button
                            onClick={() =>
                              setEditing({
                                id: '',
                                name: i.title,
                                short: '',
                                url: '',
                                description: i.note,
                                category: 'Programs',
                                status: 'live',
                                color: '#6CC04A',
                              })
                            }
                            className="ml-1 rounded-lg px-2 py-1 text-xs font-semibold text-orbit-green hover:bg-orbit-green/10"
                          >
                            Add to suite
                          </button>
                        )}
                        <button onClick={() => remove(i.id)} className="ml-auto rounded-lg p-1.5 opacity-0 hover:bg-red-500/15 hover:text-red-400 focus:opacity-100 group-hover:opacity-100" aria-label="Delete">
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {items.length === 0 && <div className="grid flex-1 place-items-center rounded-2xl border border-dashed border-soft p-6 text-sm text-muted">Nothing here yet</div>}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}
