import React from 'react'

export default function Login() {
    return (
        <div className='w-screen h-screen flex items-center justify-center'>

            <fieldset className="fieldset w-xs bg-base-200 border border-base-300 px-4 py-8 rounded-box">
                <legend className="fieldset-legend">Login</legend>

                <label className="fieldset-label">Email</label>
                <input type="email" className="input" placeholder="Email" />

                <label className="fieldset-label">Password</label>
                <input type="password" className="input" placeholder="Password" />

                <button className="btn btn-neutral mt-4 shadow hover:bg-gray-800 hover:scale-105 transition-all duration-300 ease-in-out " style={{borderRadius:11}}>Login</button>
            </fieldset>
        </div>
    )
}
