import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../../style/Account/Login.scss";
import logo_dark from "../../style/img/login_logo_dark.png";
import logo_light from "../../style/img/login_logo_light.png";
import axios from 'axios';  // Axios 추가

function Login({ isDarkMode, setIsLoggedIn }) {
  const [isFocused1, setIsFocused1] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        username,
        password
      }, { withCredentials: true });  // withCredentials 추가
      setMessage(response.data.message);
      if (response.status === 200) {
        setIsLoggedIn(true);
        navigate('/'); // 로그인 성공 시 홈으로 이동
      }
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage('로그인 요청 중 오류가 발생했습니다.');
      }
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
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <p className={isFocused2 ? 'focused' : ''}>비밀번호</p>
          <input 
            type='password' 
            className={`login_input ${isDarkMode ? 'dark-mode' : ''}`}
            onFocus={() => setIsFocused2(true)} 
            onBlur={() => setIsFocused2(false)}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className={`loginBtn ${isDarkMode ? 'dark-mode' : ''}`} onClick={handleLogin}>로그인</button>
          
        </div>
        <div className='login_menu'>
          <Link to="/FindPassword" className={`login_link ${isDarkMode ? 'dark-mode' : ''}`}>비밀번호찾기</Link>
          <Link to="/FindId" className={`login_link ${isDarkMode ? 'dark-mode' : ''}`}>아이디찾기</Link>
          <Link to="/SignUp" className={`login_link ${isDarkMode ? 'dark-mode' : ''}`}>회원가입</Link>
        </div>
      </div>
    </div>
    </>
  );
}

export default Login;