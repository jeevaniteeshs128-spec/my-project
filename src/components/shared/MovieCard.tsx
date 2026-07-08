import { Star } from 'lucide-react'
import { Link } from 'react-router-dom'

import type { Movie, Series } from '@/types'

type MovieCardProps = {
  movie: Movie | Series
  compact?: boolean
  showMeta?: boolean
  to?: string
}

const genreColors: Record<string, string> = {
  Action: '#DC2626',
  'Sci-Fi': '#3B82F6',
  Romance: '#EC4899',
  Comedy: '#FBBF24',
  Crime: '#475569',
  Fantasy: '#14B8A6',
  Drama: '#F97316',
  Horror: '#6D28D9',
}

export function MovieCard({ movie, compact = false, showMeta = false, to }: MovieCardProps) {
  const href = to ?? `/movie/${movie.id}`
  const creator = 'director' in movie ? movie.director : movie.creator
  const primaryGenre = movie.genres[0]
  const genreColor = genreColors[primaryGenre] ?? '#7C3AED'

  return (
    <Link to={href} className='group block min-w-0'>
      <div className='overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(28,41,66,.96),rgba(22,32,51,.86))] shadow-[0_18px_50px_rgba(0,0,0,.28)] transition duration-300 group-hover:border-[#7C3AED]/70 group-hover:shadow-[0_18px_54px_rgba(124,58,237,.22)]'>
        <img
          src={movie.poster}
          alt={movie.title}
          className='aspect-[2/3] w-full object-cover transition duration-300 group-hover:scale-[1.04] group-hover:opacity-90'
        />
      </div>
      <div className='mt-2 min-w-0'>
        <p className='truncate text-sm font-semibold text-white'>{movie.title}</p>
        {!compact || showMeta ? <p className='truncate text-xs text-slate-400'>{creator}, {movie.year}</p> : null}
        <div className='mt-1 flex min-w-0 items-center gap-2'>
          <p className='inline-flex items-center gap-1 text-xs text-[#F5B041]'>
            <Star className='h-3 w-3 fill-current' />
            {movie.rating.toFixed(1)}
          </p>
          {!compact || showMeta ? (
            <span className='truncate rounded-full border px-2 py-0.5 text-[10px] text-slate-200' style={{ borderColor: `${genreColor}66`, backgroundColor: `${genreColor}22` }}>
              {primaryGenre}
            </span>
          ) : null}
        </div>
      </div>
    </Link>
  )
}
