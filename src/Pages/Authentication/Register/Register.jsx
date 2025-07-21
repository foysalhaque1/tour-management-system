import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../Hooks/useAuth';
import { Link } from 'react-router'; // unchanged
import Swal from 'sweetalert2'; // ✅ added SweetAlert2
import SocialLogIn from '../SocialLogIn/SocialLogIn';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, update } = useAuth();

    const onSubmit = data => {
        console.log(data);
        createUser(data.email, data.password)
            .then(res => {
                console.log(res.user);

                // ✅ Update profile with name & photo
                update({
                    displayName: data.name,
                    photoURL: data.image
                }).then(() => {
                    // ✅ Show success SweetAlert
                    Swal.fire({
                        icon: 'success',
                        title: 'Registration Successful!',
                        text: 'Welcome aboard!',
                        confirmButtonColor: '#4f46e5'
                    });
                }).catch(err => {
                    console.error('Profile update failed:', err);
                });

            }).catch(error => {
                console.log(error);
            });
    };

    return (
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
                <h1 className="text-5xl font-bold">Create An Account Now</h1>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <fieldset className="fieldset">
                        {/* Name Field - Required Only */}
                        <label className="label">Full Name</label>
                        <input
                            type="text"
                            {...register('name', { required: 'Name is required' })}
                            className="input input-bordered w-full"
                            placeholder="Your Name"
                        />
                        {errors.name && <p className="text-red-500 font-bold">{errors.name.message}</p>}

                        {/* Photo URL */}
                        <label className="label">Photo URL</label>
                        <input
                            type="text"
                            {...register('image', { required: 'Photo URL is required' })}
                            className="input input-bordered w-full"
                            placeholder="Photo URL"
                        />
                        {errors.image && <p className="text-red-500 font-bold">{errors.image.message}</p>}

                        {/* email field */}
                        <label className="label">Email</label>
                        <input type="email" {...register('email', { required: true })} className="input" placeholder="Email" />
                        {
                            errors.email?.type === 'required' && <p className='text-red-500 font-bold'>Email is required</p>
                        }

                        {/* Password */}
                        <label className="label">Password</label>
                        <input
                            type="password"
                            {...register('password', {
                                required: 'Password is required',
                                minLength: { value: 8, message: 'Must be at least 8 characters' },
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
                                    message: 'Must include uppercase, lowercase, number & special character'
                                }
                            })}
                            className="input input-bordered w-full"
                            placeholder="Password"
                        />
                        {errors.password && <p className="text-red-500 font-bold">{errors.password.message}</p>}

                        <div><a className="link link-hover">Forgot password?</a></div>
                        <button className="btn btn-neutral mt-4">Register</button>
                    </fieldset>

                    <p><small>Already have an account?<Link className='btn btn-link' to={'/login'}>Log In</Link></small></p>
                </form>

                <SocialLogIn></SocialLogIn>
            </div>
        </div>
    );
};

export default Register;
