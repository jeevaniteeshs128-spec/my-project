import type { PropsWithChildren } from 'react'

import { BottomNav } from './BottomNav'
import { FloatingLogButton, LogActionProvider } from './LogActionSheet'
import { Navbar } from './Navbar'

export function AppLayout({ children }: PropsWithChildren) {
  return (
    <LogActionProvider>
      <div className='min-h-screen text-[#F8FAFC]'>
        <div className='fixed inset-0 -z-10 bg-[radial-gradient(circle_at_18%_0%,rgba(124,58,237,0.24),transparent_30%),radial-gradient(circle_at_84%_8%,rgba(245,176,65,0.12),transparent_24%),linear-gradient(180deg,#081120_0%,#111827_48%,#081120_100%)]' />
        <div className='fixed inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.018)_1px,transparent_1px)] bg-[size:72px_72px] opacity-24' />
        <div className='fixed inset-x-0 top-[-18%] -z-10 mx-auto h-[46rem] w-[46rem] rounded-full bg-[#7C3AED]/12 blur-3xl' />
        <div className='fixed bottom-[-12rem] right-[-8rem] -z-10 h-[28rem] w-[28rem] rounded-full bg-[#F5B041]/10 blur-3xl' />
        <Navbar />
        <div className='mx-auto min-h-screen w-full max-w-[1440px] px-4 pb-32 pt-4 sm:px-6 md:pt-6 lg:px-8 lg:pb-10'>
          <main className='mx-auto w-full max-w-[430px] md:max-w-5xl lg:max-w-none'>{children}</main>
        </div>
        <BottomNav />
        <FloatingLogButton />
      </div>
    </LogActionProvider>
  )
}
