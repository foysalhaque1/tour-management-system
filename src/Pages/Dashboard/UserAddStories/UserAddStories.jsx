import React, { useState } from 'react';

import Swal from 'sweetalert2';


import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const UserAddStories = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState([]);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const handleImageChange = (e) => {
        setImages([...e.target.files]);
    };

    const onSubmit = async (data) => {
        if (!images.length) {
            Swal.fire('Missing Images', 'Please upload at least one image.', 'warning');
            return;
        }

        const formData = new FormData();
        formData.append('email', user.email);
        formData.append('title', data.title);
        formData.append('storyText', data.storyText);
        images.forEach((img) => formData.append('images', img));

        try {
            setLoading(true);
            const res = await axiosSecure.post('/user/addStories', formData);
            const responseData = res.data;

            if (responseData.success) {
                Swal.fire('Success!', 'Story added successfully.', 'success');
                reset();
                setImages([]);
                navigate(`/dashboard/userManageStories/${user.email}`);
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
                        <label className="block text-gray-700 font-medium mb-1">Upload Images</label>
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageChange}
                            className="file-input file-input-bordered w-full"
                        />
                        {images.length === 0 && <p className="text-red-500 text-sm mt-1">Please select at least one image.</p>}
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

export default UserAddStories;