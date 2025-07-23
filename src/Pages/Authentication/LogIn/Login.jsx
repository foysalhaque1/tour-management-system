import React from 'react';
import { useForm } from 'react-hook-form';

import Swal from 'sweetalert2';
import SocialLogIn from '../SocialLogIn/SocialLogIn';
import useAuth from '../../../Hooks/useAuth';
import { Link, useNavigate } from 'react-router';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signIn } = useAuth();
    const navigate = useNavigate();
    

    const onSubmit = async (data) => {
        const { email, password } = data;
        try {
            const res = await signIn(email, password);
            const user = res.user;
            console.log(user)
            // Handle successful login (you can set the user in state, navigate to dashboard, etc.)
            Swal.fire({
                title: "Log in successfully",
                icon: "success",
                draggable: true,
            });

            navigate(location.state ? location.state : '/');
        } catch (error) {
            Swal.fire({
                title: "Login failed",
                text: error.message,
                icon: "error",
                draggable: true,
            });
        }
    };

    return (
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
                <h1 className="text-3xl font-bold text-center">Log In Now</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset className="fieldset">
                        <label className="label">Email</label>
                        <input type="email" className="input" {...register('email')} placeholder="Email" />
                        <label className="label">Password</label>
                        <input type="password" {...register('password', { required: true, minLength: 8 })} className="input" placeholder="Password" />
                        {errors.password?.type === 'required' && <p className="text-red-500 font-bold">Password is required</p>}
                        {errors.password?.type === 'minLength' && <p className="text-red-500 font-bold">Password must be 8 characters</p>}
                        <div><a className="link link-hover">Forgot password?</a></div>
                        <button className="btn btn-neutral mt-4">Login</button>
                    </fieldset>
                    <p><small>New to this website?<Link className="btn btn-link" to={'/register'}>Register</Link></small></p>
                </form>
                <SocialLogIn />
            </div>
        </div>
    );
};

export default Login;
