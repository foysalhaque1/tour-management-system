import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { FacebookShareButton, FacebookIcon } from 'react-share';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const CommunityPage = () => {
    const { user } = useAuth(); // must return user object if logged in
    const axiosSecure = useAxiosSecure();

    const { data: stories = [], isLoading, isError } = useQuery({
        queryKey: ['allStories'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users/storiesAll'); 
            return res.data;
        }
    });

    if (isLoading) return <p className="text-center text-lg">Loading stories...</p>;
    if (isError) return <p className="text-center text-red-500">Failed to load stories.</p>;

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-8">Travel Community Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stories.map((story) => (
                    <div key={story._id} className="card bg-base-100 shadow-xl">
                        {story.images && (
                            <figure>
                                <img
                                    src={`http://localhost:5000/uploads/${story.images}`}
                                    alt={story.title}
                                    className="w-full h-56 object-cover"
                                />
                            </figure>
                        )}
                        <div className="card-body">
                            <h3 className="card-title">{story.title}</h3>
                            <p className="text-gray-600 text-sm mb-2">By: {story.email}</p>
                            <p className="text-sm text-gray-700">{story.storyText}</p>

                            <div className="mt-4">
                                {user?.email ? (
                                    <FacebookShareButton
                                        url={window.location.href}
                                        quote={story.title}
                                        hashtag="#TravelCommunity"
                                    >
                                        <FacebookIcon size={32} round />
                                    </FacebookShareButton>
                                ) : (
                                    <p className="text-red-500 text-sm font-medium">
                                        Login to share this story on Facebook.
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommunityPage;
