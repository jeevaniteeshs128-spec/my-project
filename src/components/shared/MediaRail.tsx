import { Link } from 'react-router-dom'

import { MovieCard } from '@/components/shared/MovieCard'
import type { Movie, Series } from '@/types'

type MediaRailProps = {
  title: string
  subtitle?: string
  items: Array<Movie | Series>
  kind: 'movie' | 'series'
  infinite?: boolean
}

export function MediaRail({ title, subtitle, items, kind, infinite = false }: MediaRailProps) {
  const railItems = infinite ? [...items, ...items] : items

  return (
    <section className='space-y-3'>
      {title || subtitle ? (
        <div className='flex items-end justify-between gap-3'>
          <div>
            {title ? <h2 className='text-lg font-semibold text-white'>{title}</h2> : null}
            {subtitle ? <p className='text-sm text-slate-400'>{subtitle}</p> : null}
          </div>
          <Link to={kind === 'movie' ? '/movies' : '/series'} className='inline-flex items-center gap-1 text-xs text-slate-400 transition-colors hover:text-white'>
            See all
          </Link>
        </div>
      ) : null}
      <div className='overflow-hidden'>
        <div className={infinite ? 'fp-marquee-track' : 'grid auto-cols-[132px] grid-flow-col gap-3 overflow-x-auto pb-2 sm:auto-cols-[150px] lg:auto-cols-[178px]'}>
          {railItems.map((item, index) => (
            <MovieCard
              key={`${item.id}-${infinite ? index : 'rail'}`}
              movie={item}
              compact
              showMeta
              to={kind === 'movie' ? `/movie/${item.id}` : `/series/${item.id}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
