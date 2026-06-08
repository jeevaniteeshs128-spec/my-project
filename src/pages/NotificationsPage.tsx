import { Bell, MessageCircleMore, UserPlus, Users } from 'lucide-react'
import { notifications } from '@/data/mockData'

const iconMap = {
  comment: MessageCircleMore,
  meetup: Bell,
  community: Users,
  director: Bell,
  follow: UserPlus,
}

export function NotificationsPage() {
  return (
    <div className='space-y-5'>
      <div>
        <p className='text-xs uppercase tracking-[0.22em] text-amber-200'>Notifications</p>
        <h1 className='mt-1 text-3xl font-semibold text-white'>Updates that matter</h1>
      </div>

      <div className='space-y-0 rounded-2xl border border-white/10 bg-[#111827]'>
        {notifications.map((item) => {
          const Icon = iconMap[item.type]
          return (
            <div key={item.id} className='flex items-center gap-3 border-t border-white/10 p-4 first:border-t-0'>
              <div className='rounded-full border border-white/10 bg-white/5 p-2'>
                <Icon className='h-4 w-4 text-amber-200' />
              </div>
              <div>
                <p className='text-sm font-medium text-white'>{item.title}</p>
                <p className='text-xs text-slate-400'>{item.time}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
