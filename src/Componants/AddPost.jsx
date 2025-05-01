// AddPost.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddPost() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [imageBase64, setImageBase64] = useState("");
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => setImageBase64(reader.result);
        if (file) reader.readAsDataURL(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) return alert("Please login first.");

        const newPost = {
            title,
            content,
            image: imageBase64,
            createdAt: new Date().toISOString(),
            authorId: user.id,
            authorName: user.fullname,
            profilePicture: user.image || ""
        };

        await axios.post("http://localhost:5000/posts", newPost);
        navigate("/");
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Create a New Post</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    className="input input-bordered w-full mb-4"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    placeholder="What's on your mind?"
                    className="textarea textarea-bordered w-full mb-4"
                    rows={4}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <input
                    type="file"
                    accept="image/*"
                    className="file-input w-full mb-4"
                    onChange={handleImageUpload}
                />
                <button type="submit" className="btn btn-primary w-full">Post</button>
            </form>
        </div>
    );
}
