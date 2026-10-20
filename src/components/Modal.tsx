import { useEffect, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

interface Props {
  open: boolean
  onClose: () => void
  children: ReactNode
  side?: 'center' | 'right' | 'top'
  className?: string
}

export default function Modal({ open, onClose, children, side = 'center', className = '' }: Props) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const pos =
    side === 'right'
      ? 'justify-end items-stretch'
      : side === 'top'
        ? 'justify-center items-start pt-[12vh] px-4'
        : 'justify-center items-center p-4'
  const anim =
    side === 'right'
      ? { initial: { x: 40, opacity: 0 }, animate: { x: 0, opacity: 1 }, exit: { x: 40, opacity: 0 } }
      : { initial: { y: 16, opacity: 0, scale: 0.98 }, animate: { y: 0, opacity: 1, scale: 1 }, exit: { y: 16, opacity: 0, scale: 0.98 } }

  return (
    <AnimatePresence>
      {open && (
        <motion.div className={`fixed inset-0 z-[100] flex ${pos}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            role="dialog"
            aria-modal="true"
            {...anim}
            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
            className={`relative ${className}`}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
