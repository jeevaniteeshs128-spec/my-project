import { motion } from 'framer-motion'
import { BookmarkPlus, Bot, CalendarDays, ChevronRight, MessageCircle, NotebookPen, Play, Plus, Star } from 'lucide-react'
import { Link } from 'react-router-dom'

import { MovieCard } from '@/components/shared/MovieCard'
import { ReviewCard } from '@/components/shared/ReviewCard'
import { Badge } from '@/components/ui/badge'
import { activities, communities, getMedia, meetups, movies, reviews, series } from '@/data/mockData'
import { getMediaAtmosphere } from '@/lib/atmosphere'

function PosterRail({ title, subtitle, items, type }: { title: string; subtitle: string; items: typeof movies | typeof series; type: 'movie' | 'series' }) {
  return (
    <section className='space-y-3'>
      <div className='flex items-end justify-between gap-3'>
        <div>
          <h2 className='text-lg font-semibold text-white'>{title}</h2>
          <p className='text-sm text-slate-400'>{subtitle}</p>
        </div>
        <Link to={type === 'movie' ? '/movies' : '/series'} className='inline-flex items-center gap-1 text-xs text-slate-400 transition-colors hover:text-white'>
          See all <ChevronRight className='h-3.5 w-3.5' />
        </Link>
      </div>
      <div className='grid auto-cols-[132px] grid-flow-col gap-3 overflow-x-auto pb-2 sm:auto-cols-[150px] lg:auto-cols-[178px]'>
        {items.map((item) => (
          <MovieCard key={item.id} movie={item} to={type === 'movie' ? `/movie/${item.id}` : `/series/${item.id}`} compact />
        ))}
      </div>
    </section>
  )
}

