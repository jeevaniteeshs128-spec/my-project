type FilterOption = {
  key: string
  label: string
}

type FeedbackFiltersProps = {
  value: string
  onChange: (value: string) => void
  options: FilterOption[]
}

export function FeedbackFilters({ value, onChange, options }: FeedbackFiltersProps) {
  return (
    <div className='flex flex-wrap gap-2'>
      {options.map((option) => {
        const active = option.key === value
        return (
          <button
            key={option.key}
            type='button'
            onClick={() => onChange(option.key)}
            className={active
              ? 'rounded-full border border-[#7C3AED]/40 bg-[#7C3AED]/20 px-3 py-1.5 text-xs font-medium text-white'
              : 'rounded-full border border-white/10 bg-white/6 px-3 py-1.5 text-xs text-slate-300 transition-colors hover:bg-white/10'}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
