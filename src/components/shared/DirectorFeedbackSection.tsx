import { motion } from 'framer-motion'
import { BadgeCheck, MessageSquareText, Pin, Send, Star, ThumbsUp } from 'lucide-react'
import { useMemo, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { currentViewer, getDirectorFeedback } from '@/data/mockData'
import type { DirectorFeedbackEntry, MediaKind } from '@/types'

type DirectorFeedbackSectionProps = {
  mediaId: string
  mediaKind: MediaKind
  directorName: string
}

const baseCategories = [
  'storytelling',
  'screenplay',
  'direction',
  'performances',
  'cinematography',
  'music',
  'editing',
  'pacing',
] as const

function labelForCategory(category: string) {
  if (category === 'storytelling') return 'Storytelling'
  if (category === 'screenplay') return 'Screenplay'
  if (category === 'direction') return 'Direction'
  if (category === 'performances') return 'Performances'
  if (category === 'cinematography') return 'Cinematography'
  if (category === 'music') return 'Music / Score'
  if (category === 'editing') return 'Editing'
  if (category === 'visualEffects') return 'Visual Effects'
  if (category === 'pacing') return 'Pacing'
  return category
}

function RatingPicker({ label, value, onChange }: { label: string; value: number; onChange: (value: number) => void }) {
  return (
    <div className='space-y-2 rounded-2xl border border-white/10 bg-white/6 p-3'>
      <div className='flex items-center justify-between gap-3'>
        <p className='text-sm font-medium text-white'>{label}</p>
        <span className='text-xs text-slate-400'>{value.toFixed(1)}</span>
      </div>
      <div className='flex gap-1'>
        {Array.from({ length: 5 }, (_, index) => index + 1).map((rating) => (
          <button
            key={rating}
            type='button'
            onClick={() => onChange(rating)}
            className='grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-black/20 text-xs text-slate-200 transition-colors hover:bg-[#7C3AED]/20'
            aria-label={`${label} ${rating} stars`}
          >
            {rating}
          </button>
        ))}
      </div>
    </div>
  )
}

function FeedbackCard({ entry }: { entry: DirectorFeedbackEntry }) {
  return (
    <article
      className={
        entry.pinned
          ? 'rounded-[1.5rem] border border-[#7C3AED]/40 bg-[#7C3AED]/[0.08] p-4 shadow-[0_0_40px_rgba(124,58,237,.08)]'
          : 'rounded-[1.5rem] border border-white/10 bg-white/[0.055] p-4'
      }
    >
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
        {entry.badges.map((badge) => (
          <span key={badge} className='rounded-full border border-white/10 bg-white/6 px-2.5 py-1 text-[11px] text-slate-200'>
            {badge}
          </span>
        ))}
      </div>

      <div className='mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {(Object.entries(entry.categories) as Array<[string, number]>).map(([category, rating]) => (
          <div key={category} className='rounded-2xl border border-white/10 bg-black/20 p-3'>
            <p className='text-[11px] uppercase tracking-[0.18em] text-slate-400'>{labelForCategory(category)}</p>
            <p className='mt-1 text-sm font-semibold text-white'>{rating.toFixed(1)}</p>
          </div>
        ))}
      </div>

      <p className='mt-4 text-sm leading-6 text-slate-200'>{entry.text}</p>

      <div className='mt-4 space-y-2 rounded-2xl border border-white/10 bg-black/20 p-3 text-sm text-slate-200'>
        {entry.impressedScene ? <p><span className='text-slate-400'>Most impressive scene:</span> {entry.impressedScene}</p> : null}
        {entry.improvedScene ? <p><span className='text-slate-400'>Could be improved:</span> {entry.improvedScene}</p> : null}
        {entry.futureSuggestions ? <p><span className='text-slate-400'>Future suggestion:</span> {entry.futureSuggestions}</p> : null}
      </div>

      <div className='mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-400'>
        <span className='inline-flex items-center gap-1'><ThumbsUp className='h-3.5 w-3.5' /> {entry.helpfulCount} helpful</span>
        <span className='inline-flex items-center gap-1'><MessageSquareText className='h-3.5 w-3.5' /> {entry.replies.length} replies</span>
        <span>{entry.timestamp}</span>
      </div>

      {entry.replies.length ? (
        <div className='mt-4 space-y-2'>
          {entry.replies.map((reply) => (
            <div key={reply.id} className='rounded-2xl border border-white/10 bg-white/6 p-3 text-sm text-slate-200'>
              <p className='text-xs text-slate-400'>{reply.user} · {reply.time}</p>
              <p className='mt-1 leading-6'>{reply.text}</p>
            </div>
          ))}
        </div>
      ) : null}
    </article>
  )
}

