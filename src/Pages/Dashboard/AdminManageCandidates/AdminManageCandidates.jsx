import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const AdminManageCandidates = () => {
    const axiosSecure = useAxiosSecure();
    const qc = useQueryClient();

    const { data: users = [], isLoading } = useQuery({
        queryKey: ['applications'],
        queryFn: async () => {
            const res = await axiosSecure.get('/tourGuideApplication');
            return res.data;
        }
    });

    const acceptMutation = useMutation({
        mutationFn: id => axiosSecure.patch(`/tourGuideApplication/${id}`),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['applications'] });
            Swal.fire('Accepted', 'User is now a Tour Guide', 'success');
        }
    });

    const rejectMutation = useMutation({
        mutationFn: id => axiosSecure.delete(`/tourGuideApplication/${id}`),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['applications'] });
            Swal.fire('Rejected', 'Application removed', 'info');
        }
    });

    const handleAccept = (id) => {
        acceptMutation.mutate(id);
    };

    const handleReject = (id) => {
        rejectMutation.mutate(id);
    };

    if (isLoading) return <p className="text-center">Loading...</p>;

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Manage Tour Guide Applications</h2>
            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="w-full table-auto">
                    <thead className="bg-gray-100">
                        <tr>
                            {['Photo', 'Name', 'Email', 'Title', 'Status', 'Actions'].map(h => (
                                <th key={h} className="py-3 px-4 text-left">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(u => (
                            <tr key={u._id} className="border-b">
                                <td className="py-2 px-4">
                                    <img
                                        src={u.photo || 'https://via.placeholder.com/48'}
                                        alt="user"
                                        className="w-12 h-12 object-cover rounded-full border"
                                    />
                                </td>
                                <td className="py-2 px-4">{u.name}</td>
                                <td className="py-2 px-4">{u.email}</td>
                                <td className="py-2 px-4">{u.title}</td>
                                <td className="py-2 px-4">
                                    <span className={`px-2 py-1 rounded ${u.status === 'accepted' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>
                                        {u.status}
                                    </span>
                                </td>
                                <td className="py-2 px-4 flex gap-2">
                                    <button
                                        disabled={u.status === 'accepted'}
                                        onClick={() => handleAccept(u._id)}
                                        className="btn btn-sm btn-outline text-green-600 hover:bg-green-50"
                                    >
                                        <FaCheckCircle /> Accept
                                    </button>
                                    <button
                                        onClick={() => handleReject(u._id)}
                                        className="btn btn-sm btn-outline text-red-600 hover:bg-red-50"
                                    >
                                        <FaTimesCircle /> Reject
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {users.length === 0 && (
                            <tr><td colSpan="6" className="text-center py-4">No applications found.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminManageCandidates;
