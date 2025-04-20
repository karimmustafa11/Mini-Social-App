import React from 'react'
import { NavLink } from 'react-router'
import postifyLogo from '../assets/Postify.png';

export default function Signup() {
    return (
        <div className='w-screen h-screen flex items-center justify-center'>

            <div className='border-[1px] border-accent p-2.5 px-4 '>
                <div className='flex flex-col justify-center items-center m-[-15px] '>
                    <img src={postifyLogo} alt="" width={100} height={100} />
                </div>
                <fieldset className="fieldset w-xs bg-base-200 border border-base-300 px-4 py-8 rounded-box">
                    <legend className="fieldset-legend">Sign Up</legend>

                    <label className="fieldset-label">Full Name</label>
                    <input type="email" className="input" placeholder="Enter Your Name" />

                    <label className="fieldset-label">Phone</label>
                    <input type="text" className="input" placeholder="Enter your Phone Number" />
                    <label className="fieldset-label">Email</label>
                    <input type="email" className="input" placeholder="Enter Your Email" />

                    <label className="fieldset-label">Password</label>
                    <input type="password" className="input" placeholder="Enter Your Password" />

                    <div className='text-center'>

                        <p className='mt-3'>People who use our service may have uploaded your contact information to Postify. <NavLink to="/login" className="text-blue-500 mt-1.5 hover:text-blue-800 ">Learn More</NavLink></p>

                        <p className='mt-3'>By signing up, you agree to our Terms , <NavLink to="/login" className="text-blue-500 mt-1.5 hover:text-blue-800 ">Privacy policy</NavLink> and <NavLink to="/login" className="text-blue-500 mt-1.5 hover:text-blue-800 ">Cookies Policy</NavLink></p>

                    </div>
                    <button className="btn btn-neutral mt-4 shadow hover:bg-gray-800 hover:scale-105 transition-all duration-300 ease-in-out " style={{ borderRadius: 11 }}>Sign Up</button>


                    <div className='text-center mt-2'>
                        <p className='mt-4'>Having an account ?</p>
                        <NavLink to="/login" className="text-blue-500 mt-1.5 hover:text-blue-800">Log in</NavLink>
                    </div>
                </fieldset>


            </div>

        </div>

    )
}
