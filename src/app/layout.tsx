import type { Metadata } from 'next'
import './globals.css'
import { getVariant } from '@/lib/variant'

export const metadata: Metadata = {
  title: 'Dreams of KT — Aerial Cinematography & Drone Videography',
  description:
    'The world from above. KT captures landscapes, cityscapes, and stories through the lens of a drone.',
  openGraph: {
    title: 'Dreams of KT — Aerial Cinematography',
    description: 'The world from above.',
    type: 'website',
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const variant = await getVariant()
  return (
    <html lang="en" data-variant={variant}>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* dreams + legacy */}
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap"
          rel="stylesheet"
        />
        {/* thoughts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400;1,500&display=swap"
          rel="stylesheet"
        />
        {/* memories */}
        <link
          href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;1,400;1,500&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=switzer@400,500,600&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
