import React from 'react'

export default function SidebarLeft() {
    const SidebarCard = ({ children }) => (
        <div className="bg-white rounded-2xl shadow p-4 space-y-3">
            {children}
        </div>
    )
    return (
        <aside className="w-1/5 hidden md:block px-4 space-y-6">
            <SidebarCard>
                <h4 className="text-lg font-semibold text-gray-700">Friend Suggestions</h4>
                {["Marwa", "Ebtsam", "Salma"].map((name, i) => (
                    <div key={i} className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                            <img
                                src={`https://i.pravatar.cc/40?img=${i + 45}`}
                                alt={name}
                                className="w-8 h-8 rounded-full"
                            />
                            <p className="text-sm text-gray-800">{name}</p>
                        </div>
                        <button className="text-xs bg-black text-white px-2 py-1 rounded hover:bg-indigo-600">
                            Add
                        </button>
                    </div>
                ))}
            </SidebarCard>

            <SidebarCard>
                <h4 className="text-lg font-semibold text-gray-700">Trending</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                    {[
                        "#ElClasico",
                        "#ArtificialIntelligence",
                        "#ChampionsLeague",
                        "#ClassOf2025",
                    ].map((tag, i) => (
                        <li key={i}>{tag}</li>
                    ))}
                </ul>
            </SidebarCard>

            <SidebarCard>
                <p className="text-gray-700 mb-2 text-center">Sponsored Ad</p>
                <img
                    src="https://via.placeholder.com/200x100.png?text=Ad+Banner"
                    alt="Ad"
                    className="rounded mx-auto"
                />
            </SidebarCard>
        </aside>
    )
}
