import { useMemo, useState } from 'react'
import { ImagePlus, LockKeyhole } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { diaryBackgrounds, movies } from '@/data/mockData'

const entries = [
  { date: '06 Jun', movieId: 'interstellar', rating: 5, mood: 'Reflective', review: 'Watched again for the score and the ending.' },
  { date: '04 Jun', movieId: 'fight-club', rating: 4, mood: 'Critical', review: 'Sharper than memory, messier in interesting ways.' },
  { date: '02 Jun', movieId: 'nayakan', rating: 4.5, mood: 'Warm', review: 'Set design and cadence still feel timeless.' },
  { date: '31 May', movieId: 'parasite', rating: 5, mood: 'Tense', review: 'Perfect blocking. Every level matters.' },
]

export function DiaryPage() {
  const [picked, setPicked] = useState(diaryBackgrounds[0])
  const [uploadedBg, setUploadedBg] = useState<string | null>(null)
  const [privateDiary, setPrivateDiary] = useState(false)
  const activeBg = useMemo(() => uploadedBg ?? picked, [picked, uploadedBg])

  return (
    <div className='space-y-5'>
      <div className='flex flex-wrap items-end justify-between gap-3'>
        <div>
          <p className='text-xs uppercase tracking-[0.22em] text-[#7C3AED]'>Diary</p>
          <h1 className='mt-1 text-2xl font-semibold text-white sm:text-3xl'>Film diary</h1>
        </div>
        <div className='flex gap-2'>
          <button
            type='button'
            onClick={() => setPrivateDiary((value) => !value)}
            className={`inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm transition-colors duration-200 ${privateDiary ? 'border-[#7C3AED]/30 bg-[#7C3AED]/12 text-[#7C3AED]' : 'border-white/10 bg-white/6 text-slate-200'}`}
          >
            <LockKeyhole className='h-4 w-4' /> {privateDiary ? 'Private diary' : 'Public diary'}
          </button>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant='secondary'>Background</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Customize diary background</DialogTitle>
                <DialogDescription>Pick a backdrop or upload your own image.</DialogDescription>
              </DialogHeader>
              <div className='grid gap-3 md:grid-cols-3'>
                {diaryBackgrounds.map((bg) => (
                  <button key={bg} onClick={() => setPicked(bg)} type='button' className='overflow-hidden rounded-md border border-white/10'>
                    <img src={bg} alt='Diary background' className='h-24 w-full object-cover' />
                  </button>
                ))}
              </div>
              <label className='flex cursor-pointer items-center gap-2 rounded-md border border-dashed border-white/20 bg-white/6 p-3 text-sm text-slate-200'>
                <ImagePlus className='h-4 w-4' />
                Upload custom image
                <input
                  type='file'
                  accept='image/*'
                  className='hidden'
                  onChange={(event) => {
                    const file = event.target.files?.[0]
                    if (file) setUploadedBg(URL.createObjectURL(file))
                  }}
                />
              </label>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <section className='relative overflow-hidden rounded-lg border border-white/10'>
        <img src={activeBg} alt='Diary backdrop' className='absolute inset-0 h-full w-full object-cover' />
        <div className='absolute inset-0 bg-[#081120]/72 backdrop-blur-[2px]' />
        <div className='relative overflow-x-auto p-3 sm:p-4'>
          <table className='w-full min-w-[720px] border-collapse text-left'>
            <thead>
              <tr className='border-b border-white/10 text-xs uppercase tracking-[0.18em] text-slate-400'>
                <th className='py-3 pr-4 font-medium'>Date</th>
                <th className='py-3 pr-4 font-medium'>Poster</th>
                <th className='py-3 pr-4 font-medium'>Movie</th>
                <th className='py-3 pr-4 font-medium'>Rating</th>
                <th className='py-3 pr-4 font-medium'>Review</th>
                <th className='py-3 pr-4 font-medium'>Mood</th>
                <th className='py-3 font-medium'>Visibility</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => {
                const movie = movies.find((item) => item.id === entry.movieId) ?? movies[0]
                return (
                  <tr key={`${entry.date}-${entry.movieId}`} className='border-b border-white/10 last:border-0'>
                    <td className='py-3 pr-4 text-sm text-slate-300'>{entry.date}</td>
                    <td className='py-3 pr-4'><img src={movie.poster} alt={movie.title} className='h-20 w-14 rounded-md object-cover' /></td>
                    <td className='py-3 pr-4 text-sm font-semibold text-white'>{movie.title}</td>
                    <td className='py-3 pr-4 text-sm text-[#F5B041]'>{entry.rating.toFixed(1)}</td>
                    <td className='max-w-sm py-3 pr-4 text-sm leading-5 text-slate-300'>{entry.review}</td>
                    <td className='py-3 pr-4'><span className='rounded-md bg-white/8 px-2 py-1 text-xs text-slate-200'>{entry.mood}</span></td>
                    <td className='py-3'><span className='rounded-md bg-[#7C3AED]/12 px-2 py-1 text-xs text-[#7C3AED]'>{privateDiary ? 'Private' : 'Public'}</span></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
