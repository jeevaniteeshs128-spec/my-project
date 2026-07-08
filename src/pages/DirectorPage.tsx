import { Link, useParams } from 'react-router-dom'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { directors } from '@/data/mockData'

function fallbackName(slug: string) {
  return slug
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

export function DirectorPage() {
  const { directorSlug = '' } = useParams()
  const director = directors.find((item) => item.slug === directorSlug)
  const name = director?.name ?? fallbackName(directorSlug)

  return (
    <div className='space-y-6'>
      <section className='overflow-hidden rounded-[2rem] border border-white/10 bg-[#162033]'>
        <div className='relative h-56 sm:h-64'>
          <img src={director?.filmography[0]?.poster ?? directors[0].filmography[0].poster} alt={name} className='absolute inset-0 h-full w-full object-cover' />
          <div className='absolute inset-0 bg-[linear-gradient(0deg,#081120,transparent_45%)]' />
        </div>
        <div className='px-4 pb-4'>
          <div className='-mt-12 flex flex-wrap items-end gap-4'>
            <div className='grid h-24 w-24 place-items-center rounded-2xl border border-white/15 bg-[#081120] text-2xl font-semibold text-white'>
              {director?.avatar ?? name.slice(0, 2).toUpperCase()}
            </div>
            <div className='min-w-0 flex-1 pb-1'>
              <Badge variant='gold' className='w-fit'>Director Profile</Badge>
              <h1 className='mt-2 text-2xl font-semibold text-white sm:text-3xl'>{name}</h1>
              <p className='mt-1 max-w-2xl text-sm leading-6 text-slate-300'>{director?.bio ?? 'Reusable director profile rendered from mock JSON.'}</p>
            </div>
          </div>
        </div>
      </section>

      <section className='grid gap-4 lg:grid-cols-[1fr_.9fr]'>
        <Card>
          <CardHeader>
            <CardTitle>Career Timeline</CardTitle>
            <CardDescription>Major milestones and creative turns.</CardDescription>
          </CardHeader>
          <CardContent className='space-y-3'>
            {(director?.timeline ?? []).map((entry) => (
              <div key={entry.year + entry.title} className='rounded-2xl border border-white/10 bg-white/6 p-3'>
                <p className='text-xs uppercase tracking-[0.2em] text-[#7C3AED]'>{entry.year}</p>
                <p className='mt-1 font-semibold text-white'>{entry.title}</p>
                <p className='mt-1 text-sm leading-6 text-slate-300'>{entry.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Awards</CardTitle>
            <CardDescription>Recognition and community appreciation.</CardDescription>
          </CardHeader>
          <CardContent className='space-y-3'>
            {(director?.awards ?? ['Award data']).map((award) => (
              <div key={award} className='rounded-2xl border border-white/10 bg-white/6 p-3 text-sm text-slate-200'>
                {award}
              </div>
            ))}
            <div className='rounded-2xl border border-white/10 bg-white/6 p-3'>
              <p className='text-sm font-semibold text-white'>Community Reviews</p>
              <div className='mt-2 space-y-2 text-sm text-slate-300'>
                {(director?.communityReviews ?? ['Community notes will appear here.']).map((review) => (
                  <p key={review}>{review}</p>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className='space-y-3'>
        <h2 className='text-lg font-semibold text-white'>Filmography</h2>
        <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {(director?.filmography ?? []).map((item) => (
            <Link key={item.id} to={`/movie/${item.id}`} className='rounded-2xl border border-white/10 bg-[#162033] p-3 transition-colors hover:border-[#7C3AED]/60'>
              <img src={item.poster} alt={item.title} className='aspect-[2/3] w-full rounded-xl object-cover' />
              <p className='mt-2 truncate text-sm font-semibold text-white'>{item.title}</p>
              <p className='text-xs text-slate-400'>{item.year} - {item.rating.toFixed(1)}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className='space-y-3'>
        <h2 className='text-lg font-semibold text-white'>Highest Rated Movies</h2>
        <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-3'>
          {(director?.highestRatedMovies ?? []).map((title) => (
            <div key={title} className='rounded-2xl border border-white/10 bg-white/6 p-3 text-sm text-slate-200'>
              {title}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
