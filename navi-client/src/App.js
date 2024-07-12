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

import "./App.css";
function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('dark-mode');
    return savedMode === 'enabled';
  });

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
        <Route path="/Login" element={<Login isDarkMode={isDarkMode} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} />
        <Route path="/SignUp" element={<SignUp isDarkMode={isDarkMode}/>} />
        <Route path="/FindId" element={<FindId isDarkMode={isDarkMode}/>} />
        <Route path="/FindPassword" element={<FindPassword isDarkMode={isDarkMode}/>} />
        <Route path="/MyPage" element={<MyPage isDarkMode={isDarkMode} setIsLoggedIn={setIsLoggedIn} />} />
      </Routes>
    </Router>
  );
}

export default App;
