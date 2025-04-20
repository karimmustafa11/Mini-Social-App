import React from 'react'
import postifyLogo from '../assets/Postify.png';
import facebookLogo from '../assets/facebook.png'
import googleLogo from '../assets/google.png'
import { NavLink } from 'react-router';

export default function Login() {
    return (
        <div className='w-screen h-screen flex items-center justify-center'>

            <div className='border-[1px] border-accent p-2.5 px-4 '>
                <div className='flex flex-col justify-center items-center m-[-15px] '>
                    <img src={postifyLogo} alt="" width={100} height={100} />
                </div>
                <fieldset className="fieldset w-xs bg-base-200 border border-base-300 px-4 py-8 rounded-box">
                    <legend className="fieldset-legend">Login</legend>

                    <label className="fieldset-label">Email</label>
                    <input type="email" className="input" placeholder="Email" />

                    <label className="fieldset-label">Password</label>
                    <input type="password" className="input" placeholder="Password" />

                    <button className="btn btn-neutral mt-4 shadow hover:bg-gray-800 hover:scale-105 transition-all duration-300 ease-in-out " style={{ borderRadius: 11 }}>Login</button>

                    <div class="flex items-center my-4">
                        <hr class="flex-grow border-gray-300" />
                        <span class="mx-4 text-gray-500 font-semibold">OR</span>
                        <hr class="flex-grow border-gray-300" />
                    </div>

                    <div className='flex justify-center items-center mb-3'>
                        <img src={facebookLogo} alt="" width={30} height={30} style={{ verticalAlign: "middle" }} />
                        <p className='ms-1 text-blue-400 hover:text-blue-800 font-semibold'>Log in With Facebook</p>
                    </div>

                    <div className='flex justify-center items-center ms-[-12px]'>
                        <img src={googleLogo} alt="" width={30} height={30} style={{ verticalAlign: "middle" }} />
                        <p className=' text-gray-500 hover:text-blue-800 font-semibold ms-[5px]'>Log in With Google</p>
                    </div>

                    <div class="flex items-center my-4">
                        <hr class="flex-grow border-gray-300" />
                        <span class="mx-4 text-gray-500 font-semibold">OR</span>
                        <hr class="flex-grow border-gray-300" />
                    </div>


                    <div className='text-center mb'>
                        <p className=''>Don't Have an account ?</p>
                        <NavLink to="/signup" className="text-blue-500 mt-1.5 hover:text-blue-800 mt-2 ">Sign Up</NavLink>
                    </div>
                </fieldset>
            </div>
        </div>
    )
}
