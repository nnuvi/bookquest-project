// src/pages/FriendList.jsx
import React from 'react';
import './FriendList.css';

const FriendList = () => {
    const friends = [
        { id: 1, username: "User 1" },
        { id: 2, username: "User 2" },
        { id: 3, username: "User 3" },
        { id: 4, username: "User 4" },
        { id: 5, username: "User 5" },
    ];

    return (
        <div className="friend-list-container">
            <h2>Friend List</h2>
            <div className="friend-list">
                {friends.map((friend) => (
                    <div className="friend-card" key={friend.id}>
                        <div className="friend-image">Image of the User</div>
                        <p>{friend.username}</p>
                        <button className="message-button">Message</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FriendList;
