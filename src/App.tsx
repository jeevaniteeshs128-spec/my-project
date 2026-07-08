import { AnimatePresence, motion } from 'framer-motion'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'

import { AppLayout } from '@/components/layout/AppLayout'
import { ChatPage } from '@/pages/ChatPage'
import { CommunityDashboard } from '@/pages/CommunityDashboard'
import { DiaryPage } from '@/pages/DiaryPage'
import { DirectorFeedbackPage } from '@/pages/DirectorFeedbackPage'
import { LandingPage } from '@/pages/LandingPage'
import { LoginPage } from '@/pages/LoginPage'
import { MeetupsPage } from '@/pages/MeetupsPage'
import { MovieCommunityPage } from '@/pages/MovieCommunityPage'
import { MovieDetailsPage } from '@/pages/MovieDetailsPage'
import { MoviesPage } from '@/pages/MoviesPage'
import { NotificationsPage } from '@/pages/NotificationsPage'
import { ProfilePage } from '@/pages/ProfilePage'
import { SearchPage } from '@/pages/SearchPage'
import { SeriesDetailsPage } from '@/pages/SeriesDetailsPage'
import { SeriesPage } from '@/pages/SeriesPage'
import { SettingsPage } from '@/pages/SettingsPage'
import { WatchlistPage } from '@/pages/WatchlistPage'
import { ReviewFeedPage } from '@/pages/ReviewFeedPage'

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode='wait'>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.2 }}
      >
        <Routes location={location}>
          <Route path='/' element={<LandingPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/reviews' element={<ReviewFeedPage />} />
          <Route path='/dashboard/reviewer' element={<Navigate to='/reviews' replace />} />
          <Route path='/dashboard/director' element={<Navigate to='/director-feedback' replace />} />
          <Route path='/director-feedback' element={<DirectorFeedbackPage />} />
          <Route path='/dashboard/community' element={<Navigate to='/communities' replace />} />
          <Route path='/movies' element={<MoviesPage />} />
          <Route path='/movie/:movieId' element={<MovieDetailsPage />} />
          <Route path='/series' element={<SeriesPage />} />
          <Route path='/series/:seriesId' element={<SeriesDetailsPage />} />
          <Route path='/search' element={<SearchPage />} />
          <Route path='/community/:slug' element={<MovieCommunityPage />} />
          <Route path='/communities' element={<CommunityDashboard />} />
          <Route path='/diary' element={<DiaryPage />} />
          <Route path='/watchlist' element={<WatchlistPage />} />
          <Route path='/chat' element={<ChatPage />} />
          <Route path='/meetups' element={<MeetupsPage />} />
          <Route path='/notifications' element={<NotificationsPage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/settings' element={<SettingsPage />} />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <AppLayout>
      <AnimatedRoutes />
    </AppLayout>
  )
}
