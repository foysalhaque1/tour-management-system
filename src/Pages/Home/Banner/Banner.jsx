import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import banner1 from '../../../assets/Blue and Yellow Modern Travel Agent Banner Landscape.png';
import banner2 from '../../../assets/White, Blue and Brown Modern Travel Agency Banner.png';
import banner3 from '../../../assets/Yellow Green Modern Destination Medium Banner.png';

const Banner = () => {
    return (
        <Carousel


            showStatus={false}
            interval={4000}
            dynamicHeight={false}
            className="rounded-xl overflow-hidden" autoPlay={true} infiniteLoop={true} showThumbs={false}>
            <div>
                <img className="w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] object-cover" src={banner1} />

            </div>
            <div>
                <img className="w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] object-cover" src={banner2} />

            </div>
            <div>
                <img className="w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] object-cover" src={banner3} />

            </div>
        </Carousel>


    );
};

export default Banner;