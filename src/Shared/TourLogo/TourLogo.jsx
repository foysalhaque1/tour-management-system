import React from 'react';
import logo from '../../assets/tourLogo.png'
import { Link } from 'react-router';

const TourLogo = () => {
    return (
        <Link to={'/'} className=' '>
            <img className='w-[80px] ' src={logo} alt="" />
            
            
        </Link>
    );
};

export default TourLogo;