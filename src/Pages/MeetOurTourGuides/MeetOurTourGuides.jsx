import React from 'react';
import { useQuery } from '@tanstack/react-query';

import { useNavigate } from 'react-router';
import useAxiosSecure from '../../Hooks/useAxiosSecure';


const MeetOurTourGuides = () => {
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const { data: guides = [], isLoading, isError } = useQuery({
        queryKey: ['randomTourGuides'],
        queryFn: async () => {
            const res = await axiosSecure.get('/tourGuides/random');
            return res.data;
        }
    });

    if (isLoading) return <p className="text-center">Loading...</p>;
    if (isError) return <p className="text-center text-red-500">Failed to load tour guides.</p>;

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold text-center mb-6">Meet Our Tour Guides</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {guides.map((guide) => (
                    <div key={guide._id} className="card bg-base-100 shadow-xl">
                        <figure>
                            <img
                                src={guide.photo || '/default-guide.jpg'}
                                alt={guide.name}
                                className="w-full h-64 object-cover"
                            />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{guide.name}</h2>
                            <p><strong>Email:</strong> {guide.email}</p>
                            <p><strong>Role:</strong> {guide.role}</p>
                            <div className="card-actions justify-end">
                                <button
                                    className="btn btn-primary"
                                    onClick={() => navigate(`/tourGuide/${guide._id}`)}
                                >
                                    Details
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MeetOurTourGuides;
