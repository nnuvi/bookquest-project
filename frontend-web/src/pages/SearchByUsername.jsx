// src/pages/SearchByUsername.jsx
import React, { useState } from 'react';
import './SearchByUsername.css';

const SearchByUsername = () => {
    const [search, setSearch] = useState('');
    const users = [
        { id: 1, username: "User1" },
        { id: 2, username: "User2" },
        { id: 3, username: "User3" },
        { id: 4, username: "User4" },
    ];

    const filteredUsers = users.filter((user) =>
        user.username.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="search-by-username-container">
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search usernames..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <div className="user-list">
                {filteredUsers.map((user) => (
                    <div className="user-card" key={user.id}>
                        <div className="user-image">Image of the User</div>
                        <p>{user.username}</p>
                        <button className="connect-button">Connect</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchByUsername;
