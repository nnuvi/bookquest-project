// src/pages/BookDetail.jsx
import React from 'react';
import './BookDetail.css';

import { useParams } from 'react-router-dom';

const BookDetails = () => {
    const { id } = useParams();
    console.log("Book ID:", id); // Use this ID to fetch book details dynamically
    return (
        <div>
            <h2>Book Details for ID: {id}</h2>
        </div>
    );
};

const BookDetail = () => {
    // Replace these placeholders with dynamic data as needed
    const book = {
        name: "Sample Book",
        author: "Author Name",
        isbn: "123-456-789",
        username: "User123",
        image: "/path-to-image.jpg", // Replace with your actual image path
    };

    const handleBorrow = () => {
        alert(`You have borrowed: ${book.name}`);
    };

    const handleBack = () => {
        // Logic for navigating back, such as using React Router
        console.log("Back button clicked");
    };

    return (
        <div className="book-detail-container">
            <button className="back-button" onClick={handleBack}>Back</button>
            <div className="book-detail-content">
                <img src={book.image} alt={book.name} className="book-image" />
                <div className="book-info">
                    <p><strong>Name:</strong> {book.name}</p>
                    <p><strong>Author:</strong> {book.author}</p>
                    <p><strong>ISBN:</strong> {book.isbn}</p>
                    <p><strong>Username:</strong> {book.username}</p>
                </div>
                <button className="borrow-button" onClick={handleBorrow}>Borrow</button>
            </div>
        </div>
    );
};

export default BookDetail;
