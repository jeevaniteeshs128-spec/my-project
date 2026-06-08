import { MoonStar, Palette, ShieldCheck } from 'lucide-react'

import { Card } from '@/components/ui/card'

export function SettingsPage() {
  return (
    <div className='space-y-4'>
      <div>
        <p className='text-xs uppercase tracking-[0.22em] text-violet-200'>Settings</p>
        <h1 className='mt-1 text-3xl font-semibold text-white'>Personalization and privacy</h1>
      </div>

      <Card className='flex items-center gap-3'>
        <Palette className='h-5 w-5 text-violet-200' />
        <div>
          <p className='font-medium text-white'>Theme customization</p>
          <p className='text-sm text-slate-300'>Control gradients, overlays, and diary styling presets.</p>
        </div>
      </Card>

      <Card className='flex items-center gap-3'>
        <MoonStar className='h-5 w-5 text-blue-200' />
        <div>
          <p className='font-medium text-white'>Display preferences</p>
          <p className='text-sm text-slate-300'>Tune card density, motion intensity, and quote banner style.</p>
        </div>
      </Card>

      <Card className='flex items-center gap-3'>
        <ShieldCheck className='h-5 w-5 text-emerald-200' />
        <div>
          <p className='font-medium text-white'>Privacy controls</p>
          <p className='text-sm text-slate-300'>Manage private watchlist visibility and chat permissions.</p>
        </div>
      </Card>
    </div>
  )
}
