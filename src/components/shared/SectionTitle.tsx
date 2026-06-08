type SectionTitleProps = {
  eyebrow: string
  title: string
  description?: string
}

export function SectionTitle({ eyebrow, title, description }: SectionTitleProps) {
  return (
    <div className='mb-4'>
      <p className='text-[11px] uppercase tracking-[0.26em] text-amber-200'>{eyebrow}</p>
      <h2 className='mt-1 text-2xl font-semibold text-white'>{title}</h2>
      {description ? <p className='mt-1 text-sm leading-6 text-slate-400'>{description}</p> : null}
    </div>
  )
}
