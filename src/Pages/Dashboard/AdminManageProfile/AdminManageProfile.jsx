import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const AdminManageProfile = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form, setForm] = useState({});

    const adminEmail = user?.email;

    // 1️⃣ Load Admin Profile
    const { data: profile, isLoading } = useQuery({
        queryKey: ['admin-profile', adminEmail],
        enabled: !!adminEmail,
        queryFn: async () => {
            const res = await axiosSecure.get(`/admin/profile/${adminEmail}`);
            if (!res.data?.email) {
                const newAdmin = {
                    email: adminEmail,
                    name: user?.displayName || 'Admin',
                    photoURL: user?.photoURL || 'https://i.ibb.co/2n4cD4F/user.png',
                    role: 'admin'
                };
                await axiosSecure.post('/admin/profile', newAdmin);
                return newAdmin;
            }
            return res.data;
        },
        onSuccess: (data) => {
            setForm(data);
        }
    });

    // 2️⃣ Load Admin Stats
    const { data: stats = {}, isLoading: statsLoading } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin/stats');
            return res.data;
        }
    });

    // 3️⃣ Update Profile Mutation
    const updateMutation = useMutation({
        mutationFn: async (updatedData) => {
            return await axiosSecure.patch(`/admin/profile/${adminEmail}`, updatedData);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['admin-profile', adminEmail]);
            Swal.fire('Updated!', 'Profile updated successfully', 'success');
            setIsModalOpen(false);
        },
        onError: () => {
            Swal.fire('Error!', 'Update failed', 'error');
        }
    });

    const handleSave = () => {
        updateMutation.mutate({ name: form.name, photoURL: form.photoURL });
    };

    if (isLoading || statsLoading || !profile) return <p className="text-center py-10">Loading...</p>;

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Welcome, {profile.name}! 🎉</h2>

            {/* STATS */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                <div className="bg-green-100 p-4 rounded-xl shadow text-center">
                    💳 <p className="font-bold text-lg">Total Payment</p>
                    <p>${stats.totalPayments}</p>
                </div>
                <div className="bg-blue-100 p-4 rounded-xl shadow text-center">
                    🧭 <p className="font-bold text-lg">Tour Guides</p>
                    <p>{stats.totalTourGuides}</p>
                </div>
                <div className="bg-yellow-100 p-4 rounded-xl shadow text-center">
                    📦 <p className="font-bold text-lg">Packages</p>
                    <p>{stats.totalPackages}</p>
                </div>
                <div className="bg-purple-100 p-4 rounded-xl shadow text-center">
                    👤 <p className="font-bold text-lg">Clients</p>
                    <p>{stats.totalClients}</p>
                </div>
                <div className="bg-pink-100 p-4 rounded-xl shadow text-center">
                    📖 <p className="font-bold text-lg">Stories</p>
                    <p>{stats.totalStories}</p>
                </div>
            </div>

            {/* PROFILE INFO */}
            <div className="bg-white p-6 rounded-xl shadow-md max-w-md mx-auto text-center">
                <img src={profile.photoURL} alt="Admin" className="w-24 h-24 mx-auto rounded-full border mb-4" />
                <p><strong>Name:</strong> {profile.name}</p>
                <p><strong>Email:</strong> {profile.email}</p>
                <p><strong>Role:</strong> {profile.role}</p>
                <button className="btn btn-info mt-4" onClick={() => setIsModalOpen(true)}>Edit Profile</button>
            </div>

            {/* MODAL */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">
                    <div className="bg-white p-6 rounded-xl w-full max-w-md space-y-4">
                        <h3 className="text-xl font-bold">Edit Profile</h3>
                        <input
                            type="text"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="input input-bordered w-full"
                            placeholder="Name"
                        />
                        <input
                            type="text"
                            value={form.photoURL}
                            onChange={(e) => setForm({ ...form, photoURL: e.target.value })}
                            className="input input-bordered w-full"
                            placeholder="Photo URL"
                        />
                        <div className="flex justify-end gap-2">
                            <button className="btn" onClick={() => setIsModalOpen(false)}>Cancel</button>
                            <button className="btn btn-primary" onClick={handleSave}>Save</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminManageProfile;
