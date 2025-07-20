import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import banner1 from '../../../assets/Blue and Yellow Modern Travel Agent Banner Landscape.png';
import banner2 from '../../../assets/White, Blue and Brown Modern Travel Agency Banner.png';
import banner3 from '../../../assets/Yellow Green Modern Destination Medium Banner.png';

const Banner = () => {
    return (
       <Carousel autoPlay={true} infiniteLoop={true} showThumbs={false}>
                <div>
                    <img src={banner1} />
                    <p className="legend">Legend 1</p>
                </div>
                <div>
                    <img src={banner2} />
                    <p className="legend">Legend 2</p>
                </div>
                <div>
                    <img src={banner3} />
                    <p className="legend">Legend 3</p>
                </div>
            </Carousel>
    );
};

export default Banner;