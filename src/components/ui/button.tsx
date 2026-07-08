import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition duration-200 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3AED]/70',
  {
    variants: {
      variant: {
        default: 'bg-gradient-to-r from-[#6D28D9] to-[#9333EA] text-white shadow-[0_16px_40px_rgba(124,58,237,.28)] hover:brightness-110',
        secondary: 'border border-white/12 bg-white/6 text-slate-100 hover:border-white/20 hover:bg-white/10',
        ghost: 'bg-transparent text-slate-100 hover:bg-white/8',
        gold: 'bg-[#F5B041] text-[#081120] shadow-[0_12px_34px_rgba(245,176,65,.18)] hover:bg-[#f7bf60]',
        ai: 'bg-gradient-to-r from-[#0EA5C6] to-[#22D3EE] text-[#081120] shadow-[0_0_28px_rgba(34,211,238,.24)] hover:brightness-110',
        outline: 'border border-white/15 bg-transparent text-slate-100 hover:border-[#7C3AED]/50 hover:bg-white/8',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-full px-3',
        lg: 'h-11 rounded-full px-6',
        icon: 'h-10 w-10 rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