export function LandingPage() {
  const featured = movies[0]
  const featuredAtmosphere = getMediaAtmosphere(featured.id, featured.genres, 'movie')

  return (
    <div className='space-y-8 lg:space-y-10'>
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className='relative min-h-[560px] overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_28px_90px_rgba(0,0,0,.38)] md:min-h-[520px]'
      >
        <img src={featured.backdrop} alt={featured.title} className='absolute inset-0 h-full w-full object-cover' />
        <div className='absolute inset-0' style={{ background: featuredAtmosphere }} />
        <div className='absolute inset-0 bg-[linear-gradient(0deg,#081120,transparent_48%)]' />
        <div className='relative flex min-h-[560px] flex-col justify-end gap-6 p-5 sm:p-6 md:min-h-[520px] lg:p-10'>
          <div className='grid gap-5 md:grid-cols-[180px_1fr] md:items-end'>
            <Link to={`/movie/${featured.id}`} className='hidden overflow-hidden rounded-2xl border border-white/15 shadow-2xl md:block'>
              <img src={featured.poster} alt={featured.title} className='aspect-[2/3] w-full object-cover' />
            </Link>
            <div className='max-w-3xl'>
              <div className='flex flex-wrap items-center gap-2'>
                <Badge variant='ai' className='gap-1'><Bot className='h-3.5 w-3.5' /> AI recommended for tonight</Badge>
                <Badge variant='gold'>{featured.rating.toFixed(1)} cinema score</Badge>
              </div>
              <h1 className='mt-4 text-4xl font-semibold text-white sm:text-5xl lg:text-6xl'>{featured.title}</h1>
              <div className='mt-3 flex flex-wrap items-center gap-2 text-sm text-slate-200'>
                {featured.genres.map((genre) => <span key={genre}>{genre}</span>)}
                <span>{featured.runtime}</span>
                <span className='inline-flex items-center gap-1 text-[#F5B041]'><Star className='h-4 w-4 fill-current' /> {featured.rating.toFixed(1)}</span>
              </div>
              <p className='mt-4 max-w-2xl text-base leading-7 text-slate-200'>{featured.reviewSnippet} Join live reviews, log your rewatch, or jump into the community thread.</p>
              <div className='mt-5 flex flex-wrap gap-2'>
                <Link to={`/movie/${featured.id}`} className='inline-flex h-11 items-center gap-2 rounded-full bg-gradient-to-r from-[#6D28D9] to-[#9333EA] px-5 text-sm font-semibold text-white shadow-[0_18px_44px_rgba(124,58,237,.32)] transition hover:brightness-110'>
                  <NotebookPen className='h-4 w-4' /> Review
                </Link>
                <Link to='/diary' className='inline-flex h-11 items-center gap-2 rounded-full border border-white/12 bg-white/10 px-5 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/15'>
                  <Plus className='h-4 w-4' /> Log
                </Link>
                <Link to='/watchlist' className='inline-flex h-11 items-center gap-2 rounded-full border border-white/12 bg-white/10 px-5 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/15'>
                  <BookmarkPlus className='h-4 w-4' /> Watchlist
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <section className='grid gap-4 rounded-[1.75rem] border border-[#7C3AED]/20 bg-[#7C3AED]/[0.06] p-4 shadow-[0_0_40px_rgba(124,58,237,.08)] md:grid-cols-[1fr_auto] md:items-center'>
        <div>
          <p className='text-xs uppercase tracking-[0.22em] text-[#E9D5FF]'>Verified filmmaker feedback</p>
          <h2 className='mt-2 text-2xl font-semibold text-white'>Open the Director Feedback dashboard</h2>
          <p className='mt-2 max-w-2xl text-sm leading-6 text-slate-300'>
            Read curated constructive notes and open the director dashboard from one place. The route is also available from the top navigation.
          </p>
        </div>
        <Link to='/director-feedback' className='inline-flex h-11 items-center justify-center rounded-full bg-gradient-to-r from-[#6D28D9] to-[#9333EA] px-5 text-sm font-semibold text-white shadow-[0_18px_44px_rgba(124,58,237,.32)] transition hover:brightness-110'>
          Go to Director Feedback
        </Link>
      </section>

      <section className='grid gap-3 rounded-[1.5rem] border border-[#22D3EE]/20 bg-[#22D3EE]/[0.04] p-3 shadow-[0_0_40px_rgba(34,211,238,.08)] md:grid-cols-5'>
        {['Because you watched Interstellar', 'Hidden gems', 'Similar directors', 'Trending for you', 'Watch next'].map((label, index) => {
          const media = index % 2 === 0 ? movies[index % movies.length] : series[index % series.length]
          return (
            <Link key={label} to={index % 2 === 0 ? `/movie/${media.id}` : `/series/${media.id}`} className='rounded-2xl border border-[#22D3EE]/20 bg-[#081120]/55 p-3 backdrop-blur transition-colors hover:border-[#22D3EE]/60'>
              <p className='text-xs text-[#A5F3FC]'>{label}</p>
              <p className='mt-1 truncate text-sm font-semibold text-white'>{media.title}</p>
            </Link>
          )
        })}
      </section>

      <PosterRail title='Trending Movies' subtitle='Large poster browsing with community pulse.' items={[...movies].sort((a, b) => b.popularity - a.popularity)} type='movie' />
      <PosterRail title='Trending Series' subtitle='Season and episode logging ready.' items={[...series].sort((a, b) => b.popularity - a.popularity)} type='series' />

      <section className='grid gap-6 lg:grid-cols-[1fr_380px]'>
        <div className='space-y-3'>
          <h2 className='text-lg font-semibold text-white'>Friends Activity</h2>
          <div className='space-y-3'>
            {activities.map((activity) => {
              const media = getMedia(activity.mediaId)
              if (!media) return null
              return (
                <article key={activity.id} className='grid grid-cols-[64px_1fr] gap-3 rounded-2xl border border-white/10 bg-white/[0.055] p-3 backdrop-blur'>
                  <img src={media.poster} alt={media.title} className='aspect-[2/3] w-full rounded-xl object-cover' />
                  <div className='min-w-0'>
                    <p className='truncate text-sm font-semibold text-white'>{activity.user}</p>
                    <p className='text-xs text-slate-400'>{activity.action} {media.title}</p>
                    <p className='mt-2 line-clamp-2 text-sm leading-6 text-slate-200'>{activity.snippet}</p>
                    {activity.rating ? <p className='mt-2 text-xs text-[#F5B041]'>{activity.rating.toFixed(1)} / 5</p> : null}
                  </div>
                </article>
              )
            })}
          </div>
        </div>

        <div className='space-y-6'>
          <section className='space-y-3'>
            <h2 className='text-lg font-semibold text-white'>Community Highlights</h2>
            {communities.slice(0, 3).map((community) => (
              <Link key={community.id} to={`/community/${community.slug}`} className='block rounded-2xl border border-white/10 bg-white/[0.055] p-4 backdrop-blur transition-colors hover:border-[#7C3AED]/60'>
                <div className='flex items-center justify-between gap-3'>
                  <p className='font-semibold text-white'>{community.name}</p>
                  <MessageCircle className='h-4 w-4 text-[#7C3AED]' />
                </div>
                <p className='mt-2 line-clamp-2 text-sm text-slate-300'>{community.description}</p>
                <p className='mt-3 text-xs text-slate-400'>{community.members.toLocaleString()} members - {community.poll}</p>
              </Link>
            ))}
          </section>
          <section className='space-y-3'>
            <h2 className='text-lg font-semibold text-white'>Upcoming Releases</h2>
            {movies.slice(3).map((movie) => (
              <div key={movie.id} className='flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.055] p-3'>
                <img src={movie.poster} alt={movie.title} className='h-16 w-11 rounded-xl object-cover' />
                <div className='min-w-0 flex-1'>
                  <p className='truncate text-sm font-semibold text-white'>{movie.title}</p>
                  <p className='text-xs text-slate-400'>{movie.countdown} - {movie.streaming[0]}</p>
                </div>
                <button className='grid h-9 w-9 place-items-center rounded-full bg-white/10 text-slate-100' aria-label={`Set reminder for ${movie.title}`}>
                  <CalendarDays className='h-4 w-4' />
                </button>
              </div>
            ))}
          </section>
        </div>
      </section>

      <section className='grid gap-6 lg:grid-cols-[1.2fr_.8fr]'>
        <div className='rounded-[1.5rem] border border-white/10 bg-white/[0.055] px-4 backdrop-blur'>
          <h2 className='pt-4 text-lg font-semibold text-white'>Popular Reviews</h2>
          {reviews.map((review) => <ReviewCard key={review.id} review={review} />)}
        </div>
        <div className='rounded-[1.5rem] border border-white/10 bg-white/[0.055] p-4 backdrop-blur'>
          <h2 className='text-lg font-semibold text-white'>Live Rooms</h2>
          <div className='mt-4 space-y-3'>
            {meetups.map((meetup) => (
              <Link key={meetup.id} to='/meetups' className='flex items-center gap-3 rounded-2xl bg-black/25 p-3'>
                <Play className='h-4 w-4 text-[#7C3AED]' />
                <div className='min-w-0'>
                  <p className='truncate text-sm font-semibold text-white'>{meetup.title}</p>
                  <p className='text-xs capitalize text-slate-400'>{meetup.type} - {meetup.mode}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
