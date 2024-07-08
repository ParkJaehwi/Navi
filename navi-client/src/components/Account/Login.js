import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../../style/Account/Login.scss";
import logo_dark from "../../style/img/login_logo_dark.png";
import logo_light from "../../style/img/login_logo_light.png";

function Login() {
  const [isFocused1, setIsFocused1] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('dark-mode');
    return savedMode === 'enabled';
  });

  return (
    <div className='Login'>
      <div className={`login_box ${isDarkMode ? 'dark-mode' : ''}`}>
        <Link to="/"><img src={isDarkMode ? logo_dark : logo_light} className='login_logo'/></Link>
        <div className='login_main'>
          <p className={isFocused1 ? 'focused' : ''}>아이디</p>
          <input 
            type='text' 
            className={`login_input ${isDarkMode ? 'dark-mode' : ''}`}
            onFocus={() => setIsFocused1(true)} 
            onBlur={() => setIsFocused1(false)}
          />
          <p className={isFocused2 ? 'focused' : ''}>비밀번호</p>
          <input 
            type='text' 
            className={`login_input ${isDarkMode ? 'dark-mode' : ''}`}
            onFocus={() => setIsFocused2(true)} 
            onBlur={() => setIsFocused2(false)}
          />
          <button className={`loginBtn ${isDarkMode ? 'dark-mode' : ''}`}>로그인</button>
        </div>
        <div className='login_menu'>
          <Link to="/FindPassword" className={`login_link ${isDarkMode ? 'dark-mode' : ''}`}>비밀번호찾기</Link>
          <Link to="/FindId" className={`login_link ${isDarkMode ? 'dark-mode' : ''}`}>아이디찾기</Link>
          <Link to="/SignUp" className={`login_link ${isDarkMode ? 'dark-mode' : ''}`}>회원가입</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;