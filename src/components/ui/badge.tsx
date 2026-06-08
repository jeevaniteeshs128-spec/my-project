import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const badgeVariants = cva('inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium tracking-wide', {
  variants: {
    variant: {
      default: 'border-white/12 bg-white/6 text-slate-100',
      gold: 'border-amber-400/35 bg-amber-400/12 text-amber-200',
      blue: 'border-blue-300/25 bg-blue-400/10 text-blue-200',
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
