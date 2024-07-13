// FindPassword.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../../style/Account/FindPassword.scss";
import logo_dark from "../../style/img/login_logo_dark.png";
import logo_light from "../../style/img/login_logo_light.png";
import axios from 'axios';


function FindPassword({ isDarkMode }) {
  const [isFocused, setIsFocused] = useState({
    id: false,
    email: false
  });
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleFindPassword = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/find_password', {
        username,
        email
      }, { withCredentials: true }); // withCredentials 추가
      if (response.status === 200) {
        navigate(`/reset_password/${username}/${email}`);
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
    <div className='FindPassword'>
      <div className={`findpw_box ${isDarkMode ? 'dark-mode' : ''}`}>
        <Link to="/"><img src={isDarkMode ? logo_dark : logo_light} className='findpw_logo' alt='logo'/></Link>
        <div className='findpw_main'>
          <p className={isFocused.id ? 'focused' : ''}>아이디</p>
          <input 
            type='text' 
            className={`findpw_input ${isDarkMode ? 'dark-mode' : ''}`}
            onFocus={() => setIsFocused({...isFocused, id: true})} 
            onBlur={() => setIsFocused({...isFocused, id: false})}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <p className={isFocused.email ? 'focused' : ''}>이메일</p>
          <input 
            type='email' 
            className={`findpw_input ${isDarkMode ? 'dark-mode' : ''}`}
            onFocus={() => setIsFocused({...isFocused, email: true})} 
            onBlur={() => setIsFocused({...isFocused, email: false})}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className={`findpwBtn ${isDarkMode ? 'dark-mode' : ''}`} onClick={handleFindPassword}>비밀번호 찾기</button>
        </div>
        <div className='findpw_menu'>
          <Link to="/login" className={`findpw_link ${isDarkMode ? 'dark-mode' : ''}`}>로그인으로 돌아가기</Link>
        </div>
      </div>
    </div>
    </>
  );
}

export default FindPassword;