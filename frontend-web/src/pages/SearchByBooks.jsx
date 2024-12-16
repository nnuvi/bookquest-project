// src/pages/SearchByBooks.jsx
import React, { useState } from 'react';
import './SearchByBooks.css';

const SearchByBooks = () => {
    const [search, setSearch] = useState('');
    const books = [
        { id: 1, name: "Book 1", author: "Author 1", username: "User1" },
        { id: 2, name: "Book 2", author: "Author 2", username: "User2" },
        { id: 3, name: "Book 3", author: "Author 3", username: "User3" },
    ];

    const filteredBooks = books.filter((book) =>
        book.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="search-by-books-container">
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search books..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <div className="book-list">
                {filteredBooks.map((book) => (
                    <div className="book-card" key={book.id}>
                        <div className="book-image">Image</div>
                        <p><strong>{book.name}</strong></p>
                        <p>{book.author}</p>
                        <p>{book.username}</p>
                        <button className="borrow-button">Borrow</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchByBooks;

