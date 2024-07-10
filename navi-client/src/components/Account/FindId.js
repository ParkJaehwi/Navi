// FindId.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../../style/Account/FindId.scss";
import logo_dark from "../../style/img/login_logo_dark.png";
import logo_light from "../../style/img/login_logo_light.png";


function FindId({ isDarkMode }) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <>
    <div className='FindId'>
      <div className={`findid_box ${isDarkMode ? 'dark-mode' : ''}`}>
        <Link to="/"><img src={isDarkMode ? logo_dark : logo_light} className='findid_logo'/></Link>
        <div className='findid_main'>
          <p className={isFocused ? 'focused' : ''}>이메일</p>
          <input 
            type='email' 
            className={`findid_input ${isDarkMode ? 'dark-mode' : ''}`}
            onFocus={() => setIsFocused(true)} 
            onBlur={() => setIsFocused(false)}
          />
          <button className={`findidBtn ${isDarkMode ? 'dark-mode' : ''}`}>아이디 찾기</button>
        </div>
        <div className='findid_menu'>
          <Link to="/login" className={`findid_link ${isDarkMode ? 'dark-mode' : ''}`}>로그인으로 돌아가기</Link>
          <Link to="/FindPassword" className={`findid_link ${isDarkMode ? 'dark-mode' : ''}`}>비밀번호 찾기</Link>
        </div>
      </div>
    </div>
    </>
  );
}

export default FindId;