import React, { useEffect, useState, Button } from "react";
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

  return (
    <Router>
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode}/>
      <Routes>
        <Route path="/" element={<Home isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode}/>} />
        <Route path="/Travel" element={<Travel isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode}/>} />
        <Route path="/Navi" element={<Navi isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode}/>} />
        <Route path="/Custom" element={<Custom isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode}/>} />
        <Route path="/Login" element={<Login isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode}/>} />
        <Route path="/SignUp" element={<SignUp isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode}/>} />
        <Route path="/FindId" element={<FindId isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode}/>} />
        <Route path="/FindPassword" element={<FindPassword isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode}/>} />
      </Routes>
    </Router>
  );
}

export default App;
