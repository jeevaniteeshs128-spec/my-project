import { motion } from 'framer-motion'
import { Send, Star, Video } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

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

type DirectorFeedbackFormProps = {
  onSubmitted?: () => void
}

export function DirectorFeedbackForm({ onSubmitted }: DirectorFeedbackFormProps) {
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
  const [videoFeedback, setVideoFeedback] = useState('')
  const [overallComments, setOverallComments] = useState('')
  const [favoriteScene, setFavoriteScene] = useState('')
  const [biggestWeakness, setBiggestWeakness] = useState('')
  const [improvementSuggestions, setImprovementSuggestions] = useState('')
  const [spoiler, setSpoiler] = useState(false)

  const feedbackLimit = 3000
  const canSubmit = overallComments.trim().length > 0 && overallComments.length <= feedbackLimit

  return (
    <motion.form
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className='space-y-4'
      onSubmit={(event) => {
        event.preventDefault()
        onSubmitted?.()
      }}
    >
      <div className='grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center'>
        <div>
          <p className='text-sm font-medium text-white'>Overall movie direction rating</p>
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
        {baseCategories.map((category) => (
          <RatingPicker
            key={category}
            label={labelForCategory(category)}
            value={categoryRatings[category]}
            onChange={(value) => setCategoryRatings((current) => ({ ...current, [category]: value }))}
          />
        ))}
      </div>

      <label className='space-y-2'>
        <span className='text-sm font-medium text-white'>Text review</span>
        <textarea
          value={overallComments}
          onChange={(event) => setOverallComments(event.target.value.slice(0, feedbackLimit))}
          maxLength={feedbackLimit}
          rows={7}
          placeholder='Write a detailed, movie-specific review for the director.'
          className='w-full rounded-2xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/70'
        />
        <div className='flex justify-between text-xs text-slate-400'>
          <span>200–3000 words</span>
          <span>{overallComments.length}/{feedbackLimit}</span>
        </div>
      </label>

      <div className='grid gap-3 sm:grid-cols-2'>
        <label className='space-y-2'>
          <span className='flex items-center gap-2 text-sm font-medium text-white'><Video className='h-4 w-4 text-[#A78BFA]' /> Video review</span>
          <Input value={videoFeedback} onChange={(event) => setVideoFeedback(event.target.value)} placeholder='Video link or upload note' />
        </label>
        <label className='space-y-2'>
          <span className='text-sm font-medium text-white'>Spoiler toggle</span>
          <button type='button' onClick={() => setSpoiler((value) => !value)} className={spoiler ? 'flex w-full items-center justify-between rounded-2xl border border-[#7C3AED]/35 bg-[#7C3AED]/20 px-3 py-2 text-sm text-white' : 'flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/6 px-3 py-2 text-sm text-slate-300'}>
            <span>{spoiler ? 'Spoiler review' : 'Non-spoiler review'}</span>
            <span className='text-xs uppercase tracking-[0.2em]'>{spoiler ? 'On' : 'Off'}</span>
          </button>
        </label>
      </div>

      <div className='grid gap-3 sm:grid-cols-2'>
        <Input value={favoriteScene} onChange={(event) => setFavoriteScene(event.target.value)} placeholder='Favourite scene' />
        <Input value={biggestWeakness} onChange={(event) => setBiggestWeakness(event.target.value)} placeholder='Biggest weakness' />
      </div>

      <Input value={improvementSuggestions} onChange={(event) => setImprovementSuggestions(event.target.value)} placeholder='Improvement suggestions' />

      <div className='flex flex-wrap items-center justify-between gap-3'>
        <p className='text-xs text-slate-400'>Only premium critics can submit movie-specific director feedback.</p>
        <Button type='submit' disabled={!canSubmit} className='rounded-full'>
          <Send className='h-4 w-4' /> Submit For Director
        </Button>
      </div>
    </motion.form>
  )
}
