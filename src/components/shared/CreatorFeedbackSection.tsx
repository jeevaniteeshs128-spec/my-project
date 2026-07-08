import { motion } from 'framer-motion'
import { BadgeCheck, CircleCheckBig, MessageSquareText, Pin, PlayCircle, Send, Star, ThumbsUp, Video } from 'lucide-react'
import { useMemo, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { currentViewer, getCreatorFeedback } from '@/data/mockData'
import type { CreatorFeedbackEntry } from '@/types'

function FeedbackCard({ entry }: { entry: CreatorFeedbackEntry }) {
  return (
    <article className={entry.pinned ? 'rounded-[1.5rem] border border-[#7C3AED]/40 bg-[#7C3AED]/[0.08] p-4 shadow-[0_0_40px_rgba(124,58,237,.08)]' : 'rounded-[1.5rem] border border-white/10 bg-white/[0.055] p-4'}>
      <div className='flex items-start justify-between gap-4'>
        <div className='flex min-w-0 items-center gap-3'>
          <div className='grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/6 text-sm font-semibold text-white'>
            {entry.avatar}
          </div>
          <div className='min-w-0'>
            <div className='flex flex-wrap items-center gap-2'>
              <p className='truncate text-sm font-semibold text-white'>{entry.user}</p>
              <BadgeCheck className='h-4 w-4 text-[#22D3EE]' />
            </div>
            <p className='truncate text-xs text-slate-400'>{entry.handle} · {entry.reviewerRole}</p>
          </div>
        </div>
        <div className='flex flex-wrap justify-end gap-1'>
          {entry.pinned ? <span className='inline-flex items-center gap-1 rounded-full border border-[#7C3AED]/35 bg-[#7C3AED]/14 px-2.5 py-1 text-xs text-[#E9D5FF]'><Pin className='h-3.5 w-3.5' /> Pinned</span> : null}
          <span className='inline-flex items-center gap-1 rounded-full border border-[#F5B041]/35 bg-[#F5B041]/14 px-2.5 py-1 text-xs text-[#F5B041]'><Star className='h-3.5 w-3.5 fill-current' /> {entry.overallRating.toFixed(1)}</span>
        </div>
      </div>

      <div className='mt-3 flex flex-wrap gap-2'>
        {entry.tags.map((tag) => (
          <span key={tag} className='rounded-full border border-white/10 bg-white/6 px-2.5 py-1 text-[11px] text-slate-200'>
            {tag}
          </span>
        ))}
      </div>

      <p className='mt-4 text-sm leading-6 text-slate-200'>{entry.text}</p>

      <div className='mt-4 grid gap-3 sm:grid-cols-2'>
        <div className='rounded-2xl border border-white/10 bg-black/20 p-3'>
          <p className='text-[11px] uppercase tracking-[0.18em] text-slate-400'>Favorite works</p>
          <p className='mt-1 text-sm text-white'>{entry.favoriteWorks.join(', ')}</p>
        </div>
        <div className='rounded-2xl border border-white/10 bg-black/20 p-3'>
          <p className='text-[11px] uppercase tracking-[0.18em] text-slate-400'>Favorite era</p>
          <p className='mt-1 text-sm text-white'>{entry.favoriteEra}</p>
        </div>
      </div>

      <div className='mt-4 space-y-2 rounded-2xl border border-white/10 bg-black/20 p-3 text-sm text-slate-200'>
        {entry.improvementSuggestions ? <p><span className='text-slate-400'>Improvement suggestion:</span> {entry.improvementSuggestions}</p> : null}
        {entry.appreciation ? <p><span className='text-slate-400'>Appreciation:</span> {entry.appreciation}</p> : null}
        {entry.videoUrl ? <p className='flex items-center gap-2 text-[#E9D5FF]'><PlayCircle className='h-4 w-4' /> Video review available</p> : null}
      </div>

      <div className='mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-400'>
        <span className='inline-flex items-center gap-1'><ThumbsUp className='h-3.5 w-3.5' /> {entry.helpfulCount} helpful</span>
        <span className='inline-flex items-center gap-1'><MessageSquareText className='h-3.5 w-3.5' /> {entry.replies.length} replies</span>
        <span>{entry.timestamp}</span>
      </div>
    </article>
  )
}

type CreatorFeedbackSectionProps = {
  creatorSlug: string
  creatorName: string
  creatorRole: string
}

const tagOptions = ['Visionary', 'Experimental', 'Master Storyteller', 'Commercial Genius', 'Technical Master', 'Underrated', 'Legend', 'Creative', 'Innovative']

export function CreatorFeedbackSection({ creatorSlug, creatorName, creatorRole }: CreatorFeedbackSectionProps) {
  const entries = useMemo(() => getCreatorFeedback(creatorSlug), [creatorSlug])
  const [open, setOpen] = useState(false)
  const [submittedNotice, setSubmittedNotice] = useState('')
  const [overallRating, setOverallRating] = useState(4)
  const [careerRating, setCareerRating] = useState(4)
  const [textFeedback, setTextFeedback] = useState('')
  const [videoFeedback, setVideoFeedback] = useState('')
  const [favoriteWorks, setFavoriteWorks] = useState('')
  const [favoriteEra, setFavoriteEra] = useState('')
  const [suggestions, setSuggestions] = useState('')
  const [appreciation, setAppreciation] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>(['Visionary'])

  const canSubmit = currentViewer.canSubmitCreatorFeedback && currentViewer.badges.includes('Premium Critic') && currentViewer.badges.includes('Verified Critic')
  const feedbackLimit = 3200
  const canSubmitNow = textFeedback.trim().length > 0 && textFeedback.length <= feedbackLimit

  const toggleTag = (tag: string) => {
    setSelectedTags((current) => current.includes(tag) ? current.filter((item) => item !== tag) : [...current, tag])
  }

  return (
    <section className='space-y-4'>
      <div className='rounded-[1.5rem] border border-white/10 bg-white/[0.055] p-4 backdrop-blur'>
        <div className='flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between'>
          <div className='space-y-2'>
            <div className='flex flex-wrap items-center gap-2'>
              <span className='rounded-full border border-[#7C3AED]/30 bg-[#7C3AED]/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#E9D5FF]'>Premium</span>
              <BadgeCheck className='h-4 w-4 text-[#22D3EE]' />
              <p className='text-sm font-semibold text-white'>Creator Feedback · {creatorName}</p>
            </div>
            <p className='max-w-2xl text-sm leading-6 text-slate-300'>This feedback covers the creator’s entire career, not a single film. Verified Premium Critics can submit structured notes for the official profile.</p>
            <div className='flex flex-wrap gap-2'>
              <span className='rounded-full border border-white/10 bg-white/6 px-2.5 py-1 text-[11px] text-slate-200'>{creatorRole}</span>
              {currentViewer.badges.map((badge) => (
                <span key={badge} className='rounded-full border border-white/10 bg-[#7C3AED]/14 px-2.5 py-1 text-[11px] text-[#E9D5FF]'>{badge}</span>
              ))}
            </div>
          </div>

          <div className='flex flex-col items-start gap-2 lg:items-end'>
            <span className='rounded-full border border-[#22D3EE]/30 bg-[#22D3EE]/10 px-3 py-1 text-xs text-[#A5F3FC]'>Career-wide reviews</span>
            {canSubmit ? (
              <Button onClick={() => setOpen(true)} className='rounded-full'>Submit Creator Feedback</Button>
            ) : (
              <Button disabled variant='secondary' className='rounded-full'>Submission restricted</Button>
            )}
          </div>
        </div>
      </div>

      {submittedNotice ? (
        <div className='rounded-[1.25rem] border border-[#22D3EE]/25 bg-[#22D3EE]/[0.08] px-4 py-3 text-sm text-[#CFFAFE]'>
          <div className='flex items-center gap-2'>
            <CircleCheckBig className='h-4 w-4' />
            <span>{submittedNotice}</span>
          </div>
        </div>
      ) : null}

      <div className='space-y-3'>
        {entries.map((entry) => (
          <FeedbackCard key={entry.id} entry={entry} />
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className='max-w-3xl'>
          <DialogHeader>
            <DialogTitle>Submit Career Feedback</DialogTitle>
            <DialogDescription>Share a profile-level review that reflects the creator’s overall career, strengths, and areas for growth.</DialogDescription>
          </DialogHeader>

          <motion.form
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className='space-y-4'
            onSubmit={(event) => {
              event.preventDefault()
              setOpen(false)
              setSubmittedNotice('Career feedback submitted to the creator profile.')
              setTextFeedback('')
              setVideoFeedback('')
              setFavoriteWorks('')
              setFavoriteEra('')
              setSuggestions('')
              setAppreciation('')
              setSelectedTags(['Visionary'])
            }}
          >
            <div className='grid gap-3 sm:grid-cols-2'>
              <div className='rounded-2xl border border-white/10 bg-white/6 p-3'>
                <p className='text-sm font-medium text-white'>Overall rating</p>
                <div className='mt-2 flex gap-1'>
                  {Array.from({ length: 5 }, (_, index) => index + 1).map((rating) => (
                    <button key={rating} type='button' onClick={() => setOverallRating(rating)} className={rating <= overallRating ? 'text-[#F5B041]' : 'text-slate-500'} aria-label={`Overall rating ${rating}`}>
                      <Star className='h-5 w-5 fill-current' />
                    </button>
                  ))}
                </div>
              </div>

              <div className='rounded-2xl border border-white/10 bg-white/6 p-3'>
                <p className='text-sm font-medium text-white'>Career rating</p>
                <div className='mt-2 flex gap-1'>
                  {Array.from({ length: 5 }, (_, index) => index + 1).map((rating) => (
                    <button key={rating} type='button' onClick={() => setCareerRating(rating)} className={rating <= careerRating ? 'text-[#F5B041]' : 'text-slate-500'} aria-label={`Career rating ${rating}`}>
                      <Star className='h-5 w-5 fill-current' />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <label className='space-y-2'>
              <span className='text-sm font-medium text-white'>Text feedback</span>
              <textarea
                value={textFeedback}
                onChange={(event) => setTextFeedback(event.target.value.slice(0, feedbackLimit))}
                maxLength={feedbackLimit}
                rows={7}
                placeholder='Describe the creator’s career journey, recurring strengths, and why the work matters.'
                className='w-full rounded-2xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/70'
              />
              <div className='flex justify-between text-xs text-slate-400'>
                <span>Maximum 3200 characters</span>
                <span>{textFeedback.length}/{feedbackLimit}</span>
              </div>
            </label>

            <div className='grid gap-3 sm:grid-cols-2'>
              <Input value={videoFeedback} onChange={(event) => setVideoFeedback(event.target.value)} placeholder='Video feedback link or upload note' />
              <Input value={favoriteWorks} onChange={(event) => setFavoriteWorks(event.target.value)} placeholder='Favorite works' />
            </div>

            <div className='grid gap-3 sm:grid-cols-2'>
              <Input value={favoriteEra} onChange={(event) => setFavoriteEra(event.target.value)} placeholder='Favorite era' />
              <Input value={suggestions} onChange={(event) => setSuggestions(event.target.value)} placeholder='Career improvement suggestions' />
            </div>

            <Input value={appreciation} onChange={(event) => setAppreciation(event.target.value)} placeholder='Career appreciation' />

            <div className='space-y-2'>
              <p className='text-sm font-medium text-white'>Creator tags</p>
              <div className='flex flex-wrap gap-2'>
                {tagOptions.map((tag) => (
                  <button key={tag} type='button' onClick={() => toggleTag(tag)} className={selectedTags.includes(tag) ? 'rounded-full border border-[#7C3AED]/45 bg-[#7C3AED]/20 px-3 py-1.5 text-xs text-white' : 'rounded-full border border-white/10 bg-white/6 px-3 py-1.5 text-xs text-slate-300'}>
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div className='flex flex-wrap items-center justify-between gap-3'>
              <p className='text-xs text-slate-400'>This submission is visible to readers and designed for the creator profile experience.</p>
              <div className='flex gap-2'>
                <Button type='button' variant='secondary' onClick={() => setOpen(false)} className='rounded-full'>Cancel</Button>
                <Button type='submit' disabled={!canSubmitNow} className='rounded-full'>
                  <Send className='h-4 w-4' /> Submit Career Review
                </Button>
              </div>
            </div>
          </motion.form>
        </DialogContent>
      </Dialog>
    </section>
  )
}
