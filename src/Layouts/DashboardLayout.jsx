import React from 'react';
import { NavLink, Outlet } from 'react-router';

import TourLogo from '../Shared/TourLogo/TourLogo';
import useAuth from '../Hooks/useAuth';

const DashboardLayout = () => {
    const {user} = useAuth();
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">

                {/* Navbar */}
                <div className="navbar bg-base-300 w-full lg:hidden">
                    <div className="flex-none ">
                        <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block h-6 w-6 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                ></path>
                            </svg>
                        </label>
                    </div>
                    <div className="mx-2 flex-1 px-2 lg:hidden">Dashboard</div>

                </div>
                {/* Page content here */}
                <Outlet></Outlet>
                {/* Page content here */}

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                    {/* Sidebar content here */}
                    <TourLogo></TourLogo>
                    <div className='Tourist'>

                        <li><a className='text-2xl font-bold'>User</a></li>
                        <li><NavLink to="/dashboard/userManageProfile">User Manage Profile</NavLink></li>
                        <li><NavLink to={`/dashboard/myBookings/${user.email}`} >User My Booking Page</NavLink></li>
                        <li><NavLink to="/dashboard/userAddStories">User Add Stories</NavLink></li>
                        <li><NavLink to={`/dashboard/userManageStories/${user.email}`}>User Manage Stories</NavLink></li>
                        <li><NavLink to="/dashboard/joinAsTourGuide">Join As Tour Guide</NavLink></li>
                    </div>
                    <div className='Admin'>

                        <li><a className='text-2xl font-bold'>Admin</a></li>
                        <li><NavLink to="/dashboard/adminManageProfile">Admin  Manage Profile</NavLink></li>
                        <li><NavLink to="/dashboard/adminManageCandidates">Admin Manage Candidates</NavLink></li>
                        <li><NavLink to="/dashboard/addPackage">Add Packages</NavLink></li>
                        <li><NavLink to="/dashboard/manageUsers">Manage Users</NavLink></li>
                    </div>
                    <div className='Tour Guide'>

                        <li><a className='text-2xl font-bold'>Tour Guide</a></li>
                        <li><NavLink to="/dashboard/tourGuideManageProfile">Tour Guide Manage Profile</NavLink></li>

                        <li><NavLink to="/dashboard/tourGuideAddStories">Tour Guide Add Stories</NavLink></li>
                        <li><NavLink to="/dashboard/manageTourGuideStories">Manage Tour Guide  Stories</NavLink></li>
                        <li><NavLink to={`/dashboard/assignedTours/${user.email}`}>Tour Guide Assigned Tours</NavLink></li>
                    </div>
                </ul>
            </div>
        </div>
    );
};

export default DashboardLayout;