import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { reviews } from '@/data/mockData'

export function ReviewerDashboard() {
  return (
    <div className='space-y-5'>
      <div>
        <p className='text-xs uppercase tracking-[0.24em] text-violet-200'>Reviewer dashboard</p>
        <h1 className='mt-1 text-3xl font-semibold text-white'>Your writing and discussion pulse</h1>
      </div>

      <div className='grid gap-4 md:grid-cols-3'>
        <Card><p className='text-sm text-slate-300'>Reviews this month</p><p className='mt-1 text-3xl font-semibold text-white'>27</p></Card>
        <Card><p className='text-sm text-slate-300'>Communities active in</p><p className='mt-1 text-3xl font-semibold text-white'>9</p></Card>
        <Card><p className='text-sm text-slate-300'>Meetups attended</p><p className='mt-1 text-3xl font-semibold text-white'>4</p></Card>
      </div>

      <Card>
        <p className='text-lg font-semibold text-white'>Recent reviews</p>
        <div className='mt-4 space-y-3'>
          {reviews.map((review) => (
            <div key={review.id} className='rounded-xl border border-white/10 bg-white/5 p-3'>
              <div className='flex items-center justify-between'>
                <p className='font-medium text-white'>{review.user}</p>
                <Badge variant='ghost'>{review.rating.toFixed(1)}</Badge>
              </div>
              <p className='mt-2 text-sm text-slate-300'>{review.text}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
