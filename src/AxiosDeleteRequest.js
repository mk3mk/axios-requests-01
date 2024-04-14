import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PostListWithDelete = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/posts')
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
        <div>
          <div>delete</div>
            <h2>List of First 5 Posts:</h2>
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