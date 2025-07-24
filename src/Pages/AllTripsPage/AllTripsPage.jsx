import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const AllTripsPage = () => {
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

    return (
        <section className="py-10 px-4 md:px-10 bg-gray-100 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl font-bold text-center mb-10 text-gray-800">
                    Explore All Our Tour Packages
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {packages.map((pkg, index) => (
                        <div key={index} className="card w-full bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300">
                            {pkg.photos && pkg.photos[0] && (
                                <figure>
                                    <img
                                        src={`http://localhost:5000/uploads/${pkg.photos[0]}`}
                                        alt="Tour"
                                        className="h-48 w-full object-cover rounded-t-lg"
                                    />
                                </figure>
                            )}
                            <div className="card-body">
                                <h2 className="card-title capitalize text-gray-800">{pkg.tourType}</h2>
                                <p className="text-lg font-semibold text-primary">${pkg.price}</p>
                                <div className="card-actions justify-end mt-4">
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
            </div>
        </section>
    );
};

export default AllTripsPage;
