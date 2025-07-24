import React, { useState } from 'react';
import Select from 'react-select';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const roleOptions = [
    { value: '', label: 'All Roles' },
    { value: 'tourist', label: 'tourist' },
    { value: 'tour guide', label: 'tour guide' },
    { value: 'admin', label: 'admin' }
];

const AdminManageUsers = () => {
    const [search, setSearch] = useState('');
    const [roleFilter, setRoleFilter] = useState('');
    const [page, setPage] = useState(0);
    const [limit] = useState(10);
    const axiosSecure = useAxiosSecure();

    const { data: usersData = {}, refetch } = useQuery({
        queryKey: ['users', search, roleFilter, page],
        queryFn: async () => {
            const res = await axiosSecure.get('/users', {
                params: {
                    search,
                    role: roleFilter,
                    page,
                    limit
                }
            });
            return res.data;
        }
    });

    const { users = [], total = 0 } = usersData;
    const pageCount = Math.ceil(total / limit);

    const handlePrev = () => {
        if (page > 0) setPage(prev => prev - 1);
    };

    const handleNext = () => {
        if (page < pageCount - 1) setPage(prev => prev + 1);
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Manage Users</h2>

            {/* Search & Filter */}
            <div className="flex flex-col md:flex-row gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Search by name/email"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="input input-bordered w-full md:w-1/2"
                />
                <Select
                    options={roleOptions}
                    defaultValue={roleOptions[0]}
                    onChange={(selected) => setRoleFilter(selected.value)}
                    className="w-full md:w-1/3"
                />
            </div>

            {/* Users Table */}
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, idx) => (
                            <tr key={user._id}>
                                <td>{page * limit + idx + 1}</td>
                                <td>{user.name || user.displayName || 'N/A'}</td>
                                <td>{user.email}</td>
                                <td>{user.role || 'tourist'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {users.length === 0 && (
                    <p className="text-center text-gray-500 mt-4">No users found</p>
                )}
            </div>

            {/* Pagination Buttons */}
            {pageCount > 1 && (
                <div className="mt-6 flex justify-center items-center gap-4">
                    <button
                        onClick={handlePrev}
                        disabled={page === 0}
                        className="btn btn-outline btn-sm"
                    >
                        Previous
                    </button>
                    <span>Page {page + 1} of {pageCount}</span>
                    <button
                        onClick={handleNext}
                        disabled={page >= pageCount - 1}
                        className="btn btn-outline btn-sm"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default AdminManageUsers;
