import type { Variant } from './variant'

export interface VariantConfig {
  wordmark: string     // italic part before "KT"
  title: string        // <title> tag
  description: string  // meta description
  heroLabel: string    // eyebrow on text hero (thoughts)
}

export const VARIANT_CONFIG: Record<Variant, VariantConfig> = {
  dreams: {
    wordmark:    'Dreams of',
    title:       'Dreams of KT — Aerial Cinematography & Drone Videography',
    description: 'The world from above. KT captures landscapes, cityscapes, and stories through the lens of a drone.',
    heroLabel:   'Aerial Cinematography',
  },
  thoughts: {
    wordmark:    'Thoughts of',
    title:       'Thoughts of KT — Aerial Essays & Stories',
    description: 'Observations from above. KT writes the world in frames — editorial drone cinematography across 7 continents.',
    heroLabel:   'Aerial Essays',
  },
  memories: {
    wordmark:    'Memories of',
    title:       'Memories of KT — Drone Cinematography Gallery',
    description: 'Moments preserved from altitude. A visual archive of landscapes, light, and motion captured by KT.',
    heroLabel:   'Aerial Gallery',
  },
  legacy: {
    wordmark:    'Legacy of',
    title:       'Legacy of KT — A Cinematographic Archive',
    description: 'A chronological record of KT\'s aerial work — every location, every light, every frame.',
    heroLabel:   'Aerial Archive',
  },
}
