import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';


import Home from './pages/Home';
import BookDetail from './pages/BookDetail';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import Borrowed from './pages/Borrowed';
import Lended from './pages/Lended';
import AddBook from './AddBook';
import BookPic from './pages/BookPic';
import ProfilePic from './pages/ProfilePic';
import ChooseProfilePic from './pages/ChooseProfilePic';
import ProfileView from './pages/ProfileView';
import FriendList from './pages/FriendList';
import FriendListOthers from './pages/FriendListOthers';
import AddBookISBN from './pages/AddBookISBN';
import SearchByBooks from './pages/SearchByBooks';
import SearchByUsername from './pages/SearchByUsername';
import Notification from './Notification';


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/bookdetail" element={< BookDetail/>} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/edit-profile" element={<EditProfile />} />
                <Route path="/borrowed" element={<Borrowed />} />
                <Route path="/lended" element={<Lended />} />
                <Route path="/add-book" element={<AddBook />} />
                <Route path="/add-bookpic" element={<BookPic />} />
                <Route path="/profile-pic" element={<ProfilePic />} />
                <Route path="/choose-profile-pic" element={<ChooseProfilePic />} />
                <Route path="/profile-view" element={<ProfileView />} />
                <Route path="/friend-list" element={<FriendList />} />
                <Route path="/friend-list-others" element={<FriendListOthers />} />
                <Route path="/add-books-isbn" element={<AddBookISBN />} />
                <Route path="/search-books" element={<SearchByBooks />} />
                <Route path="/search-usernames" element={<SearchByUsername />} />
                <Route path="/notifications" element={<Notification />} />
                
            </Routes>
        </Router>
    );
};


function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App;
