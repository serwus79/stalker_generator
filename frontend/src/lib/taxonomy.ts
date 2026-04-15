export interface Artifact {
  id: string
  name: string
  short?: string
}

export interface Taxonomy {
  factions: string[]
  artifacts: Artifact[]
  anomalies: string[]
  mutants: string[]
  locations: string[]
}

export const factions: string[] = [
  'loners',
  'duty',
  'freedom',
  'monolith',
  'clear_sky',
  'bandits',
  'military',
  'ecologists',
  'mercenaries',
]

export const artifacts: Artifact[] = [
  { id: 'soul', name: 'Soul', short: 'Soul artifact' },
  { id: 'crystal', name: 'Crystal', short: 'Multifaceted crystal' },
  { id: 'goldfish', name: 'Goldfish', short: 'Goldfish artifact' },
  { id: 'fireball', name: 'Fireball', short: 'Fireball artifact' },
  { id: 'stone_flower', name: 'Stone Flower', short: 'Stone Flower artifact' },
  { id: 'moonlight', name: 'Moonlight', short: 'Moonlight artifact' },
  { id: 'night_star', name: 'Night Star', short: 'Night Star artifact' },
]

export const anomalies: string[] = [
  'whirligig',
  'electro',
  'burner',
  'springboard',
  'vortex',
  'trampoline',
]

export const mutants: string[] = [
  'pseudodog',
  'bloodsucker',
  'snork',
  'boar',
  'chimera',
  'controller',
  'flesh',
]

export const locations: string[] = [
  'cordon',
  'garbage',
  'agroprom',
  'yantar',
  'red_forest',
  'pripyat',
  'cnpp',
  'x18',
  'dark_valley',
  'jupiter_plant',
]

const taxonomy: Taxonomy = {
  factions,
  artifacts,
  anomalies,
  mutants,
  locations,
}

export default taxonomy
