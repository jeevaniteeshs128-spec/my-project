import { Bookmark, Check, MessageCircle, PlayCircle, Share2, ThumbsUp } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { getMedia } from '@/data/mockData'
import type { Review } from '@/types'

type ReviewCardProps = {
  review: Review
}

export function ReviewCard({ review }: ReviewCardProps) {
  const media = getMedia(review.mediaId)

  if (!media) return null

  const href = review.mediaKind === 'movie' ? `/movie/${media.id}` : `/series/${media.id}`

  return (
    <article className='grid grid-cols-[74px_1fr] gap-3 border-b border-white/10 py-4 last:border-0 sm:grid-cols-[94px_1fr]'>
      <Link to={href} className='relative block overflow-hidden rounded-2xl border border-white/10 transition-colors duration-200 hover:border-[#7C3AED]/70'>
        <img src={media.poster} alt={media.title} className='aspect-[2/3] w-full object-cover' />
        {review.kind === 'video' ? <PlayCircle className='absolute inset-0 m-auto h-8 w-8 text-white drop-shadow-[0_0_14px_rgba(0,0,0,.55)]' /> : null}
      </Link>
      <div className='min-w-0'>
        <div className='flex items-start justify-between gap-3'>
          <div className='flex min-w-0 items-center gap-2'>
            <Avatar className='h-7 w-7'>
              <AvatarFallback>{review.avatar}</AvatarFallback>
            </Avatar>
            <div className='min-w-0'>
              <p className='truncate text-sm font-semibold text-white'>{review.user}</p>
              <p className='truncate text-xs text-slate-400'>reviewed {media.title}</p>
            </div>
          </div>
          <div className='flex flex-wrap justify-end gap-1'>
            <Badge variant='gold'>{review.rating.toFixed(1)}</Badge>
            {review.spoiler ? <Badge variant='ghost'>Spoiler</Badge> : null}
            <Badge variant={review.kind === 'video' ? 'ai' : 'ghost'}>{review.kind === 'video' ? 'Video' : 'Text'}</Badge>
          </div>
        </div>
        <p className='mt-2 line-clamp-3 text-sm leading-6 text-slate-200'>{review.text}</p>
        <div className='mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-400'>
          <span className='inline-flex items-center gap-1'><ThumbsUp className='h-3.5 w-3.5' /> {review.likes}</span>
          <span className='inline-flex items-center gap-1'><MessageCircle className='h-3.5 w-3.5' /> {review.comments}</span>
          <span className='inline-flex items-center gap-1'><Share2 className='h-3.5 w-3.5' /> Share</span>
          <span className='inline-flex items-center gap-1'><Bookmark className='h-3.5 w-3.5' /> {review.bookmarks}</span>
          <span className='inline-flex items-center gap-1 text-[#7C3AED]'><Check className='h-3.5 w-3.5' /> {review.kind === 'video' ? 'Video review' : 'Text review'}</span>
        </div>
      </div>
    </article>
  )
}
