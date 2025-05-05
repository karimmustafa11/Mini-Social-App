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
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => setImageBase64(reader.result);
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) return alert("Please login first.");

        const newPost = {
            title,
            content,
            image: imageBase64,
            userId: user.id,
            createdAt: new Date().toISOString()
        };

        try {
            await axios.post("http://localhost:5000/posts", newPost);
            navigate("/");
        } catch (err) {
            console.error("Error creating post:", err);
            alert("Something went wrong while creating the post.");
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md mt-7 mb-7">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Create a New Post</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    className="input input-bordered w-full mb-4"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    placeholder="What's on your mind?"
                    className="textarea textarea-bordered w-full mb-4"
                    rows={5}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
                <input
                    type="file"
                    accept="image/*"
                    className="file-input w-full mb-4"
                    onChange={handleImageUpload}
                />
                <button
                    type="submit"
                    className="btn w-full bg-black text-white hover:bg-gray-800"
                >
                    Post
                </button>
            </form>
        </div>
    );
}
