import Navbar from '@/components/Navbar'
import TextHero from '@/components/TextHero'
import FeaturedReel from '@/components/FeaturedReel'
import VideoGrid from '@/components/VideoGrid'
import About from '@/components/About'
import Services from '@/components/Services'
import FlavorSwitcher from '@/components/FlavorSwitcher'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import { VARIANT_CONFIG } from '@/lib/variantConfig'
import type { SiteContent } from '@/types/content'

const cfg = VARIANT_CONFIG.thoughts

export default function ThoughtsLayout({ content }: { content: SiteContent }) {
  return (
    <>
      <Navbar wordmark={cfg.wordmark} />
      <TextHero title={cfg.heroTitle} label={cfg.heroLabel} />
      <FeaturedReel reel={content.featuredReel} />
      <VideoGrid videos={content.videos} />
      <About />
      <Services />
      <FlavorSwitcher />
      <Contact />
      <Footer wordmark={cfg.wordmark} />
    </>
  )
}
