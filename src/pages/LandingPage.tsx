import { CalendarDays, ChevronRight, MessageCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

import { MovieCard } from '@/components/shared/MovieCard'
import { ReviewCard } from '@/components/shared/ReviewCard'
import { Badge } from '@/components/ui/badge'
import { communities, directorQuotes, meetups, movies, reviews } from '@/data/mockData'

const friendActivity = [
  { user: 'cinema_ari', action: 'rated', movieId: 'interstellar', rating: 5, snippet: 'Docking sequence still owns my whole nervous system.' },
  { user: 'film_mira', action: 'reviewed', movieId: 'nayakan', rating: 4.5, snippet: 'Kamal Haasan makes myth feel painfully human.' },
  { user: 'noir_rahul', action: 'liked a thread for', movieId: 'fight-club', rating: 4, snippet: 'The satire discussion is finally spoiler-tagged properly.' },
  { user: 'cine_lina', action: 'logged', movieId: 'parasite', rating: 5, snippet: 'A perfect rewatch for noticing blocking and architecture.' },
]

function PosterRail({ title, items }: { title: string; items: typeof movies }) {
  return (
    <section className='space-y-3'>
      <div className='flex items-center justify-between gap-3'>
        <h2 className='text-base font-semibold text-white'>{title}</h2>
        <Link to='/movies' className='inline-flex items-center gap-1 text-xs text-slate-400 transition-colors duration-200 hover:text-white'>
          More <ChevronRight className='h-3.5 w-3.5' />
        </Link>
      </div>
      <div className='grid auto-cols-[112px] grid-flow-col gap-3 overflow-x-auto pb-1 sm:auto-cols-[132px] md:auto-cols-[150px] lg:auto-cols-[170px]'>
        {items.map((movie) => (
          <MovieCard key={movie.id} movie={movie} compact />
        ))}
      </div>
    </section>
  )
}

export function LandingPage() {
  const featured = movies[0]
  const quote = directorQuotes[new Date().getDate() % directorQuotes.length]

  return (
    <div className='space-y-7'>
      <section className='relative min-h-[25vh] overflow-hidden rounded-lg border border-white/10'>
        <img src={featured.backdrop} alt={featured.title} className='absolute inset-0 h-full w-full object-cover' />
        <div className='absolute inset-0 bg-gradient-to-r from-[#081023]/95 via-[#081023]/62 to-transparent' />
        <div className='relative flex min-h-[25vh] items-end gap-4 p-4 sm:p-5'>
          <Link to={`/movie/${featured.id}`} className='hidden w-24 shrink-0 overflow-hidden rounded-md border border-white/15 sm:block'>
            <img src={featured.poster} alt={featured.title} className='aspect-[2/3] w-full object-cover' />
          </Link>
          <div className='max-w-2xl'>
            <Badge variant='blue'>Trending movie of the day</Badge>
            <h1 className='mt-2 text-2xl font-semibold text-white sm:text-3xl'>{featured.title}</h1>
            <p className='mt-2 max-w-xl text-sm leading-6 text-slate-200'>"{quote.text}" - {quote.author}</p>
          </div>
        </div>
      </section>

      <PosterRail title='Popular This Week' items={[...movies].sort((a, b) => b.popularity - a.popularity)} />
      <PosterRail title='Popular With Friends' items={[movies[2], movies[4], movies[0], movies[3], movies[1], movies[5]]} />

      <section className='space-y-3'>
        <div className='flex items-center justify-between gap-3'>
          <h2 className='text-base font-semibold text-white'>New From Friends</h2>
          <Link to='/reviews' className='inline-flex items-center gap-1 text-xs text-slate-400 transition-colors duration-200 hover:text-white'>
            Feed <ChevronRight className='h-3.5 w-3.5' />
          </Link>
        </div>
        <div className='grid auto-cols-[260px] grid-flow-col gap-3 overflow-x-auto pb-1 md:auto-cols-[320px]'>
          {friendActivity.map((item) => {
            const movie = movies.find((entry) => entry.id === item.movieId) ?? movies[0]
            return (
              <article key={`${item.user}-${item.movieId}`} className='grid grid-cols-[72px_1fr] gap-3 rounded-lg border border-white/10 bg-[#101827] p-3'>
                <Link to={`/movie/${movie.id}`} className='overflow-hidden rounded-md border border-white/10'>
                  <img src={movie.poster} alt={movie.title} className='aspect-[2/3] w-full object-cover' />
                </Link>
                <div className='min-w-0'>
                  <p className='truncate text-sm font-semibold text-white'>{item.user}</p>
                  <p className='text-xs text-slate-400'>{item.action} {movie.title}</p>
                  <p className='mt-1 text-xs text-[#35d07f]'>{item.rating.toFixed(1)} / 5</p>
                  <p className='mt-2 line-clamp-2 text-sm leading-5 text-slate-300'>{item.snippet}</p>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section className='grid gap-6 lg:grid-cols-[1.3fr_0.7fr]'>
        <div className='space-y-3'>
          <h2 className='text-base font-semibold text-white'>Trending Reviews</h2>
          <div className='rounded-lg border border-white/10 bg-[#101827] px-4'>
            {reviews.slice(0, 4).map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>

        <div className='space-y-6'>
          <section className='space-y-3'>
            <h2 className='text-base font-semibold text-white'>Community Highlights</h2>
            <div className='grid grid-cols-2 gap-3 lg:grid-cols-2'>
              {communities.map((community) => {
                const movie = movies.find((item) => item.id === community.movieId) ?? movies[0]
                return (
                  <Link key={community.id} to={`/community/${community.slug}`} className='group block'>
                    <div className='overflow-hidden rounded-md border border-white/10 transition-colors duration-200 group-hover:border-[#35d07f]/70'>
                      <img src={movie.poster} alt={community.name} className='aspect-[2/3] w-full object-cover' />
                    </div>
                    <p className='mt-2 truncate text-sm font-semibold text-white'>{community.name}</p>
                    <p className='truncate text-xs text-slate-400'>{community.members.toLocaleString()} members</p>
                  </Link>
                )
              })}
            </div>
          </section>

          <section className='space-y-3'>
            <h2 className='text-base font-semibold text-white'>Upcoming Meetups</h2>
            <div className='space-y-2'>
              {meetups.map((meetup, index) => (
                <Link key={meetup.id} to='/meetups' className='flex items-center gap-3 rounded-lg border border-white/10 bg-[#101827] p-3 transition-colors duration-200 hover:border-[#35d07f]/60'>
                  <img src={movies[index % movies.length].poster} alt='' className='h-16 w-11 rounded-md object-cover' />
                  <div className='min-w-0 flex-1'>
                    <p className='truncate text-sm font-semibold text-white'>{meetup.title}</p>
                    <p className='mt-1 flex items-center gap-1 text-xs text-slate-400'><CalendarDays className='h-3.5 w-3.5' /> {meetup.date} - {meetup.mode}</p>
                  </div>
                  <MessageCircle className='h-4 w-4 text-[#35d07f]' />
                </Link>
              ))}
            </div>
          </section>
        </div>
      </section>
    </div>
  )
}
