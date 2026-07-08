import { motion } from 'framer-motion'
import { BookmarkPlus, Clapperboard, Heart, Play, PenSquare, Star, Tv } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { useMemo, useState, type ReactNode } from 'react'

import { DirectorFeedbackSection } from '@/components/shared/DirectorFeedbackSection'
import { MediaRail } from '@/components/shared/MediaRail'
import { MediaReviewsSection } from '@/components/shared/MediaReviewsSection'
import { useLogActionSheet } from '@/components/layout/LogActionSheet'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { aiRecommendations, communities, getRecommendedSeries, meetups, series } from '@/data/mockData'
import { getMediaAtmosphere } from '@/lib/atmosphere'

function ActionButton({ children, active = false, onClick }: { children: ReactNode; active?: boolean; onClick?: () => void }) {
  return (
    <Button type='button' variant={active ? 'default' : 'secondary'} size='sm' onClick={onClick} className='rounded-full px-4'>
      {children}
    </Button>
  )
}

export function SeriesDetailsPage() {
  const { seriesId } = useParams()
  const show = useMemo(() => series.find((item) => item.id === seriesId), [seriesId])

  if (!show) return <Navigate to='/series' replace />

  const atmosphere = getMediaAtmosphere(show.id, show.genres, 'series')
  const recommendedSeries = getRecommendedSeries(show.id)
  const aiPick = aiRecommendations[show.id] ?? aiRecommendations.severance
  const community = communities.find((item) => item.mediaId === show.id)
  const firstSeason = show.seasons[0]
  const { open: openLogSheet } = useLogActionSheet()
  const [seriesSaved, setSeriesSaved] = useState(false)
  const [savedSeasonIds, setSavedSeasonIds] = useState<string[]>([])
  const [savedEpisodeIds, setSavedEpisodeIds] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState('reviews')

  return (
    <div className='space-y-6'>
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className='relative overflow-hidden rounded-[2rem] border border-white/10'
      >
        <img src={show.backdrop} alt={show.title} className='absolute inset-0 h-full w-full object-cover' />
        <motion.div className='absolute inset-0' animate={{ opacity: 1 }} transition={{ duration: 0.45 }} style={{ background: atmosphere }} />
        <div className='absolute inset-0 bg-[linear-gradient(0deg,#081120,transparent_45%)]' />
        <div className='relative grid gap-5 p-4 sm:p-6 md:grid-cols-[180px_1fr] md:items-end lg:p-8'>
          <img src={show.poster} alt={show.title} className='hidden aspect-[2/3] w-full rounded-2xl border border-white/15 object-cover shadow-2xl md:block' />
          <div>
            <Badge variant='brand'>{show.status}</Badge>
            <h1 className='mt-3 text-4xl font-semibold text-white'>{show.title}</h1>
            <p className='mt-2 text-sm text-slate-300'>{show.creator} - {show.year} - {show.genres.join(', ')}</p>
            <p className='mt-4 max-w-2xl text-base leading-7 text-slate-200'>{show.reviewSnippet}</p>
            <div className='mt-5 flex flex-wrap gap-2'>
              <ActionButton onClick={openLogSheet}><Star className='h-4 w-4 text-[#F5B041]' /> Rate Series</ActionButton>
              <ActionButton onClick={openLogSheet}><PenSquare className='h-4 w-4' /> Log Series</ActionButton>
              <ActionButton onClick={openLogSheet}><Clapperboard className='h-4 w-4' /> Log Season</ActionButton>
              <ActionButton onClick={openLogSheet}><Tv className='h-4 w-4' /> Log Episode</ActionButton>
              <ActionButton onClick={openLogSheet}><Play className='h-4 w-4' /> Video Review</ActionButton>
              <ActionButton onClick={openLogSheet}><PenSquare className='h-4 w-4' /> Write Review</ActionButton>
              <ActionButton onClick={() => setActiveTab('creator-feedback')}><MessageSquareText className='h-4 w-4' /> Creator Feedback</ActionButton>
              <ActionButton active={seriesSaved} onClick={() => setSeriesSaved((value) => !value)}><BookmarkPlus className='h-4 w-4' /> {seriesSaved ? 'Saved' : '+ Watchlist'}</ActionButton>
              <ActionButton><Heart className='h-4 w-4' /> Favorite</ActionButton>
            </div>
          </div>
        </div>
      </motion.section>

      <Tabs value={activeTab} onValueChange={setActiveTab} className='space-y-4'>
        <TabsList className='w-full max-w-full overflow-x-auto'>
          <TabsTrigger value='reviews'>Reviews</TabsTrigger>
          <TabsTrigger value='lists'>Lists</TabsTrigger>
          <TabsTrigger value='community'>Community</TabsTrigger>
          <TabsTrigger value='meetups'>Meetups</TabsTrigger>
          <TabsTrigger value='creator-feedback'>Creator Feedback</TabsTrigger>
        </TabsList>

        <TabsContent value='reviews' className='space-y-4'>
          <MediaReviewsSection mediaId={show.id} mediaKind='series' />

          <section className='grid gap-4 lg:grid-cols-2 xl:grid-cols-4'>
            <div className='rounded-[1.5rem] border border-white/10 bg-white/[0.055] p-4 backdrop-blur'>
              <p className='text-xs uppercase tracking-[0.2em] text-slate-400'>Overall Series Rating</p>
              <p className='mt-2 text-3xl font-semibold text-white'>{show.rating.toFixed(1)}</p>
              <p className='mt-1 text-sm text-slate-400'>Audience grade for the full series.</p>
            </div>
            <div className='rounded-[1.5rem] border border-white/10 bg-white/[0.055] p-4 backdrop-blur'>
              <p className='text-xs uppercase tracking-[0.2em] text-slate-400'>Season Rating</p>
              <p className='mt-2 text-3xl font-semibold text-white'>{firstSeason.rating.toFixed(1)}</p>
              <p className='mt-1 text-sm text-slate-400'>Current season momentum and quality.</p>
            </div>
            <div className='rounded-[1.5rem] border border-white/10 bg-white/[0.055] p-4 backdrop-blur'>
              <p className='text-xs uppercase tracking-[0.2em] text-slate-400'>Episode Rating</p>
              <p className='mt-2 text-3xl font-semibold text-white'>{firstSeason.episodes[0]?.rating.toFixed(1) ?? '4.0'}</p>
              <p className='mt-1 text-sm text-slate-400'>Latest episode-level sentiment.</p>
            </div>
            <div className='rounded-[1.5rem] border border-white/10 bg-white/[0.055] p-4 backdrop-blur'>
              <p className='text-xs uppercase tracking-[0.2em] text-slate-400'>Series Review</p>
              <p className='mt-2 text-sm leading-6 text-slate-200'>{show.reviewSnippet}</p>
            </div>
          </section>

          <section className='grid gap-4 lg:grid-cols-[1fr_.9fr]'>
            <div className='space-y-4 rounded-[1.5rem] border border-white/10 bg-white/[0.055] p-4 backdrop-blur'>
              <div>
                <h3 className='text-lg font-semibold text-white'>Season Review</h3>
                <p className='text-sm text-slate-400'>One card for the current season and its tonal direction.</p>
              </div>
              <div className='rounded-2xl border border-white/10 bg-white/6 p-3 text-sm leading-6 text-slate-200'>
                Season {firstSeason.number} feels deliberate and complete, with its own emotional arc and episode structure.
              </div>
              <div>
                <h3 className='text-lg font-semibold text-white'>Episode Review</h3>
                <p className='text-sm text-slate-400'>Episode-by-episode notes stay within the same premium system.</p>
              </div>
              <div className='rounded-2xl border border-white/10 bg-white/6 p-3 text-sm leading-6 text-slate-200'>
                {firstSeason.episodes[0]?.synopsis ?? 'Episode discussion and review notes are attached to the current season.'}
              </div>
            </div>

            <div className='space-y-4'>
              <div className='rounded-[1.5rem] border border-white/10 bg-white/[0.055] p-4 backdrop-blur'>
                <p className='text-xs uppercase tracking-[0.2em] text-slate-400'>Text Review</p>
                <p className='mt-2 text-sm leading-6 text-slate-200'>
                  Layered commentary from the community stays concise, respectful, and easy to scan.
                </p>
              </div>
              <div className='rounded-[1.5rem] border border-white/10 bg-white/[0.055] p-4 backdrop-blur'>
                <p className='text-xs uppercase tracking-[0.2em] text-slate-400'>Video Review</p>
                <p className='mt-2 text-sm leading-6 text-slate-200'>
                  Video notes can be attached privately through Creator Feedback for deeper scene-level breakdowns.
                </p>
              </div>
              <div className='rounded-[1.5rem] border border-white/10 bg-white/[0.055] p-4 backdrop-blur'>
                <p className='text-xs uppercase tracking-[0.2em] text-slate-400'>AI Recommendations</p>
                <p className='mt-2 text-sm leading-6 text-slate-200'>{aiPick.headline}</p>
              </div>
            </div>
          </section>

          <section className='grid gap-4 lg:grid-cols-[1fr_.9fr]'>
            <Card>
              <CardHeader>
                <CardTitle>Similar Series</CardTitle>
                <CardDescription>Adjacent series with a similar tone, scale, or storytelling rhythm.</CardDescription>
              </CardHeader>
              <CardContent>
                <MediaRail title='' items={recommendedSeries} kind='series' />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>AI Recommendations</CardTitle>
                <CardDescription>Reasoned suggestions from the current title’s affinity graph.</CardDescription>
              </CardHeader>
              <CardContent className='space-y-3'>
                {aiPick.rationale.map((item) => (
                  <div key={item} className='rounded-2xl border border-[#22D3EE]/20 bg-[#22D3EE]/[0.045] p-3 text-sm text-slate-100'>
                    {item}
                  </div>
                ))}
              </CardContent>
            </Card>
          </section>
        </TabsContent>

        <TabsContent value='lists' className='grid gap-3 sm:grid-cols-3'>
          {['Binge starter packs', 'Best mini-series arcs', 'Director craft studies'].map((list) => (
            <Link key={list} to='/watchlist' className='rounded-[1.25rem] border border-white/10 bg-[#162033] p-4 transition-colors duration-200 hover:border-[#7C3AED]/60'>
              <p className='text-sm font-semibold text-white'>{list}</p>
              <p className='mt-1 text-xs text-slate-400'>12 series</p>
            </Link>
          ))}
        </TabsContent>

        <TabsContent value='community' className='space-y-3'>
          {community ? (
            <Link to={`/community/${community.slug}`} className='block rounded-[1.25rem] border border-[#7C3AED]/25 bg-[#7C3AED]/[0.08] p-4 transition-colors hover:bg-[#7C3AED]/[0.12]'>
              <p className='font-semibold text-white'>{community.name}</p>
              <p className='mt-1 text-xs text-slate-400'>{community.pinned}</p>
            </Link>
          ) : null}
          {communities.filter((item) => item.mediaId === show.id).slice(0, 2).map((item) => (
            <Link key={item.id} to={`/community/${item.slug}`} className='block rounded-[1.25rem] border border-white/10 bg-[#162033] p-4 transition-colors hover:border-[#7C3AED]/60'>
              <p className='font-semibold text-white'>{item.name}</p>
              <p className='mt-1 text-xs text-slate-400'>{item.members.toLocaleString()} members</p>
            </Link>
          ))}
        </TabsContent>

        <TabsContent value='meetups' className='grid gap-3 sm:grid-cols-3'>
          {meetups.map((meetup) => (
            <Link key={meetup.id} to='/meetups' className='rounded-[1.25rem] border border-white/10 bg-[#162033] p-4 transition-colors duration-200 hover:border-[#7C3AED]/60'>
              <p className='text-sm font-semibold text-white'>{meetup.title}</p>
              <p className='mt-1 text-xs text-slate-400'>{meetup.mode} - {meetup.cadence}</p>
            </Link>
          ))}
        </TabsContent>

        <TabsContent value='creator-feedback'>
          <DirectorFeedbackSection mediaId={show.id} mediaKind='series' directorName={show.creator} />
        </TabsContent>
      </Tabs>

      <section className='grid gap-4 md:grid-cols-[1.4fr_.9fr]'>
        <div className='rounded-[1.5rem] border border-white/10 bg-white/[0.055] p-4 backdrop-blur'>
          <div className='flex items-center justify-between gap-3'>
            <div>
              <h2 className='text-lg font-semibold text-white'>Progress Tracker</h2>
              <p className='text-sm text-slate-400'>Completion percentage and episode-by-episode tracking.</p>
            </div>
            <span className='text-sm text-[#7C3AED]'>{show.progress}% complete</span>
          </div>
          <div className='mt-3 h-2 overflow-hidden rounded-full bg-white/10'>
            <div className='h-full rounded-full bg-[#7C3AED]' style={{ width: `${show.progress}%` }} />
          </div>
          <div className='mt-5 space-y-4'>
            {show.seasons.map((season) => (
              <div key={season.id} className='space-y-3'>
                <div className='flex items-center justify-between gap-3'>
                  <div>
                    <h3 className='font-semibold text-white'>Season {season.number}: {season.title}</h3>
                    <p className='text-xs text-slate-400'>Season rating {season.rating.toFixed(1)}</p>
                  </div>
                  <div className='flex items-center gap-2'>
                    <button type='button' onClick={openLogSheet} className='rounded-full border border-white/10 bg-white/8 px-3 py-2 text-xs text-slate-200 transition-colors hover:bg-white/10'>
                      Rate Season
                    </button>
                    <button
                      type='button'
                      onClick={() => setSavedSeasonIds((current) => current.includes(season.id) ? current.filter((id) => id !== season.id) : [...current, season.id])}
                      className='rounded-full border border-white/10 bg-white/8 px-3 py-2 text-xs text-slate-200 transition-colors hover:bg-white/10'
                    >
                      {savedSeasonIds.includes(season.id) ? 'Saved' : '+ Watchlist'}
                    </button>
                  </div>
                </div>
                <div className='grid gap-3 sm:grid-cols-2'>
                  {season.episodes.map((episode) => (
                    <article key={episode.id} className='grid grid-cols-[92px_1fr] gap-3 rounded-2xl bg-black/25 p-2'>
                      <img src={episode.still} alt={episode.title} className='h-20 w-full rounded-xl object-cover' />
                      <div className='min-w-0'>
                        <p className='truncate text-sm font-semibold text-white'>E{episode.number}. {episode.title}</p>
                        <p className='text-xs text-slate-400'>{episode.runtime} - {episode.rating.toFixed(1)}</p>
                        <p className='mt-1 line-clamp-2 text-xs text-slate-300'>{episode.synopsis}</p>
                        <div className='mt-2 flex flex-wrap gap-2'>
                          <button type='button' onClick={openLogSheet} className='rounded-full border border-white/10 bg-white/8 px-3 py-1.5 text-[11px] text-slate-200 transition-colors hover:bg-white/10'>
                            Rate Episode
                          </button>
                          <button
                            type='button'
                            onClick={() => setSavedEpisodeIds((current) => current.includes(episode.id) ? current.filter((id) => id !== episode.id) : [...current, episode.id])}
                            className='rounded-full border border-white/10 bg-white/8 px-3 py-1.5 text-[11px] text-slate-200 transition-colors hover:bg-white/10'
                          >
                            {savedEpisodeIds.includes(episode.id) ? 'Saved' : '+ Watchlist'}
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Review Tools</CardTitle>
            <CardDescription>Series, season, episode, text, and video review entry points.</CardDescription>
          </CardHeader>
          <CardContent className='space-y-3'>
            <div className='flex flex-wrap gap-2'>
              {['Newest', 'Most Popular', 'Friends', 'Video', 'Text'].map((filter) => (
                <button key={filter} className='rounded-full border border-white/10 bg-white/8 px-3 py-2 text-xs text-slate-200 transition-colors hover:bg-white/10'>
                  {filter}
                </button>
              ))}
            </div>
            <MediaReviewsSection mediaId={show.id} mediaKind='series' />
          </CardContent>
        </Card>
      </section>

      <section className='grid gap-4 lg:grid-cols-[1fr_.9fr]'>
        <Card>
          <CardHeader>
            <CardTitle>Recommended Series</CardTitle>
            <CardDescription>Mock recommendation rail with poster-first cards.</CardDescription>
          </CardHeader>
          <CardContent>
            <MediaRail title='' items={recommendedSeries} kind='series' />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Continue Watching</CardTitle>
            <CardDescription>Latest episode progress and episode tracker context.</CardDescription>
          </CardHeader>
          <CardContent className='space-y-3'>
            {firstSeason.episodes.map((episode) => (
              <div key={episode.id} className='grid grid-cols-[88px_1fr] gap-3 rounded-2xl border border-white/10 bg-white/6 p-3'>
                <img src={episode.still} alt={episode.title} className='h-20 w-full rounded-xl object-cover' />
                <div className='min-w-0'>
                  <p className='truncate text-sm font-semibold text-white'>{episode.title}</p>
                  <p className='text-xs text-slate-400'>{episode.runtime} - {episode.rating.toFixed(1)}</p>
                  <div className='mt-2 h-1.5 overflow-hidden rounded-full bg-white/10'>
                    <div className='h-full rounded-full bg-[#7C3AED]' style={{ width: `${Math.min(95, show.progress)}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className='grid gap-4 lg:grid-cols-[1fr_.9fr]'>
        <Card>
          <CardHeader>
            <CardTitle>Community</CardTitle>
            <CardDescription>Dedicated group threads and discussion spaces.</CardDescription>
          </CardHeader>
          <CardContent className='space-y-3'>
            {community ? (
              <Link key={community.id} to={`/community/${community.slug}`} className='block rounded-2xl border border-[#7C3AED]/25 bg-[#7C3AED]/[0.08] p-3 transition-colors hover:bg-[#7C3AED]/[0.12]'>
                <p className='font-semibold text-white'>{community.name}</p>
                <p className='mt-1 text-xs text-slate-400'>{community.pinned}</p>
              </Link>
            ) : null}
            {communities.filter((item) => item.mediaId === show.id).slice(0, 3).map((item) => (
              <Link key={item.id} to={`/community/${item.slug}`} className='block rounded-2xl border border-white/10 bg-white/6 p-3 transition-colors hover:bg-white/10'>
                <p className='font-semibold text-white'>{item.name}</p>
                <p className='mt-1 text-xs text-slate-400'>{item.members.toLocaleString()} members</p>
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Season & Episode Discussions</CardTitle>
            <CardDescription>Pulled from the same episode tracker section.</CardDescription>
          </CardHeader>
          <CardContent className='space-y-3'>
            {show.seasons.map((season) => (
              <div key={season.id} className='rounded-2xl border border-white/10 bg-white/6 p-3'>
                <p className='text-sm font-semibold text-white'>Season {season.number}</p>
                <p className='mt-1 text-xs text-slate-400'>{season.episodes.length} episodes ready for discussion</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className='grid gap-4 lg:grid-cols-[1fr_.9fr]'>
        <Card>
          <CardHeader>
            <CardTitle>AI Recommendations</CardTitle>
            <CardDescription>{aiPick.headline}</CardDescription>
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
            <CardTitle>More Like This</CardTitle>
            <CardDescription>Infinite horizontal scroll for adjacent series titles.</CardDescription>
          </CardHeader>
          <CardContent>
            <MediaRail title='' items={[...recommendedSeries, ...recommendedSeries]} kind='series' infinite />
          </CardContent>
        </Card>
      </section>

      <section className='grid gap-4 lg:grid-cols-[1fr_.9fr]'>
        <Card>
          <CardHeader>
            <CardTitle>Community Discussions</CardTitle>
            <CardDescription>Series-specific discussions, threads, and polls.</CardDescription>
          </CardHeader>
          <CardContent className='space-y-3'>
            {communities.filter((item) => item.mediaId === show.id).map((item) => (
              <Link key={item.id} to={`/community/${item.slug}`} className='block rounded-2xl border border-white/10 bg-white/6 p-3 transition-colors hover:bg-white/10'>
                <p className='font-semibold text-white'>{item.name}</p>
                <p className='mt-1 text-xs text-slate-400'>{item.poll}</p>
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Latest Reviews</CardTitle>
            <CardDescription>Text and video reviews filtered from the existing mock data.</CardDescription>
          </CardHeader>
          <CardContent>
            <MediaReviewsSection mediaId={show.id} mediaKind='series' />
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
