import HeroBanner from '@/app/components/HeroBanner/HeroBanner'
import ExploreProducts from './components/ExploreProducts/ExploreProducts'
import RequestQuoteForm from './components/RequestQuoteForm/RequestQuoteForm'
import ContactFloatingMenu from './components/ContactFloatingMenu/ContactFloatingMenu'

export default function Home() {
  return (
    <main className="flex flex-col flex-1">
      <HeroBanner />
      <ExploreProducts/>
      <RequestQuoteForm/>
      <ContactFloatingMenu/>
    </main>
  )
}
