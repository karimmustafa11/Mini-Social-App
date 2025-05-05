import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export default function EditPost() {
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [imageBase64, setImageBase64] = useState(null);
    const [createdAt, setCreatedAt] = useState(null);
    const [authorImage, setAuthorImage] = useState(null);
    const [authorName, setAuthorName] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    useEffect(() => {
        if (!user) {
            setLoading(false);
            setError("You must be logged in to edit posts");
            return;
        }

        const fetchPostData = async () => {
            try {
                const postRes = await axios.get(`http://localhost:5000/posts/${id}`);
                const post = postRes.data;

                if (user.id !== post.userId) {
                    setError("You are not authorized to edit this post");
                    navigate("/");
                    return;
                }

                setTitle(post.title || "");
                setContent(post.content || "");
                setCreatedAt(post.createdAt);
                setImageBase64(
                    post.image && post.image.startsWith("data:image")
                        ? post.image
                        : null
                );

                // Fetch author info
                const userRes = await axios.get(`http://localhost:5000/users/${post.userId}`);
                setAuthorName(userRes.data.fullname || "Unknown");
                setAuthorImage(userRes.data.image || "https://i.pravatar.cc/40?img=32");

            } catch (err) {
                setError(err.message || "Failed to load post");
            } finally {
                setLoading(false);
            }
        };

        fetchPostData();
    }, [id, user, navigate]);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.match("image.*")) {
            alert("Please upload a valid image file");
            return;
        }

        if (file.size > 2 * 1024 * 1024) {
            alert("Image size should be less than 2MB");
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => setImageBase64(reader.result);
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim() || !content.trim()) {
            alert("Title and content cannot be empty");
            return;
        }

        const updatedPost = {
            title,
            content,
            ...(imageBase64 && { image: imageBase64 }),
            userId: user.id,
            createdAt, // preserve original creation date
            updatedAt: new Date().toISOString(),
        };

        try {
            await axios.put(`http://localhost:5000/posts/${id}`, updatedPost);
            alert("Post updated successfully!");
            navigate("/");
        } catch (err) {
            alert("Failed to update post");
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                <p className="ml-2">Loading post data...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-10">
                <h2 className="text-xl font-bold text-red-600">Error</h2>
                <p className="text-gray-600">{error}</p>
                <button
                    onClick={() => navigate("/")}
                    className="mt-4 px-4 py-2 bg-gray-800 text-white rounded"
                >
                    Back to Home
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md my-8">
            <div className="flex items-center space-x-4 mb-6">
                <img
                    src={authorImage}
                    alt="Profile"
                    className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                    <p className="font-semibold text-gray-800">{authorName}</p>
                    <p className="text-gray-400 text-sm">
                        {createdAt ? dayjs(createdAt).fromNow() : "Unknown time"}
                    </p>
                </div>
            </div>

            <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">Edit Post</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="textarea textarea-bordered w-full"
                        rows={5}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        {imageBase64 ? "Change Image" : "Add Image"}
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="file-input file-input-bordered w-full"
                    />
                </div>

                {imageBase64 && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Current Image</label>
                        <img
                            src={imageBase64}
                            alt="Current"
                            className="w-full rounded-md border"
                        />
                    </div>
                )}

                <div className="flex space-x-4">
                    <button
                        type="button"
                        onClick={() => navigate("/")}
                        className="btn btn-outline flex-1"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="btn btn-primary flex-1"
                    >
                        Update Post
                    </button>
                </div>
            </form>
        </div>
    );
}
