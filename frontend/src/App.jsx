import React from 'react'
import {Navigate, Route, Routes} from "react-router";
import HomePage from "./pages/HomePage.jsx"
import SignUpPage from './pages/SignUpPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import NotificationsPage from './pages/NotificationsPage.jsx';
import CallPage from './pages/CallPage.jsx';
import ChatPage from './pages/ChatPage.jsx';
import OnboardingPage from './pages/OnboardingPage.jsx';
import { Toaster } from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import {axiosInstance} from './lib/axios.js';
import PageLoader from './components/PageLoader.jsx';
import { getAuthUser } from './lib/api.js';
import useAuthUser from './hooks/useAuthUser.js';

const App = () => {

  const { isLoading, authUser } = useAuthUser

  
  if(isLoading) return <PageLoader />

  return (
    <div className="h-screen " data-theme="night">
      <Routes>
        <Route path="/" element={authUser ? <HomePage/> : <Navigate to={ "/login" } />} />
        <Route path="/signup" element={!authUser ? <SignUpPage/> : <Navigate to={ "/" }/>} />
        <Route path="/login" element={!authUser ? <LoginPage/> : <Navigate to={ "/" }/>} />
        <Route path="/notifications" element={authUser ? <NotificationsPage/> : <Navigate to={ "/login" } />} />
        <Route path="/call" element={authUser ? <CallPage/>  : <Navigate to={ "/login" } />} />
        <Route path="/chat" element={authUser ? <ChatPage/>  : <Navigate to={ "/login" } />} />
        <Route path="/onboarding" element={authUser ? <OnboardingPage/>  : <Navigate to={ "/login" } />} />
      
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
