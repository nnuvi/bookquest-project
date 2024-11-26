// src/pages/Home.jsx
import React from 'react';
import './Home.css';
import React from 'react';



const Home = () => {
    const books = [
        { id: 1, name: 'Book 1', image: '/images/book1.jpg' },
        { id: 2, name: 'Book 2', image: '/images/book2.jpg' },
        { id: 3, name: 'Book 3', image: '/images/book3.jpg' },
        // Add more books
    ];
    

    return (
        <div className="home-container">
            <header className="home-header">BookQuest</header>
            <div className="book-grid">
                {books.map(book => (
                    <div className="book-card" key={book.id}>
                        <img src={book.image} alt={book.name} />
                        <p>{book.name}</p>
                        <h1>Welcome to BookQuest!</h1>
                    </div>
                ))}
            </div>
        </div>
    );
   
};

export default Home;

