import HeroBanner from '@/app/components/HeroBanner/HeroBanner'
import ExploreProducts from './components/ExploreProducts/ExploreProducts'
import RequestQuoteForm from './components/RequestQuoteForm/RequestQuoteForm'
import ContactFloatingMenu from './components/ContactFloatingMenu/ContactFloatingMenu'
import CategorySection from './components/CategorySection/CategorySection'
import ShowcaseSection from './components/ShowcaseSection/ShowcaseSection'

export default function Home() {
  return (
    <main className="flex flex-col flex-1">
      <HeroBanner />
      <ExploreProducts/>
      <CategorySection/>
      <ShowcaseSection/>
      <RequestQuoteForm/>
      <ContactFloatingMenu/>
    </main>
  )
}
