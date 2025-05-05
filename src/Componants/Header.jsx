import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import postifyLogo from '../assets/Logo/Postify.png';
import { UserContext } from '../Context/UserContext';

export default function Header() {
    const navigate = useNavigate();
    const { user, logout } = useContext(UserContext);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const NavigateSignUp = () => navigate("/signup");
    const NavigateLogin = () => navigate("/login");

    return (
        <div className="navbar bg-base-100 shadow-sm px-4">
            <div className="flex-1">
                <NavLink className="btn btn-ghost text-2xl font-bold text-primary" to="/">
                    <img src={postifyLogo} alt="Postify Logo" width={100} height={100} />
                </NavLink>
            </div>

            <div className="flex items-center gap-4">
                <input
                    type="text"
                    placeholder="Search"
                    className="input input-bordered w-24 md:w-auto"
                />

                {!user && (
                    <>
                        <button className="btn btn-outline btn-neutral" onClick={NavigateLogin}>Login</button>
                        <button className="btn btn-neutral" onClick={NavigateSignUp}>Sign Up</button>
                    </>
                )}

                {user && (
                    <button className="btn btn-outline btn-neutral" onClick={handleLogout}>Logout</button>
                )}

                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="User Avatar"
                                src={user?.image || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                            />
                        </div>
                    </div>

                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                    >
                        <li>
                            <a className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </a>
                        </li>
                        <li><a>Settings</a></li>
                        {user && <li><a onClick={handleLogout}>Logout</a></li>}
                    </ul>
                </div>
            </div>
        </div>
    );
}
