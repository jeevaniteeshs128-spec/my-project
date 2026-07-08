import { useMemo, useState } from 'react'
import { Search, X } from 'lucide-react'

import { MovieCard } from '@/components/shared/MovieCard'
import { series } from '@/data/mockData'

const filters = ['genre', 'language', 'country', 'creator', 'streaming', 'status', 'rating'] as const
type Filter = (typeof filters)[number]

function valuesFor(filter: Filter) {
  return Array.from(new Set(series.flatMap((item) => {
    if (filter === 'genre') return item.genres
    if (filter === 'streaming') return item.streaming
    if (filter === 'creator') return [item.creator]
    if (filter === 'rating') return [item.rating.toFixed(1)]
    return [item[filter]]
  }))).sort()
}

export function SeriesPage() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<Filter>('genre')
  const [value, setValue] = useState('')

  const results = useMemo(() => series.filter((item) => {
    const haystack = [item.title, item.creator, item.language, item.country, item.status, item.genres.join(' '), item.streaming.join(' ')].join(' ').toLowerCase()
    const matchesSearch = haystack.includes(search.toLowerCase())
    const matchesFilter = !value || valuesFor(filter).includes(value) && (
      filter === 'genre' ? item.genres.includes(value) :
      filter === 'streaming' ? item.streaming.includes(value) :
      filter === 'creator' ? item.creator === value :
      filter === 'rating' ? item.rating.toFixed(1) === value :
      item[filter] === value
    )
    return matchesSearch && matchesFilter
  }), [filter, search, value])

  return (
    <div className='space-y-5'>
      <div className='flex flex-wrap items-end justify-between gap-3'>
        <div>
          <p className='text-xs uppercase tracking-[0.22em] text-[#7C3AED]'>Series</p>
          <h1 className='mt-1 text-2xl font-semibold text-white sm:text-3xl'>Browse TV and episodes</h1>
        </div>
        <label className='flex h-10 w-full items-center gap-2 rounded-md border border-white/10 bg-white/6 px-3 text-slate-400 focus-within:border-[#7C3AED]/60 sm:w-80'>
          <Search className='h-4 w-4' />
          <input value={search} onChange={(event) => setSearch(event.target.value)} type='search' placeholder='Search series, creators, services' className='min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-slate-500' />
        </label>
      </div>

      <div className='sticky top-0 z-20 -mx-3 space-y-3 border-y border-white/10 bg-black/88 px-3 py-3 backdrop-blur-xl md:top-[72px] sm:-mx-4 sm:px-4 lg:-mx-6 lg:px-6'>
        <div className='flex gap-2 overflow-x-auto'>
          {filters.map((item) => (
            <button key={item} onClick={() => { setFilter(item); setValue('') }} className={`shrink-0 rounded-md px-3 py-2 text-xs font-medium capitalize ${filter === item ? 'bg-[#7C3AED] text-white' : 'bg-white/8 text-slate-200'}`}>
              {item}
            </button>
          ))}
        </div>
        <div className='grid gap-2 sm:grid-cols-[minmax(220px,360px)_auto_1fr] sm:items-center'>
          <select value={value} onChange={(event) => setValue(event.target.value)} className='h-10 rounded-md border border-white/10 bg-[#162033] px-3 text-sm text-white outline-none'>
            <option value=''>All {filter}s</option>
            {valuesFor(filter).map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
          {value ? <button onClick={() => setValue('')} className='inline-flex h-10 items-center justify-center gap-2 rounded-md border border-white/10 bg-white/8 px-3 text-sm text-slate-200'><X className='h-4 w-4' /> Clear</button> : null}
          <p className='text-xs text-slate-400'>{results.length} series ready for season and episode logging</p>
        </div>
      </div>

      <div className='grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7'>
        {results.map((item) => <MovieCard key={item.id} movie={item} to={`/series/${item.id}`} />)}
      </div>
    </div>
  )
}
