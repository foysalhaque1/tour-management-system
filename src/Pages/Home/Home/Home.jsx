import React from 'react';
import Banner from '../Banner/Banner';
import OurPackages from '../../OurPackages/OurPackages';
import MeetOurTourGuides from '../../MeetOurTourGuides/MeetOurTourGuides';
import TouristStorySection from '../../TouristStorySection/TouristStorySection';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            {/* Our packages */}
            <div>
                <OurPackages></OurPackages>
                <MeetOurTourGuides></MeetOurTourGuides>
                <TouristStorySection></TouristStorySection>
            </div>
        </div>
    );
};

export default Home;