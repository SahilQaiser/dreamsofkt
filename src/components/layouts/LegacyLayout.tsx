import Navbar from '@/components/Navbar'
import VideoHero from '@/components/VideoHero'
import FeaturedReel from '@/components/FeaturedReel'
import VideoGrid from '@/components/VideoGrid'
import About from '@/components/About'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import type { SiteContent } from '@/types/content'

export default function LegacyLayout({ content }: { content: SiteContent }) {
  return (
    <>
      <Navbar />
      <VideoHero hero={content.hero} />
      <FeaturedReel reel={content.featuredReel} />
      <VideoGrid videos={content.videos} />
      <About />
      <Contact />
      <Footer />
    </>
  )
}
