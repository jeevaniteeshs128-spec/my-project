import { Link } from 'react-router-dom'
import { MessageCircle, ShieldAlert, Vote } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { communities, getMedia } from '@/data/mockData'

const tabs = ['Reviews', 'Discussions', 'Polls', 'Fan theories', 'Spoilers']

export function CommunityDashboard() {
  return (
    <div className='space-y-5'>
      <div>
        <p className='text-xs uppercase tracking-[0.22em] text-[#35d07f]'>Communities</p>
        <h1 className='mt-1 text-2xl font-semibold text-white sm:text-3xl'>Movie rooms</h1>
      </div>

      <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-3'>
        {communities.map((community) => {
          const media = getMedia(community.mediaId)
          if (!media) return null
          return (
            <Link
              key={community.id}
              to={`/community/${community.slug}`}
              className='group overflow-hidden rounded-lg border border-white/10 bg-[#101827] transition-colors duration-200 hover:border-[#35d07f]/70'
            >
              <div className='relative h-40'>
                <img src={media.backdrop} alt={media.title} className='absolute inset-0 h-full w-full object-cover' />
                <div className='absolute inset-0 bg-gradient-to-r from-[#081023]/95 via-[#081023]/60 to-transparent' />
                <img src={media.poster} alt={media.title} className='absolute bottom-3 left-3 h-32 w-20 rounded-md border border-white/15 object-cover' />
              </div>
              <div className='p-3 pl-[112px] sm:pl-3'>
                <div className='flex flex-wrap items-center gap-2'>
                  <h2 className='text-base font-semibold text-white'>{community.name}</h2>
                  <Badge variant='blue'>{community.members.toLocaleString()}</Badge>
                </div>
                <p className='mt-2 line-clamp-2 text-sm leading-5 text-slate-300'>{community.description}</p>
                <div className='mt-3 flex flex-wrap gap-2'>
                  {tabs.slice(0, 4).map((tab) => (
                    <span key={tab} className='rounded-md bg-white/6 px-2 py-1 text-[11px] text-slate-300'>{tab}</span>
                  ))}
                </div>
                <div className='mt-3 flex items-center gap-4 text-xs text-slate-400'>
                  <span className='inline-flex items-center gap-1'><MessageCircle className='h-3.5 w-3.5' /> {community.threads.length} threads</span>
                  <span className='inline-flex items-center gap-1'><Vote className='h-3.5 w-3.5' /> polls</span>
                  <span className='inline-flex items-center gap-1'><ShieldAlert className='h-3.5 w-3.5' /> spoiler safe</span>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
