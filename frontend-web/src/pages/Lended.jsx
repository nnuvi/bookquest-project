// src/pages/Lended.jsx
import React from 'react';
import './Lended.css';

const Lended = () => {
    // Sample data for lended books
    const lendedBooks = [
        { id: 1, name: "Book Name 1", author: "Author 1", date: "2024-10-15" },
        { id: 2, name: "Book Name 2", author: "Author 2", date: "2024-11-05" },
        { id: 3, name: "Book Name 3", author: "Author 3", date: "2024-11-20" },
    ];

    const handleNotify = (bookName) => {
        alert(`Reminder sent for: ${bookName}`);
    };

    return (
        <div className="lended-container">
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
                <button className="tab-button">Borrowed</button>
                <button className="tab-button active">Lended</button>
                <button className="tab-button">Add+</button>
            </div>

            <div className="lended-books">
                {lendedBooks.map((book) => (
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

export default Lended;
