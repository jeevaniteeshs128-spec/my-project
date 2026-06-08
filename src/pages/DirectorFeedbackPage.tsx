import { PencilLine } from 'lucide-react'

import { MovieCard } from '@/components/shared/MovieCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { movies } from '@/data/mockData'

const feedbackBuckets = ['Story Issues', 'Technical Issues', 'Constructive Criticism']

export function DirectorFeedbackPage() {
  return (
    <div className='space-y-6'>
      <div>
        <p className='text-xs uppercase tracking-[0.22em] text-[#35d07f]'>Director feedback</p>
        <h1 className='mt-1 text-2xl font-semibold text-white sm:text-3xl'>Constructive notes for films</h1>
      </div>

      <section className='grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6'>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} compact />
        ))}
      </section>

      <section className='grid gap-4 lg:grid-cols-[1fr_0.8fr]'>
        <div className='rounded-lg border border-white/10 bg-[#101827] p-4'>
          <p className='text-base font-semibold text-white'>Submit feedback</p>
          <div className='mt-4 grid gap-3'>
            <Input placeholder='Movie title' />
            <Input placeholder='Story issues' />
            <Input placeholder='Technical issues' />
            <Input placeholder='Constructive criticism' />
          </div>
          <div className='mt-4 flex flex-wrap gap-2'>
            <Button>Send feedback</Button>
            <Button variant='secondary'>Save draft</Button>
          </div>
        </div>

        <div className='rounded-lg border border-white/10 bg-[#101827] p-4'>
          <p className='text-base font-semibold text-white'>Feedback categories</p>
          <div className='mt-4 space-y-3'>
            {feedbackBuckets.map((item) => (
              <div key={item} className='flex items-start gap-2 rounded-md border border-white/10 bg-white/6 p-3'>
                <PencilLine className='mt-0.5 h-4 w-4 text-[#35d07f]' />
                <div>
                  <p className='text-sm font-semibold text-white'>{item}</p>
                  <p className='mt-1 text-sm leading-5 text-slate-300'>Frontend mock data only, ready to connect later.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
