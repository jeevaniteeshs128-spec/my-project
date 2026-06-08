import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-colors duration-150 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/70',
  {
    variants: {
      variant: {
        default: 'bg-[#F59E0B] text-[#0F172A] hover:bg-[#f7b731]',
        secondary: 'bg-white/6 text-slate-100 hover:bg-white/10',
        ghost: 'bg-transparent text-slate-100 hover:bg-white/8',
        gold: 'bg-[#F59E0B] text-[#0F172A] hover:bg-[#f7b731]',
        outline: 'border border-white/15 bg-transparent text-slate-100 hover:bg-white/8',
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
