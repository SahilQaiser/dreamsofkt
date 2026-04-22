import Navbar from '@/components/Navbar'
import VideoHero from '@/components/VideoHero'
import VideoGrid from '@/components/VideoGrid'
import FeaturedReel from '@/components/FeaturedReel'
import About from '@/components/About'
import FlavorSwitcher from '@/components/FlavorSwitcher'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import { VARIANT_CONFIG } from '@/lib/variantConfig'
import type { SiteContent } from '@/types/content'

const cfg = VARIANT_CONFIG.memories

export default function MemoriesLayout({ content }: { content: SiteContent }) {
  return (
    <>
      <Navbar wordmark={cfg.wordmark} />
      <VideoHero hero={content.hero} title={cfg.heroTitle} label={cfg.heroLabel} />
      <VideoGrid videos={content.videos} />
      <FeaturedReel reel={content.featuredReel} />
      <About />
      <FlavorSwitcher />
      <Contact />
      <Footer wordmark={cfg.wordmark} />
    </>
  )
}
