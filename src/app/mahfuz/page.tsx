import React from 'react';
import ContactFloatingMenu from '../components/ContactFloatingMenu/ContactFloatingMenu';
import ExploreProducts from '../components/ExploreProducts/ExploreProducts';
import RequestQuoteForm from '../components/RequestQuoteForm/RequestQuoteForm';

const MahfuzPractices = () => {
    return (
        <main className='space-y-8'>
            <ContactFloatingMenu/>
            <ExploreProducts/>
            <RequestQuoteForm/>
        </main>
    );
};

export default MahfuzPractices;