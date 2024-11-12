// src/components/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <aside>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/my-borrowed">My Borrowed</Link></li>
                <li><Link to="/my-lended">My Lended</Link></li>
                <li><Link to="/profile">Profile</Link></li>
            </ul>
        </aside>
    );
};

export default Sidebar;
