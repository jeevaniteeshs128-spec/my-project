import { Paperclip, Send } from 'lucide-react'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { messages, movies } from '@/data/mockData'

export function ChatPage() {
  return (
    <div className='overflow-hidden rounded-lg border border-white/10 bg-[#101827] lg:grid lg:min-h-[680px] lg:grid-cols-[320px_1fr]'>
      <aside className='border-b border-white/10 lg:border-b-0 lg:border-r'>
        <div className='border-b border-white/10 p-4'>
          <p className='text-xs uppercase tracking-[0.22em] text-[#35d07f]'>Chat</p>
          <h1 className='mt-1 text-xl font-semibold text-white'>Mutual followers</h1>
        </div>
        <div>
          {messages.map((message, index) => (
            <button key={message.id} className='grid w-full grid-cols-[48px_1fr_46px] items-center gap-3 border-b border-white/10 p-3 text-left transition-colors duration-200 hover:bg-white/6 last:border-0'>
              <Avatar>
                <AvatarFallback>{message.from.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className='min-w-0'>
                <p className='truncate text-sm font-semibold text-white'>{message.from}</p>
                <p className='truncate text-xs text-slate-400'>{message.typing ? 'Typing...' : message.text}</p>
              </div>
              <img src={movies[index % movies.length].poster} alt='' className='h-14 w-9 rounded object-cover' />
            </button>
          ))}
        </div>
      </aside>

      <section className='flex min-h-[560px] flex-col'>
        <div className='flex items-center justify-between border-b border-white/10 p-4'>
          <div>
            <p className='text-base font-semibold text-white'>cine_lina</p>
            <p className='text-xs text-slate-400'>Mutual follower - online now</p>
          </div>
          <span className='h-2.5 w-2.5 rounded-full bg-[#35d07f]' />
        </div>

        <div className='flex-1 space-y-3 overflow-y-auto p-4'>
          <div className='max-w-md rounded-lg border border-white/10 bg-white/6 p-3 text-sm leading-6 text-slate-100'>Did you see the new community poll?</div>
          <div className='ml-auto max-w-md rounded-lg border border-[#35d07f]/25 bg-[#35d07f]/12 p-3 text-sm leading-6 text-slate-100'>Yes, and I left a spoiler-safe reply in the thread.</div>
          <div className='grid max-w-md grid-cols-[58px_1fr] gap-3 rounded-lg border border-white/10 bg-white/6 p-3'>
            <img src={movies[0].poster} alt={movies[0].title} className='h-20 w-14 rounded-md object-cover' />
            <div>
              <p className='text-sm font-semibold text-white'>{movies[0].title}</p>
              <p className='mt-1 text-sm leading-5 text-slate-300'>This is the scene everyone is debating.</p>
            </div>
          </div>
          <div className='max-w-md rounded-lg border border-white/10 bg-white/6 p-3 text-sm leading-6 text-slate-100'>Typing...</div>
        </div>

        <div className='flex items-center gap-2 border-t border-white/10 p-3'>
          <button className='grid h-10 w-10 place-items-center rounded-md border border-white/10 bg-white/6 text-slate-200 transition-colors duration-200 hover:bg-white/10' aria-label='Attach file'>
            <Paperclip className='h-4 w-4' />
          </button>
          <Input placeholder='Type a message' />
          <button className='grid h-10 w-10 place-items-center rounded-md bg-[#35d07f] text-[#081023] transition-colors duration-200 hover:bg-[#55e596]' aria-label='Send message'>
            <Send className='h-4 w-4' />
          </button>
        </div>
      </section>
    </div>
  )
}
