import React from 'react';
import ContactFloatingMenu from '../components/ContactFloatingMenu/ContactFloatingMenu';
import ExploreProducts from '../components/ExploreProducts/ExploreProducts';
import RequestQuoteForm from '../components/RequestQuoteForm/RequestQuoteForm';
import CategorySection from '../components/CategorySection/CategorySection';
import CostEstimatorSection from '../components/CostEstimatorSection/CostEstimatorSection';
import GlobalStatsSection from '../components/GlobalStatsSection/GlobalStatsSection';

const MahfuzPractices = () => {
    return (
        <main className=''>
            <GlobalStatsSection/>
            <ContactFloatingMenu/>
            <ExploreProducts/>
            <RequestQuoteForm/>
            <CategorySection/>
            <CostEstimatorSection/>
        </main>
    );
};

export default MahfuzPractices;