import React, { useState } from 'react';

import TourLogo from '../TourLogo/TourLogo';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';
import { FaUserCircle } from 'react-icons/fa';
import { Link, NavLink } from 'react-router';

const Navbar = () => {
    const { user, logOut } = useAuth();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleSignOut = () => {
        logOut()
            .then(() => {
                Swal.fire({
                    title: 'You Signed Out Successfully',
                    icon: 'success',
                    draggable: true,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const navItems = (
        <>
            <NavLink className={'mr-4 font-bold text-xl'} to={'/'}>
                Home
            </NavLink>
            <NavLink className={'mr-4 font-bold text-xl'} to={'/communityPage'}>
                Community
            </NavLink>
            <NavLink className={'mr-4 font-bold text-xl'} to={'/aboutUs'}>
                About Us
            </NavLink>
            <NavLink className={'mr-4 font-bold text-xl'} to={'/trips'}>
                Trips
            </NavLink>
        </>
    );

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow">
                        {navItems}
                    </ul>
                </div>
                <div className="btn btn-ghost text-xl mb-4 mt-4">
                    <TourLogo />
                    <p className="text-xl md:text-2xl  lg:text-4xl font-bold">Explore Tours</p>
                </div>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">{navItems}</ul>
            </div>

            <div className="navbar-end relative">
                {user ? (
                    <div className="relative">
                        <button
                            className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary"
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                        >
                            {user.photoURL ? (
                                <img src={user.photoURL} alt="User" className="w-full h-full object-cover" />
                            ) : (
                                <FaUserCircle className="w-full h-full text-3xl text-primary" />
                            )}
                        </button>

                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-56 bg-white border rounded-lg shadow-md z-50 py-2 text-sm">
                                <div className="px-4 font-semibold text-gray-800">{user.displayName || 'User Name'}</div>
                                <div className="px-4 pb-2 text-xs text-gray-500 border-b">{user.email}</div>

                                <Link to="/dashboard" className="block px-4 py-2 hover:bg-gray-100">
                                    Dashboard
                                </Link>

                              

                                <button
                                    onClick={handleSignOut}
                                    className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <p className="btn btn-primary">
                        <Link to="/login">Log In</Link>/<Link to="/register">Register</Link>
                    </p>
                )}
            </div>
        </div>
    );
};

export default Navbar;
