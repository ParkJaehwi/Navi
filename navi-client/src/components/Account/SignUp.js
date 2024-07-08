import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../../style/Account/SignUp.scss";
import logo_dark from "../../style/img/login_logo_dark.png";
import logo_light from "../../style/img/login_logo_light.png";
import { GrCheckmark, GrClose } from "react-icons/gr";
import Header from "../Service/Header";

function SignUp({ isDarkMode, toggleDarkMode }) {
  const [isFocused1, setIsFocused1] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);
  const [isFocused3, setIsFocused3] = useState(false);
  const [isFocused4, setIsFocused4] = useState(false);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(null);

  useEffect(() => {
    if (confirmPassword !== '') {
      setPasswordMatch(password === confirmPassword);
    } else {
      setPasswordMatch(null);
    }
  }, [password, confirmPassword]);

  return (
    <>
    <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode}/>
    <div className='SignUp'>
      <div className={`signup_box ${isDarkMode ? 'dark-mode' : ''}`}>
        <Link to="/"><img src={isDarkMode ? logo_dark : logo_light} className='signup_logo'/></Link>
        <div className='signup_main'>
          <p className={isFocused1 ? 'focused' : ''}>아이디</p>
          <input 
            type='text' 
            className={`signup_input ${isDarkMode ? 'dark-mode' : ''}`}
            onFocus={() => setIsFocused1(true)} 
            onBlur={() => setIsFocused1(false)}
          />
          <p className={isFocused2 ? 'focused' : ''}>비밀번호</p>
          <input 
            type='password' 
            className={`signup_input ${isDarkMode ? 'dark-mode' : ''}`}
            onFocus={() => setIsFocused2(true)} 
            onBlur={() => setIsFocused2(false)}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className={isFocused3 ? 'focused' : ''}>비밀번호 확인</p>
          <div className="password-confirm-container">
            <input 
              type='password' 
              className={`signup_input ${isDarkMode ? 'dark-mode' : ''}`}
              onFocus={() => setIsFocused3(true)} 
              onBlur={() => setIsFocused3(false)}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {passwordMatch !== null && (
              <span className={`password-match-indicator ${passwordMatch ? 'match' : 'mismatch'}`}>
                {passwordMatch ? <GrCheckmark /> : <GrClose/>}
              </span>
            )}
          </div>
          <p className={isFocused4 ? 'focused' : ''}>이메일</p>
          <input 
            type='text' 
            className={`signup_input ${isDarkMode ? 'dark-mode' : ''}`}
            onFocus={() => setIsFocused4(true)} 
            onBlur={() => setIsFocused4(false)}
          />
          <button className={`signupBtn ${isDarkMode ? 'dark-mode' : ''}`}>회원가입</button>
        </div>
        <div className='signup_menu'>
          <Link to="/Login" className={`signup_link ${isDarkMode ? 'dark-mode' : ''}`}>로그인으로 돌아가기</Link>
        </div>
      </div>
    </div>
    </>
  );
}

export default SignUp;