import { useState } from 'react'
import { Routes, Route,Navigate } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/auth/login'
//import SignUpPage from './pages/auth/signup/SignUpPage';
//import Sidebar from './components/common/Sidebar';
//import RightPanel from './components/common/RightPanel';
//import NotificationPage from './pages/notification/NotificationPage';
//import ProfilePage from './pages/profile/ProfilePage';
import { Toaster } from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
//import LoadingSpinner from "./components/common/LoadingSpinner";


function App() {

	const { data: authUser, isLoading, isError, error } = useQuery({
		// we use queryKey to give a unique name to our query and refer to it later
		queryKey: ["authUser"],
		queryFn: async () => {
			try {
				const res = await fetch("/api/auth/me");
				const data = await res.json();
				console.log(data);
				if (data.error) return null;
				if (!res.ok) {
					throw new Error(data.error || "Something went wrong");
				}
				return data;
			} catch (error) {
				throw error;
			}
		},
		retry: false,
	});

	if (isLoading) {
		return (
			<div className='h-screen flex justify-center items-center'>
				<p>Loading...</p>
			</div>
		);
	}

  return (
    <div className='flex max-w-6xl mx-auto'>
      {/*    */}
      <Routes>
        <Route path='/' element={authUser ? <Home /> : <Navigate to='/login' replace />} />
        <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to='/' replace />} />
      </Routes>

    </div>
  )
}

export default App;
