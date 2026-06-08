import { CalendarDays, MapPin, Video } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { meetups, movies } from '@/data/mockData'

export function MeetupsPage() {
  return (
    <div className='space-y-5'>
      <div>
        <p className='text-xs uppercase tracking-[0.22em] text-[#35d07f]'>Meetups</p>
        <h1 className='mt-1 text-2xl font-semibold text-white sm:text-3xl'>Reviewer circles and director sessions</h1>
      </div>

      <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-3'>
        {meetups.map((meetup, index) => {
          const movie = movies[index % movies.length]
          return (
            <article key={meetup.id} className='overflow-hidden rounded-lg border border-white/10 bg-[#101827]'>
              <div className='relative h-44'>
                <img src={movie.backdrop} alt={movie.title} className='absolute inset-0 h-full w-full object-cover' />
                <div className='absolute inset-0 bg-gradient-to-t from-[#101827] via-[#101827]/55 to-transparent' />
                <img src={movie.poster} alt={movie.title} className='absolute bottom-3 left-3 h-28 w-[74px] rounded-md border border-white/15 object-cover' />
                <Badge variant={meetup.mode === 'offline' ? 'gold' : 'blue'} className='absolute right-3 top-3'>{meetup.mode}</Badge>
              </div>
              <div className='space-y-3 p-4'>
                <div>
                  <h2 className='text-base font-semibold text-white'>{meetup.title}</h2>
                  <p className='mt-1 text-sm text-slate-400'>{movie.title} community pairing</p>
                </div>
                <div className='grid gap-2 text-sm text-slate-300'>
                  <span className='inline-flex items-center gap-2'><CalendarDays className='h-4 w-4 text-[#35d07f]' /> {meetup.date} - {meetup.cadence}</span>
                  <span className='inline-flex items-center gap-2'>
                    {meetup.mode === 'offline' ? <MapPin className='h-4 w-4 text-[#35d07f]' /> : <Video className='h-4 w-4 text-[#35d07f]' />}
                    {meetup.communityOnly ? 'Community members only' : 'Open to eligible members'}
                  </span>
                </div>
                <button className='w-full rounded-md bg-[#35d07f] px-3 py-2 text-sm font-semibold text-[#081023] transition-colors duration-200 hover:bg-[#55e596]'>
                  Register
                </button>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
