const fallbackAtmosphere =
  'linear-gradient(90deg,rgba(8,17,32,.96),rgba(17,24,39,.72),rgba(124,58,237,.2))'

const movieAtmospheres: Record<string, string> = {
  interstellar: 'linear-gradient(90deg,rgba(8,17,32,.97),rgba(49,46,129,.68),rgba(124,58,237,.22))',
  oppenheimer: 'linear-gradient(90deg,rgba(8,17,32,.97),rgba(69,26,3,.74),rgba(245,176,65,.2))',
  parasite: 'linear-gradient(90deg,rgba(8,17,32,.97),rgba(30,41,59,.72),rgba(71,85,105,.22))',
  'chungking-express': 'linear-gradient(90deg,rgba(8,17,32,.97),rgba(88,28,135,.62),rgba(236,72,153,.18))',
  nayakan: 'linear-gradient(90deg,rgba(8,17,32,.97),rgba(67,20,7,.68),rgba(249,115,22,.18))',
}

const seriesAtmospheres: Record<string, string> = {
  dark: 'linear-gradient(90deg,rgba(8,17,32,.97),rgba(15,23,42,.76),rgba(59,130,246,.18))',
  severance: 'linear-gradient(90deg,rgba(8,17,32,.97),rgba(30,41,59,.74),rgba(124,58,237,.18))',
  'station-eleven': 'linear-gradient(90deg,rgba(8,17,32,.97),rgba(20,83,45,.62),rgba(245,176,65,.16))',
}

const genreAtmospheres: Record<string, string> = {
  Action: 'linear-gradient(90deg,rgba(8,17,32,.97),rgba(127,29,29,.72),rgba(220,38,38,.2))',
  'Sci-Fi': 'linear-gradient(90deg,rgba(8,17,32,.97),rgba(30,41,59,.72),rgba(59,130,246,.22))',
  Romance: 'linear-gradient(90deg,rgba(8,17,32,.97),rgba(157,23,77,.68),rgba(236,72,153,.18))',
  Comedy: 'linear-gradient(90deg,rgba(8,17,32,.97),rgba(146,64,14,.66),rgba(251,191,36,.18))',
  Crime: 'linear-gradient(90deg,rgba(8,17,32,.97),rgba(51,65,85,.7),rgba(71,85,105,.2))',
  Fantasy: 'linear-gradient(90deg,rgba(8,17,32,.97),rgba(13,148,136,.62),rgba(20,184,166,.18))',
  Drama: 'linear-gradient(90deg,rgba(8,17,32,.97),rgba(194,65,12,.66),rgba(249,115,22,.18))',
  Horror: 'linear-gradient(90deg,rgba(8,17,32,.97),rgba(67,56,202,.68),rgba(109,40,217,.18))',
}

export function getMediaAtmosphere(id: string, genres: string[], kind: 'movie' | 'series') {
  if (kind === 'movie' && movieAtmospheres[id]) {
    return movieAtmospheres[id]
  }

  if (kind === 'series' && seriesAtmospheres[id]) {
    return seriesAtmospheres[id]
  }

  for (const genre of genres) {
    if (genreAtmospheres[genre]) {
      return genreAtmospheres[genre]
    }
  }

  return fallbackAtmosphere
}
