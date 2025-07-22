import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import { useNavigate, useParams } from 'react-router';

import "react-datepicker/dist/react-datepicker.css";
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const PackageDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedGuide, setSelectedGuide] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { register, handleSubmit, reset } = useForm();

    const { data: pkg, isLoading, isError } = useQuery({
        queryKey: ['packageDetails', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/packages/${id}`);
            console.log(res.data)
            return res.data;
        }
    });

    const { data: guides, isLoading: guidesLoading } = useQuery({
        queryKey: ['tourGuides'],
        queryFn: async () => {
            const res = await axiosSecure.get('/tourGuides');
            console.log(res.data)
            return res.data;
        }
    });
    const handleGuideSelect = (id) => {
        const guide = guides.find(g => g._id === id);
        setSelectedGuide(guide);
    };
    console.log(selectedGuide)


    if (isLoading || guidesLoading) return <p className="text-center">Loading...</p>;
    if (isError || !pkg) return <p className="text-center text-red-500">Failed to load package</p>;

    const onSubmit = async (data) => {
        if (!selectedDate || !data.guideId) {
            alert("Please select a tour date and a guide.");
            return;
        }

        const bookingData = {
            userName: user?.displayName || 'Unknown',
            userEmail: user?.email,
            userImage: user?.photoURL || '',
            packageId: id,
            packageName: pkg.tourType,
            price: pkg.price,
            tourDate: selectedDate,
            guideId: data.guideId,
            tourGuideName: selectedGuide?.name,
            status: 'pending'
        };

        try {
            const res = await axiosSecure.post('/bookings', bookingData);
            if (res.data.insertedId) {
                setIsModalOpen(true);
                reset();
                setSelectedDate(null);
            }
        } catch (err) {
            console.error('Booking failed:', err);
            alert('Booking failed. Please try again.');
        }
    };

    return (
        <div className="p-6">
            {/* Gallery */}
            <div className="mb-6">
                <h2 className="text-2xl font-bold mb-4">Gallery</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {pkg.photos?.map((photo, index) => (
                        <img
                            key={index}
                            src={`http://localhost:5000/uploads/${photo}`}
                            alt={`photo-${index}`}
                            className="w-full h-64 object-cover rounded"
                            onError={(e) => e.target.src = "/default-tour.jpg"}
                        />
                    ))}
                </div>
            </div>

            {/* Tour Info */}
            <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Tour Information</h3>
                <p>{pkg.tourInfo}</p>
            </div>

            {/* Tour Plan */}
            <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Tour Plan</h3>
                <ul>
                    {pkg.tourPlan?.map((day, index) => (
                        <li key={index}>
                            <strong>Day {day.day}:</strong> {day.description}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Tour Guides */}
            <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Tour Guides</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {guides?.map((guide) => (
                        <div
                            key={guide._id}
                            className="card w-full bg-base-100 shadow-xl cursor-pointer"
                            onClick={() => navigate(`/tourGuide/${guide._id}`)}
                        >

                            <div className="card-body">
                                <h2 className="card-title">{guide.name}</h2>
                                <p>{guide.email}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Booking Form */}
            <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Booking Form</h3>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    <div>
                        <label className="block font-semibold">Package Name</label>
                        <input
                            type="text"
                            value={pkg.tourType}
                            readOnly
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div>
                        <label className="block font-semibold">Name</label>
                        <input
                            type="text"
                            value={user?.displayName || ''}
                            readOnly
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div>
                        <label className="block font-semibold">Email</label>
                        <input
                            type="email"
                            value={user?.email || ''}
                            readOnly
                            className="input input-bordered w-full"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold">Image Link</label>
                        <input
                            type="text"
                            value={user?.photoURL || ''}
                            readOnly
                            className="input input-bordered w-full"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold">Price</label>
                        <input
                            type="text"
                            value={`$${pkg.price}`}
                            readOnly
                            className="input input-bordered w-full"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold">Tour Date</label>
                        <DatePicker
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                            dateFormat="yyyy/MM/dd"
                            className="input input-bordered w-full"
                            placeholderText="Select a date"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold">Select Tour Guide</label>
                        <select
                            {...register('guideId', { required: true })}
                            className="select select-bordered w-full"
                            onChange={(e) => {
                                handleGuideSelect(e.target.value);
                            }}
                        >
                            <option value="">Select a guide</option>
                            {guides?.map((guide) => (
                                <option key={guide._id} value={guide._id}>
                                    {guide.name}
                                </option>
                            ))}
                        </select>

                    </div>

                    <button
                        type="button"
                        className="btn btn-primary w-full"
                        onClick={() => {
                            if (!user) {
                                navigate('/login');
                            } else {
                                handleSubmit(onSubmit)(); // Manually trigger form submit
                            }
                        }}
                    >
                        Book Now
                    </button>

                </form>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h2 className="text-2xl font-bold">Confirm Your Booking</h2>
                        <p>Your booking has been submitted with status: <strong>pending</strong>.</p>

                        <div className="modal-action flex justify-between items-center">
                            <button className="btn" onClick={() => setIsModalOpen(false)}>
                                Close
                            </button>
                            <button
                                className="btn btn-primary"
                                onClick={() => {
                                    setIsModalOpen(false);
                                    navigate(`/dashboard/myBookings/${user?.email}`);
                                }}
                            >
                                Go to My Bookings
                            </button>
                        </div>
                    </div>
                </div>
            )}


        </div>
    );
};

export default PackageDetailsPage;
