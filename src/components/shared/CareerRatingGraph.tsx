type RatingPoint = {
  label: string
  value: number
}

type CareerRatingGraphProps = {
  title: string
  subtitle: string
  points: RatingPoint[]
}

export function CareerRatingGraph({ title, subtitle, points }: CareerRatingGraphProps) {
  return (
    <div className='rounded-[1.5rem] border border-white/10 bg-white/[0.055] p-4 backdrop-blur'>
      <div className='flex items-start justify-between gap-3'>
        <div>
          <p className='text-sm font-semibold text-white'>{title}</p>
          <p className='mt-1 text-sm text-slate-400'>{subtitle}</p>
        </div>
      </div>
      <div className='mt-4 space-y-3'>
        {points.map((point) => (
          <div key={point.label}>
            <div className='mb-1 flex items-center justify-between text-xs text-slate-400'>
              <span>{point.label}</span>
              <span>{point.value.toFixed(1)}</span>
            </div>
            <div className='h-2 overflow-hidden rounded-full bg-white/10'>
              <div className='h-full rounded-full bg-[linear-gradient(90deg,rgba(124,58,237,.95),rgba(34,211,238,.95))]' style={{ width: `${(point.value / 5) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
