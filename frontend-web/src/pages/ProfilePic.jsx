// src/pages/ProfilePic.jsx
import React from 'react';
import './ProfilePic.css';
import { useNavigate } from 'react-router-dom';

const ProfilePic = () => {
    const navigate = useNavigate();

    return (
        <div className="profile-pic-container">
            <div className="profile-pic-display">
                <div className="profile-placeholder">Profile Pic</div>
                <button
                    className="choose-gallery-button"
                    onClick={() => navigate('/choose-profile-pic')}
                >
                    Choose from Gallery
                </button>
            </div>
        </div>
    );
};

export default ProfilePic;

