// src/pages/Profile.jsx
import React from 'react';
import './Profile.css';

const Profile = () => {
    return (
        <div className="profile-container">
            <div className="profile-header">
                <img src="/images/profile.jpg" alt="Profile" className="profile-pic" />
                <h1>Username</h1>
                <p>Bio: A short bio about the user.</p>
            </div>
            <div className="profile-stats">
                <div>
                    <h2>100</h2>
                    <p>Books</p>
                </div>
                <div>
                    <h2>19</h2>
                    <p>Friends</p>
                </div>
            </div>
            <div className="profile-actions">
                <button>Edit Profile</button>
                <button>Add Book</button>
            </div>
        </div>
    );
};

export default Profile;
