import { Bell, Clapperboard, MessageCircle, Search, Tv, UserRound } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'

import { cn } from '@/lib/utils'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/movies', label: 'Movies' },
  { to: '/series', label: 'Series' },
  { to: '/communities', label: 'Communities' },
  { to: '/chat', label: 'Chats' },
  { to: '/meetups', label: 'Meetups' },
  { to: '/search', label: 'Search' },
]

export function Navbar() {
  return (
    <header className='sticky top-0 z-40 hidden h-[76px] border-b border-white/10 bg-[#081120]/72 shadow-[0_1px_0_rgba(255,255,255,.04)_inset] backdrop-blur-2xl md:block'>
      <div className='mx-auto flex h-full max-w-7xl items-center gap-5 px-4 lg:px-6'>
        <Link to='/' className='inline-flex shrink-0 items-center gap-2 text-white'>
          <span className='grid h-10 w-10 place-items-center rounded-2xl border border-[#7C3AED]/30 bg-[linear-gradient(180deg,rgba(124,58,237,.28),rgba(17,24,39,.18))] shadow-[0_0_26px_rgba(124,58,237,.24)]'>
            <Clapperboard className='h-5 w-5 text-[#E9D5FF]' />
          </span>
          <span className='text-[15px] font-semibold uppercase tracking-[0.18em]'>
            <span className='text-[#F8FAFC]'>Full</span>{' '}
            <span className='bg-gradient-to-r from-[#7C3AED] to-[#C084FC] bg-clip-text text-transparent'>Pace</span>
          </span>
        </Link>

        <nav className='flex min-w-0 flex-1 items-center gap-1 overflow-x-auto'>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'rounded-full px-3 py-2 text-sm font-medium text-slate-300 transition duration-200 hover:bg-white/6 hover:text-white',
                  isActive && 'bg-[#7C3AED]/18 text-white shadow-[0_-2px_0_#7C3AED_inset]'
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <label className='hidden h-11 w-[280px] items-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 text-slate-400 transition-colors focus-within:border-[#7C3AED]/60 focus-within:bg-white/8 lg:flex'>
          <Search className='h-4 w-4' />
          <input
            type='search'
            placeholder='Search movies, series, people'
            className='min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-slate-500'
          />
        </label>

        <Link to='/series' className='grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/6 text-slate-200 transition-colors duration-200 hover:bg-white/10'>
          <Tv className='h-4 w-4' />
        </Link>
        <Link to='/notifications' className='grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/6 text-slate-200 transition-colors duration-200 hover:bg-white/10'>
          <Bell className='h-4 w-4' />
        </Link>
        <Link to='/chat' className='grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/6 text-slate-200 transition-colors duration-200 hover:bg-white/10 lg:hidden'>
          <MessageCircle className='h-4 w-4' />
        </Link>
        <Link to='/profile' className='grid h-10 w-10 place-items-center rounded-full border border-[#7C3AED]/30 bg-[#7C3AED]/12 text-[#7C3AED] transition-colors duration-200 hover:bg-[#7C3AED]/20'>
          <UserRound className='h-5 w-5' />
        </Link>
      </div>
    </header>
  )
}
