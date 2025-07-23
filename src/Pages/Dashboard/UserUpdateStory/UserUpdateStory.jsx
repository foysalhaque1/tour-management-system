import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useParams } from 'react-router';

const UserUpdateStory  = () => {
    const { id } = useParams();

    const axiosSecure = useAxiosSecure();

    const { register, handleSubmit, reset } = useForm();

    const { data: story = {}, isLoading } = useQuery({
        queryKey: ['singleStory', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/story/${id}`);
            return res.data;
        },
    });

    useEffect(() => {
        if (story) {
            reset({
                title: story.title,
                storyText: story.storyText,
            });
        }
    }, [story, reset]);

    const handleRemoveImage = async (filename) => {
        try {
            const res = await axiosSecure.patch(`/user/story/remove-image/${id}`, { filename });
            if (res.data.success) {
                Swal.fire('Removed!', 'Image removed.', 'success');
            }
        } catch (err) {
            console.log(err)
            Swal.fire('Error!', 'Failed to remove image.', 'error');
        }
    };

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('storyText', data.storyText);
        if (data.newImages?.length) {
            for (let img of data.newImages) {
                formData.append('newImages', img);
            }
        }

        try {
            const res = await axiosSecure.patch(`/user/story/update/${id}`, formData);
            if (res.data.success) {
                Swal.fire('Updated!', 'Story updated successfully.', 'success');

            }
        } catch (err) {
            console.log(err)
            Swal.fire('Error!', 'Update failed.', 'error');
        }
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Update Your Story</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <input {...register('title')} placeholder="Title" className="input input-bordered w-full" />
                <textarea {...register('storyText')} placeholder="Story text" className="textarea textarea-bordered w-full" rows="5" />

                <div className="space-y-2">
                    <p className="font-semibold">Current Images:</p>
                    {story.images?.map((img, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                            <img src={`http://localhost:5000/uploads/${img}`} className="w-24 h-24 object-cover rounded" alt="" />
                            <button type="button" className="btn btn-sm btn-error" onClick={() => handleRemoveImage(img)}>Remove</button>
                        </div>
                    ))}
                </div>

                <input type="file" multiple {...register('newImages')} className="file-input file-input-bordered w-full" />
                <button type="submit" className="btn btn-primary">Update Story</button>
            </form>
        </div>
    );
};

export default UserUpdateStory ;