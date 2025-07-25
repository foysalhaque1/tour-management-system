import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import useAuth from '../../../Hooks/useAuth';

const TourGuideAssignedTours = () => {
    const { user } = useAuth();
    const [assignedTours, setAssignedTours] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchTours = async () => {
            try {
                const url =
                    user.email === 'shahin@gmail.com'
                        ? 'http://localhost:5000/assignedTours'
                        : `http://localhost:5000/assignedTours/${user.email}`;

                const res = await fetch(url);
                const data = await res.json();
                setAssignedTours(data);
            } catch (err) {
                console.error(err);
                Swal.fire('Error', 'Could not load assigned tours', 'error');
            } finally {
                setLoading(false);
            }
        };

        if (user?.email) {
            fetchTours();
        }
    }, [user]);

    const handleAccept = async (id) => {
        try {
            const res = await fetch(`http://localhost:5000/assignedTours/accept/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
            });

            if (res.ok) {
                Swal.fire('Success', 'Tour accepted successfully!', 'success');
                setAssignedTours(prev => prev.map(t => t._id === id ? { ...t, status: 'Accepted' } : t));
            } else {
                Swal.fire('Error', 'Failed to accept tour.', 'error');
            }
        } catch (error) {
            console.error(error);
            Swal.fire('Error', 'Something went wrong.', 'error');
        }
    };

    const handleReject = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You want to reject this tour?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, reject it!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await fetch(`http://localhost:5000/assignedTours/reject/${id}`, {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                    });

                    if (res.ok) {
                        Swal.fire('Rejected', 'Tour rejected successfully!', 'info');
                        setAssignedTours(prev => prev.map(t => t._id === id ? { ...t, status: 'Rejected' } : t));
                    } else {
                        Swal.fire('Error', 'Failed to reject tour.', 'error');
                    }
                } catch (error) {
                    console.error(error);
                    Swal.fire('Error', 'Something went wrong.', 'error');
                }
            }
        });
    };

    // Pagination calculations
    const totalPages = Math.ceil(assignedTours.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentTours = assignedTours.slice(startIndex, startIndex + itemsPerPage);

    if (loading) return <p className="text-center py-10">Loading tours...</p>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">My Assigned Tours</h2>
            {assignedTours.length === 0 ? (
                <p>No assigned tours found.</p>
            ) : (
                <>
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>Package</th>
                                    <th>Tourist Name</th>
                                    <th>Tour Date</th>
                                    <th>Price</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentTours.map(tour => (
                                    <tr key={tour._id}>
                                        <td>{tour.packageName}</td>
                                        <td>{tour.userName}</td>
                                        <td>{new Date(tour.tourDate).toLocaleDateString()}</td>
                                        <td>${tour.price}</td>
                                        <td>{tour.status}</td>
                                        <td>
                                            <button
                                                className="btn btn-success btn-sm mr-2"
                                                disabled={tour.status !== 'in-review'}
                                                onClick={() => handleAccept(tour._id)}
                                            >
                                                Accept
                                            </button>
                                            <button
                                                className="btn btn-error btn-sm"
                                                disabled={tour.status !== 'in-review'}
                                                onClick={() => handleReject(tour._id)}
                                            >
                                                Reject
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex justify-center mt-6 space-x-2">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            className="btn btn-sm"
                            disabled={currentPage === 1}
                        >
                            Prev
                        </button>
                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentPage(index + 1)}
                                className={`btn btn-sm ${currentPage === index + 1 ? 'btn-active' : ''}`}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            className="btn btn-sm"
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default TourGuideAssignedTours;
