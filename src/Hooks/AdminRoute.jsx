

import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';
import useAuth from './useAuth';
import { Navigate } from 'react-router';

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (!loading && user && user.email !== 'shahin@gmail.com') {
      setShowAlert(true);
      Swal.fire({
        icon: 'error',
        title: 'Access Denied',
        text: 'Only admin can access this page!',
        confirmButtonColor: '#3085d6',
      });
    }
  }, [loading, user]);

  if (loading) return <p>Loading...</p>;

  if (user?.email !== 'shahin@gmail.com') {
    if (showAlert) {
      // Delay redirect so alert can show
      return <Navigate to="/" />;
    }
  }

  return children;
};

export default AdminRoute;
