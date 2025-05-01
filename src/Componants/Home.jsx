import React from 'react'
import SidebarRight from "./SidebarRight";
import SidebarLeft from "./SidebarLeft";
import Posts from './Posts';

export default function Home() {
    return (
        <main className="min-h-screen bg-gray-100 py-8 px-4">
            <div className="flex max-w-7xl mx-auto gap-6">
                <SidebarLeft />
                <Posts />
                <SidebarRight />


            </div>
        </main>
    )
}
