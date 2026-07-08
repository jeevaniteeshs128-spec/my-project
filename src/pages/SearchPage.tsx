import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'

import { allMedia, communities, users } from '@/data/mockData'

const tabs = ['All', 'Movies', 'Series', 'Actors', 'Directors', 'Communities', 'Users', 'Lists'] as const

export function SearchPage() {
  const [query, setQuery] = useState('')
  const [tab, setTab] = useState<(typeof tabs)[number]>('All')

  const results = useMemo(() => {
    const needle = query.toLowerCase()
    return allMedia.filter((item) => {
      const people = 'director' in item ? [item.director, ...item.cast, item.writer, item.musicDirector] : [item.creator]
      const text = [item.title, item.language, item.country, item.productionHouse, item.genres.join(' '), item.streaming.join(' '), people.join(' ')].join(' ').toLowerCase()
      const matchesTab = tab === 'All' || (tab === 'Movies' && item.mediaKind === 'movie') || (tab === 'Series' && item.mediaKind === 'series') || ['Actors', 'Directors', 'Lists'].includes(tab)
      return text.includes(needle) && matchesTab
    })
  }, [query, tab])

  return (
    <div className='space-y-5'>
      <div>
        <p className='text-xs uppercase tracking-[0.22em] text-[#35d07f]'>Universal Search</p>
        <h1 className='mt-1 text-2xl font-semibold text-white sm:text-3xl'>Find movies, series, people and rooms</h1>
      </div>
      <label className='flex h-12 items-center gap-3 rounded-lg border border-white/10 bg-white/[0.065] px-4 text-slate-400 focus-within:border-[#35d07f]/60'>
        <Search className='h-5 w-5' />
        <input value={query} onChange={(event) => setQuery(event.target.value)} autoFocus type='search' placeholder='Try Nolan, Korean thrillers, Apple TV, Lumon...' className='min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-slate-500' />
      </label>
      <div className='flex gap-2 overflow-x-auto'>
        {tabs.map((item) => (
          <button key={item} onClick={() => setTab(item)} className={`shrink-0 rounded-md px-3 py-2 text-xs font-medium ${tab === item ? 'bg-[#35d07f] text-black' : 'bg-white/8 text-slate-200'}`}>{item}</button>
        ))}
      </div>
      <section className='grid gap-3 md:grid-cols-2'>
        {results.map((item) => (
          <Link key={`${item.mediaKind}-${item.id}`} to={item.mediaKind === 'movie' ? `/movie/${item.id}` : `/series/${item.id}`} className='grid grid-cols-[72px_1fr] gap-3 rounded-lg border border-white/10 bg-white/[0.055] p-3 transition-colors hover:border-[#35d07f]/60'>
            <img src={item.poster} alt={item.title} className='aspect-[2/3] w-full rounded-md object-cover' />
            <div className='min-w-0'>
              <p className='text-xs uppercase tracking-[0.18em] text-slate-500'>{item.mediaKind}</p>
              <p className='truncate text-base font-semibold text-white'>{item.title}</p>
              <p className='mt-1 line-clamp-2 text-sm text-slate-300'>{item.genres.join(', ')} - {item.streaming.join(', ')}</p>
              <p className='mt-2 text-xs text-[#35d07f]'>{item.rating.toFixed(1)} community rating</p>
            </div>
          </Link>
        ))}
      </section>
      <section className='grid gap-3 md:grid-cols-2'>
        {communities.filter((community) => community.name.toLowerCase().includes(query.toLowerCase()) || tab === 'All').slice(0, 3).map((community) => (
          <Link key={community.id} to={`/community/${community.slug}`} className='rounded-lg border border-white/10 bg-white/[0.055] p-4'>
            <p className='font-semibold text-white'>{community.name}</p>
            <p className='mt-1 text-sm text-slate-300'>{community.description}</p>
          </Link>
        ))}
        {users.map((user) => (
          <Link key={user.id} to='/profile' className='rounded-lg border border-white/10 bg-white/[0.055] p-4'>
            <p className='font-semibold text-white'>{user.name}</p>
            <p className='mt-1 text-sm text-slate-300'>{user.bio}</p>
          </Link>
        ))}
      </section>
    </div>
  )
}
