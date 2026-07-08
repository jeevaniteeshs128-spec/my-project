type DirectionPoint = {
  label: string
  value: number
}

type DirectionRatingGraphProps = {
  title: string
  subtitle: string
  points: DirectionPoint[]
}

export function DirectionRatingGraph({ title, subtitle, points }: DirectionRatingGraphProps) {
  return (
    <div className='rounded-[1.5rem] border border-white/10 bg-white/[0.055] p-4 backdrop-blur'>
      <div className='flex items-start justify-between gap-3'>
        <div>
          <p className='text-sm font-semibold text-white'>{title}</p>
          <p className='mt-1 text-sm text-slate-400'>{subtitle}</p>
        </div>
      </div>
      <div className='mt-4 grid gap-3 sm:grid-cols-2'>
        {points.map((point) => (
          <div key={point.label} className='rounded-2xl border border-white/10 bg-black/20 p-3'>
            <div className='flex items-center justify-between gap-2'>
              <p className='text-sm font-medium text-white'>{point.label}</p>
              <span className='text-sm text-[#F5B041]'>{point.value.toFixed(1)}</span>
            </div>
            <div className='mt-2 h-2 overflow-hidden rounded-full bg-white/10'>
              <div className='h-full rounded-full bg-[#7C3AED]' style={{ width: `${(point.value / 5) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
