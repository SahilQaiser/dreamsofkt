import Navbar from '@/components/Navbar'
import VideoHero from '@/components/VideoHero'
import FeaturedReel from '@/components/FeaturedReel'
import VideoGrid from '@/components/VideoGrid'
import About from '@/components/About'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import { VARIANT_CONFIG } from '@/lib/variantConfig'
import type { SiteContent } from '@/types/content'

const cfg = VARIANT_CONFIG.legacy

export default function LegacyLayout({ content }: { content: SiteContent }) {
  return (
    <>
      <Navbar wordmark={cfg.wordmark} />
      <VideoHero hero={content.hero} />
      <FeaturedReel reel={content.featuredReel} />
      <VideoGrid videos={content.videos} />
      <About />
      <Contact />
      <Footer wordmark={cfg.wordmark} />
    </>
  )
}
