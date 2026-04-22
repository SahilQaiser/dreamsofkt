import Navbar from '@/components/Navbar'
import VideoHero from '@/components/VideoHero'
import VideoGrid from '@/components/VideoGrid'
import FeaturedReel from '@/components/FeaturedReel'
import About from '@/components/About'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import type { SiteContent } from '@/types/content'

export default function MemoriesLayout({ content }: { content: SiteContent }) {
  return (
    <>
      <Navbar />
      <VideoHero hero={content.hero} />
      <VideoGrid videos={content.videos} />
      <FeaturedReel reel={content.featuredReel} />
      <About />
      <Contact />
      <Footer />
    </>
  )
}
