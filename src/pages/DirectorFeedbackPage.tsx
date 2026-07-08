import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { useMemo, useState } from 'react'

import { DirectionRatingGraph } from '@/components/shared/DirectionRatingGraph'
import { DirectorFeedbackCard } from '@/components/shared/DirectorFeedbackCard'
import { DirectorFeedbackForm } from '@/components/shared/DirectorFeedbackForm'
import { FeedbackFilters } from '@/components/shared/FeedbackFilters'
import { PremiumBadge } from '@/components/shared/PremiumBadge'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { currentViewer, directorDashboards, getDirectorFeedback, movies } from '@/data/mockData'

const filterOptions = [
  { key: 'all', label: 'All' },
  { key: 'video', label: 'Video' },
  { key: 'text', label: 'Text' },
  { key: 'pinned', label: 'Pinned' },
]

export function DirectorFeedbackPage() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [submitted, setSubmitted] = useState(false)
  const dashboard = directorDashboards['christopher-nolan']
  const feedback = useMemo(() => getDirectorFeedback('interstellar', 'movie'), [])

  return (
    <div className='space-y-6'>
      <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className='relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#162033]'>
        <img src={movies[0].backdrop} alt='Director feedback' className='absolute inset-0 h-full w-full object-cover' />
        <div className='absolute inset-0 bg-[linear-gradient(0deg,#081120,transparent_45%)]' />
        <div className='relative p-4 sm:p-6 lg:p-8'>
          <PremiumBadge label='Movie-specific Director Feedback' />
          <h1 className='mt-3 text-3xl font-semibold text-white sm:text-4xl'>Interstellar</h1>
          <p className='mt-2 max-w-2xl text-sm leading-6 text-slate-300'>This is only about one movie and goes directly to the director’s project-specific feedback channel. It stays separate from career-level creator feedback.</p>
          <div className='mt-4 flex flex-wrap gap-2'>
            <Badge variant='brand' className='gap-1'><Star className='h-3.5 w-3.5' /> {dashboard.metrics.averageDirectionRating.toFixed(1)} average</Badge>
            <Badge variant='ghost'>Text Reviews</Badge>
            <Badge variant='ghost'>Video Reviews</Badge>
          </div>
        </div>
      </motion.section>

      <section className='grid gap-3 sm:grid-cols-2 lg:grid-cols-4'>
        <Card>
          <CardHeader>
            <CardTitle>Average Direction Rating</CardTitle>
            <CardDescription>Audience average for this project.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className='text-3xl font-semibold text-white'>{dashboard.metrics.averageDirectionRating.toFixed(1)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Feedback</CardTitle>
            <CardDescription>Most recent trusted notes for this title.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className='text-3xl font-semibold text-white'>{feedback.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Video Feedback</CardTitle>
            <CardDescription>Creator-focused video submissions.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className='text-3xl font-semibold text-white'>3</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Professional Critics</CardTitle>
            <CardDescription>Highest-priority reviewers in the feed.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className='text-3xl font-semibold text-white'>12</p>
          </CardContent>
        </Card>
      </section>

      <section className='grid gap-4 lg:grid-cols-[1.1fr_.9fr]'>
        <DirectionRatingGraph title='Direction Rating Graph' subtitle='Audience reception across the key movie-specific areas' points={[{ label: 'Direction', value: 4.9 }, { label: 'Storytelling', value: 4.8 }, { label: 'Visual Language', value: 5 }, { label: 'Technical Execution', value: 4.7 }]} />
        <Card>
          <CardHeader>
            <CardTitle>AI Summary</CardTitle>
            <CardDescription>Summarized reception for this project.</CardDescription>
          </CardHeader>
          <CardContent className='space-y-3 text-sm leading-6 text-slate-200'>
            <p><span className='text-slate-400'>Audience reception:</span> Strongly positive with emphasis on emotional impact and technical execution.</p>
            <p><span className='text-slate-400'>Top strengths:</span> Visual language, direction, emotional resonance.</p>
            <p><span className='text-slate-400'>Common complaints:</span> Slightly dense exposition and pacing in the middle act.</p>
            <p><span className='text-slate-400'>Scene appreciation:</span> The docking sequence, final communication, and visual set pieces.</p>
            <p><span className='text-slate-400'>Technical analysis:</span> The film is often cited as a benchmark in controlled scale and sound design.</p>
          </CardContent>
        </Card>
      </section>

      <section className='rounded-[1.5rem] border border-white/10 bg-white/[0.055] p-4 backdrop-blur'>
        <div className='flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between'>
          <div>
            <p className='text-sm font-semibold text-white'>Movie-specific director feedback</p>
            <p className='mt-1 text-sm text-slate-400'>Only premium critics can submit. Readers can explore recent notes, video reviews, and professional insight.</p>
          </div>
          <div className='flex flex-wrap gap-2'>
            <FeedbackFilters value={activeFilter} onChange={setActiveFilter} options={filterOptions} />
          </div>
        </div>

        <div className='mt-4 grid gap-4 lg:grid-cols-[1fr_.9fr]'>
          <div className='space-y-3'>
            {feedback.map((entry) => (
              <DirectorFeedbackCard key={entry.id} entry={entry} />
            ))}
          </div>
          <div className='space-y-4'>
            <Card>
              <CardHeader>
                <CardTitle>Submit Director Feedback</CardTitle>
                <CardDescription>Premium critics can post movie-focused notes that stay distinct from career feedback.</CardDescription>
              </CardHeader>
              <CardContent>
                {currentViewer.canSubmitDirectorFeedback ? (
                  <DirectorFeedbackForm onSubmitted={() => setSubmitted(true)} />
                ) : (
                  <p className='text-sm leading-6 text-slate-300'>Submission is restricted to premium critics at the moment.</p>
                )}
              </CardContent>
            </Card>

            {submitted ? (
              <div className='rounded-[1.25rem] border border-[#22D3EE]/25 bg-[#22D3EE]/[0.08] px-4 py-3 text-sm text-[#CFFAFE]'>
                Your movie-specific feedback has been submitted to the director channel.
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  )
}
