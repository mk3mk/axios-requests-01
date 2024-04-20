import React, { useState, useEffect } from 'react';
import axios from 'axios';

// const baseURL = "http://127.0.0.1:8000/users/";

const baseURL = "https://api.designartproject.ru/users/";

// const baseURL = "https://jsonplaceholder.typicode.com/users/";

const EditUserList = () => {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [updatedUser, setUpdatedUser] = useState({ title: '', body: '' });
    const [newUser, setNewUser] = useState({ title: '', body: '' });

    useEffect(() => {
        axios.get(`${baseURL}?_limit=5`)
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => {
                console.error('Error fetching users:', error);
            });
    }, []);

    const handleEditUser = (user) => {
        setEditingUser(user);
    };

    const handleChange = (e) => {
        setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.put(`${baseURL}/${editingUser.id}`, updatedUser)
            .then((response) => {
                setUsers(users.map(user => (user.id === editingUser.id ? response.data : user)));
                setEditingUser(null);
                setUpdatedUser({ username: '', username: '' });
            })
            .catch((error) => {
                console.error('Error updating user:', error);
            });
    };

    const handleAddUser = async() => {
        await axios.post(baseURL, newUser, {
                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': 'Bearer your_token_here' // Add your authorization token here
                  }
              })
              .then((response) => {
                  setUsers([...users, response.data]);
                  setNewUser({ title: '', body: '' });
              })
              .catch((error) => {
                  console.error('Error adding user:', error);
              });
      };

    return (
        <div className="1111">
            <p>get, put, post</p>
            <h2>1111 List of First 5 Users:</h2>
            <p>{baseURL}</p>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        <div>Title: {user.username}</div>
                        <div>Body: {user.username}</div>
                        {editingUser && editingUser.id === user.id ? (
                            <form onSubmit={handleSubmit}>
                                <input type="text" name="username" value={updatedUser.username} onChange={handleChange} />
                                <br />
                                <input type="text" name="username" value={updatedUser.username} onChange={handleChange} />
                                <br />
                                <button type="submit">Save</button>
                            </form>
                        ) : (
                            <button onClick={() => handleEditUser(user)}>Edit</button>
                        )}
                    </li>
                ))}
            </ul>


            <h2>Add a New User:</h2>
            <input type="text" placeholder="username" value={newUser.username} onChange={(e) => setNewUser({ ...newUser, username: e.target.value })} />
            <input type="text" placeholder="username" value={newUser.username} onChange={(e) => setNewUser({ ...newUser, username: e.target.value })} />
            <button onClick={handleAddUser}>Add User</button>



        </div>
    );
};

export default EditUserList;