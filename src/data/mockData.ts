import type {
  Activity,
  AiRecommendation,
  ActorProfile,
  Community,
  DirectorProfile,
  Meetup,
  Message,
  Movie,
  NotificationItem,
  Quote,
  Review,
  Series,
  UserProfile,
  UserRole,
} from '@/types'

const poster = (id: string) => `https://images.unsplash.com/${id}?q=80&w=900&auto=format&fit=crop`
const backdrop = (id: string) => `https://images.unsplash.com/${id}?q=80&w=1600&auto=format&fit=crop`

export const directorQuotes: Quote[] = [
  { id: 'q1', text: "Cinema is a matter of what's in the frame and what's out.", author: 'Martin Scorsese' },
  { id: 'q2', text: 'The audience should discover the world as the character does.', author: 'Christopher Nolan' },
  { id: 'q3', text: 'I see films as emotional weather.', author: 'Wong Kar-wai' },
]

export const movies: Movie[] = [
  {
    id: 'interstellar',
    title: 'Interstellar',
    poster: poster('photo-1489599849927-2ee91cede3ba'),
    backdrop: backdrop('photo-1534447677768-be436bb09401'),
    rating: 4.8,
    year: 2014,
    runtime: '2h 49m',
    director: 'Christopher Nolan',
    cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain'],
    actress: ['Anne Hathaway', 'Jessica Chastain'],
    writer: 'Jonathan Nolan',
    musicDirector: 'Hans Zimmer',
    singer: 'Hans Zimmer',
    genre: 'Sci-Fi',
    genres: ['Sci-Fi', 'Adventure', 'Drama'],
    language: 'English',
    country: 'United States',
    productionHouse: 'Paramount Pictures',
    streaming: ['Prime Video', 'Apple TV'],
    popularity: 96,
    reviewSnippet: 'Time, love, and gravity collide in a deeply human space epic.',
    countdown: '14 days',
  },
  {
    id: 'parasite',
    title: 'Parasite',
    poster: poster('photo-1536440136628-849c177e76a1'),
    backdrop: backdrop('photo-1485846234645-a62644f84728'),
    rating: 4.9,
    year: 2019,
    runtime: '2h 12m',
    director: 'Bong Joon-ho',
    cast: ['Song Kang-ho', 'Choi Woo-shik', 'Park So-dam'],
    actress: ['Cho Yeo-jeong', 'Park So-dam'],
    writer: 'Han Jin-won',
    musicDirector: 'Jung Jae-il',
    singer: 'Jung Jae-il',
    genre: 'Thriller',
    genres: ['Thriller', 'Drama', 'Comedy'],
    language: 'Korean',
    country: 'South Korea',
    productionHouse: 'Barunson E&A',
    streaming: ['Hulu', 'Criterion'],
    popularity: 99,
    reviewSnippet: 'A precise social thriller where every room hides another trapdoor.',
    countdown: '21 days',
  },
  {
    id: 'nayakan',
    title: 'Nayakan',
    poster: poster('photo-1440404653325-ab127d49abc1'),
    backdrop: backdrop('photo-1517602302552-471fe67acf66'),
    rating: 4.7,
    year: 1987,
    runtime: '2h 36m',
    director: 'Mani Ratnam',
    cast: ['Kamal Haasan', 'Nassar', 'Delhi Ganesh'],
    actress: ['Saranya', 'Karthika'],
    writer: 'Mani Ratnam',
    musicDirector: 'Ilaiyaraaja',
    singer: 'Ilaiyaraaja',
    genre: 'Crime',
    genres: ['Crime', 'Drama'],
    language: 'Tamil',
    country: 'India',
    productionHouse: 'Muktha Films',
    streaming: ['Prime Video'],
    popularity: 89,
    reviewSnippet: 'An unforgettable character study wrapped in gangster mythology.',
    countdown: '9 days',
  },
  {
    id: 'chungking-express',
    title: 'Chungking Express',
    poster: poster('photo-1478720568477-152d9b164e26'),
    backdrop: backdrop('photo-1470225620780-dba8ba36b745'),
    rating: 4.5,
    year: 1994,
    runtime: '1h 42m',
    director: 'Wong Kar-wai',
    cast: ['Takeshi Kaneshiro', 'Tony Leung', 'Faye Wong'],
    actress: ['Faye Wong', 'Brigitte Lin'],
    writer: 'Wong Kar-wai',
    musicDirector: 'Frankie Chan',
    singer: 'Faye Wong',
    genre: 'Romance',
    genres: ['Romance', 'Drama'],
    language: 'Cantonese',
    country: 'Hong Kong',
    productionHouse: 'Jet Tone',
    streaming: ['Criterion', 'MUBI'],
    popularity: 84,
    reviewSnippet: 'Urban loneliness becomes poetry through movement and neon blur.',
    countdown: '33 days',
  },
  {
    id: 'oppenheimer',
    title: 'Oppenheimer',
    poster: poster('photo-1518709268805-4e9042af2176'),
    backdrop: backdrop('photo-1500530855697-b586d89ba3ee'),
    rating: 4.4,
    year: 2023,
    runtime: '3h',
    director: 'Christopher Nolan',
    cast: ['Cillian Murphy', 'Robert Downey Jr.', 'Emily Blunt'],
    actress: ['Emily Blunt', 'Florence Pugh'],
    writer: 'Christopher Nolan',
    musicDirector: 'Ludwig Goransson',
    singer: 'Ludwig Goransson',
    genre: 'Biography',
    genres: ['Biography', 'Drama', 'History'],
    language: 'English',
    country: 'United States',
    productionHouse: 'Syncopy',
    streaming: ['Peacock', 'Apple TV'],
    popularity: 91,
    reviewSnippet: 'A dense moral epic built from faces, fallout, and impossible choices.',
    countdown: '5 days',
  },
  {
    id: 'after-sunrise',
    title: 'After Sunrise',
    poster: poster('photo-1500530855697-b586d89ba3ee'),
    backdrop: backdrop('photo-1493246507139-91e8fad9978e'),
    rating: 4.2,
    year: 2026,
    runtime: '1h 58m',
    director: 'Mira Sen',
    cast: ['Dev Patel', 'Ayo Edebiri'],
    actress: ['Ayo Edebiri', 'Ritu Arya'],
    writer: 'Mira Sen',
    musicDirector: 'Nils Frahm',
    singer: 'Nils Frahm',
    genre: 'Drama',
    genres: ['Drama', 'Romance'],
    language: 'English',
    country: 'United Kingdom',
    productionHouse: 'Northlight',
    streaming: ['Theatrical'],
    popularity: 78,
    reviewSnippet: 'A warm city romance told through missed trains and quiet choices.',
    countdown: '47 days',
  },
]

