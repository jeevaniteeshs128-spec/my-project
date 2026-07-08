export type UserRole = 'reviewer' | 'director' | 'community' | 'general'

export type Quote = {
  id: string
  text: string
  author: string
}

export type FeedbackBadge = 'Verified Critic' | 'Premium Critic' | 'Filmmaker' | 'Top Reviewer' | 'Community Curator' | 'Full Pace Elite' | 'Verified Reviewer' | 'Official Critic'

export type FeedbackCategoryRatings = {
  storytelling: number
  screenplay: number
  direction: number
  performances: number
  cinematography: number
  music: number
  editing: number
  visualEffects?: number
  pacing: number
}

export type DirectorFeedbackReply = {
  id: string
  user: string
  text: string
  time: string
}

export type CreatorFeedbackEntry = {
  id: string
  creatorSlug: string
  creatorName: string
  creatorRole: string
  user: string
  handle: string
  avatar: string
  reviewerRole: string
  badges: FeedbackBadge[]
  verified: boolean
  pinned: boolean
  overallRating: number
  careerRating: number
  text: string
  videoUrl?: string
  favoriteWorks: string[]
  favoriteEra: string
  improvementSuggestions: string
  appreciation: string
  tags: string[]
  helpfulCount: number
  replies: DirectorFeedbackReply[]
  timestamp: string
}

export type DirectorFeedbackEntry = {
  id: string
  mediaId: string
  mediaKind: MediaKind
  directorName: string
  user: string
  handle: string
  avatar: string
  reviewerRole: string
  badges: FeedbackBadge[]
  verified: boolean
  pinned: boolean
  overallRating: number
  categories: FeedbackCategoryRatings
  text: string
  helpfulCount: number
  replies: DirectorFeedbackReply[]
  timestamp: string
  impressedScene?: string
  improvedScene?: string
  futureSuggestions?: string
}

export type CurrentViewer = {
  id: string
  name: string
  handle: string
  avatar: string
  role: string
  badges: FeedbackBadge[]
  canSubmitCreatorFeedback: boolean
  canSubmitDirectorFeedback: boolean
  verifiedDirector: boolean
}

export type DirectorDashboardMetrics = {
  averageCommunityRating: number
  averageStoryRating: number
  averageScreenplayRating: number
  averageDirectionRating: number
  averageMusicRating: number
  averageEditingRating: number
  mostAppreciatedAspect: string
  mostRequestedImprovement: string
  topCommunitySuggestions: string[]
  positiveFeedbackPercent: number
  constructiveFeedbackPercent: number
}

export type DirectorDashboard = {
  directorSlug: string
  directorName: string
  verifiedDirector: boolean
  metrics: DirectorDashboardMetrics
}

export type PersonCredit = {
  id: string
  title: string
  mediaKind: MediaKind
  year: number
  poster: string
  rating: number
}

export type PersonTimelineItem = {
  year: string
  title: string
  description: string
}

export type ActorProfile = {
  slug: string
  name: string
  avatar: string
  bio: string
  photos: string[]
  knownFor: string[]
  movieography: PersonCredit[]
  tvShows: PersonCredit[]
  upcomingProjects: string[]
}

export type DirectorProfile = {
  slug: string
  name: string
  avatar: string
  bio: string
  timeline: PersonTimelineItem[]
  filmography: PersonCredit[]
  highestRatedMovies: string[]
  awards: string[]
  communityReviews: string[]
}

export type AiRecommendation = {
  headline: string
  rationale: string[]
  items: string[]
}

export type MediaKind = 'movie' | 'series'

export type Movie = {
  id: string
  title: string
  poster: string
  backdrop: string
  rating: number
  year: number
  runtime: string
  director: string
  cast: string[]
  actress: string[]
  writer: string
  musicDirector: string
  singer: string
  genre: string
  genres: string[]
  language: string
  country: string
  productionHouse: string
  streaming: string[]
  popularity: number
  reviewSnippet: string
  countdown: string
}

export type Episode = {
  id: string
  title: string
  number: number
  runtime: string
  rating: number
  still: string
  synopsis: string
}

export type Season = {
  id: string
  number: number
  title: string
  rating: number
  episodes: Episode[]
}

export type Series = {
  id: string
  title: string
  poster: string
  backdrop: string
  rating: number
  year: number
  status: string
  creator: string
  genres: string[]
  language: string
  country: string
  productionHouse: string
  streaming: string[]
  popularity: number
  progress: number
  reviewSnippet: string
  seasons: Season[]
}

export type Review = {
  id: string
  mediaId: string
  mediaKind: MediaKind
  user: string
  avatar: string
  rating: number
  text: string
  spoiler: boolean
  likes: number
  comments: number
  bookmarks: number
  kind: 'text' | 'video'
  filter: 'newest' | 'popular' | 'friends'
}

export type Activity = {
  id: string
  user: string
  avatar: string
  action: string
  mediaId: string
  mediaKind: MediaKind
  rating?: number
  snippet: string
}

export type Meetup = {
  id: string
  title: string
  type: 'movie meetup' | 'series meetup' | 'watch party'
  mode: 'online' | 'offline'
  cadence: 'weekly' | 'monthly' | 'quarterly'
  date: string
  registrations: number
  communityOnly: boolean
}

export type Community = {
  id: string
  name: string
  slug: string
  mediaId: string
  mediaKind: MediaKind
  members: number
  description: string
  pinned: string
  poll: string
  threads: string[]
}

export type UserProfile = {
  id: string
  name: string
  handle: string
  avatar: string
  banner: string
  bio: string
  favorites: string[]
  favoriteSeries: string[]
  favoriteDirectors: string[]
}

export type NotificationItem = {
  id: string
  type: 'comment' | 'meetup' | 'community' | 'director' | 'follow'
  title: string
  time: string
}

export type Message = {
  id: string
  from: string
  room: string
  text: string
  online: boolean
  typing?: boolean
}
