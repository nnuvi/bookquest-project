// src/pages/BookPic.jsx
import React, { useState } from 'react';
import './BookPic.css';

const BookPic = () => {
    const [bookName, setBookName] = useState('');
    const [author, setAuthor] = useState('');
    const [image, setImage] = useState(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Book "${bookName}" by "${author}" added successfully!`);
        // Here you can add logic to save the data (API call or local state)
        setBookName('');
        setAuthor('');
        setImage(null);
    };

    return (
        <div className="book-pic-container">
            <form className="book-pic-form" onSubmit={handleSubmit}>
                <div className="image-upload">
                    <label htmlFor="imageUpload">
                        <div className="image-placeholder">
                            {image ? (
                                <img src={image} alt="Uploaded Book" />
                            ) : (
                                <span>Add Image</span>
                            )}
                        </div>
                    </label>
                    <input
                        type="file"
                        id="imageUpload"
                        accept="image/*"
                        onChange={handleImageUpload}
                        style={{ display: 'none' }}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="bookName">Book Name</label>
                    <input
                        type="text"
                        id="bookName"
                        value={bookName}
                        onChange={(e) => setBookName(e.target.value)}
                        placeholder="Enter book name"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="author">Author</label>
                    <input
                        type="text"
                        id="author"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        placeholder="Enter author's name"
                        required
                    />
                </div>
                <div className="form-actions">
                    <button type="button" className="cancel-button">
                        Cancel
                    </button>
                    <button type="submit" className="add-button">
                        Add
                    </button>
                </div>
            </form>
        </div>
    );
};

export default BookPic;