export const series: Series[] = [
  {
    id: 'station-eleven',
    title: 'Station Eleven',
    poster: poster('photo-1518929458119-e5bf444c30f4'),
    backdrop: backdrop('photo-1500530855697-b586d89ba3ee'),
    rating: 4.7,
    year: 2021,
    status: 'Limited series',
    creator: 'Patrick Somerville',
    genres: ['Drama', 'Sci-Fi'],
    language: 'English',
    country: 'United States',
    productionHouse: 'Paramount Television',
    streaming: ['Max'],
    popularity: 92,
    progress: 72,
    reviewSnippet: 'Memory, art, and survival braided into a humane apocalypse.',
    seasons: [
      {
        id: 's1',
        number: 1,
        title: 'The Traveling Symphony',
        rating: 4.7,
        episodes: [
          { id: 'e1', title: 'Wheel of Fire', number: 1, runtime: '46m', rating: 4.5, still: poster('photo-1493246507139-91e8fad9978e'), synopsis: 'A chance meeting becomes a life raft.' },
          { id: 'e2', title: 'A Hawk from a Handsaw', number: 2, runtime: '51m', rating: 4.8, still: poster('photo-1500530855697-b586d89ba3ee'), synopsis: 'The past keeps interrupting the road.' },
        ],
      },
    ],
  },
  {
    id: 'severance',
    title: 'Severance',
    poster: poster('photo-1509347528160-9a9e33742cdb'),
    backdrop: backdrop('photo-1497366754035-f200968a6e72'),
    rating: 4.6,
    year: 2022,
    status: 'Returning',
    creator: 'Dan Erickson',
    genres: ['Mystery', 'Sci-Fi', 'Drama'],
    language: 'English',
    country: 'United States',
    productionHouse: 'Endeavor Content',
    streaming: ['Apple TV'],
    popularity: 97,
    progress: 44,
    reviewSnippet: 'Corporate dread sharpened into surreal, immaculate suspense.',
    seasons: [
      {
        id: 's1',
        number: 1,
        title: 'Macrodata Refinement',
        rating: 4.6,
        episodes: [
          { id: 'e1', title: 'Good News About Hell', number: 1, runtime: '57m', rating: 4.4, still: poster('photo-1497366754035-f200968a6e72'), synopsis: 'A work floor with no outside memory.' },
          { id: 'e2', title: 'Half Loop', number: 2, runtime: '53m', rating: 4.6, still: poster('photo-1504384308090-c894fdcc538d'), synopsis: 'A new hire begins asking the wrong questions.' },
        ],
      },
    ],
  },
  {
    id: 'dark',
    title: 'Dark',
    poster: poster('photo-1518709268805-4e9042af2176'),
    backdrop: backdrop('photo-1500530855697-b586d89ba3ee'),
    rating: 4.8,
    year: 2017,
    status: 'Completed',
    creator: 'Baran bo Odar',
    genres: ['Mystery', 'Sci-Fi', 'Thriller'],
    language: 'German',
    country: 'Germany',
    productionHouse: 'Wiedemann & Berg',
    streaming: ['Netflix'],
    popularity: 94,
    progress: 100,
    reviewSnippet: 'A puzzle box where family history becomes cosmic architecture.',
    seasons: [
      {
        id: 's1',
        number: 1,
        title: 'Secrets',
        rating: 4.8,
        episodes: [
          { id: 'e1', title: 'Secrets', number: 1, runtime: '51m', rating: 4.7, still: poster('photo-1518709268805-4e9042af2176'), synopsis: 'A child disappears and time starts folding.' },
          { id: 'e2', title: 'Lies', number: 2, runtime: '44m', rating: 4.8, still: poster('photo-1517602302552-471fe67acf66'), synopsis: 'Winden reveals another locked door.' },
        ],
      },
    ],
  },
]

