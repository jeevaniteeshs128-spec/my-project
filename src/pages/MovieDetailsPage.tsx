import { Calendar, Languages, MessageSquare, Star, Users2 } from 'lucide-react'
import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'

import { ReviewCard } from '@/components/shared/ReviewCard'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { communities, meetups, movies, reviews } from '@/data/mockData'

export function MovieDetailsPage() {
  const { movieId = '' } = useParams()
  const movie = useMemo(() => movies.find((item) => item.id === movieId) ?? movies[0], [movieId])
  const community = communities.find((item) => item.movieId === movie.id)

  return (
    <div className='space-y-6'>
      <section className='relative overflow-hidden rounded-lg border border-white/10 bg-[#101827]'>
        <img src={movie.backdrop} alt={movie.title} className='absolute inset-0 h-full w-full object-cover' />
        <div className='absolute inset-0 bg-gradient-to-r from-[#081023]/95 via-[#081023]/74 to-[#081023]/15' />
        <div className='relative grid gap-4 p-4 sm:grid-cols-[160px_1fr] sm:p-5 lg:grid-cols-[190px_1fr]'>
          <img src={movie.poster} alt={movie.title} className='w-36 rounded-md border border-white/15 object-cover sm:w-full' />
          <div className='flex flex-col justify-end'>
            <h1 className='text-3xl font-semibold text-white'>{movie.title}</h1>
            <p className='mt-2 max-w-2xl text-sm leading-6 text-slate-300'>{movie.reviewSnippet}</p>
            <div className='mt-4 flex flex-wrap gap-2 text-sm text-slate-200'>
              <Badge variant='gold' className='gap-1'><Star className='h-3.5 w-3.5' /> {movie.rating.toFixed(1)}</Badge>
              <Badge variant='ghost'>Director: {movie.director}</Badge>
              <Badge variant='ghost' className='gap-1'><Users2 className='h-3.5 w-3.5' /> {movie.cast.join(', ')}</Badge>
              <Badge variant='ghost'>Crew: {movie.singer}</Badge>
              <Badge variant='ghost' className='gap-1'><Languages className='h-3.5 w-3.5' /> {movie.language}</Badge>
              <Badge variant='ghost' className='gap-1'><Calendar className='h-3.5 w-3.5' /> {movie.year}</Badge>
            </div>
          </div>
        </div>
      </section>

      <Tabs defaultValue='reviews'>
        <TabsList className='max-w-full overflow-x-auto'>
          <TabsTrigger value='reviews'>Reviews</TabsTrigger>
          <TabsTrigger value='lists'>Lists</TabsTrigger>
          <TabsTrigger value='activity'>Activity</TabsTrigger>
          <TabsTrigger value='community'>Community</TabsTrigger>
          <TabsTrigger value='director'>Director Feedback</TabsTrigger>
          <TabsTrigger value='meetups'>Meetup</TabsTrigger>
        </TabsList>

        <TabsContent value='reviews'>
          <div className='rounded-lg border border-white/10 bg-[#101827] px-4'>
            {reviews.filter((review) => review.movieId === movie.id).concat(reviews.slice(0, 2)).map((review) => (
              <ReviewCard key={`${movie.id}-${review.id}`} review={review} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value='lists' className='grid gap-3 md:grid-cols-3'>
          {['Best space films', 'Most rewatchable endings', 'Director craft studies'].map((list) => (
            <Link key={list} to='/watchlist' className='rounded-lg border border-white/10 bg-[#101827] p-4 transition-colors duration-200 hover:border-[#35d07f]/60'>
              <p className='text-sm font-semibold text-white'>{list}</p>
              <p className='mt-1 text-xs text-slate-400'>12 films</p>
            </Link>
          ))}
        </TabsContent>

        <TabsContent value='activity' className='space-y-2'>
          {['A friend watched this today', 'Someone liked a review', 'A community poll is active now'].map((entry) => (
            <div key={entry} className='flex items-center gap-3 rounded-lg border border-white/10 bg-[#101827] p-3'>
              <MessageSquare className='h-4 w-4 text-[#35d07f]' />
              <p className='text-sm text-slate-200'>{entry}</p>
            </div>
          ))}
        </TabsContent>

        <TabsContent value='community'>
          <Link to={`/community/${community?.slug ?? movie.id}`} className='grid gap-3 rounded-lg border border-white/10 bg-[#101827] p-3 transition-colors duration-200 hover:border-[#35d07f]/60 sm:grid-cols-[86px_1fr]'>
            <img src={movie.poster} alt={movie.title} className='h-32 w-20 rounded-md object-cover' />
            <div>
              <p className='text-base font-semibold text-white'>{community?.name ?? `${movie.title} Community`}</p>
              <p className='mt-2 text-sm leading-6 text-slate-300'>Reviews, discussions, polls, fan theories, spoiler discussions, and members for this film only.</p>
            </div>
          </Link>
        </TabsContent>

        <TabsContent value='director'>
          <div className='rounded-lg border border-white/10 bg-[#101827] p-4'>
            <p className='text-base font-semibold text-white'>Director feedback</p>
            <div className='mt-3 grid gap-3 md:grid-cols-3'>
              {['Story Issues', 'Technical Issues', 'Constructive Criticism'].map((item) => (
                <div key={item} className='rounded-md border border-white/10 bg-white/6 p-3 text-sm text-slate-200'>{item}</div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value='meetups' className='grid gap-3 md:grid-cols-3'>
          {meetups.map((meetup) => (
            <Link key={meetup.id} to='/meetups' className='rounded-lg border border-white/10 bg-[#101827] p-4 transition-colors duration-200 hover:border-[#35d07f]/60'>
              <p className='text-sm font-semibold text-white'>{meetup.title}</p>
              <p className='mt-1 text-xs text-slate-400'>{meetup.mode} - {meetup.cadence} - {meetup.registrations} registrations</p>
            </Link>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
