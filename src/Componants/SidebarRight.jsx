import React from 'react'

export default function SidebarRight({ }) {
    const user = JSON.parse(localStorage.getItem("user"));

    const SidebarCard = ({ children }) => (
        <div className="bg-white rounded-2xl shadow p-4 space-y-3">
            {children}
        </div>
    );
    return (
        <aside className="w-1/5 hidden md:block px-4 space-y-6 ">
            <SidebarCard>
                <img
                    src={user.image}
                    alt="Profile"
                    className="w-20 h-20 rounded-full mx-auto mb-2"
                />
                <h3 className="font-semibold text-center text-gray-800">{user.fullname}</h3>
                <p className="text-sm text-center text-gray-500">{user.email}</p>
            </SidebarCard>

            <SidebarCard>
                <h4 className="text-lg font-semibold text-gray-700">Main Menu</h4>
                <ul className="text-sm text-gray-600 space-y-2">
                    {[
                        "🏠 Home",
                        "👨‍👩‍👧‍👦 Friends",
                        "📸 Photos",
                        "📄 Pages",
                        "🎥 Videos",
                    ].map((item, i) => (
                        <li key={i} className="hover:text-indigo-600 cursor-pointer">{item}</li>
                    ))}
                </ul>
            </SidebarCard>
        </aside>
    )
}
