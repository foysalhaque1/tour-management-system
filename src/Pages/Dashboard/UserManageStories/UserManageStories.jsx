import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { Link } from 'react-router';
import useAuth from '../../../Hooks/useAuth';

const UserManageStories = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth()

    const { data: stories = [], refetch } = useQuery({
        ueryKey: ['userStories', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/stories?email=${user.email}`);
            return res.data;
        },
        enabled: !!user?.email
    });

    const handleDelete = async (story, email) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this story!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            try {
                const res = await axiosSecure.delete(`/users/stories/${story._id}?email=${email}`);
                if (res.data.success) {
                    Swal.fire('Deleted!', 'Your story has been deleted.', 'success');
                    refetch();
                } else {
                    Swal.fire('Failed!', res.data.message || 'Story not found.', 'error');
                }
            } catch (err) {
                console.error(err);
                Swal.fire('Error!', 'Failed to delete story.', 'error');
            }
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold text-center mb-6 text-primary">User Manage Your Stories</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stories?.map((story, idx) => (
                    <div key={idx} className="card bg-base-100 shadow-xl">
                        {story.images && (
                            <figure>
                                <img
                                    src={story.images[0]}
                                    alt="Story Thumbnail"
                                    className="h-52 w-full object-cover"
                                />
                            </figure>
                        )}
                        <div className="card-body">
                            <h2 className="card-title">{story.title}</h2>
                            <p className="text-sm text-gray-600">{story.storyText.slice(0, 100)}...</p>
                            
                            <div className="card-actions justify-end mt-4">
                                <Link
                                    to={`/dashboard/userUpdateStory/${story._id}`}
                                    className="btn btn-info btn-sm text-white"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => {
                                        if (story._id) {
                                            handleDelete(story, story.email);
                                        } else {
                                            console.error("❌ Story does not have a valid _id:", story);
                                            Swal.fire('Error!', 'Invalid story ID.', 'error');
                                        }
                                    }}

                                    className="btn btn-error btn-sm text-white"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserManageStories;