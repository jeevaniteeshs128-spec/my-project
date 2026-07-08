import { MessageSquareDot, ShieldAlert, Users, Vote } from 'lucide-react'
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'

import { Badge } from '@/components/ui/badge'
import { communities, getMedia, reviews } from '@/data/mockData'

const tabs = ['Reviews', 'Discussions', 'Polls', 'Fan theories', 'Spoilers', 'Members']

export function MovieCommunityPage() {
  const { slug = '' } = useParams()
  const community = useMemo(() => communities.find((item) => item.slug === slug) ?? communities[0], [slug])
  const media = getMedia(community.mediaId)

  if (!media) return null

  return (
    <div className='space-y-6'>
      <section className='relative overflow-hidden rounded-lg border border-white/10 bg-[#101827]'>
        <img src={media.backdrop} alt={media.title} className='absolute inset-0 h-full w-full object-cover' />
        <div className='absolute inset-0 bg-gradient-to-r from-[#081023]/95 via-[#081023]/70 to-[#081023]/20' />
        <div className='relative grid gap-4 p-4 sm:grid-cols-[130px_1fr] sm:p-5'>
          <img src={media.poster} alt={media.title} className='w-32 rounded-md border border-white/15 object-cover' />
          <div className='flex flex-col justify-end'>
            <Badge variant='blue'>{community.mediaKind} community</Badge>
            <h1 className='mt-2 text-2xl font-semibold text-white sm:text-3xl'>{community.name}</h1>
            <p className='mt-2 max-w-2xl text-sm leading-6 text-slate-300'>{community.description}</p>
            <div className='mt-4 flex flex-wrap gap-2'>
              {tabs.map((tab) => (
                <span key={tab} className='rounded-md bg-white/8 px-2 py-1 text-xs text-slate-200'>{tab}</span>
              ))}
            </div>
            <p className='mt-3 inline-flex items-center gap-2 text-sm text-slate-300'><Users className='h-4 w-4 text-[#35d07f]' /> {community.members.toLocaleString()} members</p>
          </div>
        </div>
      </section>

      <section className='grid gap-4 lg:grid-cols-[1fr_0.8fr]'>
        <div className='rounded-lg border border-white/10 bg-[#101827] p-4'>
          <div className='mb-2 flex items-center gap-2'>
            <MessageSquareDot className='h-4 w-4 text-[#35d07f]' />
            <h2 className='text-base font-semibold text-white'>Discussion threads</h2>
          </div>
          <div className='divide-y divide-white/10'>
            {community.threads.map((thread) => (
              <div key={thread} className='py-3'>
                <p className='text-sm font-medium text-white'>{thread}</p>
                <p className='mt-1 text-xs text-slate-400'>Reviews - polls - spoiler-tagged replies</p>
              </div>
            ))}
          </div>
        </div>

        <div className='space-y-4'>
          <div className='rounded-lg border border-white/10 bg-[#101827] p-4'>
            <div className='flex items-center gap-2'>
              <Vote className='h-4 w-4 text-[#35d07f]' />
              <h2 className='text-base font-semibold text-white'>Active poll</h2>
            </div>
            <p className='mt-3 text-sm leading-6 text-slate-300'>Which scene changed your interpretation most?</p>
            <div className='mt-3 rounded-md border border-[#35d07f]/25 bg-[#35d07f]/12 p-3 text-sm text-slate-200'>Ending debate leads with 42%</div>
          </div>
          <div className='rounded-lg border border-white/10 bg-[#101827] p-4'>
            <div className='flex items-center gap-2 text-[#35d07f]'>
              <ShieldAlert className='h-4 w-4' />
              <p className='text-sm font-semibold'>Spoiler discussions are flagged</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className='text-base font-semibold text-white'>Community reviews</h2>
        <div className='mt-3 grid gap-3 md:grid-cols-2'>
          {reviews.slice(0, 4).map((review) => (
            <article key={review.id} className='rounded-lg border border-white/10 bg-[#101827] p-3'>
              <p className='text-sm font-semibold text-white'>{review.user}</p>
              <p className='mt-2 line-clamp-2 text-sm leading-5 text-slate-300'>{review.text}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
