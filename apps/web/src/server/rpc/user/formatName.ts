const SPANISH_PARTICLES = ['de las', 'de los', 'del', 'y']
const FRENCH_PARTICLES = ['de', 'des', 'du', "d'"]
const GERMAN_PARTICLES = [
  'auf der',
  'aus der',
  'von der',
  'von und zu',
  'am',
  'an',
  'auf',
  'im',
  'von',
  'zu',
  'zum',
  'zur',
]
const DUTCH_PARTICLES = [
  'van den',
  'van der',
  'op de',
  'op den',
  'den',
  "t'",
  'ten',
  'ter',
  'te',
  'van',
  'vanden',
  'vander',
]
const SCANDINAVIAN_PARTICLES = ['af', 'av']
const PORTUGUESE_PARTICLES = ['a', 'da', 'das', 'do', 'dos']
const ENGLISH_PARTICLES = ['of']

const NAME_PARTICLES = [
  ...SPANISH_PARTICLES,
  ...FRENCH_PARTICLES,
  ...GERMAN_PARTICLES,
  ...DUTCH_PARTICLES,
  ...SCANDINAVIAN_PARTICLES,
  ...PORTUGUESE_PARTICLES,
  ...ENGLISH_PARTICLES,
]

const NAME_WORD = String.raw`^|[’'\s-]`

const toParticleRegexp = (particle: string) =>
  `^${particle}\\s|\\s${particle}\\s`.replaceAll(String.raw`'\s`, "['’]")

const FIRST_LETTERS = new RegExp(
  `(?:${[...NAME_PARTICLES.map(toParticleRegexp), NAME_WORD].join('|')})(.)`,
  'giu',
)

const nextLetter = (name: string) => name.slice(-1)

const separatorAndParticle = (name: string) => name.slice(0, -1)

const toUpperCase = (separatorWithNextLetter: string) =>
  `${separatorAndParticle(separatorWithNextLetter)}${nextLetter(separatorWithNextLetter).toUpperCase()}`

export const formatName = (name: string) =>
  name.trim().toLowerCase().replaceAll(FIRST_LETTERS, toUpperCase)
