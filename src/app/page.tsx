import CategorySection from './components/CategorySection/CategorySection'
import CostEstimatorSection from './components/CostEstimatorSection/CostEstimatorSection'
import OurProcessSection from './components/OurProcessSection/OurProcessSection'
import CtaSection from './components/CtaSection/CtaSection'
import BangladeshMapSection from './components/BangladeshMapSection/BangladeshMapSection'
import ServicesSection from './components/ServicesSection/ServicesSection'
import ProjectStoriesSection from './components/ProjectStoriesSection/ProjectStoriesSection'
import HeroBanner1 from './components/HeroBanner/HeroBanner1'
import RecentProjectsSection from './components/ProjectStoriesSection/ProjectStoriesSection'
import CTASection1 from './components/CtaSection/CTASection1'

export default function Home() {
  return (
    <main className="">
      <HeroBanner1 />
      <ProjectStoriesSection />
      <CTASection1/>
{/* <RecentProjectsSection/> */}
      <ServicesSection />
      <CostEstimatorSection />
      <CategorySection />
      <OurProcessSection />
      <BangladeshMapSection />
      <CtaSection />
    </main>
  );
}
