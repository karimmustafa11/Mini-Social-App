import React, { useState, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import postifyLogo from '../assets/Logo/Postify.png';
import { UserContext } from '../Context/UserContext';

const schema = yup.object({
    fullname: yup.string().min(10, 'Please enter your full name').required('Full name is required'),
    phone: yup
        .string()
        .matches(/^\d{11}$/, 'Phone number must be exactly 11 digits')
        .required('Phone number is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup
        .string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
});

export default function Signup() {
    const { login } = useContext(UserContext);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema), mode: 'onChange' });

    const [imageBase64, setImageBase64] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoading) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isLoading]);

    const showToastMessage = (message, duration = 2000) => {
        setToastMessage(message);
        setShowToast(true);
        const timer = setTimeout(() => setShowToast(false), duration);
        return () => clearTimeout(timer);
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.match('image.*')) {
            showToastMessage('❌ Please upload an image file');
            return;
        }

        if (file.size > 2 * 1024 * 1024) {
            showToastMessage('❌ Image size should be less than 2MB');
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => setImageBase64(reader.result);
        reader.readAsDataURL(file);
    };

    const onSubmit = async (data) => {
        if (!imageBase64) {
            showToastMessage('❌ Please upload a profile picture');
            return;
        }

        setIsLoading(true);
        setShowToast(false);

        try {
            // التحقق من البريد الإلكتروني ورقم الهاتف
            const usersRes = await axios.get('http://localhost:5000/users');
            const emailExists = usersRes.data.some(
                user => user.email.toLowerCase() === data.email.toLowerCase()
            );

            const phoneExists = usersRes.data.some(
                user => user.phone === data.phone
            );

            if (emailExists) {
                showToastMessage('❌ Email already exists');
                setIsLoading(false);
                return;
            }

            if (phoneExists) {
                showToastMessage('❌ Phone number already registered');
                setIsLoading(false);
                return;
            }

            // إنشاء مستخدم جديد
            const newUser = {
                fullname: data.fullname,
                phone: data.phone,
                email: data.email,
                image: imageBase64,
                createdAt: new Date().toISOString()
            };

            const res = await axios.post('http://localhost:5000/users', {
                ...newUser,
                password: data.password
            });

            if (res.status === 201) {
                login(newUser);
                showToastMessage('✅ Registration successful! Redirecting...');
                setTimeout(() => navigate('/'), 2000);
            } else {
                throw new Error('Failed to create user');
            }
        } catch (error) {
            console.error('Signup error:', error);
            let errorMessage = '❌ Registration failed. Please try again.';

            if (error.response) {
                if (error.response.status === 409) {
                    errorMessage = '❌ User already exists';
                } else if (error.response.status === 500) {
                    errorMessage = '❌ Server error. Please try again later.';
                }
            }

            showToastMessage(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full min-h-screen flex items-center justify-center relative bg-base-100 overflow-hidden p-4">
            {showToast && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                        bg-white text-black px-6 py-4 rounded-xl shadow-xl text-center z-50 text-lg font-semibold w-80">
                    {toastMessage}
                    <div className="w-full h-1 bg-gray-300 mt-3 overflow-hidden rounded">
                        <div className={`h-full ${toastMessage.includes('✅') ? 'bg-green-500' : 'bg-red-500'} animate-toast-progress`}></div>
                    </div>
                </div>
            )}

            <div
                className={`w-full max-w-md relative z-20 transition-all duration-300 ${isLoading ? 'blur-sm pointer-events-none select-none' : ''}`}
            >
                <div className="border-[1px] border-accent p-2.5 px-4">
                    <div className="flex flex-col justify-center items-center m-[-15px]">
                        <img src={postifyLogo} alt="Postify Logo" width={100} height={100} />
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <fieldset className="fieldset w-full bg-base-200 border border-base-300 px-4 py-8 rounded-box">
                            <legend className="fieldset-legend">Sign Up</legend>

                            <div className="space-y-4">
                                <div>
                                    <label className="fieldset-label">Full Name</label>
                                    <input
                                        type="text"
                                        className={`input w-full ${errors.fullname ? 'border-red-500' : 'border-green-500'}`}
                                        placeholder="Enter Your Full Name"
                                        {...register('fullname')}
                                        disabled={isLoading}
                                    />
                                    {errors.fullname && <p className="text-red-500 text-sm">{errors.fullname.message}</p>}
                                </div>

                                <div>
                                    <label className="fieldset-label">Phone Number</label>
                                    <input
                                        type="text"
                                        className={`input w-full ${errors.phone ? 'border-red-500' : 'border-green-500'}`}
                                        placeholder="Enter your Phone Number"
                                        {...register('phone')}
                                        disabled={isLoading}
                                    />
                                    {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                                </div>

                                <div>
                                    <label className="fieldset-label">Email</label>
                                    <input
                                        type="email"
                                        className={`input w-full ${errors.email ? 'border-red-500' : 'border-green-500'}`}
                                        placeholder="Enter Your Email"
                                        {...register('email')}
                                        disabled={isLoading}
                                    />
                                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                                </div>

                                <div>
                                    <label className="fieldset-label">Password</label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            className={`input w-full pr-10 ${errors.password ? 'border-red-500' : 'border-green-500'}`}
                                            placeholder="Enter Your Password"
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
                                </div>

                                <div>
                                    <label className="fieldset-label">Profile Picture</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="file-input file-input-bordered w-full"
                                        onChange={handleImageUpload}
                                        disabled={isLoading}
                                    />
                                    {imageBase64 && (
                                        <img
                                            src={imageBase64}
                                            alt="Profile Preview"
                                            className="mt-2 rounded-full border-2 border-gray-300 w-20 h-20 object-cover"
                                        />
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    className={`btn btn-neutral w-full mt-6 shadow hover:bg-gray-800 hover:scale-[1.01] transition-all duration-300 ease-in-out ${isLoading ? 'loading' : ''}`}
                                    style={{ borderRadius: 11 }}
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Processing...' : 'Sign Up'}
                                </button>

                                <div className="flex items-center my-4">
                                    <hr className="flex-grow border-gray-300" />
                                    <span className="mx-4 text-gray-500 font-semibold">OR</span>
                                    <hr className="flex-grow border-gray-300" />
                                </div>

                                <div className="text-center">
                                    <p>Already have an account?</p>
                                    <NavLink to="/login" className="text-blue-500 hover:text-blue-800 font-semibold">
                                        Login
                                    </NavLink>
                                </div>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    );
}