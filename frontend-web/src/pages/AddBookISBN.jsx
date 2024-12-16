// src/pages/AddBookISBN.jsx
import React, { useState } from 'react';
import './AddBookISBN.css';

const AddBookISBN = () => {
    const [isbn, setIsbn] = useState('');

    const handleScan = () => {
        alert(`ISBN: ${isbn} added successfully!`);
        setIsbn('');
    };

    return (
        <div className="add-book-isbn-container">
            <h2>Add Books</h2>
            <div className="scanner">
                <div className="barcode-box">BARCODE</div>
                <input
                    type="text"
                    placeholder="Enter ISBN manually"
                    value={isbn}
                    onChange={(e) => setIsbn(e.target.value)}
                />
                <button className="scan-button" onClick={handleScan}>
                    +
                </button>
            </div>
        </div>
    );
};

export default AddBookISBN;
