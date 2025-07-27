import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import { useNavigate } from 'react-router';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const SocialLogIn = () => {
    const navigate = useNavigate();
    const { signInWithGoogle } = useAuth();
    const axiosSecure = useAxiosSecure();

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(async (res) => {
                const googleUser = res.user;

                // Prepare new user data
                const newUser = {
                    name: googleUser.displayName,
                    email: googleUser.email,
                    photo: googleUser.photoURL,
                    role: 'user',
                    createdAt: new Date()
                };

                try {
                    // Call backend to check & insert user
                    await axiosSecure.post('/users', newUser);

                    navigate('/');
                } catch (err) {
                    console.error("Error saving Google user:", err);
                }
            })
            .catch((error) => {
                console.error("Google login error:", error);
            });
    };

    return (
        <div className='text-center'>
            <p className='mb-4'>OR</p>
            <button onClick={handleGoogleSignIn} className="btn bg-white text-black border-[#e5e5e5]">
                <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                Login with Google
            </button>
        </div>
    );
};

export default SocialLogIn;
