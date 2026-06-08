export type UserRole = 'reviewer' | 'director' | 'community' | 'general'

export type Quote = {
  id: string
  text: string
  author: string
}

export type Movie = {
  id: string
  title: string
  poster: string
  backdrop: string
  rating: number
  year: number
  director: string
  cast: string[]
  actress: string[]
  singer: string
  genre: string
  language: string
  popularity: number
  reviewSnippet: string
}

export type Review = {
  id: string
  movieId: string
  user: string
  avatar: string
  rating: number
  text: string
  spoiler: boolean
  likes: number
  comments: number
  kind: 'short' | 'long'
}

export type Meetup = {
  id: string
  title: string
  mode: 'online' | 'offline'
  cadence: 'monthly' | 'quarterly'
  date: string
  registrations: number
  communityOnly: boolean
}

export type Community = {
  id: string
  name: string
  slug: string
  movieId: string
  members: number
  description: string
  threads: string[]
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
  text: string
  online: boolean
  typing?: boolean
}
