import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const UserJoinAsTourGuide = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth(); // get name, email, photo

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const mutation = useMutation({
        mutationFn: async (formData) => {
            const res = await axiosSecure.post('/tourGuideApplication', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            return res.data;
        },
        onSuccess: () => {
            Swal.fire({
                icon: 'success',
                title: 'Application Submitted!',
                text: 'Your request to join as a tour guide has been received.',
                showConfirmButton: false,
                timer: 2000
            });
            reset();
        },
        onError: () => {
            Swal.fire({
                icon: 'error',
                title: 'Submission Failed',
                text: 'Please try again later.'
            });
        }
    });

    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append('name', user?.displayName);
        formData.append('email', user?.email);
        formData.append('photo', user?.photoURL); // ✅ Add user photo
        formData.append('title', data.title);
        formData.append('reason', data.reason);
        formData.append('cv', data.cv[0]); // CV file upload

        mutation.mutate(formData);
    };

    return (
        <div className="min-h-screen bg-gradient-to-tr from-cyan-50 via-white to-indigo-100 flex justify-center items-center p-4">
            <div className="bg-white shadow-2xl rounded-xl p-8 max-w-xl w-full space-y-6">
                <h1 className="text-3xl font-bold text-center text-primary">Apply to Become a Tour Guide</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    
                    {/* Name (read-only) */}
                    <div>
                        <label className="label font-semibold">Your Name</label>
                        <input
                            type="text"
                            readOnly
                            value={user?.displayName || ''}
                            className="input input-bordered w-full bg-gray-100"
                        />
                    </div>

                    {/* Email (read-only) */}
                    <div>
                        <label className="label font-semibold">Your Email</label>
                        <input
                            type="email"
                            readOnly
                            value={user?.email || ''}
                            className="input input-bordered w-full bg-gray-100"
                        />
                    </div>

                    {/* Application Title */}
                    <div>
                        <label className="label font-semibold">Application Title</label>
                        <input
                            type="text"
                            {...register('title', { required: 'Title is required' })}
                            defaultValue="Join as Tour Guide"
                            className="input input-bordered w-full"
                        />
                        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                    </div>

                    {/* Reason */}
                    <div>
                        <label className="label font-semibold">Why do you want to become a tour guide?</label>
                        <textarea
                            {...register('reason', { required: 'Reason is required' })}
                            className="textarea textarea-bordered w-full h-28"
                            placeholder="Write your reason here..."
                        ></textarea>
                        {errors.reason && <p className="text-red-500 text-sm mt-1">{errors.reason.message}</p>}
                    </div>

                    {/* CV Upload */}
                    <div>
                        <label className="label font-semibold">Upload CV (PDF)</label>
                        <input
                            type="file"
                            accept=".pdf"
                            {...register('cv', { required: 'CV is required' })}
                            className="file-input file-input-bordered w-full"
                        />
                        {errors.cv && <p className="text-red-500 text-sm mt-1">{errors.cv.message}</p>}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="btn btn-primary w-full mt-4 text-lg hover:scale-105 transition-transform"
                        disabled={mutation.isPending}
                    >
                        {mutation.isPending ? 'Submitting...' : 'Submit Application'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UserJoinAsTourGuide;
