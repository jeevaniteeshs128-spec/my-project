import type { PropsWithChildren } from 'react'

import { BottomNav } from './BottomNav'
import { Navbar } from './Navbar'

export function AppLayout({ children }: PropsWithChildren) {
  return (
    <div className='min-h-screen bg-[#050608] text-white'>
      <div className='fixed inset-0 -z-10 bg-[radial-gradient(circle_at_18%_0%,rgba(62,90,88,0.24),transparent_30%),radial-gradient(circle_at_82%_12%,rgba(112,64,52,0.18),transparent_28%),linear-gradient(180deg,#050608_0%,#0b1114_50%,#050608_100%)]' />
      <Navbar />
      <div className='mx-auto min-h-screen w-full max-w-7xl px-3 pb-28 pt-4 sm:px-4 md:pt-6 lg:px-6 lg:pb-10'>
        <main className='mx-auto w-full max-w-[430px] md:max-w-5xl lg:max-w-none'>{children}</main>
      </div>
      <BottomNav />
    </div>
  )
}
