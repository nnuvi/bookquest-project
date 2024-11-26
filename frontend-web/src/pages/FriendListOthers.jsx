// src/pages/FriendListOthers.jsx
import React from 'react';
import './FriendListOthers.css';

const FriendListOthers = () => {
    const friends = [
        { id: 1, username: "User1" },
        { id: 2, username: "User2" },
        { id: 3, username: "User3" },
        { id: 4, username: "User4" },
        { id: 5, username: "User5" },
    ];

    return (
        <div className="friend-list-others-container">
            <div className="header">
                <button className="back-button">&lt; Back</button>
                <h2>Friend List</h2>
            </div>
            <div className="friend-list">
                {friends.map((friend) => (
                    <div className="friend-card" key={friend.id}>
                        <div className="friend-image">Image of the User</div>
                        <p>{friend.username}</p>
                        <button className="connect-button">Connect</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FriendListOthers;

