import { AnimatePresence, motion } from 'framer-motion'
import { CalendarDays, Clapperboard, Film, List, MessageCircleMore, NotebookPen, PlaySquare, Tv } from 'lucide-react'
import { createContext, useContext, useMemo, useState, type PropsWithChildren } from 'react'
import { Link } from 'react-router-dom'

import { cn } from '@/lib/utils'

type LogAction = {
  label: string
  icon: typeof Film
  to: string
}

const logActions: LogAction[] = [
  { label: 'Log Movie', icon: Film, to: '/diary' },
  { label: 'Log Series', icon: Tv, to: '/series' },
  { label: 'Write Review', icon: NotebookPen, to: '/reviews' },
  { label: 'Record Video Review', icon: PlaySquare, to: '/reviews' },
  { label: 'Create List', icon: List, to: '/watchlist' },
  { label: 'Start Discussion', icon: MessageCircleMore, to: '/communities' },
  { label: 'Create Meetup', icon: CalendarDays, to: '/meetups' },
]

type LogActionContextValue = {
  open: () => void
}

const LogActionContext = createContext<LogActionContextValue | null>(null)

export function useLogActionSheet() {
  const context = useContext(LogActionContext)
  if (!context) {
    throw new Error('useLogActionSheet must be used within LogActionProvider')
  }

  return context
}

export function LogActionProvider({ children }: PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(false)

  const value = useMemo(
    () => ({
      open: () => setIsOpen(true),
    }),
    []
  )

  return (
    <LogActionContext.Provider value={value}>
      {children}

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            className='fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className='mx-auto flex h-full max-w-[430px] items-end px-3 pb-24 md:max-w-2xl'
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.98 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className='w-full rounded-[1.5rem] border border-white/10 bg-[#162033]/96 p-4 shadow-[0_24px_70px_rgba(0,0,0,.5)] backdrop-blur-2xl'>
                <div className='mb-4 flex items-center justify-between gap-3'>
                  <div>
                    <p className='text-xs uppercase tracking-[0.22em] text-[#7C3AED]'>Create</p>
                    <h3 className='text-lg font-semibold text-white'>Quick actions</h3>
                  </div>
                  <button type='button' className='rounded-full border border-white/10 bg-white/6 px-3 py-1.5 text-xs text-slate-200' onClick={() => setIsOpen(false)}>
                    Close
                  </button>
                </div>

                <div className='grid gap-2 sm:grid-cols-2'>
                  {logActions.map((action) => {
                    const Icon = action.icon
                    return (
                      <Link
                        key={action.label}
                        to={action.to}
                        onClick={() => setIsOpen(false)}
                        className={cn('flex items-center gap-3 rounded-2xl border border-white/10 bg-white/6 px-3 py-3 text-sm text-slate-100 transition-colors hover:bg-white/10')}
                      >
                        <span className='grid h-9 w-9 place-items-center rounded-full bg-[linear-gradient(180deg,rgba(124,58,237,.3),rgba(17,24,39,.2))] text-[#E9D5FF]'>
                          <Icon className='h-4 w-4' />
                        </span>
                        {action.label}
                      </Link>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </LogActionContext.Provider>
  )
}

export function FloatingLogButton() {
  const { open } = useLogActionSheet()

  return (
    <button
      type='button'
      onClick={open}
      aria-label='Open create actions'
      className='fixed bottom-6 left-1/2 z-50 hidden h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full border border-white/10 bg-[linear-gradient(180deg,rgba(124,58,237,.92),rgba(147,51,234,.92))] text-white shadow-[0_0_28px_rgba(124,58,237,.42)] backdrop-blur-xl transition hover:scale-105 hover:brightness-110 md:grid'
    >
      <Clapperboard className='h-6 w-6' />
    </button>
  )
}
