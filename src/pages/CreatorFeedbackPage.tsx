import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { useMemo, useState } from 'react'

import { CareerRatingGraph } from '@/components/shared/CareerRatingGraph'
import { CreatorFeedbackSection } from '@/components/shared/CreatorFeedbackSection'
import { FeedbackFilters } from '@/components/shared/FeedbackFilters'
import { PremiumBadge } from '@/components/shared/PremiumBadge'
import { VideoFeedbackPlayer } from '@/components/shared/VideoFeedbackPlayer'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { currentViewer, directors } from '@/data/mockData'

const filterOptions = [
  { key: 'all', label: 'All' },
  { key: 'video', label: 'Video' },
  { key: 'text', label: 'Text' },
  { key: 'pinned', label: 'Pinned' },
]

export function CreatorFeedbackPage() {
  const [activeFilter, setActiveFilter] = useState('all')
  const creator = directors[0]
  const summary = useMemo(() => ({
    averageRating: 4.8,
    totalReviews: 24,
    videoReviews: 8,
    textReviews: 16,
    creatorScore: 94,
    communityTags: ['Visionary', 'Technical Master', 'Master Storyteller', 'Innovative'],
    strengths: ['Career-scale storytelling', 'Technical command', 'Commercial resonance'],
    criticisms: ['Tighter middle-act pacing', 'More intimate character breathing room'],
    sentiment: 'Highly positive',
  }), [])

  return (
    <div className='space-y-6'>
      <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className='relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#162033]'>
        <img src={creator.filmography[0]?.poster ?? directors[0].filmography[0].poster} alt={creator.name} className='absolute inset-0 h-full w-full object-cover' />
        <div className='absolute inset-0 bg-[linear-gradient(0deg,#081120,transparent_50%)]' />
        <div className='relative p-4 sm:p-6 lg:p-8'>
          <PremiumBadge label='Premium Creator Feedback' />
          <h1 className='mt-3 text-3xl font-semibold text-white sm:text-4xl'>{creator.name}</h1>
          <p className='mt-2 max-w-2xl text-sm leading-6 text-slate-300'>This page exists for career-wide creator feedback, separate from movie-specific director feedback. It is designed for premium critics, official critics, and verified reviewers.</p>
          <div className='mt-4 flex flex-wrap gap-2'>
            <Badge variant='gold' className='gap-1'><Star className='h-3.5 w-3.5' /> {summary.averageRating.toFixed(1)} average</Badge>
            <Badge variant='ghost'>Career Rating</Badge>
            <Badge variant='ghost'>Creator Reviews</Badge>
          </div>
        </div>
      </motion.section>

      <section className='grid gap-3 sm:grid-cols-2 lg:grid-cols-4'>
        <Card>
          <CardHeader>
            <CardTitle>Average Rating</CardTitle>
            <CardDescription>Community average across creator feedback.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className='text-3xl font-semibold text-white'>{summary.averageRating.toFixed(1)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Creator Reviews</CardTitle>
            <CardDescription>All career-level notes currently visible.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className='text-3xl font-semibold text-white'>{summary.totalReviews}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Video Reviews</CardTitle>
            <CardDescription>Video-first creator feedback.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className='text-3xl font-semibold text-white'>{summary.videoReviews}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Creator Score</CardTitle>
            <CardDescription>High-confidence creator sentiment score.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className='text-3xl font-semibold text-white'>{summary.creatorScore}</p>
          </CardContent>
        </Card>
      </section>

      <section className='grid gap-4 lg:grid-cols-[1.1fr_.9fr]'>
        <CareerRatingGraph title='Career Rating Graph' subtitle='Track growth across career milestones and audience reception' points={[{ label: 'Vision', value: 4.9 }, { label: 'Craft', value: 4.8 }, { label: 'Audience', value: 4.7 }, { label: 'Legacy', value: 4.9 }]} />
        <Card>
          <CardHeader>
            <CardTitle>AI Summary</CardTitle>
            <CardDescription>Machine-assisted synthesis of creator feedback.</CardDescription>
          </CardHeader>
          <CardContent className='space-y-3 text-sm leading-6 text-slate-200'>
            <p><span className='text-slate-400'>Most praised strengths:</span> {summary.strengths.join(', ')}</p>
            <p><span className='text-slate-400'>Most common criticism:</span> {summary.criticisms.join(', ')}</p>
            <p><span className='text-slate-400'>Audience sentiment:</span> {summary.sentiment}</p>
            <p><span className='text-slate-400'>Career graph:</span> Consistent peak performance with recurring appreciation for craft and scale.</p>
          </CardContent>
        </Card>
      </section>

      <section className='space-y-4'>
        <div className='flex flex-wrap items-center justify-between gap-3'>
          <div>
            <h2 className='text-lg font-semibold text-white'>Creator Feedback</h2>
            <p className='text-sm text-slate-400'>Career-wide feedback, premium-only submissions, and public reading.</p>
          </div>
          <FeedbackFilters value={activeFilter} onChange={setActiveFilter} options={filterOptions} />
        </div>
        <CreatorFeedbackSection creatorSlug='christopher-nolan' creatorName={creator.name} creatorRole='Director' />
      </section>

      <section className='grid gap-4 lg:grid-cols-[1fr_.9fr]'>
        <Card>
          <CardHeader>
            <CardTitle>Video Feedback</CardTitle>
            <CardDescription>Short-form and long-form video reactions tied to creator profile feedback.</CardDescription>
          </CardHeader>
          <CardContent className='grid gap-3'>
            <VideoFeedbackPlayer title='Career-scale analysis of Nolan’s legacy' duration='4:12' views='4.2k' likes='628' comments='42' thumbnail={creator.filmography[0]?.poster ?? directors[0].filmography[0].poster} />
            <VideoFeedbackPlayer title='Why Nolan remains a technical benchmark' duration='2:58' views='2.8k' likes='311' comments='19' thumbnail={creator.filmography[0]?.poster ?? directors[0].filmography[0].poster} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Community Tags</CardTitle>
            <CardDescription>Popular tags emerging from public creator feedback.</CardDescription>
          </CardHeader>
          <CardContent className='space-y-3'>
            {summary.communityTags.map((tag) => (
              <div key={tag} className='rounded-2xl border border-white/10 bg-white/6 p-3 text-sm text-slate-100'>
                {tag}
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className='grid gap-4 lg:grid-cols-[1fr_.9fr]'>
        <Card>
          <CardHeader>
            <CardTitle>Most Appreciated Strengths</CardTitle>
            <CardDescription>What readers repeat most often in creator feedback.</CardDescription>
          </CardHeader>
          <CardContent className='space-y-3'>
            {summary.strengths.map((item) => (
              <div key={item} className='rounded-2xl border border-[#22D3EE]/20 bg-[#22D3EE]/[0.045] p-3 text-sm text-slate-100'>
                {item}
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Premium Access</CardTitle>
            <CardDescription>Current reader privileges for this feature.</CardDescription>
          </CardHeader>
          <CardContent className='space-y-3 text-sm leading-6 text-slate-200'>
            <p>{currentViewer.name} currently has {currentViewer.badges.includes('Official Critic') ? 'official critic' : 'premium critic'} access.</p>
            <p>Regular users can read every creator feedback entry. Only premium verified critics can submit.</p>
            <div className='flex flex-wrap gap-2'>
              {currentViewer.badges.map((badge) => (
                <Badge key={badge} variant='ghost'>{badge}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
