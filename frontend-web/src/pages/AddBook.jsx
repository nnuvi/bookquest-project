// src/pages/AddBook.jsx
import React, { useState } from 'react';
import './AddBook.css';

const AddBook = () => {
    const [bookName, setBookName] = useState('');
    const [authorName, setAuthorName] = useState('');
    const [image, setImage] = useState(null);

    const handleAddBook = () => {
        if (!bookName || !authorName || !image) {
            alert('Please fill out all fields and upload an image!');
            return;
        }
        alert(`Book "${bookName}" by ${authorName} added successfully!`);
        setBookName('');
        setAuthorName('');
        setImage(null);
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };

    return (
        <div className="add-book-container">
            <h2>Add Manually</h2>
            <div className="add-book-header">
                <button className="cancel-button">Cancel</button>
                <button className="add-button" onClick={handleAddBook}>
                    Add
                </button>
            </div>
            <div className="image-upload-section">
                <div className="image-placeholder">
                    {image ? <img src={image} alt="Book" /> : 'Add Image'}
                </div>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="image-upload-input"
                />
            </div>
            <div className="form-section">
                <input
                    type="text"
                    placeholder="Book Name"
                    value={bookName}
                    onChange={(e) => setBookName(e.target.value)}
                    className="input-field"
                />
                <input
                    type="text"
                    placeholder="Author"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="input-field"
                />
            </div>
        </div>
    );
};

export default AddBook;

