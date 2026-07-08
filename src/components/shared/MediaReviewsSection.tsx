import { useMemo, useState } from 'react'

import { ReviewCard } from '@/components/shared/ReviewCard'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { reviews } from '@/data/mockData'
import type { MediaKind } from '@/types'

type MediaReviewsSectionProps = {
  mediaId: string
  mediaKind: MediaKind
}

export function MediaReviewsSection({ mediaId, mediaKind }: MediaReviewsSectionProps) {
  const [tab, setTab] = useState<'all' | 'text' | 'video'>('all')

  const filtered = useMemo(() => {
    return reviews.filter((review) => {
      if (review.mediaId !== mediaId || review.mediaKind !== mediaKind) return false
      if (tab === 'text') return review.kind === 'text'
      if (tab === 'video') return review.kind === 'video'
      return true
    })
  }, [mediaId, mediaKind, tab])

  return (
    <Tabs value={tab} onValueChange={(value) => setTab(value as typeof tab)}>
      <TabsList className='w-full max-w-full overflow-x-auto'>
        <TabsTrigger value='all'>All</TabsTrigger>
        <TabsTrigger value='text'>Text</TabsTrigger>
        <TabsTrigger value='video'>Video</TabsTrigger>
      </TabsList>
      <TabsContent value='all'>
        <div className='rounded-[1.5rem] border border-white/10 bg-[#162033] px-4'>
          {filtered.filter((review) => tab === 'all' || review.kind === tab).map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </TabsContent>
      <TabsContent value='text'>
        <div className='rounded-[1.5rem] border border-white/10 bg-[#162033] px-4'>
          {filtered.filter((review) => review.kind === 'text').map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </TabsContent>
      <TabsContent value='video'>
        <div className='rounded-[1.5rem] border border-white/10 bg-[#162033] px-4'>
          {filtered.filter((review) => review.kind === 'video').map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </TabsContent>
    </Tabs>
  )
}
