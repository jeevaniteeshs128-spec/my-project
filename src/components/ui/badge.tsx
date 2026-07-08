import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const badgeVariants = cva('inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium tracking-wide', {
  variants: {
    variant: {
      default: 'border-white/12 bg-white/6 text-slate-100',
      gold: 'border-[#F5B041]/40 bg-[#F5B041]/14 text-[#F5B041]',
      green: 'border-[#7C3AED]/35 bg-[#7C3AED]/14 text-violet-100',
      brand: 'border-[#7C3AED]/35 bg-[#7C3AED]/14 text-[#E9D5FF]',
      blue: 'border-[#3B82F6]/30 bg-[#3B82F6]/12 text-blue-100',
      ai: 'border-[#22D3EE]/45 bg-[#22D3EE]/12 text-[#A5F3FC] shadow-[0_0_22px_rgba(34,211,238,.14)]',
      ghost: 'border-white/10 bg-transparent text-slate-300',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
