import Navbar from '@/components/Navbar'
import TextHero from '@/components/TextHero'
import FeaturedReel from '@/components/FeaturedReel'
import VideoGrid from '@/components/VideoGrid'
import About from '@/components/About'
import Services from '@/components/Services'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import type { SiteContent } from '@/types/content'

export default function ThoughtsLayout({ content }: { content: SiteContent }) {
  return (
    <>
      <Navbar />
      <TextHero />
      <FeaturedReel reel={content.featuredReel} />
      <VideoGrid videos={content.videos} />
      <About />
      <Services />
      <Contact />
      <Footer />
    </>
  )
}
