import React from 'react';
import Banner from '../Banner/Banner';
import OurPackages from '../../OurPackages/OurPackages';
import MeetOurTourGuides from '../../MeetOurTourGuides/MeetOurTourGuides';
import TouristStorySection from '../../TouristStorySection/TouristStorySection';
import HeroSection1 from '../../OtherSection1/OtherSection1';
import WhyTravelWithUs from '../../OtherSection2/OtherSection2';
import TabSection from '../../TabSection/TabSection';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            {/* Our packages */}
            <div>
                <TabSection></TabSection>
               
                <TouristStorySection></TouristStorySection>
                <HeroSection1></HeroSection1>
                <WhyTravelWithUs></WhyTravelWithUs>
            </div>
        </div>
    );
};

export default Home;