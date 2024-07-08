import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoMdLogIn } from "react-icons/io";
import "../../style/Service/Header.scss";
import navi_dark from "../../style/img/Navi_dark_logo.png";
import navi_light from "../../style/img/Navi_light_logo.png";
import { FaSun, FaMoon } from "react-icons/fa";

function Header() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('dark-mode');
    return savedMode === 'enabled';
  });


  useEffect(() => { 
    // 다크 모드 클래스를 body에 추가합니다.
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('dark-mode', 'enabled');
    } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('dark-mode', 'disabled');
    }
  }, [isDarkMode]);

  return (
    <header className='Header'>
      <div className='headerBar'>
        <Link to="/"><img src={isDarkMode ? navi_dark : navi_light} className='headerLogo'/></Link>
        <Link to="/Login" className='headerBtn'><IoMdLogIn /></Link>
        <button onClick={() => setIsDarkMode(prevMode => !prevMode)} className="toggleBtn">
          {isDarkMode ? <FaSun style={{color:"white"}}/> : <FaMoon style={{color:"black"}}/>}
        </button>
      </div>
      
    </header>
  )
}

export default Header;