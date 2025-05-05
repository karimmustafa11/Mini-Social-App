import React, { useState, useContext } from 'react';
import postifyLogo from '../assets/Logo/Postify.png';
import facebookLogo from '../assets/Social/facebook.png';
import googleLogo from '../assets/Social/google.png';
import { NavLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { UserContext } from '../Context/UserContext';

const schema = yup.object({
    email: yup.string().trim().lowercase().email('Invalid email').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

export default function Login() {
    const { login } = useContext(UserContext);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        setIsLoading(true);
        setShowToast(false);

        try {
            const res = await axios.get('http://localhost:5000/users');
            const users = res.data;

            const foundUser = users.find(
                (user) =>
                    user.email.trim().toLowerCase() === data.email.trim().toLowerCase() &&
                    user.password === data.password
            );

            if (foundUser) {
                setToastMessage('✅ Login successful!');
                setShowToast(true);
                setIsLoading(true);

                setTimeout(() => {
                    login(foundUser);
                    setShowToast(false);
                    setIsLoading(false);
                    navigate('/');
                }, 1500);
            } else {
                setToastMessage('❌ Invalid email or password');
                setShowToast(true);
                setTimeout(() => {
                    setShowToast(false);
                    setIsLoading(false);
                }, 1500);
            }
        } catch (error) {
            console.error('Login error:', error);
            setToastMessage('❌ Error during login');
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
                setIsLoading(false);
            }, 1500);
        }
    };

    return (
        <div className="w-screen h-screen flex items-center justify-center relative bg-base-100">
            {showToast && (
                <div
                    role="alert"
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                        bg-white text-black px-6 py-4 rounded-xl shadow-xl text-center z-50 text-lg font-semibold w-80"
                >
                    {toastMessage}
                    <div className="w-full h-1 bg-gray-300 mt-3 overflow-hidden rounded">
                        <div className={`h-full ${toastMessage.includes('✅') ? 'bg-green-500' : 'bg-red-500'} animate-toast-progress`}></div>
                    </div>
                </div>
            )}

            <div className={`relative z-20 transition-all duration-300 ${isLoading ? 'blur-sm pointer-events-none select-none' : ''}`}>
                <div className="border-[1px] border-accent p-2.5 px-4">
                    <div className="flex flex-col justify-center items-center m-[-15px]">
                        <img src={postifyLogo} alt="Postify Logo" width={100} height={100} />
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <fieldset className="fieldset w-xs bg-base-200 border border-base-300 px-4 py-8 rounded-box">
                            <legend className="fieldset-legend">Login</legend>

                            <label className="fieldset-label">Email</label>
                            <input
                                type="email"
                                className={`input ${errors.email ? 'border-red-500' : 'border-green-500'}`}
                                placeholder="Email"
                                {...register('email')}
                                disabled={isLoading}
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

                            <label className="fieldset-label mt-4">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className={`input w-full pr-10 ${errors.password ? 'border-red-500' : 'border-green-500'}`}
                                    placeholder="Password"
                                    {...register('password')}
                                    disabled={isLoading}
                                />
                                <button
                                    type="button"
                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-blue-500"
                                    onClick={() => setShowPassword(!showPassword)}
                                    disabled={isLoading}
                                >
                                    {showPassword ? 'Hide' : 'Show'}
                                </button>
                            </div>
                            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

                            <button
                                type="submit"
                                className={`btn btn-neutral mt-4 shadow hover:bg-gray-800 hover:scale-105 transition-all duration-300 ease-in-out ${isLoading ? 'loading' : ''}`}
                                style={{ borderRadius: 11 }}
                                disabled={isLoading}
                                aria-disabled={isLoading}
                            >
                                {isLoading ? 'Logging in...' : 'Login'}
                            </button>

                            <div className="flex items-center my-4">
                                <hr className="flex-grow border-gray-300" />
                                <span className="mx-4 text-gray-500 font-semibold">OR</span>
                                <hr className="flex-grow border-gray-300" />
                            </div>

                            <div className="flex justify-center items-center mb-3">
                                <img src={facebookLogo} alt="Facebook logo" width={30} height={30} />
                                <p className="ms-1 text-blue-400 hover:text-blue-800 font-semibold cursor-not-allowed" title="Feature not available">
                                    Log in With Facebook
                                </p>
                            </div>

                            <div className="flex justify-center items-center ms-[-12px]">
                                <img src={googleLogo} alt="Google logo" width={30} height={30} />
                                <p className="text-gray-500 hover:text-blue-800 font-semibold ms-[5px] cursor-not-allowed" title="Feature not available">
                                    Log in With Google
                                </p>
                            </div>

                            <div className="flex items-center my-4">
                                <hr className="flex-grow border-gray-300" />
                                <span className="mx-4 text-gray-500 font-semibold">OR</span>
                                <hr className="flex-grow border-gray-300" />
                            </div>

                            <div className="text-center">
                                <p>Don't have an account?</p>
                                <NavLink to="/signup" className="text-blue-500 hover:text-blue-800">
                                    Sign Up
                                </NavLink>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    );
}
