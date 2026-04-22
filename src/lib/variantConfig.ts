import type { Variant } from './variant'

export interface VariantConfig {
  wordmark: string     // italic part before "KT"
  heroTitle: string    // big display word in VideoHero
  heroLabel: string    // eyebrow line in hero sections
  title: string        // <title> tag
  description: string  // meta description
}

export const VARIANT_CONFIG: Record<Variant, VariantConfig> = {
  dreams: {
    wordmark:    'Dreams of',
    heroTitle:   'Dreams',
    heroLabel:   'Aerial Cinematography & Drone Videography',
    title:       'Dreams of KT — Aerial Cinematography & Drone Videography',
    description: 'The world from above. KT captures landscapes, cityscapes, and stories through the lens of a drone.',
  },
  thoughts: {
    wordmark:    'Thoughts of',
    heroTitle:   'Thoughts',
    heroLabel:   'Aerial Essays & Stories',
    title:       'Thoughts of KT — Aerial Essays & Stories',
    description: 'Observations from above. KT writes the world in frames — editorial drone cinematography across 7 continents.',
  },
  memories: {
    wordmark:    'Memories of',
    heroTitle:   'Memories',
    heroLabel:   'Aerial Cinematography Gallery',
    title:       'Memories of KT — Drone Cinematography Gallery',
    description: 'Moments preserved from altitude. A visual archive of landscapes, light, and motion captured by KT.',
  },
  legacy: {
    wordmark:    'Legacy of',
    heroTitle:   'Legacy',
    heroLabel:   'A Cinematographic Archive',
    title:       'Legacy of KT — A Cinematographic Archive',
    description: 'A chronological record of KT\'s aerial work — every location, every light, every frame.',
  },
}
