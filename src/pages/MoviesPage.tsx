import { useMemo, useState } from 'react'
import { Search, X } from 'lucide-react'

import { MovieCard } from '@/components/shared/MovieCard'
import { movies } from '@/data/mockData'

const filterOptions = ['director', 'actor', 'singer', 'genre', 'language', 'year', 'rating'] as const

type FilterOption = (typeof filterOptions)[number]

function uniqueValues(category: FilterOption) {
  const values = movies.flatMap((movie) => {
    if (category === 'director') return [movie.director]
    if (category === 'actor') return [...movie.cast, ...movie.actress]
    if (category === 'singer') return [movie.singer]
    if (category === 'genre') return [movie.genre]
    if (category === 'language') return [movie.language]
    if (category === 'year') return [String(movie.year)]
    return [movie.rating.toFixed(1)]
  })

  return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b))
}

function movieMatchesValue(movie: (typeof movies)[number], category: FilterOption, value: string) {
  if (category === 'director') return movie.director === value
  if (category === 'actor') return [...movie.cast, ...movie.actress].includes(value)
  if (category === 'singer') return movie.singer === value
  if (category === 'genre') return movie.genre === value
  if (category === 'language') return movie.language === value
  if (category === 'year') return String(movie.year) === value
  return movie.rating.toFixed(1) === value
}

export function MoviesPage() {
  const [category, setCategory] = useState<FilterOption>('director')
  const [selectedValue, setSelectedValue] = useState('')
  const [search, setSearch] = useState('')

  const dropdownValues = useMemo(() => uniqueValues(category), [category])

  const filtered = useMemo(() => {
    const searched = movies.filter((movie) => {
      const haystack = [
        movie.title,
        movie.director,
        movie.genre,
        movie.language,
        movie.cast.join(' '),
        movie.actress.join(' '),
        movie.singer,
        movie.year,
        movie.rating,
      ]
        .join(' ')
        .toLowerCase()

      return haystack.includes(search.toLowerCase())
    })

    const narrowed = selectedValue
      ? searched.filter((movie) => movieMatchesValue(movie, category, selectedValue))
      : searched

    return [...narrowed].sort((a, b) => {
      if (category === 'director') return a.director.localeCompare(b.director)
      if (category === 'actor') return a.cast[0].localeCompare(b.cast[0])
      if (category === 'singer') return a.singer.localeCompare(b.singer)
      if (category === 'genre') return a.genre.localeCompare(b.genre)
      if (category === 'language') return a.language.localeCompare(b.language)
      if (category === 'year') return b.year - a.year
      return b.rating - a.rating
    })
  }, [category, search, selectedValue])

  return (
    <div className='space-y-5'>
      <div className='flex flex-wrap items-end justify-between gap-3'>
        <div>
          <p className='text-xs uppercase tracking-[0.22em] text-[#7C3AED]'>Films</p>
          <h1 className='mt-1 text-2xl font-semibold text-white sm:text-3xl'>Browse movies</h1>
        </div>
        <label className='flex h-10 w-full items-center gap-2 rounded-md border border-white/10 bg-white/6 px-3 text-slate-400 transition-colors focus-within:border-[#7C3AED]/60 sm:w-80'>
          <Search className='h-4 w-4' />
          <input
            type='search'
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder='Search by title, crew, genre'
            className='min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-slate-500'
          />
        </label>
      </div>

      <div className='sticky top-0 z-20 -mx-3 space-y-3 border-y border-white/10 bg-[#081120]/95 px-3 py-3 backdrop-blur-md md:top-[72px] sm:-mx-4 sm:px-4 lg:-mx-6 lg:px-6'>
        <div className='flex gap-2 overflow-x-auto'>
          {filterOptions.map((option) => (
            <button
              key={option}
              onClick={() => {
                setCategory(option)
                setSelectedValue('')
              }}
              className={`shrink-0 rounded-md px-3 py-2 text-xs font-medium capitalize transition-colors duration-200 ${
                category === option ? 'bg-[#7C3AED] text-white' : 'bg-white/6 text-slate-200 hover:bg-white/10'
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        <div className='grid gap-2 sm:grid-cols-[minmax(220px,360px)_auto_1fr] sm:items-center'>
          <select
            value={selectedValue}
            onChange={(event) => setSelectedValue(event.target.value)}
            className='h-10 rounded-md border border-white/10 bg-[#162033] px-3 text-sm capitalize text-white outline-none transition-colors duration-200 focus:border-[#7C3AED]/60'
          >
            <option value=''>All {category}s</option>
            {dropdownValues.map((value) => (
              <option key={value} value={value}>{value}</option>
            ))}
          </select>

          {selectedValue ? (
            <button
              type='button'
              onClick={() => setSelectedValue('')}
              className='inline-flex h-10 items-center justify-center gap-2 rounded-md border border-white/10 bg-white/6 px-3 text-sm text-slate-200 transition-colors duration-200 hover:bg-white/10'
            >
              <X className='h-4 w-4' />
              Clear
            </button>
          ) : null}

          <p className='text-xs text-slate-400'>
            {selectedValue ? `Showing ${selectedValue} movies` : `Showing all movies sorted by ${category}`}
          </p>
        </div>
      </div>

      <div className='grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8'>
        {filtered.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  )
}
