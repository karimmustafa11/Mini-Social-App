// ✅ Signup.js
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import postifyLogo from '../assets/Postify.png';

const schema = yup.object({
    fullname: yup.string().min(10, "Please enter your full name").required("Full name is required"),
    phone: yup.string().matches(/^\d{11}$/, "Phone number must be exactly 11 digits").required("Phone number is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

export default function Signup() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({ resolver: yupResolver(schema), mode: "onChange" });

    const [imageBase64, setImageBase64] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const navigate = useNavigate();

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => setImageBase64(reader.result);
        if (file) reader.readAsDataURL(file);
    };

    const onSubmit = async (data) => {
        try {
            const userWithImage = { ...data, image: imageBase64 };
            const res = await axios.post(`http://localhost:5000/users`, userWithImage);
            if (res.status === 201) {
                localStorage.setItem("user", JSON.stringify(res.data));
                setToastMessage("✅ Successful! Please Login Now");
                navigate("/");
            } else {
                setToastMessage("❌ Something went wrong, please try again");
            }
        } catch (error) {
            setToastMessage("❌ Something went wrong!");
        } finally {
            setShowToast(true);
            setTimeout(() => setShowToast(false), 2000);
        }
    };

    return (
        <div className='w-screen h-screen flex items-center justify-center'>
            <div className='border-[1px] border-accent p-2.5 px-4'>
                <div className='flex flex-col justify-center items-center m-[-15px]'>
                    <img src={postifyLogo} alt="Postify Logo" width={100} height={100} />
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset className="fieldset w-xs bg-base-200 border border-base-300 px-4 py-8 rounded-box">
                        <legend className="fieldset-legend">Sign Up</legend>

                        <label className="fieldset-label">Full Name</label>
                        <input type="text" className="input" placeholder="Enter Your Name" {...register("fullname")} />
                        {errors.fullname && <p className="text-red-500 text-sm">{errors.fullname.message}</p>}

                        <label className="fieldset-label mt-2">Phone</label>
                        <input type="text" className="input" placeholder="Enter your Phone Number" {...register("phone")} />
                        {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}

                        <label className="fieldset-label mt-2">Email</label>
                        <input type="email" className="input" placeholder="Enter Your Email" {...register("email")} />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

                        <label className="fieldset-label mt-2">Password</label>
                        <input type="password" className="input" placeholder="Enter Your Password" {...register("password")} />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

                        <label className="fieldset-label mt-2">Profile Picture</label>
                        <input type="file" accept="image/*" className="file-input file-input-bordered w-full" onChange={handleImageUpload} />

                        <button type="submit" className="btn btn-neutral mt-4">Sign Up</button>

                        <div className='text-center mt-2'>
                            <p>Already have an account? <NavLink to="/login" className="text-blue-500 hover:text-blue-800">Login</NavLink></p>
                        </div>
                    </fieldset>
                </form>
            </div>

            {showToast && (
                <div className="absolute top-6 right-6 bg-black text-white px-4 py-2 rounded-lg shadow-md animate-fade-in">
                    {toastMessage}
                </div>
            )}
        </div>
    );
}
