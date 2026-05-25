import React from 'react';
import ContactFloatingMenu from '../components/ContactFloatingMenu/ContactFloatingMenu';
import ExploreProducts from '../components/ExploreProducts/ExploreProducts';
import RequestQuoteForm from '../components/RequestQuoteForm/RequestQuoteForm';
import CategorySection from '../components/CategorySection/CategorySection';

const MahfuzPractices = () => {
    return (
        <main className=''>
            <ContactFloatingMenu/>
            <ExploreProducts/>
            <RequestQuoteForm/>
            <CategorySection/>
        </main>
    );
};

export default MahfuzPractices;