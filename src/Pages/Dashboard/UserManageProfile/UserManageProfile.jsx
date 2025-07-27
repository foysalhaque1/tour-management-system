import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';


import Swal from 'sweetalert2';
import useAuth from '../../../Hooks/useAuth';
import { Link } from 'react-router';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const UserManageProfile = () => {
    const { user,update } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { register, handleSubmit, reset } = useForm();

    const handleEdit = () => {
        reset({ name: user.displayName || '', image: user.photoURL || '' });
        setIsModalOpen(true);
    };

    const axiosSecure = useAxiosSecure()

   const onSubmit = async (data) => {
  try {
    const res = await axiosSecure.put(`/users/profile/${user.email}`, {
      displayName: data.name,
      photoURL: data.image,
      role: 'user',
    });

    if (res.data.success) {
      // ✅ Update Firebase Auth profile too
      await update( {
        displayName: data.name,
        photoURL: data.image,
      });

      Swal.fire({
        icon: 'success',
        title: 'Profile Updated Successfully!',
        showConfirmButton: false,
        timer: 1500,
      });

      setIsModalOpen(false);

      // ✅ Refresh the page or trigger a re-fetch of user info
      window.location.reload(); // optional, or re-fetch user in context

    } else {
      throw new Error(res.data.message || 'Update failed');
    }
  } catch (err) {
    console.error(err);
    Swal.fire({
      icon: 'error',
      title: 'Update failed!',
      text: err.message,
    });
  }
};


    useEffect(() => {
        const saveUser = async () => {
            if (user?.email) {
                const userInfo = {
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                    email: user.email,
                    role: 'tourist', // or 'user'
                };

                try {
                    const res = await axiosSecure.put(`/users/profile/${user.email}`, userInfo); // use PUT for upsert
                    console.log('User saved/updated:', res.data);
                } catch (error) {
                    console.error('Failed to save user profile:', error);
                }
            }
        };

        saveUser();
    }, [user, axiosSecure]);


    const role = 'User / Tourist';

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4">
            <div className="w-full max-w-3xl bg-white shadow-2xl rounded-2xl p-10">
                <div className="text-center mb-8 space-y-2">
                    <h1 className="text-4xl font-bold text-primary">
                        Welcome, {user?.displayName || 'User'}!
                    </h1>
                    <p className="text-gray-600 text-lg">Manage your profile below</p>
                </div>

                <div className="card bg-base-100 shadow-lg p-6 rounded-xl">
                    <div className="flex flex-col lg:flex-row items-center gap-6">
                        <img
                            src={user?.photoURL || 'https://i.ibb.co/2n4cD4F/user.png'}
                            alt="User"
                            className="w-32 h-32 rounded-full border-4 border-primary object-cover transition-transform hover:scale-105"
                        />
                        <div className="text-center lg:text-left space-y-1">
                            <h2 className="text-2xl font-semibold">{user?.displayName || 'N/A'}</h2>
                            <p className="text-gray-500">{user?.email}</p>
                            <span className="badge badge-info text-sm px-3 py-1">{role}</span>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
                        <button
                            className="btn btn-outline btn-primary w-full sm:w-auto"
                            onClick={handleEdit}
                        >
                            Edit Profile
                        </button>
                        <Link to="/dashboard/joinAsTourGuide" className="w-full sm:w-auto">
                            <button className="btn btn-accent w-full">Apply as Tour Guide</button>
                        </Link>
                    </div>
                </div>

                {/* Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-4">
                        <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg relative animate-fade-in">
                            <button
                                className="absolute top-2 right-3 text-lg font-bold text-gray-500"
                                onClick={() => setIsModalOpen(false)}
                            >
                                ✕
                            </button>
                            <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                <div>
                                    <label className="label">Name</label>
                                    <input
                                        type="text"
                                        {...register('name', { required: true })}
                                        className="input input-bordered w-full"
                                        placeholder="Your name"
                                    />
                                </div>
                                <div>
                                    <label className="label">Photo URL</label>
                                    <input
                                        type="text"
                                        {...register('image', { required: true })}
                                        className="input input-bordered w-full"
                                        placeholder="Photo URL"
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary w-full">
                                    Save Changes
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserManageProfile;
