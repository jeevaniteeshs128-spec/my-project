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
    <header className='sticky top-0 z-40 hidden h-[72px] border-b border-white/10 bg-black/70 backdrop-blur-xl md:block'>
      <div className='mx-auto flex h-full max-w-7xl items-center gap-5 px-4 lg:px-6'>
        <Link to='/' className='inline-flex shrink-0 items-center gap-2 text-white'>
          <Clapperboard className='h-5 w-5 text-[#35d07f]' />
          <span className='text-[15px] font-semibold uppercase tracking-[0.18em]'>Full Pace</span>
        </Link>

        <nav className='flex min-w-0 flex-1 items-center gap-1 overflow-x-auto'>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'rounded-md px-3 py-2 text-sm font-medium text-slate-300 transition-colors duration-200 hover:bg-white/6 hover:text-white',
                  isActive && 'bg-white/8 text-white'
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <label className='hidden h-10 w-[260px] items-center gap-2 rounded-md border border-white/10 bg-white/6 px-3 text-slate-400 transition-colors focus-within:border-[#35d07f]/60 lg:flex'>
          <Search className='h-4 w-4' />
          <input
            type='search'
            placeholder='Search movies, series, people'
            className='min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-slate-500'
          />
        </label>

        <Link to='/series' className='grid h-10 w-10 place-items-center rounded-md border border-white/10 bg-white/6 text-slate-200 transition-colors duration-200 hover:bg-white/10'>
          <Tv className='h-4 w-4' />
        </Link>
        <Link to='/notifications' className='grid h-10 w-10 place-items-center rounded-md border border-white/10 bg-white/6 text-slate-200 transition-colors duration-200 hover:bg-white/10'>
          <Bell className='h-4 w-4' />
        </Link>
        <Link to='/chat' className='grid h-10 w-10 place-items-center rounded-md border border-white/10 bg-white/6 text-slate-200 transition-colors duration-200 hover:bg-white/10 lg:hidden'>
          <MessageCircle className='h-4 w-4' />
        </Link>
        <Link to='/profile' className='grid h-10 w-10 place-items-center rounded-full border border-[#35d07f]/30 bg-[#35d07f]/12 text-[#35d07f] transition-colors duration-200 hover:bg-[#35d07f]/20'>
          <UserRound className='h-5 w-5' />
        </Link>
      </div>
    </header>
  )
}
