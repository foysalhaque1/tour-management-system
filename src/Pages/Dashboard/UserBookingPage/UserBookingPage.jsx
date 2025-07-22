import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useNavigate } from 'react-router';


const UserBookingPage = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { data: bookings = [], isLoading } = useQuery({
        queryKey: ['userBookings', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/bookingsData/user/${user.email}`);
            console.log(res.data)
            return res.data;
        }
    });

    const cancelBooking = useMutation({
        mutationFn: async (id) => {
            await axiosSecure.delete(`/bookingsData/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['userBookings', user?.email]);
        }
    });

    if (isLoading) return <p>Loading...</p>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">My Bookings</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Package</th>
                            <th>Tour Guide</th>
                            <th>Date</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking) => (
                            
                            <tr key={booking._id}>
                                <td>{booking.packageName}</td>
                                <td>{booking.tourGuideName || 'N/A'}</td>
                                <td>{new Date(booking.tourDate).toLocaleDateString()}</td>
                                <td>${booking.price}</td>
                                <td>{booking.status}</td>
                                <td className="space-x-2">
                                    {booking.status === 'pending' && (
                                        <>
                                            <button
                                                className="btn btn-success btn-sm"
                                                onClick={() => navigate(`/payment/${booking._id}`)}
                                            >
                                                Pay
                                            </button>
                                            <button
                                                className="btn btn-error btn-sm"
                                                onClick={() => cancelBooking.mutate(booking._id)}
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserBookingPage;
