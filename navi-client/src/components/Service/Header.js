import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../../style/Service/Header.scss";
import navi_dark from "../../style/img/Navi_dark_logo.png";
import navi_light from "../../style/img/Navi_light_logo.png";
import { FaSun, FaMoon } from "react-icons/fa";
function Header({ isDarkMode, toggleDarkMode }) {

  return (
    <header className={`Header ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className='headerBar'>
        <Link to="/"><img src={isDarkMode ? navi_dark : navi_light} className='headerLogo'/></Link>
        <Link to="/Travel" className={`headerBtn ${isDarkMode ? 'dark-mode' : ''}`}>여행지</Link>
        <Link to="/Login" className={`headerBtn ${isDarkMode ? 'dark-mode' : ''}`}>로그인</Link>
        <button onClick={toggleDarkMode} className={`darkBtn ${isDarkMode ? 'dark-mode' : ''}`}>
          {isDarkMode ? <FaSun /> : <FaMoon/>}
        </button>
      </div>
    </header>
  )
}

export default Header;