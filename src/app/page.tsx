import HeroBanner from '@/app/components/HeroBanner/HeroBanner'
import ExploreProducts from './components/ExploreProducts/ExploreProducts'
import RequestQuoteForm from './components/RequestQuoteForm/RequestQuoteForm'
import ContactFloatingMenu from './components/ContactFloatingMenu/ContactFloatingMenu'
import CategorySection from './components/CategorySection/CategorySection'
import ShowcaseSection from './components/ShowcaseSection/ShowcaseSection'
import GlobalStatsSection from './components/GlobalStatsSection/GlobalStatsSection'
import BusinessCategorySection from './components/BusinessCategorySection/BusinessCategorySection'
import ProblemSolveSection from './components/ProblemSolveSection/ProblemSolveSection'
import CoreServicesSection from './components/CoreServicesSection/CoreServicesSection'
import SecondaryServicesSection from './components/SecondaryServicesSection/SecondaryServicesSection'
import WhyChooseSection from './components/WhyChooseSection/WhyChooseSection'
import CostEstimatorSection from './components/CostEstimatorSection/CostEstimatorSection'
import OurProcessSection from './components/OurProcessSection/OurProcessSection'
import CtaSection from './components/CtaSection/CtaSection'
import BangladeshMapSection from './components/BangladeshMapSection/BangladeshMapSection'

export default function Home() {
  return (
    <main className="flex flex-col flex-1">
      <HeroBanner />
      <GlobalStatsSection />
      <CategorySection />
      <CostEstimatorSection/>
      <ExploreProducts />
      <BusinessCategorySection />
      <ProblemSolveSection />
      <CoreServicesSection />
      <SecondaryServicesSection />
      <WhyChooseSection />
      <ShowcaseSection />
      <BangladeshMapSection />
      {/* <RequestQuoteForm /> */}
      <OurProcessSection/>
      <ContactFloatingMenu />
      <CtaSection/>
    </main>
  );
}
