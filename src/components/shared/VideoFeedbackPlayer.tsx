import { Play, Clock3, MessageSquareText, ThumbsUp, Eye } from 'lucide-react'

type VideoFeedbackPlayerProps = {
  title: string
  duration: string
  views: string
  likes: string
  comments: string
  thumbnail: string
}

export function VideoFeedbackPlayer({ title, duration, views, likes, comments, thumbnail }: VideoFeedbackPlayerProps) {
  return (
    <div className='overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#162033]'>
      <div className='relative'>
        <img src={thumbnail} alt={title} className='aspect-video w-full object-cover' />
        <div className='absolute inset-0 bg-[linear-gradient(0deg,rgba(8,17,32,.78),transparent_55%)]' />
        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='grid h-12 w-12 place-items-center rounded-full border border-white/20 bg-white/15 text-white backdrop-blur'>
            <Play className='ml-1 h-5 w-5 fill-current' />
          </div>
        </div>
      </div>
      <div className='p-4'>
        <p className='text-sm font-semibold text-white'>{title}</p>
        <div className='mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-400'>
          <span className='inline-flex items-center gap-1'><Clock3 className='h-3.5 w-3.5' /> {duration}</span>
          <span className='inline-flex items-center gap-1'><Eye className='h-3.5 w-3.5' /> {views}</span>
          <span className='inline-flex items-center gap-1'><ThumbsUp className='h-3.5 w-3.5' /> {likes}</span>
          <span className='inline-flex items-center gap-1'><MessageSquareText className='h-3.5 w-3.5' /> {comments}</span>
        </div>
      </div>
    </div>
  )
}
