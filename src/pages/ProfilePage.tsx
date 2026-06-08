import { Link } from 'react-router-dom'
import { MapPin, Star } from 'lucide-react'

import { MovieCard } from '@/components/shared/MovieCard'
import { movies, reviews } from '@/data/mockData'

const stats = [
  ['Films', '428'],
  ['Reviews', '146'],
  ['Followers', '2.8k'],
  ['Following', '318'],
]

export function ProfilePage() {
  return (
    <div className='space-y-6'>
      <section className='overflow-hidden rounded-lg border border-white/10 bg-[#101827]'>
        <div className='relative h-48 sm:h-64'>
          <img src={movies[1].backdrop} alt='Profile cover' className='absolute inset-0 h-full w-full object-cover' />
          <div className='absolute inset-0 bg-gradient-to-t from-[#101827] via-[#101827]/45 to-transparent' />
        </div>
        <div className='px-4 pb-4'>
          <div className='-mt-12 flex flex-wrap items-end gap-4'>
            <div className='grid h-24 w-24 place-items-center rounded-md border border-white/15 bg-[#081023] text-2xl font-semibold text-white'>FP</div>
            <div className='min-w-0 flex-1 pb-1'>
              <h1 className='text-2xl font-semibold text-white sm:text-3xl'>Full Pace User</h1>
              <p className='mt-1 max-w-2xl text-sm leading-6 text-slate-300'>Movie-first reviewer, list maker, and community regular. Watch. Review. Discuss. Connect.</p>
              <p className='mt-1 inline-flex items-center gap-1 text-xs text-slate-400'><MapPin className='h-3.5 w-3.5' /> Chennai, India</p>
            </div>
          </div>
          <div className='mt-4 grid grid-cols-4 gap-2 border-y border-white/10 py-3'>
            {stats.map(([label, value]) => (
              <div key={label}>
                <p className='text-base font-semibold text-white'>{value}</p>
                <p className='text-xs text-slate-400'>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='grid gap-6 lg:grid-cols-[0.7fr_1.3fr]'>
        <div className='space-y-5'>
          <section>
            <h2 className='text-base font-semibold text-white'>Favorite Directors</h2>
            <div className='mt-3 grid grid-cols-2 gap-3'>
              {['Martin Scorsese', 'Wong Kar-wai'].map((director) => (
                <div key={director} className='rounded-lg border border-white/10 bg-[#101827] p-3'>
                  <p className='text-sm font-semibold text-white'>{director}</p>
                  <p className='mt-1 text-xs text-slate-400'>Followed director</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className='text-base font-semibold text-white'>Lists</h2>
            <div className='mt-3 space-y-2'>
              {['Best time-loop films', 'Quiet heartbreak dramas', 'Director-first rewatches'].map((list) => (
                <Link key={list} to='/watchlist' className='flex items-center justify-between rounded-lg border border-white/10 bg-[#101827] p-3 text-sm transition-colors duration-200 hover:border-[#35d07f]/60'>
                  <span className='text-white'>{list}</span>
                  <span className='text-xs text-slate-400'>View</span>
                </Link>
              ))}
            </div>
          </section>
        </div>

        <div className='space-y-6'>
          <section>
            <h2 className='text-base font-semibold text-white'>Favorite Movies</h2>
            <div className='mt-3 grid grid-cols-4 gap-3'>
              {movies.slice(0, 4).map((movie) => (
                <MovieCard key={movie.id} movie={movie} compact />
              ))}
            </div>
          </section>

          <section>
            <h2 className='text-base font-semibold text-white'>Recent Activity</h2>
            <div className='mt-3 grid auto-cols-[112px] grid-flow-col gap-3 overflow-x-auto sm:auto-cols-[132px] md:auto-cols-[150px]'>
              {movies.slice(1, 6).map((movie) => (
                <MovieCard key={movie.id} movie={movie} compact />
              ))}
            </div>
          </section>

          <section>
            <h2 className='text-base font-semibold text-white'>Reviews</h2>
            <div className='mt-3 space-y-3'>
              {reviews.slice(0, 3).map((review) => {
                const movie = movies.find((item) => item.id === review.movieId) ?? movies[0]
                return (
                  <article key={review.id} className='grid grid-cols-[72px_1fr] gap-3 rounded-lg border border-white/10 bg-[#101827] p-3'>
                    <img src={movie.poster} alt={movie.title} className='aspect-[2/3] w-full rounded-md object-cover' />
                    <div className='min-w-0'>
                      <p className='truncate text-sm font-semibold text-white'>{movie.title}</p>
                      <p className='mt-1 inline-flex items-center gap-1 text-xs text-[#35d07f]'><Star className='h-3 w-3 fill-current' /> {review.rating.toFixed(1)}</p>
                      <p className='mt-2 line-clamp-2 text-sm leading-5 text-slate-300'>{review.text}</p>
                    </div>
                  </article>
                )
              })}
            </div>
          </section>
        </div>
      </section>
    </div>
  )
}
