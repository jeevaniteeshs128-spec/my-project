import { motion } from 'framer-motion'
import { BookmarkPlus, Heart, Languages, PenSquare, Play, Share2, Star, Users2 } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { useMemo, useState, type ReactNode } from 'react'

import { MediaRail } from '@/components/shared/MediaRail'
import { MediaReviewsSection } from '@/components/shared/MediaReviewsSection'
import { useLogActionSheet } from '@/components/layout/LogActionSheet'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  aiRecommendations,
  communities,
  directors,
  getActor,
  getDirector,
  getMedia,
  getRecommendedSeries,
  getSimilarMovies,
  meetups,
  movies,
  reviews,
} from '@/data/mockData'
import { getMediaAtmosphere } from '@/lib/atmosphere'
import { slugify } from '@/lib/slugify'

function ActionButton({ children, active = false, onClick }: { children: ReactNode; active?: boolean; onClick?: () => void }) {
  return (
    <Button
      type='button'
      variant={active ? 'default' : 'secondary'}
      size='sm'
      onClick={onClick}
      className='rounded-full px-4'
    >
      {children}
    </Button>
  )
}

export function MovieDetailsPage() {
  const { movieId = '' } = useParams()
  const movie = useMemo(() => movies.find((item) => item.id === movieId) ?? movies[0], [movieId])
  const atmosphere = getMediaAtmosphere(movie.id, movie.genres, 'movie')
  const similarMovies = getSimilarMovies(movie.id)
  const recommendedSeries = getRecommendedSeries(movie.id)
  const aiPick = aiRecommendations[movie.id] ?? aiRecommendations.interstellar
  const movieReviews = reviews.filter((review) => review.mediaId === movie.id)
  const community = communities.find((item) => item.mediaId === movie.id)
  const directorSlug = slugify(movie.director)
  const director = getDirector(directorSlug) ?? directors[0]
  const { open: openLogSheet } = useLogActionSheet()
  const [watchlisted, setWatchlisted] = useState(false)
  const [favorited, setFavorited] = useState(false)

  return (
    <div className='space-y-6'>
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className='relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#162033]'
      >
        <img src={movie.backdrop} alt={movie.title} className='absolute inset-0 h-full w-full object-cover' />
        <motion.div className='absolute inset-0' animate={{ opacity: 1 }} transition={{ duration: 0.45 }} style={{ background: atmosphere }} />
        <div className='absolute inset-0 bg-[linear-gradient(0deg,#081120,transparent_50%)]' />
        <div className='relative grid gap-4 p-4 sm:grid-cols-[160px_1fr] sm:p-5 lg:grid-cols-[190px_1fr]'>
          <img src={movie.poster} alt={movie.title} className='w-36 rounded-2xl border border-white/15 object-cover shadow-[0_18px_50px_rgba(0,0,0,.35)] sm:w-full' />
          <div className='flex flex-col justify-end'>
            <Badge variant='brand' className='w-fit gap-1'>Cinematic spotlight</Badge>
            <h1 className='mt-3 text-3xl font-semibold text-white'>{movie.title}</h1>
            <p className='mt-2 max-w-2xl text-sm leading-6 text-slate-300'>{movie.reviewSnippet}</p>
            <div className='mt-4 flex flex-wrap gap-2 text-sm text-slate-200'>
              <Badge variant='gold' className='gap-1'><Star className='h-3.5 w-3.5' /> {movie.rating.toFixed(1)}</Badge>
              <Badge variant='ghost'>Director</Badge>
              <Link to={`/director/${directorSlug}`} className='inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/6 px-3 py-1 text-slate-200 transition-colors hover:bg-white/10'>
                {movie.director}
              </Link>
              <Badge variant='ghost' className='gap-1'><Users2 className='h-3.5 w-3.5' /> {movie.cast.length} cast members</Badge>
              <Badge variant='ghost' className='gap-1'><Languages className='h-3.5 w-3.5' /> {movie.language}</Badge>
              <Badge variant='ghost' className='gap-1'>{movie.year}</Badge>
            </div>
            <div className='mt-5 flex flex-wrap gap-2'>
              <ActionButton onClick={openLogSheet}><Star className='h-4 w-4 text-[#F5B041]' /> Rate Movie</ActionButton>
              <ActionButton onClick={openLogSheet}><PenSquare className='h-4 w-4' /> Log Movie</ActionButton>
              <ActionButton onClick={openLogSheet}><Play className='h-4 w-4' /> Video Review</ActionButton>
              <ActionButton onClick={openLogSheet}><PenSquare className='h-4 w-4' /> Write Review</ActionButton>
              <ActionButton active={watchlisted} onClick={() => setWatchlisted((value) => !value)}><BookmarkPlus className='h-4 w-4' /> {watchlisted ? 'Saved' : 'Add to Watchlist'}</ActionButton>
              <ActionButton active={favorited} onClick={() => setFavorited((value) => !value)}><Heart className='h-4 w-4' /> {favorited ? 'Favorited' : 'Favorite'}</ActionButton>
              <ActionButton><Share2 className='h-4 w-4' /> Share</ActionButton>
            </div>
          </div>
        </div>
      </motion.section>

      <section className='grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
        {movie.cast.slice(0, 4).map((name) => {
          const person = getActor(slugify(name))
          return (
            <Link key={name} to={`/actor/${slugify(name)}`} className='rounded-[1.25rem] border border-white/10 bg-[#162033] p-4 transition-colors duration-200 hover:border-[#7C3AED]/60'>
              <div className='flex items-center gap-3'>
                <div className='grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/6 text-sm font-semibold text-white'>
                  {person?.avatar ?? name.slice(0, 2).toUpperCase()}
                </div>
                <div className='min-w-0'>
                  <p className='truncate font-semibold text-white'>{name}</p>
                  <p className='text-xs text-slate-400'>Actor profile</p>
                </div>
              </div>
            </Link>
          )
        })}
      </section>

      <section className='grid gap-4 md:grid-cols-[1.4fr_.9fr]'>
        <div className='rounded-[1.5rem] border border-white/10 bg-white/[0.055] p-4 backdrop-blur'>
          <div className='flex items-center justify-between gap-3'>
            <div>
              <h2 className='text-lg font-semibold text-white'>Reviews</h2>
              <p className='text-sm text-slate-400'>Switch between all, text, and video reviews.</p>
            </div>
          </div>
          <div className='mt-4'>
            <MediaReviewsSection mediaId={movie.id} mediaKind='movie' />
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Director</CardTitle>
            <CardDescription>Open the director profile for biography, awards, and filmography.</CardDescription>
          </CardHeader>
          <CardContent className='space-y-3'>
            <Link to={`/director/${directorSlug}`} className='block rounded-2xl border border-white/10 bg-white/6 p-3 transition-colors hover:bg-white/10'>
              <p className='text-sm font-semibold text-white'>{director.name}</p>
              <p className='mt-1 text-xs text-slate-400'>{director.bio}</p>
            </Link>
            <div className='grid gap-2'>
              {director.highestRatedMovies.slice(0, 3).map((title) => (
                <div key={title} className='rounded-2xl border border-white/10 bg-white/6 p-3 text-sm text-slate-200'>{title}</div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <MediaRail title='Similar Movies' subtitle='Horizontal browsing with poster-first cards.' items={similarMovies} kind='movie' />

      <section className='grid gap-4 lg:grid-cols-[1fr_.9fr]'>
        <Card>
          <CardHeader>
            <CardTitle>AI Recommended For You</CardTitle>
            <CardDescription>{aiPick.headline}</CardDescription>
          </CardHeader>
          <CardContent className='space-y-3'>
            {aiPick.rationale.map((item) => (
              <div key={item} className='rounded-2xl border border-[#22D3EE]/20 bg-[#22D3EE]/[0.045] p-3 text-sm text-slate-100'>
                {item}
              </div>
            ))}
            <div className='grid gap-3 sm:grid-cols-3'>
              {aiPick.items.map((id) => {
                const item = getMedia(id)
                if (!item || item.mediaKind !== 'movie') return null
                return <MovieCardLike key={item.id} mediaId={item.id} />
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>More Like This</CardTitle>
            <CardDescription>Infinite horizontal scroll based on the current title.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='overflow-hidden'>
              <div className='fp-marquee-track'>
                {[...similarMovies, ...similarMovies].map((item) => (
                  <Link key={`${item.id}-${item.year}`} to={`/movie/${item.id}`} className='min-w-[132px] max-w-[132px]'>
                    <div className='overflow-hidden rounded-2xl border border-white/10 bg-[#162033] shadow-[0_18px_50px_rgba(0,0,0,.28)]'>
                      <img src={item.poster} alt={item.title} className='aspect-[2/3] w-full object-cover transition duration-300 hover:scale-[1.04]' />
                    </div>
                    <p className='mt-2 truncate text-sm font-semibold text-white'>{item.title}</p>
                    <p className='text-xs text-slate-400'>{item.year} - {item.genres[0]}</p>
                  </Link>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className='grid gap-4 lg:grid-cols-[1fr_.9fr]'>
        <Card>
          <CardHeader>
            <CardTitle>Community Discussions</CardTitle>
            <CardDescription>Dynamic groups, pinned threads, and spoiler-safe conversation.</CardDescription>
          </CardHeader>
          <CardContent className='space-y-3'>
            {community ? (
              <Link key={community.id} to={`/community/${community.slug}`} className='block rounded-2xl border border-[#7C3AED]/25 bg-[#7C3AED]/[0.08] p-3 transition-colors hover:bg-[#7C3AED]/[0.12]'>
                <p className='font-semibold text-white'>{community.name}</p>
                <p className='mt-1 text-xs text-slate-400'>{community.pinned}</p>
              </Link>
            ) : null}
            {communities.filter((item) => item.mediaId === movie.id || item.mediaKind === 'movie').slice(0, 3).map((item) => (
              <Link key={item.id} to={`/community/${item.slug}`} className='block rounded-2xl border border-white/10 bg-white/6 p-3 transition-colors hover:bg-white/10'>
                <p className='font-semibold text-white'>{item.name}</p>
                <p className='mt-1 text-xs text-slate-400'>{item.members.toLocaleString()} members</p>
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Latest Reviews</CardTitle>
            <CardDescription>Recent community sentiment on this title.</CardDescription>
          </CardHeader>
          <CardContent className='space-y-3'>
            {movieReviews.slice(0, 3).map((review) => (
              <div key={review.id} className='rounded-2xl border border-white/10 bg-white/6 p-3'>
                <p className='text-sm font-semibold text-white'>{review.user}</p>
                <p className='mt-1 text-xs text-slate-400'>{review.kind} review - {review.rating.toFixed(1)}</p>
                <p className='mt-2 line-clamp-3 text-sm leading-6 text-slate-200'>{review.text}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className='grid gap-4 lg:grid-cols-[1fr_.9fr]'>
        <MediaRail title='Recommended Movies' subtitle='Mock TMDB-style recommendations.' items={similarMovies} kind='movie' />
        <Card>
          <CardHeader>
            <CardTitle>Meetups</CardTitle>
            <CardDescription>Upcoming sessions built from the existing community data.</CardDescription>
          </CardHeader>
          <CardContent className='space-y-3'>
            {meetups.map((meetup) => (
              <Link key={meetup.id} to='/meetups' className='block rounded-2xl border border-white/10 bg-white/6 p-3 transition-colors hover:bg-white/10'>
                <p className='text-sm font-semibold text-white'>{meetup.title}</p>
                <p className='mt-1 text-xs text-slate-400'>{meetup.mode} - {meetup.cadence}</p>
              </Link>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className='grid gap-4 lg:grid-cols-[1fr_.9fr]'>
        <Card>
          <CardHeader>
            <CardTitle>Related Lists</CardTitle>
            <CardDescription>Lists and curation links connected to this film.</CardDescription>
          </CardHeader>
          <CardContent className='grid gap-3 sm:grid-cols-3'>
            {['Best space films', 'Most rewatchable endings', 'Director craft studies'].map((list) => (
              <Link key={list} to='/watchlist' className='rounded-2xl border border-white/10 bg-white/6 p-3 transition-colors hover:bg-white/10'>
                <p className='text-sm font-semibold text-white'>{list}</p>
                <p className='mt-1 text-xs text-slate-400'>12 films</p>
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Trending Now</CardTitle>
            <CardDescription>Sorted by current popularity in the mock catalog.</CardDescription>
          </CardHeader>
          <CardContent>
            <MediaRail title='' items={[...movies].sort((a, b) => b.popularity - a.popularity).slice(0, 6)} kind='movie' />
          </CardContent>
        </Card>
      </section>

      <section className='grid gap-4 lg:grid-cols-[1fr_.9fr]'>
        <Card>
          <CardHeader>
            <CardTitle>Cast Filmography</CardTitle>
            <CardDescription>Tap any actor to open a reusable profile page.</CardDescription>
          </CardHeader>
          <CardContent className='grid gap-3 sm:grid-cols-2 xl:grid-cols-4'>
            {movie.cast.map((name) => {
              const person = getActor(slugify(name))
              return (
                <Link key={name} to={`/actor/${slugify(name)}`} className='rounded-2xl border border-white/10 bg-white/6 p-3 transition-colors hover:bg-white/10'>
                  <p className='font-semibold text-white'>{name}</p>
                  <p className='mt-1 text-xs text-slate-400'>{person?.bio ?? 'Actor profile'}</p>
                </Link>
              )
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Community Reviews</CardTitle>
            <CardDescription>Same review data, shown again for the page footer pattern.</CardDescription>
          </CardHeader>
          <CardContent>
            <MediaReviewsSection mediaId={movie.id} mediaKind='movie' />
          </CardContent>
        </Card>
      </section>

      <section className='grid gap-4 lg:grid-cols-[1fr_.9fr]'>
        <Card>
          <CardHeader>
            <CardTitle>AI Picks</CardTitle>
            <CardDescription>Reasoned suggestions built from director, genre, and mood matches.</CardDescription>
          </CardHeader>
          <CardContent className='space-y-3'>
            {aiPick.rationale.map((item) => (
              <div key={item} className='rounded-2xl border border-[#22D3EE]/20 bg-[#22D3EE]/[0.045] p-3 text-sm text-slate-100'>
                {item}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recommended Series</CardTitle>
            <CardDescription>Cross-media suggestions pulled from the same mock graph.</CardDescription>
          </CardHeader>
          <CardContent className='grid gap-3'>
            {recommendedSeries.map((item) => (
              <Link key={item.id} to={`/series/${item.id}`} className='rounded-2xl border border-white/10 bg-white/6 p-3 transition-colors hover:bg-white/10'>
                <p className='text-sm font-semibold text-white'>{item.title}</p>
                <p className='mt-1 text-xs text-slate-400'>{item.genres.join(', ')}</p>
              </Link>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

function MovieCardLike({ mediaId }: { mediaId: string }) {
  const media = getMedia(mediaId)

  if (!media || media.mediaKind !== 'movie') return null

  return (
    <Link to={`/movie/${media.id}`} className='block rounded-2xl border border-white/10 bg-white/6 p-3 transition-colors hover:bg-white/10'>
      <img src={media.poster} alt={media.title} className='aspect-[2/3] w-full rounded-xl object-cover' />
      <p className='mt-2 truncate text-sm font-semibold text-white'>{media.title}</p>
      <p className='text-xs text-slate-400'>{media.rating.toFixed(1)} - {media.year}</p>
    </Link>
  )
}
