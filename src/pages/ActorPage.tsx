import { Link, useParams } from 'react-router-dom'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { actors } from '@/data/mockData'

function fallbackName(slug: string) {
  return slug
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

export function ActorPage() {
  const { actorSlug = '' } = useParams()
  const actor = actors.find((item) => item.slug === actorSlug)
  const name = actor?.name ?? fallbackName(actorSlug)

  return (
    <div className='space-y-6'>
      <section className='overflow-hidden rounded-[2rem] border border-white/10 bg-[#162033]'>
        <div className='relative h-56 sm:h-64'>
          <img src={actor?.photos[1] ?? actor?.photos[0] ?? actors[0].photos[0]} alt={name} className='absolute inset-0 h-full w-full object-cover' />
          <div className='absolute inset-0 bg-[linear-gradient(0deg,#081120,transparent_45%)]' />
        </div>
        <div className='px-4 pb-4'>
          <div className='-mt-12 flex flex-wrap items-end gap-4'>
            <div className='grid h-24 w-24 place-items-center rounded-2xl border border-white/15 bg-[#081120] text-2xl font-semibold text-white'>
              {actor?.avatar ?? name.slice(0, 2).toUpperCase()}
            </div>
            <div className='min-w-0 flex-1 pb-1'>
              <Badge variant='brand' className='w-fit'>Actor Profile</Badge>
              <h1 className='mt-2 text-2xl font-semibold text-white sm:text-3xl'>{name}</h1>
              <p className='mt-1 max-w-2xl text-sm leading-6 text-slate-300'>{actor?.bio ?? 'Reusable actor profile rendered from mock JSON.'}</p>
            </div>
          </div>
        </div>
      </section>

      <section className='grid gap-4 lg:grid-cols-[1fr_.9fr]'>
        <Card>
          <CardHeader>
            <CardTitle>Known For</CardTitle>
            <CardDescription>Movies and series tied to this profile.</CardDescription>
          </CardHeader>
          <CardContent className='space-y-3'>
            <div className='flex flex-wrap gap-2'>
              {(actor?.knownFor ?? []).map((item) => (
                <Badge key={item} variant='ghost'>
                  {item}
                </Badge>
              ))}
            </div>
            <div className='grid gap-3 sm:grid-cols-2'>
              {(actor?.photos ?? []).map((photo) => (
                <img key={photo} src={photo} alt={name} className='rounded-2xl object-cover' />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Projects</CardTitle>
            <CardDescription>Built from the same reusable profile JSON.</CardDescription>
          </CardHeader>
          <CardContent className='space-y-2'>
            {(actor?.upcomingProjects ?? ['Untitled project']).map((project) => (
              <div key={project} className='rounded-2xl border border-white/10 bg-white/6 p-3 text-sm text-slate-200'>
                {project}
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className='space-y-3'>
        <h2 className='text-lg font-semibold text-white'>Movieography</h2>
        <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {(actor?.movieography ?? []).map((item) => (
            <Link key={item.id} to={`/movie/${item.id}`} className='rounded-2xl border border-white/10 bg-[#162033] p-3 transition-colors hover:border-[#7C3AED]/60'>
              <img src={item.poster} alt={item.title} className='aspect-[2/3] w-full rounded-xl object-cover' />
              <p className='mt-2 truncate text-sm font-semibold text-white'>{item.title}</p>
              <p className='text-xs text-slate-400'>{item.year} - {item.rating.toFixed(1)}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className='space-y-3'>
        <h2 className='text-lg font-semibold text-white'>TV Shows</h2>
        <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {(actor?.tvShows ?? []).map((item) => (
            <Link key={item.id} to={`/series/${item.id}`} className='rounded-2xl border border-white/10 bg-[#162033] p-3 transition-colors hover:border-[#7C3AED]/60'>
              <img src={item.poster} alt={item.title} className='aspect-[2/3] w-full rounded-xl object-cover' />
              <p className='mt-2 truncate text-sm font-semibold text-white'>{item.title}</p>
              <p className='text-xs text-slate-400'>{item.year} - {item.rating.toFixed(1)}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className='space-y-3'>
        <h2 className='text-lg font-semibold text-white'>Biography</h2>
        <div className='rounded-[1.5rem] border border-white/10 bg-white/[0.055] p-4 text-sm leading-7 text-slate-200'>
          {actor?.bio ?? `${name} has not been fully populated in the mock dataset yet, but this profile remains fully reusable.`}
        </div>
      </section>
    </div>
  )
}
