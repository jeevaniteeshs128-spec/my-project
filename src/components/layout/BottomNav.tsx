import { Link, useLocation } from 'react-router-dom'
import { CirclePlus, Film, Home, Tv, Users } from 'lucide-react'

import { useLogActionSheet } from './LogActionSheet'
import { cn } from '@/lib/utils'

const items = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/movies', label: 'Movies', icon: Film },
  { to: '/series', label: 'Series', icon: Tv },
  { to: '/communities', label: 'Community', icon: Users },
]

export function BottomNav() {
  const location = useLocation()
  const { open: openLogSheet } = useLogActionSheet()

  return (
    <>
      <div className='fixed inset-x-0 bottom-0 z-50 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2'>
        <div className='mx-auto grid max-w-[560px] grid-cols-5 items-center gap-2 rounded-[2rem] border border-white/12 bg-white/8 px-2 py-2 shadow-[0_20px_70px_rgba(0,0,0,.46)] backdrop-blur-2xl'>
          {items.slice(0, 2).map((item) => {
            const Icon = item.icon
            const active = location.pathname === item.to
            return (
              <Link key={item.to} to={item.to} className='flex flex-col items-center gap-1 rounded-2xl py-1 text-[11px] text-slate-300 transition-colors hover:text-white'>
                <Icon className={cn('h-5 w-5 transition-all duration-200', active && 'text-[#7C3AED] drop-shadow-[0_0_12px_rgba(124,58,237,.35)]')} />
                <span className={cn(active && 'text-white')}>{item.label}</span>
              </Link>
            )
          })}

          <button
            type='button'
            onClick={openLogSheet}
            className='mx-auto grid h-14 w-14 place-items-center rounded-full border border-white/10 bg-[linear-gradient(180deg,rgba(124,58,237,.96),rgba(147,51,234,.9))] text-white shadow-[0_0_30px_rgba(124,58,237,.42)] transition hover:scale-105 hover:brightness-110'
            aria-label='Open create actions'
          >
            <CirclePlus className='h-7 w-7' />
          </button>

          {items.slice(2).map((item) => {
            const Icon = item.icon
            const active = location.pathname === item.to
            return (
              <Link key={item.to} to={item.to} className='flex flex-col items-center gap-1 rounded-2xl py-1 text-[11px] text-slate-300 transition-colors hover:text-white'>
                <Icon className={cn('h-5 w-5 transition-all duration-200', active && 'text-[#7C3AED]')} />
                <span className={cn(active && 'text-white')}>{item.label}</span>
              </Link>
            )
          })}
        </div>
      </div>

    </>
  )
}
