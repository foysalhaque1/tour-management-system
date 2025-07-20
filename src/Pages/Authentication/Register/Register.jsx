import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../Hooks/useAuth';
import { Link } from 'react-router';
import SocialLogIn from '../SocialLogIn/SocialLogIn';

const Register = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const { createUser} = useAuth();


    const onSubmit = data => {
        console.log(data);
        createUser(data.email,data.password).then(res=>{
            console.log(res.user)
        }).catch(error=>{
            console.log(error);
        })
    }
    return (

        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
                <h1 className="text-5xl font-bold">Create An Account Now</h1>
                <form  onSubmit={handleSubmit(onSubmit)}>

                    <fieldset className="fieldset">
                        {/* email field */}
                        <label className="label">Email</label>
                        <input type="email" {...register('email',{required:true})} className="input" placeholder="Email" />
                        {
                            errors.email?.type === 'required' && <p className='text-red-500 font-bold'>Email is required</p>
                        }

                        {/* password */}
                        <label className="label">Password</label>
                        <input type="password" {...register('password', { minLength: 8, required: true })} className="input" placeholder="Password" />
                        {
                            errors.password?.type === 'required' && <p className='text-red-500 font-bold'>Password is required</p>
                        }
                        {
                            errors.password?.type === 'minLength' && <p className='text-red-500 font-bold'>Password must be 8 characters or more than 8 characters</p>
                        }
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