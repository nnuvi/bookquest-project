// src/pages/EditProfile.jsx
import React, { useState } from 'react';
import './EditProfile.css';

const EditProfile = () => {
    // State for form fields
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        bio: '',
        password: '',
    });

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Updated Profile Data:', formData);
        alert('Profile updated successfully!');
    };

    return (
        <div className="edit-profile-container">
            <form className="edit-profile-form" onSubmit={handleSubmit}>
                <div className="profile-photo">
                    <div className="photo-box">
                        <img src="/path-to-placeholder.jpg" alt="Profile" />
                    </div>
                    <button type="button" className="edit-photo-button">Edit Photo</button>
                </div>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        placeholder="Enter your username"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="bio">Bio</label>
                    <textarea
                        id="bio"
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        placeholder="Write something about yourself"
                        rows="3"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Enter your password"
                        required
                    />
                </div>
                <button type="submit" className="save-button">Save</button>
            </form>
        </div>
    );
};

export default EditProfile;

