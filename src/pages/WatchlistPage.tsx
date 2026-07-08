import { Lock } from 'lucide-react'
import { useState } from 'react'

import { MovieCard } from '@/components/shared/MovieCard'
import { movies } from '@/data/mockData'

const publicWatchlist = movies.slice(0, 5)
const privateWatchlist = movies.slice(1, 6)

export function WatchlistPage() {
  const [currentList, setCurrentList] = useState<'public' | 'private'>('public')
  const activeList = currentList === 'public' ? publicWatchlist : privateWatchlist

  return (
    <div className='space-y-5'>
      <div className='flex flex-wrap items-end justify-between gap-3'>
        <div>
          <p className='text-xs uppercase tracking-[0.22em] text-[#7C3AED]'>Watchlist</p>
          <h1 className='mt-1 text-2xl font-semibold text-white sm:text-3xl'>Films to watch</h1>
        </div>
        <div className='flex rounded-md border border-white/10 bg-white/6 p-1'>
          {(['public', 'private'] as const).map((item) => (
            <button
              key={item}
              onClick={() => setCurrentList(item)}
              className={`rounded px-3 py-2 text-sm capitalize transition-colors duration-200 ${
                currentList === item ? 'bg-[#7C3AED] text-white' : 'text-slate-300 hover:text-white'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className='grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7'>
        {activeList.map((movie) => (
          <div key={movie.id} className='relative'>
            {currentList === 'private' ? (
              <span className='absolute right-2 top-2 z-10 grid h-7 w-7 place-items-center rounded-full bg-[#081120]/85 text-[#7C3AED]'>
                <Lock className='h-3.5 w-3.5' />
              </span>
            ) : null}
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  )
}
