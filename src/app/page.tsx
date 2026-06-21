import CategorySection from './components/CategorySection/CategorySection'
import CostEstimatorSection from './components/CostEstimatorSection/CostEstimatorSection'
import OurProcessSection from './components/OurProcessSection/OurProcessSection'
import CtaSection from './components/CtaSection/CtaSection'
import BangladeshMapSection from './components/BangladeshMapSection/BangladeshMapSection'
import ServicesSection from './components/ServicesSection/ServicesSection'
import ProjectStoriesSection from './components/ProjectStoriesSection/ProjectStoriesSection'
import HeroBanner1 from './components/HeroBanner/HeroBanner1'

export default function Home() {
  return (
    <main className="">
      <div>
        <HeroBanner1 />
      </div>
      <div>
        <ServicesSection />
      </div>
      <div>
        <ProjectStoriesSection />
      </div>
      <div>
        <CostEstimatorSection />
      </div>
      <div>
        {" "}
        <CategorySection />
      </div>
      <div>
        <OurProcessSection />
      </div>
      <div>
        <BangladeshMapSection />
      </div>
      <div>
        <CtaSection />
      </div>
    </main>
  );
}
