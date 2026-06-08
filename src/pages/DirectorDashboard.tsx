import { ArrowUpRight, Wrench } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'

const feedbackBuckets = [
  { label: 'Story feedback', count: 89, trend: '+12%' },
  { label: 'Technical feedback', count: 57, trend: '+8%' },
  { label: 'Pacing concerns', count: 31, trend: '+3%' },
]

export function DirectorDashboard() {
  return (
    <div className='space-y-5'>
      <div>
        <p className='text-xs uppercase tracking-[0.24em] text-amber-200'>Director dashboard</p>
        <h1 className='mt-1 text-3xl font-semibold text-white'>Constructive audience feedback center</h1>
      </div>

      <div className='grid gap-4 md:grid-cols-3'>
        {feedbackBuckets.map((item) => (
          <Card key={item.label} className='bg-gradient-to-br from-amber-300/12 to-transparent'>
            <p className='text-sm text-slate-300'>{item.label}</p>
            <p className='mt-1 text-3xl font-semibold text-white'>{item.count}</p>
            <Badge variant='gold' className='mt-2 inline-flex'>{item.trend}</Badge>
          </Card>
        ))}
      </div>

      <Card>
        <p className='text-lg font-semibold text-white'>Most requested improvements</p>
        <ul className='mt-4 space-y-3 text-sm text-slate-200'>
          <li className='flex items-start gap-2'><Wrench className='mt-0.5 h-4 w-4 text-amber-300' />Improve dialogue clarity in second act scenes.</li>
          <li className='flex items-start gap-2'><Wrench className='mt-0.5 h-4 w-4 text-amber-300' />Tighten pacing between midpoint and climax.</li>
          <li className='flex items-start gap-2'><Wrench className='mt-0.5 h-4 w-4 text-amber-300' />Boost subtitle timing in multilingual cuts.</li>
        </ul>
        <button className='mt-4 inline-flex items-center gap-2 text-sm text-amber-200'>Open full feedback analytics <ArrowUpRight className='h-4 w-4' /></button>
      </Card>
    </div>
  )
}
