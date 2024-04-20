import React, { useState, useEffect } from 'react';
import axios from 'axios';

// const baseURL = "http://127.0.0.1:8000/posts/";

// const baseURL = "https://api.designartproject.ru/posts/";

const baseURL = "https://jsonplaceholder.typicode.com/posts/";

const PostListWithDelete = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get(`${baseURL}?_limit=5`)
            .then((response) => {
                setPosts(response.data.slice(0, 5));
            })
            .catch((error) => {
                console.error('Error fetching posts:', error);
            });
    }, []);

    const handleDelete = (postId) => {
        axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`)
            .then(() => {
                const updatedPosts = posts.filter(post => post.id !== postId);
                setPosts(updatedPosts);
            })
            .catch((error) => {
                console.error('Error deleting post:', error);
            });
    };

    return (
        <div className="4444">
          <div>delete</div>
            <h2>4444 List of First 5 Posts:</h2>
            <p>{baseURL}</p>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>
                        {post.title}
                        <button onClick={() => handleDelete(post.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PostListWithDelete;