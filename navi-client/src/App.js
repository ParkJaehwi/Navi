import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./components/Account/Login";
import FindId from "./components/Account/FindId";
import SignUp from "./components/Account/SignUp";
import FindPassword from "./components/Account/FindPassword";
import Home from "./components/Service/Home";
import Travel from "./components/Service/Travel";
import Navi from "./components/Service/Navi";
import Custom from "./components/Service/Custom";
import Header from "./components/Service/Header";
import MyPage from "./components/Service/MyPage";
import ResetPassword from "./components/Account/ResetPassword";
import { Navigate } from 'react-router-dom';


import "./App.css";
function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('dark-mode');
    return savedMode === 'enabled';
  });

  const ProtectedRoute = ({ isLoggedIn, children }) => {
    return isLoggedIn ? children : <Navigate to="/Login" />;
  };
  
  const PublicRoute = ({ isLoggedIn, children }) => {
    return isLoggedIn ? <Navigate to="/MyPage" /> : children;
  };


  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('dark-mode', 'enabled');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('dark-mode', 'disabled');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  const [isLoggedIn, setIsLoggedIn] = useState(null);

  return (
    <Router>
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
      <Routes>
        <Route path="/" element={<Home isDarkMode={isDarkMode}/>} />
        <Route path="/Travel" element={<Travel isDarkMode={isDarkMode}/>} />
        <Route path="/Navi" element={<Navi isDarkMode={isDarkMode}/>} />
        <Route path="/Custom" element={<Custom isDarkMode={isDarkMode}/>} />
        
        <Route path="/Login" element={
          <PublicRoute isLoggedIn={isLoggedIn}>
            <Login isDarkMode={isDarkMode} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
          </PublicRoute>
        } />
        <Route path="/SignUp" element={
          <PublicRoute isLoggedIn={isLoggedIn}>
            <SignUp isDarkMode={isDarkMode}/>
          </PublicRoute>
        } />
        <Route path="/FindId" element={
          <PublicRoute isLoggedIn={isLoggedIn}>
            <FindId isDarkMode={isDarkMode}/>
          </PublicRoute>
        } />
        <Route path="/FindPassword" element={
          <PublicRoute isLoggedIn={isLoggedIn}>
            <FindPassword isDarkMode={isDarkMode}/>
          </PublicRoute>
        } />

        <Route path="/MyPage" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <MyPage isDarkMode={isDarkMode} setIsLoggedIn={setIsLoggedIn} />
          </ProtectedRoute>
        } />

        <Route path="/reset_password/:username/:email" element={<ResetPassword isDarkMode={isDarkMode}/>} />
        <Route path="/reset_password" element={<ResetPassword isDarkMode={isDarkMode}/>} />
      </Routes>
    </Router>
  );
}

export default App;