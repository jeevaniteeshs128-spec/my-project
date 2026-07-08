import { Link, useLocation } from 'react-router-dom'
import { CirclePlus, Film, Home, Tv, UserRound, Users } from 'lucide-react'

import { useLogActionSheet } from './LogActionSheet'
import { cn } from '@/lib/utils'

const items = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/movies', label: 'Movies', icon: Film },
  { to: '/series', label: 'Series', icon: Tv },
  { to: '/communities', label: 'Community', icon: Users },
  { to: '/profile', label: 'Profile', icon: UserRound },
]

export function BottomNav() {
  const location = useLocation()
  const { open: openLogSheet } = useLogActionSheet()

  return (
    <>
      <div className='fixed inset-x-0 bottom-0 z-50 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 md:hidden'>
        <div className='mx-auto grid max-w-[430px] grid-cols-5 items-center gap-1 rounded-[1.5rem] border border-white/10 bg-[#081120]/84 px-2 py-2 shadow-[0_18px_60px_rgba(0,0,0,.42)] backdrop-blur-2xl'>
          {items.slice(0, 2).map((item) => {
            const Icon = item.icon
            const active = location.pathname === item.to
            return (
              <Link key={item.to} to={item.to} className='flex flex-col items-center gap-1 rounded-2xl py-1 text-[11px] text-slate-300'>
                <Icon className={cn('h-5 w-5 transition-colors duration-200', active && 'text-[#7C3AED] drop-shadow-[0_0_12px_rgba(124,58,237,.35)]')} />
                <span className={cn(active && 'text-white')}>{item.label}</span>
              </Link>
            )
          })}

          <button
            type='button'
            onClick={openLogSheet}
            className='mx-auto grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-[#6D28D9] to-[#9333EA] text-white shadow-[0_0_28px_rgba(124,58,237,.35)] transition hover:brightness-110'
            aria-label='Open quick actions'
          >
            <CirclePlus className='h-6 w-6' />
          </button>

          {items.slice(2).map((item) => {
            const Icon = item.icon
            const active = location.pathname === item.to
            return (
              <Link key={item.to} to={item.to} className='flex flex-col items-center gap-1 rounded-xl py-1 text-[11px] text-slate-300'>
                <Icon className={cn('h-5 w-5 transition-colors duration-200', active && 'text-[#7C3AED]')} />
                <span className={cn(active && 'text-white')}>{item.label}</span>
              </Link>
            )
          })}
        </div>
      </div>

    </>
  )
}
