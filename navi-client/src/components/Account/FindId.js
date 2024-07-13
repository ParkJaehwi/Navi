// FindId.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../../style/Account/FindId.scss";
import logo_dark from "../../style/img/login_logo_dark.png";
import logo_light from "../../style/img/login_logo_light.png";
import axios from 'axios';


function FindId({ isDarkMode }) {
  const [isFocused, setIsFocused] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleFindId = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/find_username', {
        email
      }, { withCredentials: true }); // withCredentials 추가
      if (response.status === 200) {
        alert(`아이디: ${response.data.username}`);
      } else {
        setMessage('회원정보가 없습니다.');
      }
    } catch (error) {
      setMessage('회원정보가 없습니다.');
    }
  };

  useEffect(() => {
    if (message) {
      alert(message);
      setMessage('');  // alert 후 메시지를 초기화하여 다시 시도할 때 alert가 뜨도록 함
    }
  }, [message]);

  return (
    <>
    <div className='FindId'>
      <div className={`findid_box ${isDarkMode ? 'dark-mode' : ''}`}>
        <Link to="/"><img src={isDarkMode ? logo_dark : logo_light} className='findid_logo' alt='logo'/></Link>
        <div className='findid_main'>
          <p className={isFocused ? 'focused' : ''}>이메일</p>
          <input 
            type='email' 
            className={`findid_input ${isDarkMode ? 'dark-mode' : ''}`}
            onFocus={() => setIsFocused(true)} 
            onBlur={() => setIsFocused(false)}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className={`findidBtn ${isDarkMode ? 'dark-mode' : ''}`} onClick={handleFindId}>아이디 찾기</button>
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