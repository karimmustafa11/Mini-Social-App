import React, { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { NavLink } from "react-router";


dayjs.extend(relativeTime);

export default function Posts() {
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [postsRes, usersRes] = await Promise.all([
                    axios.get("http://localhost:5000/posts"),
                    axios.get("http://localhost:5000/users"),
                ]);
                setPosts(postsRes.data);
                setUsers(usersRes.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-white border-r-transparent" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return <div className="text-center text-red-600 mt-10 text-lg font-semibold">Error: {error}</div>;
    }

    return (
        <>
            <section className="flex-1 flex flex-col items-center space-y-6">
                {posts.map((post) => {
                    return (
                        <article
                            key={post.id}
                            className="w-full max-w-2xl bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition"
                        >
                            <header className="flex items-center space-x-4 mb-4">
                                <img
                                    src={post.profilePicture || "https://i.pravatar.cc/40?img=32"}
                                    alt="Profile"
                                    className="w-10 h-10 rounded-full"
                                />
                                <div>
                                    <p className="font-semibold text-gray-800">{post.authorName || "Unknown"}</p>
                                    <p className="text-gray-400 text-sm">{post.createdAt ? dayjs(post.createdAt).fromNow() : "Unknown time"}</p>
                                </div>
                            </header>

                            <h2 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h2>
                            <div style={{ width: 400 }}>
                                <p className="text-gray-700 mb-4 break-all">{post.content}</p>
                            </div>

                            {
                                post.image && (
                                    <div className="overflow-hidden rounded-md mb-4">
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="w-full h-64 object-cover rounded-md hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                )
                            }

                            <footer className="flex justify-around border-t pt-2 text-gray-500 text-sm">
                                <button className="hover:text-indigo-600">👍 Like</button>
                                <button className="hover:text-indigo-600">💬 Comment</button>
                                <button className="hover:text-indigo-600">🔗 Share</button>
                            </footer>
                        </article>
                    );
                })}
            </section >


            <div>
                <NavLink to="/add-post" >+</NavLink>
            </div>

        </>
    );
}
