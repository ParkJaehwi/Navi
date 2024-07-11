import React, { useState, useEffect } from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import "../../style/Service/Header.scss";
import navi_dark from "../../style/img/Navi_dark_logo.png";
import navi_light from "../../style/img/Navi_light_logo.png";
import { FaSun, FaMoon } from "react-icons/fa";
import axios from 'axios';

function Header({ isDarkMode, toggleDarkMode, isLoggedIn, setIsLoggedIn}) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/'); // 클릭 시 이동할 경로
  };


  useEffect(() => {
    // 세션 확인을 위한 API 호출
    const checkSession = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/check_session', { withCredentials: true });
        if (response.data.logged_in) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Error checking session:", error);
      }
    };
    checkSession();
  }, []);

  useEffect(() => {
    console.log('isLoggedIn:', isLoggedIn);
  }, [isLoggedIn]);
  
  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/api/logout', {}, { withCredentials: true });
      setIsLoggedIn(false);
      alert('로그아웃 되었습니다.');
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };


  return (
    <header className={`Header ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className='headerBar'>
        <img src={isDarkMode ? navi_dark : navi_light} className='headerLogo' onClick={handleClick}/>
        <Link to="/Travel" className={`headerBtn ${isDarkMode ? 'dark-mode' : ''}`}>여행지</Link>
        {isLoggedIn ? (
          <>
            <Link to="/MyPage" className={`headerBtn ${isDarkMode ? 'dark-mode' : ''}`}>마이페이지</Link>
            <Link to="/" onClick={handleLogout} className={`headerBtn ${isDarkMode ? 'dark-mode' : ''}`}>로그아웃</Link>
          </>
        ) : (
          <Link to="/Login" className={`headerBtn ${isDarkMode ? 'dark-mode' : ''}`}>로그인</Link>
        )}
        
        <button onClick={toggleDarkMode} className={`darkBtn ${isDarkMode ? 'dark-mode' : ''}`}>
          {isDarkMode ? <FaSun /> : <FaMoon/>}
        </button>
      </div>
    </header>
  )
}

export default Header;