export const users: UserProfile[] = [
  {
    id: 'u1',
    name: 'Aria Sen',
    handle: 'cinema_ari',
    avatar: 'AR',
    banner: backdrop('photo-1485846234645-a62644f84728'),
    bio: 'Logs movies at midnight, hoards director commentaries, and hosts slow-burn watch parties.',
    favorites: ['interstellar', 'parasite', 'chungking-express'],
    favoriteSeries: ['station-eleven', 'severance'],
    favoriteDirectors: ['Christopher Nolan', 'Bong Joon-ho', 'Wong Kar-wai'],
  },
]

export const reviews: Review[] = [
  { id: 'r1', mediaId: 'interstellar', mediaKind: 'movie', user: 'cinema_ari', avatar: 'AR', rating: 5, text: 'The docking sequence is a masterclass in rhythm, clarity, and pure feeling.', spoiler: false, likes: 238, comments: 56, bookmarks: 31, kind: 'text', filter: 'popular' },
  { id: 'r2', mediaId: 'station-eleven', mediaKind: 'series', user: 'film_mira', avatar: 'MI', rating: 4.5, text: 'Episode logging finally makes sense for a show this emotionally serialized.', spoiler: false, likes: 156, comments: 24, bookmarks: 18, kind: 'video', filter: 'friends' },
  { id: 'r3', mediaId: 'parasite', mediaKind: 'movie', user: 'noir_rahul', avatar: 'RH', rating: 5, text: 'Every staircase, window, and silence feels weaponized. It is funny until it suddenly is not.', spoiler: false, likes: 311, comments: 74, bookmarks: 44, kind: 'text', filter: 'popular' },
  { id: 'r4', mediaId: 'severance', mediaKind: 'series', user: 'cine_lina', avatar: 'LI', rating: 4.6, text: 'The clean rooms make dread feel ergonomic. Perfectly odd, perfectly controlled.', spoiler: true, likes: 184, comments: 39, bookmarks: 27, kind: 'video', filter: 'newest' },
]

