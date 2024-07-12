import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../../style/Account/SignUp.scss";
import logo_dark from "../../style/img/login_logo_dark.png";
import logo_light from "../../style/img/login_logo_light.png";
import { GrCheckmark, GrClose } from "react-icons/gr";
import axios from 'axios';  // Axios 추가

function SignUp({ isDarkMode }) {
  const [isFocused1, setIsFocused1] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);
  const [isFocused3, setIsFocused3] = useState(false);
  const [isFocused4, setIsFocused4] = useState(false);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (confirmPassword !== '') {
      setPasswordMatch(password === confirmPassword);
    } else {
      setPasswordMatch(null);
    }
  }, [password, confirmPassword]);

  const handleSignup = async () => {
    if (!passwordMatch) {
      setMessage('비밀번호가 일치하지 않습니다.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/api/signup', {
        username,
        password,
        email
      });
      setMessage(response.data.message);
      if (response.status === 201) {
        window.alert('회원가입이 완료되었습니다!');  //sweetalert
        navigate('/login'); // 회원가입 성공 시 로그인 페이지로 이동
      }
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage('회원가입 요청 중 오류가 발생했습니다.');
      }
    }
  };

  return (
    <>
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
            value={username}  // 값 추가
            onChange={(e) => setUsername(e.target.value)}
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
            value={email}  // 값 추가
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleSignup} className={`signupBtn ${isDarkMode ? 'dark-mode' : ''}`}>회원가입</button>
          {message && <p>{message}</p>}
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