import { Sparkles } from 'lucide-react'

export function PremiumBadge({ label = 'Premium' }: { label?: string }) {
  return (
    <span className='inline-flex items-center gap-1 rounded-full border border-[#7C3AED]/30 bg-[#7C3AED]/15 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#E9D5FF]'>
      <Sparkles className='h-3.5 w-3.5' />
      {label}
    </span>
  )
}
