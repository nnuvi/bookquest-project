// src/pages/ProfileView.jsx
import React from 'react';
import './ProfileView.css';

const ProfileView = () => {
    const books = [
        { id: 1, name: "Book 1", author: "Author 1" },
        { id: 2, name: "Book 2", author: "Author 2" },
        { id: 3, name: "Book 3", author: "Author 3" },
    ];

    return (
        <div className="profile-view-container">
            <div className="profile-header">
                <div className="profile-pic">Profile Pic</div>
                <div className="profile-info">
                    <h2>100 Books</h2>
                    <h2>19 Friends</h2>
                    <button className="connect-button">Connect</button>
                </div>
            </div>

            <div className="profile-books">
                <h2>Books</h2>
                <div className="book-list">
                    {books.map((book) => (
                        <div className="book-card" key={book.id}>
                            <div className="book-image">Image</div>
                            <p><strong>{book.name}</strong></p>
                            <p>{book.author}</p>
                            <button className="borrow-button">Borrow</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProfileView;

