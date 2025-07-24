import React from 'react';

import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';


import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { Navigate } from 'react-router';

const TourGuideAdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [isTourGuide, setIsTourGuide] = useState(false);
    const [checking, setChecking] = useState(true);
    const axiosSecure = useAxiosSecure()

    useEffect(() => {
    const checkTourGuide = async () => {
        if (!user?.email) {
            setChecking(false);
            return;
        }

        // ✅ First check if admin
        if (user.email === 'shahin@gmail.com') {
            setIsTourGuide(true);
            setChecking(false);
            return;
        }

        try {
            const res = await axiosSecure.get(`/tour-guides?email=${user.email}`);
            if (res.data?.role === 'tour guide') {
                setIsTourGuide(true);
            } else {
                Swal.fire('Access Denied', 'Only Tour Guides can access this page.', 'error');
            }
        } catch (err) {
            console.error(err);
            Swal.fire('Error', 'Could not verify tour guide access.', 'error');
        } finally {
            setChecking(false);
        }
    };

    checkTourGuide();
}, [user]);


    if (loading || checking) return <p className="text-center py-10">Checking access...</p>;

    if (!isTourGuide) return <Navigate to="/" replace />;

    return children;
};

export default TourGuideAdminRoute;
