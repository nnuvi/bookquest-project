import React, { createContext, useState, useContext, useEffect } from 'react';
import api from "@/utils/api";

// Create the context
const UserContext = createContext();

// UserContext provider component
export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [borrowedBookId, setBorrowedBookId] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    bio: "",
  });

  const getMe = async () => {
    try {
      const res = await api.get('/auth/me');
      console.log("user current: ", res.data);
      const data = res.data;
      const borrowedBookId = data.bookCollection.map((book) => book.borrowedId);
      console.log("borrowedBookId", borrowedBookId);
      setBorrowedBookId(borrowedBookId);
      setFormData(data);
      setUserId(data._id); // Store user ID
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMe(); // Call the function to get the current user info when the app starts
  }, []);

  return (
    <UserContext.Provider value={{ userId, formData, borrowedBookId }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => {
  return useContext(UserContext);
};
