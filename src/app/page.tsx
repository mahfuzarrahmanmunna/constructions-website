import HeroBanner from '@/app/components/HeroBanner/HeroBanner'
import CategorySection from './components/CategorySection/CategorySection'
import GlobalStatsSection from './components/GlobalStatsSection/GlobalStatsSection'
import CostEstimatorSection from './components/CostEstimatorSection/CostEstimatorSection'
import OurProcessSection from './components/OurProcessSection/OurProcessSection'
import CtaSection from './components/CtaSection/CtaSection'
import BangladeshMapSection from './components/BangladeshMapSection/BangladeshMapSection'
import ServicesSection from './components/ServicesSection/ServicesSection'
import ProjectStoriesSection from './components/ProjectStoriesSection/ProjectStoriesSection'
import TestimonialsShortsSection from './components/TestimonialsShortsSection/TestimonialsShortsSection'

export default function Home() {
  return (
    <main className="flex flex-col flex-1">
      <HeroBanner />
      <GlobalStatsSection />
      <CategorySection />
      <ServicesSection />
      <CostEstimatorSection />
      <OurProcessSection />
      <BangladeshMapSection />
      <ProjectStoriesSection />
      <TestimonialsShortsSection />
      {/* <ExploreProducts />
      <BusinessCategorySection />
      <ProblemSolveSection />
      <CoreServicesSection />
      <SecondaryServicesSection />
      <WhyChooseSection />
      <ShowcaseSection />
      <ContactFloatingMenu /> */}
      <CtaSection />
    </main>
  );
}
