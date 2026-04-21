export interface VideoItem {
  id: string
  title: string
  location: string
  duration: string
  tags: string[]
  type: 'youtube' | 'r2' | 'gradient'
  src: string
  thumbnail?: string
  wide?: boolean
  order: number
}

export interface HeroSettings {
  type: 'youtube' | 'r2' | 'none'
  src: string
}

export interface ReelSettings {
  type: 'youtube' | 'r2' | 'none'
  src: string
  duration: string
  title: string
  subtitle: string
}

export interface SiteContent {
  hero: HeroSettings
  featuredReel: ReelSettings
  videos: VideoItem[]
}

export const DEFAULT_CONTENT: SiteContent = {
  hero: { type: 'none', src: '' },
  featuredReel: {
    type: 'none',
    src: '',
    duration: '04:17',
    title: 'Dreams of KT',
    subtitle: '40+ Locations · 7 Continents · 2024',
  },
  videos: [
    {
      id: 'v1',
      title: 'Norwegian Fjords',
      location: 'Norway',
      duration: '3:42',
      tags: ['Landscape', '4K'],
      type: 'gradient',
      src: 'linear-gradient(160deg,#0d3348 0%,#0d6e6e 100%)',
      wide: true,
      order: 0,
    },
    {
      id: 'v2',
      title: 'Santorini Sunrise',
      location: 'Greece',
      duration: '2:18',
      tags: ['Architecture'],
      type: 'gradient',
      src: 'linear-gradient(160deg,#7c2d12 0%,#f97316 100%)',
      order: 1,
    },
    {
      id: 'v3',
      title: 'Tokyo at Dusk',
      location: 'Japan',
      duration: '4:05',
      tags: ['Urban', 'Night'],
      type: 'gradient',
      src: 'linear-gradient(160deg,#1e1b4b 0%,#7c3aed 100%)',
      order: 2,
    },
    {
      id: 'v4',
      title: 'Sahara Dunes',
      location: 'Morocco',
      duration: '3:55',
      tags: ['Desert', 'Sunset'],
      type: 'gradient',
      src: 'linear-gradient(160deg,#92400e 0%,#fbbf24 100%)',
      order: 3,
    },
    {
      id: 'v5',
      title: 'Icelandic Highlands',
      location: 'Iceland',
      duration: '5:12',
      tags: ['Nature', '4K'],
      type: 'gradient',
      src: 'linear-gradient(160deg,#1e3a5f 0%,#6366f1 100%)',
      order: 4,
    },
    {
      id: 'v6',
      title: 'Maldives Atolls',
      location: 'Maldives',
      duration: '2:47',
      tags: ['Ocean', 'Luxury'],
      type: 'gradient',
      src: 'linear-gradient(160deg,#0369a1 0%,#38bdf8 100%)',
      order: 5,
    },
    {
      id: 'v7',
      title: 'Amazon Canopy',
      location: 'Brazil',
      duration: '6:30',
      tags: ['Forest', 'Wildlife'],
      type: 'gradient',
      src: 'linear-gradient(160deg,#14532d 0%,#4ade80 100%)',
      order: 6,
    },
  ],
}
