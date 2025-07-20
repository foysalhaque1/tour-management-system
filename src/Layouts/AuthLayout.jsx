import React from 'react';
import { Outlet } from 'react-router';
import logInImage from '../assets/login.png'
import TourLogo from '../Shared/TourLogo/TourLogo';

const AuthLayout = () => {
    return (
        <div className=" bg-base-200 max-w-[1280px] mx-auto p-12">
            <div className='mb-10'>
                <TourLogo></TourLogo>
            </div>
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className='flex-1'>

                    <img
                        src={logInImage}
                        className="max-w-sm rounded-lg shadow-2xl"
                    />
                </div>
                <div className='flex-1'>
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;