import Navbar from '@/components/Navbar'
import VideoHero from '@/components/VideoHero'
import ReelStrip from '@/components/ReelStrip'
import FeaturedReel from '@/components/FeaturedReel'
import VideoGrid from '@/components/VideoGrid'
import Stats from '@/components/Stats'
import About from '@/components/About'
import Services from '@/components/Services'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import type { SiteContent } from '@/types/content'

export default function DreamsLayout({ content }: { content: SiteContent }) {
  return (
    <>
      <Navbar />
      <VideoHero hero={content.hero} />
      <ReelStrip videos={content.videos} />
      <FeaturedReel reel={content.featuredReel} />
      <VideoGrid videos={content.videos} />
      <Stats />
      <About />
      <Services />
      <Contact />
      <Footer />
    </>
  )
}
