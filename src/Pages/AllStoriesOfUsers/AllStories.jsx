import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { FacebookShareButton } from 'react-share';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';
import { useNavigate } from 'react-router';


const AllStories = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const navigate = useNavigate();

    const { data: stories = [], isLoading } = useQuery({
        queryKey: ['allUserStories'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users/allStories');
            return res.data;
        }
    });

    const handleShareClick = () => {
        if (!user) {
            navigate('/login');
        }
    };

    if (isLoading) return <p>Loading stories...</p>;

    return (
        <section className="py-10 px-4">
            <h2 className="text-3xl font-bold text-center mb-6">All Tourist Stories</h2>
            <div className="grid md:grid-cols-2 gap-6">
                {stories.map((story, index) => (
                    <div key={index} className="bg-white shadow-md rounded-xl p-4 space-y-2">
                        <h3 className="text-xl font-semibold">{story.title}</h3>
                        <p className="text-gray-600">{story.storyText.slice(0, 150)}...</p>
                        <div className="flex gap-2 flex-wrap">
                            {story.imageUrls?.slice(0, 3).map((img, i) => (
                                <img
                                    key={i}
                                    src={img} // ✅ now this is a full URL already
                                    alt="Story"
                                    className="w-24 h-24 object-cover rounded"
                                    onError={(e) => (e.target.src = "/fallback.jpg")} // optional fallback
                                />
                            ))}
                        </div>

                        <p className="text-sm text-gray-500">Posted by: {story.email}</p>

                        {user ? (
                            <FacebookShareButton
                                url={window.location.href}
                                quote={story.title}
                                hashtag="#TravelStory"
                                className="btn btn-outline btn-sm mt-2"
                            >
                                Share on Facebook
                            </FacebookShareButton>
                        ) : (
                            <button
                                onClick={handleShareClick}
                                className="btn btn-outline btn-sm mt-2"
                            >
                                Share on Facebook
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default AllStories;
