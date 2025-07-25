import React from 'react';
import Navbar from '../Shared/Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Shared/Footer/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RootLayout = () => {
    return (
        <div >
            <div className='max-w-[1280px] mx-auto'>

            <Navbar></Navbar>
            <Outlet></Outlet>
            </div>
            <Footer></Footer>
            <ToastContainer position="top-right" autoClose={3000} />
            
        </div>
    );
};

export default RootLayout;