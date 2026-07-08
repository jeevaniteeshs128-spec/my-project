import { Navigate, useParams } from 'react-router-dom'
import { Bookmark, MessageCircle, Play, Star, Upload } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { reviews, series } from '@/data/mockData'

export function SeriesDetailsPage() {
  const { seriesId } = useParams()
  const show = series.find((item) => item.id === seriesId)

  if (!show) return <Navigate to='/series' replace />

  const showReviews = reviews.filter((review) => review.mediaId === show.id)

  return (
    <div className='space-y-6'>
      <section className='relative overflow-hidden rounded-lg border border-white/10'>
        <img src={show.backdrop} alt={show.title} className='absolute inset-0 h-full w-full object-cover' />
        <div className='absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,.96),rgba(0,0,0,.68),rgba(0,0,0,.24)),linear-gradient(0deg,#050608,transparent_45%)]' />
        <div className='relative grid gap-5 p-4 sm:p-6 md:grid-cols-[180px_1fr] md:items-end lg:p-8'>
          <img src={show.poster} alt={show.title} className='hidden aspect-[2/3] w-full rounded-lg border border-white/15 object-cover shadow-2xl md:block' />
          <div>
            <Badge variant='green'>{show.status}</Badge>
            <h1 className='mt-3 text-4xl font-semibold text-white'>{show.title}</h1>
            <p className='mt-2 text-sm text-slate-300'>{show.creator} - {show.year} - {show.genres.join(', ')}</p>
            <p className='mt-4 max-w-2xl text-base leading-7 text-slate-200'>{show.reviewSnippet}</p>
            <div className='mt-5 flex flex-wrap gap-2'>
              {['Rate Series', 'Log Season', 'Log Episode'].map((label) => (
                <button key={label} className='inline-flex h-10 items-center gap-2 rounded-md bg-white/10 px-3 text-sm font-semibold text-white'>
                  <Star className='h-4 w-4 text-[#35d07f]' /> {label}
                </button>
              ))}
              <button className='inline-flex h-10 items-center gap-2 rounded-md bg-[#35d07f] px-3 text-sm font-semibold text-black'>
                <Upload className='h-4 w-4' /> Video Review
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className='grid gap-4 md:grid-cols-3'>
        <div className='rounded-lg border border-white/10 bg-white/[0.055] p-4 md:col-span-2'>
          <div className='flex items-center justify-between gap-3'>
            <h2 className='text-lg font-semibold text-white'>Progress Tracker</h2>
            <span className='text-sm text-[#35d07f]'>{show.progress}% complete</span>
          </div>
          <div className='mt-3 h-2 overflow-hidden rounded-full bg-white/10'>
            <div className='h-full rounded-full bg-[#35d07f]' style={{ width: `${show.progress}%` }} />
          </div>
          <div className='mt-5 space-y-4'>
            {show.seasons.map((season) => (
              <div key={season.id}>
                <div className='flex items-center justify-between gap-3'>
                  <h3 className='font-semibold text-white'>Season {season.number}: {season.title}</h3>
                  <span className='text-xs text-slate-400'>{season.rating.toFixed(1)} rated</span>
                </div>
                <div className='mt-3 grid gap-3 sm:grid-cols-2'>
                  {season.episodes.map((episode) => (
                    <article key={episode.id} className='grid grid-cols-[92px_1fr] gap-3 rounded-md bg-black/25 p-2'>
                      <img src={episode.still} alt={episode.title} className='h-20 w-full rounded object-cover' />
                      <div className='min-w-0'>
                        <p className='truncate text-sm font-semibold text-white'>E{episode.number}. {episode.title}</p>
                        <p className='text-xs text-slate-400'>{episode.runtime} - {episode.rating.toFixed(1)}</p>
                        <p className='mt-1 line-clamp-2 text-xs text-slate-300'>{episode.synopsis}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className='space-y-3 rounded-lg border border-white/10 bg-white/[0.055] p-4'>
          <h2 className='text-lg font-semibold text-white'>Review Tools</h2>
          {['Newest', 'Most Popular', 'Friends', 'Video', 'Text'].map((filter) => (
            <button key={filter} className='mr-2 mb-2 rounded-md border border-white/10 bg-white/8 px-3 py-2 text-xs text-slate-200'>{filter}</button>
          ))}
          <div className='space-y-3 pt-2'>
            {showReviews.map((review) => (
              <article key={review.id} className='rounded-md bg-black/25 p-3'>
                <div className='flex items-center justify-between'>
                  <p className='text-sm font-semibold text-white'>{review.user}</p>
                  <Badge variant={review.kind === 'video' ? 'blue' : 'ghost'}>{review.kind}</Badge>
                </div>
                <p className='mt-2 text-sm leading-6 text-slate-300'>{review.text}</p>
                <p className='mt-2 flex items-center gap-3 text-xs text-slate-400'><MessageCircle className='h-3.5 w-3.5' /> {review.comments} <Bookmark className='h-3.5 w-3.5' /> {review.bookmarks}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className='rounded-lg border border-white/10 bg-white/[0.055] p-4'>
        <h2 className='text-lg font-semibold text-white'>Recommendations</h2>
        <div className='mt-3 grid gap-3 sm:grid-cols-3'>
          {series.filter((item) => item.id !== show.id).map((item) => (
            <div key={item.id} className='flex items-center gap-3 rounded-md bg-black/25 p-3'>
              <Play className='h-4 w-4 text-[#35d07f]' />
              <div className='min-w-0'>
                <p className='truncate text-sm font-semibold text-white'>{item.title}</p>
                <p className='text-xs text-slate-400'>{item.genres.join(', ')}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
