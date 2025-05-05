import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

dayjs.extend(relativeTime);

export default function Posts() {
    const { user: currentUser } = useContext(UserContext);
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                const [postsRes, usersRes] = await Promise.all([
                    axios.get(`http://localhost:5000/posts?_page=${page}&_limit=2`),
                    axios.get("http://localhost:5000/users"),
                ]);

                const newPosts = postsRes.data.map(post => {
                    const author = usersRes.data.find(user => String(user.id) === String(post.userId));
                    return {
                        ...post,
                        authorName: author?.fullname || "Unknown",
                        profilePicture: author?.image || "https://i.pravatar.cc/40?img=32",
                    };
                });

                setPosts(prev => [...prev, ...newPosts]);
                if (newPosts.length < 5) setHasMore(false);
            } catch (err) {
                setError(err.message);
                setHasMore(false);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [page]);



    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
                hasMore && !loading
            ) {
                setPage(prev => prev + 1);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [hasMore, loading]);



    const handleEdit = (id) => {
        navigate(`/edit-post/${id}`);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            try {
                await axios.delete(`http://localhost:5000/posts/${id}`);
                setPosts(posts.filter((post) => post.id !== id));
            } catch (err) {
                alert("Failed to delete the post");
            }
        }
    };

    const isOwner = (post) => {
        return currentUser && String(post.userId) === String(currentUser.id);
    };



    if (error) {
        return <div className="text-center text-red-600 mt-10 text-lg font-semibold">Error: {error}</div>;
    }

    return (
        <>
            <section className="flex-1 flex flex-col items-center space-y-6 px-4">
                {posts.map((post) => (
                    <article
                        key={post.id}
                        className="w-full max-w-2xl bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition"
                    >
                        <header className="flex justify-between items-start mb-4">
                            <div className="flex items-center space-x-4">
                                <img
                                    src={post.profilePicture}
                                    alt="Profile"
                                    className="w-10 h-10 bg-cover rounded-full"
                                />
                                <div>
                                    <p className="font-semibold text-gray-800">{post.authorName}</p>
                                    <p className="text-gray-400 text-sm">
                                        {post.createdAt ? dayjs(post.createdAt).fromNow() : "Unknown time"}
                                    </p>
                                </div>
                            </div>

                            {isOwner(post) && (
                                <div className="flex space-x-2">
                                    <button
                                        className="text-sm px-3 py-1 rounded bg-yellow-400 hover:bg-yellow-500 text-white"
                                        onClick={() => handleEdit(post.id)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="text-sm px-3 py-1 rounded bg-red-500 hover:bg-red-600 text-white"
                                        onClick={() => handleDelete(post.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            )}
                        </header>

                        <h2 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h2>
                        <p className="text-gray-700 mb-4 break-words">{post.content}</p>

                        {post.image && (
                            <div className="overflow-hidden rounded-md mb-4">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full object-cover rounded-md hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                        )}

                        <footer className="flex justify-around border-t pt-2 text-gray-500 text-sm">
                            <button className="hover:text-indigo-600">👍 Like</button>
                            <button className="hover:text-indigo-600">💬 Comment</button>
                            <button className="hover:text-indigo-600">🔗 Share</button>
                        </footer>
                    </article>
                ))}
            </section>
            {loading && (
                <div className="text-center my-6">
                    <span className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-indigo-600 border-r-transparent"></span>
                </div>
            )}
         
            {posts.length === 0 && !loading && (
                <div className="text-center text-gray-500 my-6">
                    No posts available.
                </div>
            )}

            <div className="fixed bottom-6 right-6 w-[50px] h-[50px] rounded-full bg-black flex items-center justify-center shadow-lg transition-transform transform hover:scale-110">
                <NavLink
                    to="/add-post"
                    className=" text-white text-2xl"
                >
                    +
                </NavLink>
            </div>
        </>
    );
}