export function DirectorFeedbackSection({ mediaId, mediaKind, directorName }: DirectorFeedbackSectionProps) {
  const entries = useMemo(() => getDirectorFeedback(mediaId, mediaKind), [mediaId, mediaKind])
  const [open, setOpen] = useState(false)
  const [overallRating, setOverallRating] = useState(4)
  const [categoryRatings, setCategoryRatings] = useState<Record<string, number>>({
    storytelling: 4,
    screenplay: 4,
    direction: 4,
    performances: 4,
    cinematography: 4,
    music: 4,
    editing: 4,
    pacing: 4,
  })
  const [visualEffects, setVisualEffects] = useState(4)
  const [overallComments, setOverallComments] = useState('')
  const [impressedScene, setImpressedScene] = useState('')
  const [improvedScene, setImprovedScene] = useState('')
  const [futureSuggestions, setFutureSuggestions] = useState('')

  const canSubmit = currentViewer.canSubmitDirectorFeedback
  const visibleCategories = mediaKind === 'movie' ? [...baseCategories, 'visualEffects'] : baseCategories
  const feedbackLimit = 2000
  const canSubmitNow = overallComments.trim().length > 0 && overallComments.length <= feedbackLimit

  const setCategoryValue = (category: string, value: number) => {
    if (category === 'visualEffects') {
      setVisualEffects(value)
      return
    }

    setCategoryRatings((current) => ({ ...current, [category]: value }))
  }

  return (
    <section className='space-y-4'>
      <div className='rounded-[1.5rem] border border-white/10 bg-white/[0.055] p-4 backdrop-blur'>
        <div className='flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between'>
          <div className='space-y-2'>
            <div className='flex flex-wrap items-center gap-2'>
              <BadgeCheck className='h-4 w-4 text-[#22D3EE]' />
              <p className='text-sm font-semibold text-white'>Constructive feedback for {directorName}</p>
            </div>
            <p className='max-w-2xl text-sm leading-6 text-slate-300'>
              Only verified and eligible members can submit feedback. Everyone can read and learn from the curated notes below.
            </p>
            <div className='flex flex-wrap gap-2'>
              {currentViewer.badges.map((badge) => (
                <span key={badge} className='rounded-full border border-white/10 bg-[#7C3AED]/14 px-2.5 py-1 text-[11px] text-[#E9D5FF]'>{badge}</span>
              ))}
            </div>
          </div>

          <div className='flex flex-col items-start gap-2 lg:items-end'>
            <span className='rounded-full border border-[#22D3EE]/30 bg-[#22D3EE]/10 px-3 py-1 text-xs text-[#A5F3FC]'>Professional feedback only</span>
            {canSubmit ? (
              <Button onClick={() => setOpen(true)} className='rounded-full'>
                Submit Director Feedback
              </Button>
            ) : (
              <Button disabled variant='secondary' className='rounded-full'>
                Submission restricted
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className='space-y-3'>
        {entries.map((entry) => (
          <FeedbackCard key={entry.id} entry={entry} />
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className='max-w-3xl'>
          <DialogHeader>
            <DialogTitle>Submit Director Feedback</DialogTitle>
            <DialogDescription>
              Constructive, respectful notes help filmmakers understand what worked and what can be improved.
            </DialogDescription>
          </DialogHeader>

          <motion.form
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className='space-y-4'
            onSubmit={(event) => {
              event.preventDefault()
              setOpen(false)
              setOverallComments('')
              setImpressedScene('')
              setImprovedScene('')
              setFutureSuggestions('')
            }}
          >
            <div className='grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center'>
              <div>
                <p className='text-sm font-medium text-white'>Overall rating</p>
                <p className='text-xs text-slate-400'>Rate the work from 1 to 5 stars.</p>
              </div>
              <div className='flex gap-1'>
                {Array.from({ length: 5 }, (_, index) => index + 1).map((rating) => (
                  <button
                    key={rating}
                    type='button'
                    onClick={() => setOverallRating(rating)}
                    className={rating <= overallRating ? 'text-[#F5B041]' : 'text-slate-500'}
                    aria-label={`Overall rating ${rating}`}
                  >
                    <Star className='h-5 w-5 fill-current' />
                  </button>
                ))}
              </div>
            </div>

            <div className='grid gap-3 sm:grid-cols-2'>
              {visibleCategories.map((category) => (
                <RatingPicker
                  key={category}
                  label={labelForCategory(category)}
                  value={category === 'visualEffects' ? visualEffects : categoryRatings[category]}
                  onChange={(value) => setCategoryValue(category, value)}
                />
              ))}
            </div>

            <div className='grid gap-3'>
              <label className='space-y-2'>
                <span className='text-sm font-medium text-white'>Overall comments</span>
                <textarea
                  value={overallComments}
                  onChange={(event) => setOverallComments(event.target.value.slice(0, feedbackLimit))}
                  maxLength={feedbackLimit}
                  rows={5}
                  placeholder='Keep the note respectful, specific, and constructive.'
                  className='w-full rounded-2xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/70'
                />
                <div className='flex justify-between text-xs text-slate-400'>
                  <span>Maximum 2000 characters</span>
                  <span>{overallComments.length}/{feedbackLimit}</span>
                </div>
              </label>

              <Input value={impressedScene} onChange={(event) => setImpressedScene(event.target.value)} placeholder='Scene that impressed you most (optional)' />
              <Input value={improvedScene} onChange={(event) => setImprovedScene(event.target.value)} placeholder='Scene that could be improved (optional)' />
              <Input value={futureSuggestions} onChange={(event) => setFutureSuggestions(event.target.value)} placeholder='Suggestions for future projects (optional)' />
            </div>

            <div className='flex flex-wrap items-center justify-between gap-3'>
              <p className='text-xs text-slate-400'>Feedback should stay constructive and professional.</p>
              <div className='flex gap-2'>
                <Button type='button' variant='secondary' onClick={() => setOpen(false)} className='rounded-full'>
                  Cancel
                </Button>
                <Button type='submit' disabled={!canSubmitNow} className='rounded-full'>
                  <Send className='h-4 w-4' /> Submit
                </Button>
              </div>
            </div>
          </motion.form>
        </DialogContent>
      </Dialog>
    </section>
  )
}
