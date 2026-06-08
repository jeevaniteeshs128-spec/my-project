import type { UserRole } from '@/types'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { roleThemes } from '@/data/mockData'

const portals: Array<{ role: UserRole; title: string; subtitle: string }> = [
  { role: 'reviewer', title: 'Reviewer Login', subtitle: 'Card style reviewer access' },
  { role: 'director', title: 'Director Login', subtitle: 'Premium gold director portal' },
  { role: 'community', title: 'Community Member Login', subtitle: 'Blue community portal' },
  { role: 'general', title: 'General User Login', subtitle: 'Purple public portal' },
]

export function LoginPage() {
  return (
    <div className='space-y-5'>
      <h1 className='text-3xl font-semibold text-white'>Choose Your Login Portal</h1>
      <p className='text-sm text-slate-300'>Frontend-only role authentication mock with Sign In, Sign Up, and Forgot Password.</p>

      <div className='grid gap-4 md:grid-cols-2'>
        {portals.map((portal) => (
          <Card key={portal.role} className={`bg-gradient-to-br ${roleThemes[portal.role]}`}>
            <div className='flex items-center justify-between'>
              <div>
                <h2 className='text-lg font-semibold text-white'>{portal.title}</h2>
                <p className='text-xs text-slate-200'>{portal.subtitle}</p>
              </div>
              <Badge variant={portal.role === 'director' ? 'gold' : portal.role === 'community' ? 'blue' : 'default'}>
                {portal.role}
              </Badge>
            </div>
            <div className='mt-4 space-y-3'>
              <Input placeholder='Email address' />
              <Input placeholder='Password' type='password' />
              <div className='flex flex-wrap gap-2'>
                <Button size='sm'>Sign In</Button>
                <Button size='sm' variant='secondary'>
                  Sign Up
                </Button>
                <Button size='sm' variant='ghost'>
                  Forgot Password
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
