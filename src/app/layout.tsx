import type { Metadata } from 'next'
import './globals.css'

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body>{children}</body>
    </html>
  )
}
