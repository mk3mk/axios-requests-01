import React, { useState, useEffect } from 'react';
import axios from 'axios';

const baseURL = "https://jsonplaceholder.typicode.com/posts";

const EditPostList = () => {
    const [posts, setPosts] = useState([]);
    const [editingPost, setEditingPost] = useState(null);
    const [updatedPost, setUpdatedPost] = useState({ title: '', body: '' });

    useEffect(() => {
        axios.get(`${baseURL}?_limit=5`)
            .then((response) => {
                setPosts(response.data);
            })
            .catch((error) => {
                console.error('Error fetching posts:', error);
            });
    }, []);

    const handleEditPost = (post) => {
        setEditingPost(post);
    };

    const handleChange = (e) => {
        setUpdatedPost({ ...updatedPost, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.put(`${baseURL}/${editingPost.id}`, updatedPost)
            .then((response) => {
                setPosts(posts.map(post => (post.id === editingPost.id ? response.data : post)));
                setEditingPost(null);
                setUpdatedPost({ title: '', body: '' });
            })
            .catch((error) => {
                console.error('Error updating post:', error);
            });
    };

    return (
        <div>
            <h2>List of First 5 Posts:</h2>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>
                        <div>Title: {post.title}</div>
                        <div>Body: {post.body}</div>
                        {editingPost && editingPost.id === post.id ? (
                            <form onSubmit={handleSubmit}>
                                <input type="text" name="title" value={updatedPost.title} onChange={handleChange} />
                                <br />
                                <input type="text" name="body" value={updatedPost.body} onChange={handleChange} />
                                <br />
                                <button type="submit">Save</button>
                            </form>
                        ) : (
                            <button onClick={() => handleEditPost(post)}>Edit</button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EditPostList;