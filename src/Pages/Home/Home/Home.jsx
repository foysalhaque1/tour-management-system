import React from 'react';
import Banner from '../Banner/Banner';
import OurPackages from '../../OurPackages/OurPackages';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            {/* Our packages */}
            <div>
                <OurPackages></OurPackages>
            </div>
        </div>
    );
};

export default Home;