// src/components/Sidebar.jsx
import React from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <aside className="sidebar">
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link to="/notifications">Notifications</Link></li>
                    <li><Link to="/search-books">Search Books</Link></li>
                    <li><Link to="/add-book">Add Book</Link></li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;

