import Navbar from '@/components/Navbar'
import VideoHero from '@/components/VideoHero'
import ReelStrip from '@/components/ReelStrip'
import FeaturedReel from '@/components/FeaturedReel'
import VideoGrid from '@/components/VideoGrid'
import About from '@/components/About'
import Stats from '@/components/Stats'
import Services from '@/components/Services'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import { getContent } from '@/lib/kv'
import { DEFAULT_CONTENT } from '@/types/content'

export default async function Home() {
  let content = DEFAULT_CONTENT
  try {
    content = await getContent()
  } catch {
    // Fallback to default when running outside Cloudflare Workers (e.g. next dev)
  }

  return (
    <>
      <Navbar />
      <VideoHero hero={content.hero} />
      <ReelStrip />
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
