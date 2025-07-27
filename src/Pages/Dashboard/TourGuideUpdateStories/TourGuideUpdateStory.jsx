import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useParams } from "react-router";

const TourGuideUpdateStories = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, reset } = useForm();
    const [newImageUrl, setNewImageUrl] = useState("");

    const { data: story = {}, isLoading, refetch } = useQuery({
        queryKey: ["singleStory", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/tourGuide/story/${id}`);
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

    const handleRemoveImage = async (imageUrl) => {
        try {
            const res = await axiosSecure.patch(
                `/tourGuide/story/remove-image/${id}`,
                { imageUrl }
            );
            if (res.data.success) {
                Swal.fire("Removed!", "Image removed.", "success");
                refetch();
            }
        } catch (err) {
            console.error(err);
            Swal.fire("Error!", "Failed to remove image.", "error");
        }
    };

    const handleAddImage = async () => {
        if (!newImageUrl.trim()) return;

        try {
            const res = await axiosSecure.patch(`/tourGuide/story/add-image/${id}`, {
                imageUrl: newImageUrl,
            });
            if (res.data.success) {
                Swal.fire("Added!", "New image added.", "success");
                setNewImageUrl("");
                refetch();
            }
        } catch (err) {
            console.error(err);
            Swal.fire("Error!", "Failed to add image.", "error");
        }
    };

    const onSubmit = async (data) => {
        try {
            const res = await axiosSecure.patch(`/tourGuide/story/update/${id}`, {
                title: data.title,
                storyText: data.storyText,
            });
            if (res.data.success) {
                Swal.fire("Updated!", "Story updated successfully.", "success");
                refetch();
            }
        } catch (err) {
            console.error(err);
            Swal.fire("Error!", "Update failed.", "error");
        }
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Update Your Story</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <input
                    {...register("title")}
                    placeholder="Title"
                    className="input input-bordered w-full"
                />
                <textarea
                    {...register("storyText")}
                    placeholder="Story text"
                    className="textarea textarea-bordered w-full"
                    rows="5"
                />

                {/* Current Images */}
                <div className="space-y-2">
                    <p className="font-semibold">Current Images:</p>
                    {story.images?.map((img, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                            <img
                                src={img}
                                className="w-24 h-24 object-cover rounded"
                                alt="story"
                            />
                            <button
                                type="button"
                                className="btn btn-sm btn-error"
                                onClick={() => handleRemoveImage(img)}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>

                {/* Add New Image URL */}
                <div className="flex gap-2 mt-4">
                    <input
                        type="text"
                        value={newImageUrl}
                        onChange={(e) => setNewImageUrl(e.target.value)}
                        placeholder="Paste image URL"
                        className="input input-bordered flex-1"
                    />
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={handleAddImage}
                    >
                        Add Image
                    </button>
                </div>

                <button type="submit" className="btn btn-primary w-full mt-4">
                    Update Story
                </button>
            </form>
        </div>
    );
};

export default TourGuideUpdateStories;
