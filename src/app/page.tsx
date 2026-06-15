import HeroBanner from '@/app/components/HeroBanner/HeroBanner'
import ExploreProducts from './components/ExploreProducts/ExploreProducts'
import RequestQuoteForm from './components/RequestQuoteForm/RequestQuoteForm'
import ContactFloatingMenu from './components/ContactFloatingMenu/ContactFloatingMenu'
import CategorySection from './components/CategorySection/CategorySection'
import ShowcaseSection from './components/ShowcaseSection/ShowcaseSection'
import GlobalStatsSection from './components/GlobalStatsSection/GlobalStatsSection'

export default function Home() {
  return (
    <main className="flex flex-col flex-1">
      <HeroBanner />
      <GlobalStatsSection/>
      <ExploreProducts/>
      <BusinessCategorySection/>
      <ProblemSolveSection/>
      <CoreServicesSection/>
      <SecondaryServicesSection/>
      <WhyChooseSection/>
      <CategorySection/>
      <ShowcaseSection/>
      <RequestQuoteForm/>
      <ContactFloatingMenu/>
    </main>
  )
}
