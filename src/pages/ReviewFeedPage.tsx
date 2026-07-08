import { ReviewCard } from '@/components/shared/ReviewCard'
import { reviews } from '@/data/mockData'

export function ReviewFeedPage() {
  return (
    <div className='mx-auto max-w-4xl space-y-4'>
      <div>
        <p className='text-xs uppercase tracking-[0.22em] text-[#7C3AED]'>Reviews</p>
        <h1 className='mt-1 text-2xl font-semibold text-white sm:text-3xl'>Latest reviews from the network</h1>
      </div>

      <div className='rounded-lg border border-white/10 bg-[#162033] px-4'>
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  )
}
