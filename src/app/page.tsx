import HeroBanner from '@/app/components/HeroBanner/HeroBanner'
import ExploreProducts from './components/ExploreProducts/ExploreProducts'

export default function Home() {
  return (
    <main className="flex flex-col flex-1">
      <HeroBanner />
      <ExploreProducts/>
    </main>
  )
}
