import { Star } from 'lucide-react'
import { Link } from 'react-router-dom'

import type { Movie } from '@/types'

type MovieCardProps = {
  movie: Movie
  compact?: boolean
}

export function MovieCard({ movie, compact = false }: MovieCardProps) {
  return (
    <Link to={`/movie/${movie.id}`} className='group block min-w-0'>
      <div className='overflow-hidden rounded-md border border-white/10 bg-[#101827] transition-colors duration-200 group-hover:border-[#35d07f]/70'>
        <img
          src={movie.poster}
          alt={movie.title}
          className='aspect-[2/3] w-full object-cover transition-opacity duration-200 group-hover:opacity-90'
        />
      </div>
      <div className='mt-2 min-w-0'>
        <p className='truncate text-sm font-semibold text-white'>{movie.title}</p>
        {!compact ? <p className='truncate text-xs text-slate-400'>{movie.director}, {movie.year}</p> : null}
        <p className='mt-1 inline-flex items-center gap-1 text-xs text-[#35d07f]'>
          <Star className='h-3 w-3 fill-current' />
          {movie.rating.toFixed(1)}
        </p>
      </div>
    </Link>
  )
}
