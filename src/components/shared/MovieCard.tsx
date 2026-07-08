import { Star } from 'lucide-react'
import { Link } from 'react-router-dom'

import type { Movie, Series } from '@/types'

type MovieCardProps = {
  movie: Movie | Series
  compact?: boolean
  to?: string
}

export function MovieCard({ movie, compact = false, to }: MovieCardProps) {
  const href = to ?? `/movie/${movie.id}`
  const creator = 'director' in movie ? movie.director : movie.creator

  return (
    <Link to={href} className='group block min-w-0'>
      <div className='overflow-hidden rounded-lg border border-white/10 bg-[#101827] shadow-[0_18px_50px_rgba(0,0,0,.24)] transition-colors duration-200 group-hover:border-[#35d07f]/70'>
        <img
          src={movie.poster}
          alt={movie.title}
          className='aspect-[2/3] w-full object-cover transition duration-300 group-hover:scale-[1.03] group-hover:opacity-90'
        />
      </div>
      <div className='mt-2 min-w-0'>
        <p className='truncate text-sm font-semibold text-white'>{movie.title}</p>
        {!compact ? <p className='truncate text-xs text-slate-400'>{creator}, {movie.year}</p> : null}
        <p className='mt-1 inline-flex items-center gap-1 text-xs text-[#35d07f]'>
          <Star className='h-3 w-3 fill-current' />
          {movie.rating.toFixed(1)}
        </p>
      </div>
    </Link>
  )
}
