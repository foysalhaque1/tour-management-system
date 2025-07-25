import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';

const TourGuideManageProfile = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const qc = useQueryClient();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { register, handleSubmit, reset } = useForm();

    const { data: guide = {}, isLoading } = useQuery({
        queryKey: ['tourGuide', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get('/tourGuides');
            console.log(res.data)
            return res.data.find(g => g.email === user?.email) || {};
        },
        enabled: !!user?.email
    });
    console.log(guide)

    const updateMutation = useMutation({
        mutationFn: async (updated) => {
            const res = await axiosSecure.patch(`/tourGuides/${guide._id}`, updated);
            return res.data;
        },
        onSuccess: () => {
            qc.invalidateQueries(['tourGuide', user?.email]);
            Swal.fire('Success', 'Profile updated successfully', 'success');
            setIsModalOpen(false);
        },
        onError: (err) => {
            Swal.fire('Error', 'Failed to update profile', 'error');
            console.error(err);
        }
    });

    const handleEdit = () => {
        reset({
            name: guide?.name || '',
            image: guide?.photo || '',
        });
        setIsModalOpen(true);
    };

    const onSubmit = (data) => {
        updateMutation.mutate({ name: data.name, photo: data.image });
    };

    const role = guide?.role || 'tourist';

    if (isLoading) {
        return <p className="text-center mt-10 text-lg font-medium">Loading...</p>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4">
            <div className="w-full max-w-3xl bg-white shadow-2xl rounded-2xl p-10">
                <div className="text-center mb-8 space-y-2">
                    <h1 className="text-4xl font-bold text-primary">
                        Welcome, {guide?.name || 'Tour Guide'}!
                    </h1>
                    <p className="text-gray-600 text-lg">Manage your profile below</p>
                </div>

                <div className="card bg-base-100 shadow-lg p-6 rounded-xl">
                    <div className="flex flex-col lg:flex-row items-center gap-6">
                        <img
                            src={guide?.photo || 'https://i.ibb.co/2n4cD4F/user.png'}
                            alt="Tour Guide"
                            className="w-32 h-32 rounded-full border-4 border-primary object-cover transition-transform hover:scale-105"
                        />
                        <div className="text-center lg:text-left space-y-1">
                            <h2 className="text-2xl font-semibold">{guide?.name || 'N/A'}</h2>
                            <p className="text-gray-500">{guide?.email}</p>
                            <span className="badge badge-info text-sm px-3 py-1 capitalize">{role}</span>
                        </div>
                    </div>

                    <div className="flex justify-center mt-6">
                        <button
                            className="btn btn-outline btn-primary w-full sm:w-auto"
                            onClick={handleEdit}
                        >
                            Edit Profile
                        </button>
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
                                <div>
                                    <label className="label text-gray-500">Email</label>
                                    <input
                                        type="text"
                                        value={guide?.email}
                                        readOnly
                                        className="input input-bordered w-full bg-gray-100 text-gray-600"
                                    />
                                </div>
                                <div>
                                    <label className="label text-gray-500">Role</label>
                                    <input
                                        type="text"
                                        value={role}
                                        readOnly
                                        className="input input-bordered w-full bg-gray-100 text-gray-600 capitalize"
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

export default TourGuideManageProfile;
