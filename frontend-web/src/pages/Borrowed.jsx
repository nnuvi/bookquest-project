// src/pages/Borrowed.jsx

import React from 'react';
import './Borrowed.css';

const Borrowed = () => {
    // Sample data for borrowed books
    const borrowedBooks = [
        { id: 1, name: "Book Name 1", author: "Author 1", date: "2024-11-01" },
        { id: 2, name: "Book Name 2", author: "Author 2", date: "2024-11-10" },
        { id: 3, name: "Book Name 3", author: "Author 3", date: "2024-11-15" },
    ];

    const handleNotify = (bookName) => {
        alert(`Notification sent for: ${bookName}`);
    };

    return (
        <div className="borrowed-container">
            <div className="profile-summary">
                <div className="profile-pic">Profile Pic</div>
                <div className="profile-stats">
                    <h2>100 Books</h2>
                    <h2>19 Friends</h2>
                </div>
                <button className="edit-button">Edit</button>
            </div>

            <div className="tabs">
                <button className="tab-button">List</button>
                <button className="tab-button active">Borrowed</button>
                <button className="tab-button">Lended</button>
                <button className="tab-button">Add+</button>
            </div>

            <div className="borrowed-books">
                {borrowedBooks.map((book) => (
                    <div className="book-card" key={book.id}>
                        <div className="book-image">Image</div>
                        <p><strong>Book Name:</strong> {book.name}</p>
                        <p><strong>Author:</strong> {book.author}</p>
                        <p><strong>Date:</strong> {book.date}</p>
                        <button
                            className="notify-button"
                            onClick={() => handleNotify(book.name)}
                        >
                            Notify
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Borrowed;
