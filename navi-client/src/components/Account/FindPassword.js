// FindPassword.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../../style/Account/FindPassword.scss";
import logo_dark from "../../style/img/login_logo_dark.png";
import logo_light from "../../style/img/login_logo_light.png";

function FindPassword() {
  const [isFocused, setIsFocused] = useState({
    id: false,
    email: false
  });
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('dark-mode');
    return savedMode === 'enabled';
  });

  return (
    <div className='FindPassword'>
      <div className={`findpw_box ${isDarkMode ? 'dark-mode' : ''}`}>
        <Link to="/"><img src={isDarkMode ? logo_dark : logo_light} className='findpw_logo'/></Link>
        <div className='findpw_main'>
          <p className={isFocused.id ? 'focused' : ''}>아이디</p>
          <input 
            type='text' 
            className={`findpw_input ${isDarkMode ? 'dark-mode' : ''}`}
            onFocus={() => setIsFocused({...isFocused, id: true})} 
            onBlur={() => setIsFocused({...isFocused, id: false})}
          />
          <p className={isFocused.email ? 'focused' : ''}>이메일</p>
          <input 
            type='email' 
            className={`findpw_input ${isDarkMode ? 'dark-mode' : ''}`}
            onFocus={() => setIsFocused({...isFocused, email: true})} 
            onBlur={() => setIsFocused({...isFocused, email: false})}
          />
          <button className={`findpwBtn ${isDarkMode ? 'dark-mode' : ''}`}>비밀번호 찾기</button>
        </div>
        <div className='findpw_menu'>
          <Link to="/login" className={`findpw_link ${isDarkMode ? 'dark-mode' : ''}`}>로그인으로 돌아가기</Link>
        </div>
      </div>
    </div>
  );
}

export default FindPassword;