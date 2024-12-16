// src/pages/Home.jsx
import './Home.css';

const Home = () => {
    const books = [
        { id: 1, name: 'Book 1', image: '/images/book1.jpg' },
        { id: 2, name: 'Book 2', image: '/images/book2.jpg' },
        { id: 3, name: 'Book 3', image: '/images/book3.jpg' },
        // Add more books
    ];
    

    return (
        <div className="home-container">
            <div className='flex-[4_4_0] mr-auto border-r border-gray-700 min-h-screen '> 
            <header className="home-header">BookQuest</header>
            </div>

            <div className="book-grid">
                {books.map(book => (
                    <div className="book-card" key={book.id}>
                        <img src={book.image} alt={book.name} />
                        <p>{book.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
   
};

export default Home;

