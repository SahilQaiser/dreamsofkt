import Navbar from '@/components/Navbar'
import VideoHero from '@/components/VideoHero'
import VideoGrid from '@/components/VideoGrid'
import FeaturedReel from '@/components/FeaturedReel'
import About from '@/components/About'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import { VARIANT_CONFIG } from '@/lib/variantConfig'
import type { SiteContent } from '@/types/content'

const cfg = VARIANT_CONFIG.memories

export default function MemoriesLayout({ content }: { content: SiteContent }) {
  return (
    <>
      <Navbar wordmark={cfg.wordmark} />
      <VideoHero hero={content.hero} />
      <VideoGrid videos={content.videos} />
      <FeaturedReel reel={content.featuredReel} />
      <About />
      <Contact />
      <Footer wordmark={cfg.wordmark} />
    </>
  )
}
