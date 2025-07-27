import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useParams } from 'react-router';

const TourGuideProfile = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();

    const { data: guide, isLoading, isError } = useQuery({
        queryKey: ['tourGuideProfile', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/tourGuide/profileById/${id}`);
            return res.data;
        }
    });

    if (isLoading) return <p>Loading...</p>;
    if (isError || !guide) return <p>Profile loading problem</p>;

    return (
        <div className="max-w-3xl mx-auto mt-8 p-4 bg-white shadow-lg rounded-xl">
            <div className="text-center">
                <img
                    src={guide.photo}
                    alt={guide.name}
                    className="w-40 h-40 rounded-full mx-auto object-cover shadow"
                    onError={(e) => (e.target.src = "/default-profile.png")}
                />
                <h2 className="text-3xl font-bold mt-4">{guide.name}</h2>
                <p className="text-gray-500">{guide.email}</p>
                <p className="mt-1 font-medium bg-blue-100 inline-block px-4 py-1 rounded-full text-blue-700">
                    role: {guide.role}
                </p>
            </div>

            {/* Stories */}
            {guide.stories && guide.stories.length > 0 && (
                <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-4">Stories</h3>
                    <div className="grid gap-4">
                        {guide.stories.map(story => (
                            <div key={story._id} className="border p-4 rounded shadow">
                                <h4 className="text-lg font-semibold">{story.title}</h4>
                                <p className="text-gray-700">{story.storyText}</p>
                                <div className="flex gap-2 mt-2 flex-wrap">
                                    {story.images?.map((img, index) => (
                                        <img
                                            key={index}
                                            src={img}   
                                            alt="Story"
                                            className="w-28 h-20 object-cover rounded border"
                                            onError={(e) => (e.target.src = "/default-image.png")}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TourGuideProfile;
