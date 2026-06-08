import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Bookmark, CalendarDays, CirclePlus, Film, Home, MessageCircle, NotebookPen, StarHalf, UserRound, Users } from 'lucide-react'

import { cn } from '@/lib/utils'

const items = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/movies', label: 'Movies', icon: Film },
  { to: '/meetups', label: 'Meetups', icon: CalendarDays },
  { to: '/profile', label: 'Profile', icon: UserRound },
]

const quickLinks = [
  { to: '/reviews', label: 'Reviews', icon: StarHalf },
  { to: '/communities', label: 'Communities', icon: Users },
  { to: '/diary', label: 'Diary', icon: NotebookPen },
  { to: '/watchlist', label: 'Watchlist', icon: Bookmark },
  { to: '/chat', label: 'Chat', icon: MessageCircle },
  { to: '/director-feedback', label: 'Director feedback', icon: Film },
]

export function BottomNav() {
  const location = useLocation()
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className='fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[#081023]/96 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-md'>
        <div className='mx-auto grid max-w-[430px] grid-cols-5 items-center gap-1'>
          {items.slice(0, 2).map((item) => {
            const Icon = item.icon
            const active = location.pathname === item.to
            return (
              <Link key={item.to} to={item.to} className='flex flex-col items-center gap-1 rounded-xl py-1 text-[11px] text-slate-300'>
                <Icon className={cn('h-5 w-5 transition-colors duration-200', active && 'text-[#35d07f]')} />
                <span className={cn(active && 'text-white')}>{item.label}</span>
              </Link>
            )
          })}

          <button
            type='button'
            onClick={() => setOpen((value) => !value)}
            className='mx-auto grid h-12 w-12 place-items-center rounded-full bg-[#35d07f] text-[#081023] transition-colors duration-200 hover:bg-[#55e596]'
            aria-label='Open quick actions'
          >
            <CirclePlus className='h-6 w-6' />
          </button>

          {items.slice(2).map((item) => {
            const Icon = item.icon
            const active = location.pathname === item.to
            return (
              <Link key={item.to} to={item.to} className='flex flex-col items-center gap-1 rounded-xl py-1 text-[11px] text-slate-300'>
                <Icon className={cn('h-5 w-5 transition-colors duration-200', active && 'text-[#35d07f]')} />
                <span className={cn(active && 'text-white')}>{item.label}</span>
              </Link>
            )
          })}
        </div>
      </div>

      {open ? (
        <div className='fixed inset-0 z-40 bg-black/55' onClick={() => setOpen(false)} aria-hidden='true'>
          <div className='mx-auto flex h-full max-w-[430px] items-end px-3 pb-24' onClick={(event) => event.stopPropagation()}>
            <div className='w-full rounded-lg border border-white/10 bg-[#101827] p-3'>
              <div className='grid grid-cols-2 gap-2'>
                {quickLinks.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setOpen(false)}
                      className='flex items-center gap-2 rounded-md border border-white/10 bg-white/6 px-3 py-3 text-sm text-slate-100 transition-colors duration-200 hover:bg-white/10'
                    >
                      <Icon className='h-4 w-4 text-[#35d07f]' />
                      {item.label}
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
