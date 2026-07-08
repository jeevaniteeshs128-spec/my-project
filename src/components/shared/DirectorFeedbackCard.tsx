import { BadgeCheck, MessageSquareText, Pin, Star, ThumbsUp, Video } from 'lucide-react'

import type { DirectorFeedbackEntry } from '@/types'

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

export function DirectorFeedbackCard({ entry }: { entry: DirectorFeedbackEntry }) {
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
        {entry.impressedScene ? <p><span className='text-slate-400'>Favourite scene:</span> {entry.impressedScene}</p> : null}
        {entry.improvedScene ? <p><span className='text-slate-400'>Biggest weakness:</span> {entry.improvedScene}</p> : null}
        {entry.futureSuggestions ? <p><span className='text-slate-400'>Improvement suggestions:</span> {entry.futureSuggestions}</p> : null}
      </div>

      <div className='mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-400'>
        <span className='inline-flex items-center gap-1'><ThumbsUp className='h-3.5 w-3.5' /> {entry.helpfulCount} helpful</span>
        <span className='inline-flex items-center gap-1'><MessageSquareText className='h-3.5 w-3.5' /> {entry.replies.length} replies</span>
        <span className='inline-flex items-center gap-1'><Video className='h-3.5 w-3.5' /> Video / text review</span>
      </div>
    </article>
  )
}
