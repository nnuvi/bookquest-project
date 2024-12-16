// src/pages/Notification.jsx
import React from 'react';
import './Notification.css';

const Notification = () => {
    const notifications = [
        { id: 1, text: "USERNAME wants to connect with you!", type: "connect" },
        { id: 2, text: "USERNAME notified you to return the 'BOOK NAME' back", type: "return" },
        { id: 3, text: "USERNAME wants to borrow 'BOOK NAME'", type: "borrow" },
        { id: 4, text: "USERNAME lended you 'BOOK NAME'", type: "lend" },
        { id: 5, text: "USERNAME gave back 'BOOK NAME'", type: "return" },
    ];

    return (
        <div className="notification-container">
            <h2>Notifications</h2>
            <div className="notification-header">
                <button className="header-button">Connect Back</button>
                <button className="header-button">Delete</button>
            </div>
            <div className="notification-list">
                {notifications.map((notification) => (
                    <div className="notification-card" key={notification.id}>
                        <div className="notification-pic">Profile Pic</div>
                        <p className="notification-text">{notification.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Notification;

