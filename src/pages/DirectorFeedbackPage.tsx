import { Star, TrendingUp } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { directorFeedbackEntries, directorDashboards, movies } from '@/data/mockData'

const dashboard = directorDashboards['christopher-nolan']
const directorFeedback = directorFeedbackEntries.filter((entry) => entry.directorName === dashboard.directorName)

function MetricCard({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className='rounded-[1.5rem] border border-white/10 bg-white/[0.055] p-4'>
      <p className='text-xs uppercase tracking-[0.2em] text-slate-400'>{label}</p>
      <p className='mt-2 text-2xl font-semibold text-white'>{value}</p>
      <p className='mt-1 text-sm text-slate-400'>{note}</p>
    </div>
  )
}

export function DirectorFeedbackPage() {
  return (
    <div className='space-y-6'>
      <section className='relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#162033]'>
        <img src={movies[4].backdrop} alt='Director dashboard' className='absolute inset-0 h-full w-full object-cover' />
        <div className='absolute inset-0 bg-[linear-gradient(0deg,#081120,transparent_45%)]' />
        <div className='relative p-4 sm:p-6 lg:p-8'>
          <Badge variant='gold' className='w-fit gap-1'><Star className='h-3.5 w-3.5' /> Verified Director Dashboard</Badge>
          <h1 className='mt-3 text-3xl font-semibold text-white sm:text-4xl'>{dashboard.directorName}</h1>
          <p className='mt-2 max-w-2xl text-sm leading-6 text-slate-300'>
            This dashboard surfaces constructive audience feedback for verified directors. It emphasizes clarity, respect, and actionable suggestions.
          </p>
          <div className='mt-4 flex flex-wrap gap-2'>
            <Badge variant='brand'>{dashboard.verifiedDirector ? 'Verified Director' : 'Director Account'}</Badge>
            <Badge variant='ghost'>Community-led insights</Badge>
            <Badge variant='ghost'>Mock JSON dashboard</Badge>
          </div>
        </div>
      </section>

      <section className='grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'>
        <MetricCard label='Average Community Rating' value={dashboard.metrics.averageCommunityRating.toFixed(1)} note='Overall audience approval across feedback entries.' />
        <MetricCard label='Average Story Rating' value={dashboard.metrics.averageStoryRating.toFixed(1)} note='Story construction and narrative clarity.' />
        <MetricCard label='Average Direction Rating' value={dashboard.metrics.averageDirectionRating.toFixed(1)} note='Audience perception of directorial execution.' />
        <MetricCard label='Positive Feedback %' value={`${dashboard.metrics.positiveFeedbackPercent}%`} note='What the community considered especially strong.' />
        <MetricCard label='Constructive Feedback %' value={`${dashboard.metrics.constructiveFeedbackPercent}%`} note='Actionable critique that can inform future work.' />
      </section>

      <section className='grid gap-4 lg:grid-cols-[1fr_.9fr]'>
        <Card>
          <CardHeader>
            <CardTitle>Detailed Ratings</CardTitle>
            <CardDescription>Category-level averages from the curated feedback feed.</CardDescription>
          </CardHeader>
          <CardContent className='space-y-3'>
            {[
              ['Screenplay', dashboard.metrics.averageScreenplayRating],
              ['Direction', dashboard.metrics.averageDirectionRating],
              ['Music', dashboard.metrics.averageMusicRating],
              ['Editing', dashboard.metrics.averageEditingRating],
            ].map(([label, value]) => (
              <div key={label} className='rounded-2xl border border-white/10 bg-white/6 p-3'>
                <div className='flex items-center justify-between gap-3'>
                  <p className='text-sm font-semibold text-white'>{label}</p>
                  <p className='text-sm text-slate-300'>{Number(value).toFixed(1)}</p>
                </div>
                <div className='mt-2 h-2 overflow-hidden rounded-full bg-white/10'>
                  <div className='h-full rounded-full bg-[#7C3AED]' style={{ width: `${(Number(value) / 5) * 100}%` }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Community Signals</CardTitle>
            <CardDescription>What viewers appreciate most and what they want improved.</CardDescription>
          </CardHeader>
          <CardContent className='space-y-3'>
            <div className='rounded-2xl border border-white/10 bg-white/6 p-3'>
              <p className='text-xs uppercase tracking-[0.18em] text-slate-400'>Most Appreciated Aspect</p>
              <p className='mt-1 text-sm font-semibold text-white'>{dashboard.metrics.mostAppreciatedAspect}</p>
            </div>
            <div className='rounded-2xl border border-white/10 bg-white/6 p-3'>
              <p className='text-xs uppercase tracking-[0.18em] text-slate-400'>Most Requested Improvement</p>
              <p className='mt-1 text-sm font-semibold text-white'>{dashboard.metrics.mostRequestedImprovement}</p>
            </div>
            <div className='space-y-2'>
              {dashboard.metrics.topCommunitySuggestions.map((item) => (
                <div key={item} className='rounded-2xl border border-[#22D3EE]/20 bg-[#22D3EE]/[0.045] p-3 text-sm text-slate-100'>
                  {item}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <section className='grid gap-4 lg:grid-cols-[1fr_.9fr]'>
        <Card>
          <CardHeader>
            <CardTitle>Top Community Feedback</CardTitle>
            <CardDescription>Curated constructive notes from verified members.</CardDescription>
          </CardHeader>
          <CardContent className='space-y-3'>
            {directorFeedback.map((entry) => (
              <article key={entry.id} className='rounded-2xl border border-white/10 bg-white/6 p-3'>
                <div className='flex items-center justify-between gap-3'>
                  <div>
                    <p className='text-sm font-semibold text-white'>{entry.user}</p>
                    <p className='text-xs text-slate-400'>{entry.reviewerRole} · {entry.timestamp}</p>
                  </div>
                  <div className='inline-flex items-center gap-1 rounded-full border border-[#F5B041]/35 bg-[#F5B041]/14 px-2.5 py-1 text-xs text-[#F5B041]'>
                    <TrendingUp className='h-3.5 w-3.5' /> {entry.overallRating.toFixed(1)}
                  </div>
                </div>
                <p className='mt-2 line-clamp-3 text-sm leading-6 text-slate-200'>{entry.text}</p>
              </article>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>What This Dashboard Means</CardTitle>
            <CardDescription>A concise bridge between filmmakers and the audience.</CardDescription>
          </CardHeader>
          <CardContent className='space-y-3 text-sm leading-6 text-slate-200'>
            <p>
              Feedback is intentionally curated to remain respectful, specific, and useful. It is designed to help directors see
              patterns without exposing them to unstructured public comments.
            </p>
            <p>
              The strongest notes rise to the top when they are verified, constructive, and supported by clear examples or scene-level
              references.
            </p>
            <div className='rounded-2xl border border-[#7C3AED]/25 bg-[#7C3AED]/[0.08] p-3'>
              <p className='text-xs uppercase tracking-[0.18em] text-slate-400'>Average Community Rating</p>
              <p className='mt-1 text-2xl font-semibold text-white'>{dashboard.metrics.averageCommunityRating.toFixed(1)}</p>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
