import React, { useState } from 'react';
import Swal from 'sweetalert2';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

const TourGuideAddStories = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const onSubmit = async (data) => {
        const imageLinks = data.imageLinks
            .split('\n')
            .map(link => link.trim())
            .filter(link => link); // 

        if (!imageLinks.length) {
            Swal.fire('Missing Images', 'Please enter at least one image link.', 'warning');
            return;
        }

        try {
            setLoading(true);
            const res = await axiosSecure.post('/tourGuide/stories', {
                email: user.email,
                title: data.title,
                storyText: data.storyText,
                imageLinks
            });

            const responseData = res.data;

            if (responseData.success) {
                Swal.fire('Success!', 'Story added successfully.', 'success');
                reset();
                navigate('/dashboard/manageTourGuideStories');
            } else {
                Swal.fire('Error', responseData.message || 'Something went wrong', 'error');
            }
        } catch (error) {
            console.error(error);
            Swal.fire('Error', 'Failed to save story.', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center p-6">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-3xl">
                <h2 className="text-3xl font-bold text-center mb-6 text-primary">Share Your Travel Story</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Title</label>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            placeholder="Story title"
                            {...register('title', { required: 'Title is required' })}
                        />
                        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Your Story</label>
                        <textarea
                            rows="5"
                            className="textarea textarea-bordered w-full"
                            placeholder="Write about your journey..."
                            {...register('storyText', { required: 'Story text is required' })}
                        ></textarea>
                        {errors.storyText && <p className="text-red-500 text-sm mt-1">{errors.storyText.message}</p>}
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Image Links (one per line)</label>
                        <textarea
                            rows="3"
                            className="textarea textarea-bordered w-full"
                            placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
                            {...register('imageLinks', { required: 'At least one image link is required' })}
                        ></textarea>
                        {errors.imageLinks && <p className="text-red-500 text-sm mt-1">{errors.imageLinks.message}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-primary w-full text-white mt-4"
                    >
                        {loading ? 'Saving...' : 'Submit Story'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TourGuideAddStories;
