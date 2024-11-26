// src/pages/ChooseProfilePic.jsx
import React, { useState } from 'react';
import './ChooseProfilePic.css';
import { useNavigate } from 'react-router-dom';

const ChooseProfilePic = () => {
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(null);

    const galleryImages = [
        '/path-to-image1.jpg',
        '/path-to-image2.jpg',
        '/path-to-image3.jpg',
    ];

    const handleSelectImage = (image) => {
        setSelectedImage(image);
    };

    const handleDone = () => {
        if (selectedImage) {
            alert(`Profile picture updated!`);
            navigate('/profile');
        } else {
            alert('Please select an image first!');
        }
    };

    return (
        <div className="choose-profile-pic-container">
            <div className="choose-header">
                <button className="cancel-button" onClick={() => navigate('/profile-pic')}>
                    Cancel
                </button>
                <h2>Gallery</h2>
                <button className="done-button" onClick={handleDone}>
                    Done
                </button>
            </div>
            <div className="gallery-grid">
                {galleryImages.map((image, index) => (
                    <div
                        className={`gallery-item ${
                            selectedImage === image ? 'selected' : ''
                        }`}
                        key={index}
                        onClick={() => handleSelectImage(image)}
                    >
                        <img src={image} alt={`Gallery ${index + 1}`} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChooseProfilePic;

