import type { PropsWithChildren } from 'react'

import { BottomNav } from './BottomNav'
import { Navbar } from './Navbar'

export function AppLayout({ children }: PropsWithChildren) {
  return (
    <div className='min-h-screen bg-[#081023] text-white'>
      <div className='fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(48,80,112,0.25),transparent_34%),linear-gradient(180deg,#081023_0%,#101827_55%,#0b111f_100%)]' />
      <Navbar />
      <div className='mx-auto min-h-screen w-full max-w-7xl px-3 pb-28 pt-4 sm:px-4 md:pt-6 lg:px-6 lg:pb-10'>
        <main className='mx-auto w-full max-w-[430px] md:max-w-4xl lg:max-w-none'>{children}</main>
      </div>
      <BottomNav />
    </div>
  )
}