export const actors: ActorProfile[] = [
  {
    slug: 'matthew-mcconaughey',
    name: 'Matthew McConaughey',
    avatar: 'MM',
    bio: 'A Texas-born lead who moves between warmth, stillness, and absolute emotional control.',
    photos: [poster('photo-1489599849927-2ee91cede3ba'), backdrop('photo-1534447677768-be436bb09401')],
    knownFor: ['interstellar', 'after-sunrise'],
    movieography: [
      { id: 'interstellar', title: 'Interstellar', mediaKind: 'movie', year: 2014, poster: movies[0].poster, rating: 4.8 },
      { id: 'after-sunrise', title: 'After Sunrise', mediaKind: 'movie', year: 2026, poster: movies[5].poster, rating: 4.2 },
    ],
    tvShows: [],
    upcomingProjects: ['Harbor Light', 'The Last Frame'],
  },
  {
    slug: 'anne-hathaway',
    name: 'Anne Hathaway',
    avatar: 'AH',
    bio: 'Known for sharp emotional transitions and immaculate screen presence.',
    photos: [movies[0].poster, backdrop('photo-1493246507139-91e8fad9978e')],
    knownFor: ['interstellar'],
    movieography: [
      { id: 'interstellar', title: 'Interstellar', mediaKind: 'movie', year: 2014, poster: movies[0].poster, rating: 4.8 },
    ],
    tvShows: [],
    upcomingProjects: ['Velvet Orbit'],
  },
  {
    slug: 'cillian-murphy',
    name: 'Cillian Murphy',
    avatar: 'CM',
    bio: 'A magnetic lead who brings precision and unease into every frame.',
    photos: [movies[4].poster, backdrop('photo-1500530855697-b586d89ba3ee')],
    knownFor: ['oppenheimer', 'peaky-blinders'],
    movieography: [
      { id: 'oppenheimer', title: 'Oppenheimer', mediaKind: 'movie', year: 2023, poster: movies[4].poster, rating: 4.4 },
    ],
    tvShows: [
      { id: 'peaky-blinders', title: 'Peaky Blinders', mediaKind: 'series', year: 2013, poster: poster('photo-1509347528160-9a9e33742cdb'), rating: 4.9 },
    ],
    upcomingProjects: ['Small Things Like These'],
  },
  {
    slug: 'faye-wong',
    name: 'Faye Wong',
    avatar: 'FW',
    bio: 'An icon of floating melancholy, rhythm, and urban softness.',
    photos: [movies[3].poster, backdrop('photo-1470225620780-dba8ba36b745')],
    knownFor: ['chungking-express'],
    movieography: [
      { id: 'chungking-express', title: 'Chungking Express', mediaKind: 'movie', year: 1994, poster: movies[3].poster, rating: 4.5 },
    ],
    tvShows: [],
    upcomingProjects: ['Night Train Songs'],
  },
]

