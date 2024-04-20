import React, { useState, useEffect } from 'react';
import axios from 'axios';

// const baseURL = "http://127.0.0.1:8000/posts/";

const baseURL = "https://api.designartproject.ru/posts/";

// const baseURL = "https://jsonplaceholder.typicode.com/posts/";

const PostListWithCRUD = () => {
    const [posts, setPosts] = useState([]);
    const [editingPost, setEditingPost] = useState(null);
    const [updatedPost, setUpdatedPost] = useState({ title: '', body: '' });
    const [newPost, setNewPost] = useState({ title: '', body: '' });

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

    const handleSubmitEdit = (e) => {
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

    const handleDeletePost = (postId) => {
        axios.delete(`${baseURL}/${postId}`)
            .then(() => {
                setPosts(posts.filter(post => post.id !== postId));
            })
            .catch((error) => {
                console.error('Error deleting post:', error);
            });
    };



    const handleAddPost = async() => {
      await axios.post(baseURL, newPost, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer your_token_here' // Add your authorization token here
                }
            })
            .then((response) => {
                setPosts([...posts, response.data]);
                setNewPost({ title: '', body: '' });
            })
            .catch((error) => {
                console.error('Error adding post:', error);
            });
    };

    return (
        
        <div className="2222">
            <p>get, post, put, delete</p>
            <h2>2222 List of First 5 Posts:</h2>
            <p>{baseURL}</p>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>
                        <div>Title: {post.title}</div>
                        <div>Body: {post.body}</div>
                        <button onClick={() => handleEditPost(post)}>Edit</button>
                        <button onClick={() => handleDeletePost(post.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            
            {editingPost && (
                <form onSubmit={handleSubmitEdit}>
                    <input type="text" name="title" value={updatedPost.title} onChange={handleChange} />
                    <input type="text" name="body" value={updatedPost.body} onChange={handleChange} />
                    <button type="submit">Save Changes</button>
                </form>
            )}

            <h2>Add a New Post:</h2>
            <input type="text" placeholder="Title" value={newPost.title} onChange={(e) => setNewPost({ ...newPost, title: e.target.value })} />
            <input type="text" placeholder="Body" value={newPost.body} onChange={(e) => setNewPost({ ...newPost, body: e.target.value })} />
            <button onClick={handleAddPost}>Add Post</button>
        </div>
    );
};

export default PostListWithCRUD;