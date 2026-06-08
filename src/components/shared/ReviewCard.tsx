import { MessageCircle, ThumbsUp } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { movies } from '@/data/mockData'
import type { Review } from '@/types'

type ReviewCardProps = {
  review: Review
}

export function ReviewCard({ review }: ReviewCardProps) {
  const movie = movies.find((item) => item.id === review.movieId) ?? movies[0]

  return (
    <article className='grid grid-cols-[74px_1fr] gap-3 border-b border-white/10 py-4 last:border-0 sm:grid-cols-[94px_1fr]'>
      <Link to={`/movie/${movie.id}`} className='block overflow-hidden rounded-md border border-white/10 transition-colors duration-200 hover:border-[#35d07f]/70'>
        <img src={movie.poster} alt={movie.title} className='aspect-[2/3] w-full object-cover' />
      </Link>
      <div className='min-w-0'>
        <div className='flex items-start justify-between gap-3'>
          <div className='flex min-w-0 items-center gap-2'>
            <Avatar className='h-7 w-7'>
              <AvatarFallback>{review.avatar}</AvatarFallback>
            </Avatar>
            <div className='min-w-0'>
              <p className='truncate text-sm font-semibold text-white'>{review.user}</p>
              <p className='truncate text-xs text-slate-400'>reviewed {movie.title}</p>
            </div>
          </div>
          <Badge variant='gold'>{review.rating.toFixed(1)}</Badge>
        </div>
        <p className='mt-2 line-clamp-3 text-sm leading-6 text-slate-200'>{review.text}</p>
        <div className='mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-400'>
          <span className='inline-flex items-center gap-1'><ThumbsUp className='h-3.5 w-3.5' /> {review.likes}</span>
          <span className='inline-flex items-center gap-1'><MessageCircle className='h-3.5 w-3.5' /> {review.comments}</span>
          <span className='text-[#35d07f]'>{review.comments + 8} community posts</span>
        </div>
      </div>
    </article>
  )
}