export const directors: DirectorProfile[] = [
  {
    slug: 'christopher-nolan',
    name: 'Christopher Nolan',
    avatar: 'CN',
    bio: 'A director of scale, structure, and emotional precision, balancing spectacle with rigorous control.',
    timeline: [
      { year: '1998', title: 'Following', description: 'First feature establishes the puzzle-driven style.' },
      { year: '2010', title: 'Inception', description: 'Turns dream logic into mass-market blockbuster architecture.' },
      { year: '2014', title: 'Interstellar', description: 'Reframes science fiction as human survival and love.' },
      { year: '2023', title: 'Oppenheimer', description: 'Merges historical gravity with formal precision.' },
    ],
    filmography: [
      { id: 'interstellar', title: 'Interstellar', mediaKind: 'movie', year: 2014, poster: movies[0].poster, rating: 4.8 },
      { id: 'oppenheimer', title: 'Oppenheimer', mediaKind: 'movie', year: 2023, poster: movies[4].poster, rating: 4.4 },
    ],
    highestRatedMovies: ['Interstellar', 'The Dark Knight', 'Oppenheimer'],
    awards: ['Academy Award', 'BAFTA', 'Golden Globe'],
    communityReviews: ['Immaculate command of scale and sound.', 'The most architected blockbuster voice of the era.'],
  },
  {
    slug: 'wong-kar-wai',
    name: 'Wong Kar-wai',
    avatar: 'WK',
    bio: 'A filmmaker of longing, motion, color, and urban memory.',
    timeline: [
      { year: '1990', title: 'Days of Being Wild', description: 'Introduces the languid, neon-tinted sensibility.' },
      { year: '1994', title: 'Chungking Express', description: 'Makes solitude feel kinetic and musical.' },
      { year: '2000', title: 'In the Mood for Love', description: 'Refines intimacy into a visual discipline.' },
    ],
    filmography: [
      { id: 'chungking-express', title: 'Chungking Express', mediaKind: 'movie', year: 1994, poster: movies[3].poster, rating: 4.5 },
    ],
    highestRatedMovies: ['In the Mood for Love', 'Chungking Express', '2046'],
    awards: ['Cannes Best Director', 'Hong Kong Film Award'],
    communityReviews: ['The master of romantic drift.', 'Every frame feels like a memory in motion.'],
  },
]

export const similarMoviesMap: Record<string, string[]> = {
  interstellar: ['oppenheimer', 'after-sunrise', 'parasite'],
  parasite: ['nayakan', 'oppenheimer', 'interstellar'],
  nayakan: ['parasite', 'interstellar', 'chungking-express'],
  'chungking-express': ['after-sunrise', 'interstellar', 'parasite'],
  oppenheimer: ['interstellar', 'parasite', 'nayakan'],
  'after-sunrise': ['chungking-express', 'interstellar', 'oppenheimer'],
}

export const similarSeriesMap: Record<string, string[]> = {
  'station-eleven': ['severance', 'dark'],
  severance: ['station-eleven', 'dark'],
  dark: ['severance', 'station-eleven'],
}

export const aiRecommendations: Record<string, AiRecommendation> = {
  interstellar: {
    headline: 'Because you loved Interstellar',
    rationale: ['Director: Christopher Nolan', 'Genres: Sci-Fi, Drama', 'Themes: time, sacrifice, family', 'Mood: awe with emotional weight'],
    items: ['oppenheimer', 'station-eleven', 'after-sunrise'],
  },
  severance: {
    headline: 'Because you highly rated Severance',
    rationale: ['Director craft: controlled tension', 'Genres: Mystery, Sci-Fi', 'Themes: identity, work, memory', 'Mood: clinical suspense'],
    items: ['dark', 'station-eleven', 'interstellar'],
  },
}

export const activities: Activity[] = [
  { id: 'a1', user: 'cinema_ari', avatar: 'AR', action: 'logged movie', mediaId: 'interstellar', mediaKind: 'movie', rating: 5, snippet: 'Docking sequence still owns my whole nervous system.' },
  { id: 'a2', user: 'film_mira', avatar: 'MI', action: 'logged episode', mediaId: 'station-eleven', mediaKind: 'series', rating: 4.5, snippet: 'The progress tracker is painfully satisfying.' },
  { id: 'a3', user: 'noir_rahul', avatar: 'RH', action: 'created list', mediaId: 'parasite', mediaKind: 'movie', snippet: 'Ten films where houses tell on their owners.' },
  { id: 'a4', user: 'cine_lina', avatar: 'LI', action: 'rated season', mediaId: 'severance', mediaKind: 'series', rating: 4.6, snippet: 'That finale discussion room is already chaos in the best way.' },
]

