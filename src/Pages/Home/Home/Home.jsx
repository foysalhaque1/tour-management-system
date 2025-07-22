import React from 'react';
import Banner from '../Banner/Banner';
import OurPackages from '../../OurPackages/OurPackages';
import MeetOurTourGuides from '../../MeetOurTourGuides/MeetOurTourGuides';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            {/* Our packages */}
            <div>
                <OurPackages></OurPackages>
                <MeetOurTourGuides></MeetOurTourGuides>
            </div>
        </div>
    );
};

export default Home;