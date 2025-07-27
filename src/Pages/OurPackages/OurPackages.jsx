import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const OurPackages = () => {
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const { data: packages = [], isLoading, isError } = useQuery({
        queryKey: ['tourPackages'],
        queryFn: async () => {
            const res = await axiosSecure.get('/packages');
            return res.data;
        }
    });

    if (isLoading) return <p className="text-center">Loading...</p>;
    if (isError) return <p className="text-center text-red-500">Failed to load packages</p>;

    const shuffled = [...packages].sort(() => 0.5 - Math.random());
    const randomPackages = shuffled.slice(0, 3);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {randomPackages.map((pkg, index) => (
                <div key={index} className="card w-full bg-base-100 shadow-xl">
                    {/* Display first image from links */}
                    {pkg.photos?.length > 0 && (
                        <figure>
                            <img
                                src={pkg.photos[0]}   // ✅ Use direct link
                                alt={pkg.tourType}
                                className="h-48 w-full object-cover"
                                onError={(e) => (e.target.src = "/default-image.png")}
                            />
                        </figure>
                    )}

                    <div className="card-body">
                        <h2 className="card-title capitalize">{pkg.tourType}</h2>
                        <p className="text-lg font-semibold text-primary">${pkg.price}</p>
                        <div className="card-actions justify-end">
                            <button
                                className="btn btn-outline btn-primary"
                                onClick={() => navigate(`/packages/${pkg._id}`)}
                            >
                                View Details
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default OurPackages;