export const communities: Community[] = [
  { id: 'c1', name: 'Interstellar Signal Room', slug: 'interstellar', mediaId: 'interstellar', mediaKind: 'movie', members: 13002, description: 'Craft notes, fan theories, and spoiler-safe gravity debates.', pinned: 'Pinned: explain the ending in one sentence.', poll: 'Best score moment?', threads: ['Murph character arc', 'Ending interpretation', 'Favorite IMAX scene'] },
  { id: 'c2', name: 'Prestige TV Club', slug: 'prestige-tv', mediaId: 'station-eleven', mediaKind: 'series', members: 22140, description: 'Episode-by-episode TV conversation with progress-aware spoilers.', pinned: 'Pinned: what makes a perfect limited series?', poll: 'Best episode this month?', threads: ['Season finales', 'Bottle episodes', 'Best opening credits'] },
  { id: 'c3', name: 'Korean Thrillers', slug: 'korean-thrillers', mediaId: 'parasite', mediaKind: 'movie', members: 18820, description: 'Noir, class rage, and meticulous blocking.', pinned: 'Pinned: spoiler tags stay on for final acts.', poll: 'Most rewatchable thriller?', threads: ['Production design', 'Social satire', 'Hidden gems'] },
  { id: 'c4', name: 'Lumon Breakroom', slug: 'lumon-breakroom', mediaId: 'severance', mediaKind: 'series', members: 16440, description: 'A Discord-like room for Severance theories and episode logs.', pinned: 'Pinned: season two theory map.', poll: 'Which department is hiding the most?', threads: ['Overtime contingency', 'Set design', 'Wellness scenes'] },
]

export const meetups: Meetup[] = [
  { id: 'm1', title: 'Friday Night Watch Party: Parasite', type: 'watch party', mode: 'online', cadence: 'weekly', date: '2026-07-17', registrations: 412, communityOnly: false },
  { id: 'm2', title: 'Chennai Neo-noir Circle', type: 'movie meetup', mode: 'offline', cadence: 'monthly', date: '2026-07-24', registrations: 96, communityOnly: true },
  { id: 'm3', title: 'Prestige TV Season Finale Room', type: 'series meetup', mode: 'online', cadence: 'monthly', date: '2026-08-03', registrations: 218, communityOnly: false },
]

export const notifications: NotificationItem[] = [
  { id: 'n1', type: 'comment', title: 'New comment on your Interstellar review', time: '2m ago' },
  { id: 'n2', type: 'meetup', title: 'Your Parasite watch party starts soon', time: '14m ago' },
  { id: 'n3', type: 'community', title: 'Lumon Breakroom posted a new poll', time: '1h ago' },
  { id: 'n4', type: 'director', title: 'Director note added to After Sunrise', time: '3h ago' },
  { id: 'n5', type: 'follow', title: 'New mutual follower: cine_lina', time: '5h ago' },
]

export const messages: Message[] = [
  { id: 'msg1', from: 'cine_lina', room: 'Prestige TV Club', text: 'Are we logging the finale as one episode or two?', online: true },
  { id: 'msg2', from: 'frame_dev', room: 'Interstellar Signal Room', text: 'I posted the spoiler-safe ending thread.', online: false },
  { id: 'msg3', from: 'noir_rahul', room: 'Korean Thrillers', text: 'Typing...', online: true, typing: true },
]

export const roleThemes: Record<UserRole, string> = {
  reviewer: 'from-violet-500/30 to-fuchsia-500/10',
  director: 'from-[#F5B041]/35 to-orange-500/10',
  community: 'from-violet-500/25 to-slate-500/10',
  general: 'from-white/15 to-violet-500/10',
}

export const diaryBackgrounds = movies.slice(0, 3).map((movie) => movie.backdrop)

export const allMedia = [
  ...movies.map((item) => ({ ...item, mediaKind: 'movie' as const })),
  ...series.map((item) => ({ ...item, mediaKind: 'series' as const })),
]

export function getMedia(id: string) {
  return allMedia.find((item) => item.id === id)
}

export function getActor(slug: string) {
  return actors.find((item) => item.slug === slug)
}

export function getDirector(slug: string) {
  return directors.find((item) => item.slug === slug)
}

export function getSimilarMovies(id: string) {
  return (similarMoviesMap[id] ?? movies.slice(0, 4).map((movie) => movie.id))
    .map((movieId) => movies.find((movie) => movie.id === movieId))
    .filter((movie): movie is Movie => Boolean(movie))
}

export function getRecommendedSeries(id: string) {
  return (similarSeriesMap[id] ?? series.slice(0, 3).map((show) => show.id))
    .map((seriesId) => series.find((show) => show.id === seriesId))
    .filter((show): show is Series => Boolean(show))
}
