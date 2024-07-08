import React, { useEffect, useState, Button } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./components/Account/Login";
import FindId from "./components/Account/FindId";
import SignUp from "./components/Account/SignUp";
import FindPassword from "./components/Account/FindPassword";
import Home from "./components/Service/Home";

import "./App.css";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/FindId" element={<FindId />} />
        <Route path="/FindPassword" element={<FindPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
