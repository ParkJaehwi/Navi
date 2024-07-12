import React, { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import "../../style/Account/ResetPassword.scss";
import logo_dark from "../../style/img/login_logo_dark.png";
import logo_light from "../../style/img/login_logo_light.png";

function ResetPassword({ isDarkMode }) {
  const { username, email } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isFocused1, setIsFocused1] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);
  const navigate = useNavigate();

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setMessage('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/reset_password', {
        username,
        email,
        newPassword
      }, { withCredentials: true });

      if (response.status === 200) {
        alert('비밀번호가 성공적으로 변경되었습니다.');
        navigate('/login');
      } else {
        setMessage('비밀번호 변경에 실패했습니다.');
      }
    } catch (error) {
      setMessage('비밀번호 변경에 실패했습니다.');
    }
  };

  return (
    <div className='ResetPassword'>
      <div className={`resetpw_box ${isDarkMode ? 'dark-mode' : ''}`}>
      <Link to="/"><img src={isDarkMode ? logo_dark : logo_light} className='login_logo'/></Link>
        <div className='resetpw_main'>
          <p className={isFocused1 ? 'focused' : ''}>새 비밀번호</p>
          <input
            type='password'
            onFocus={() => setIsFocused1(true)} 
            onBlur={() => setIsFocused1(false)}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className={`resetpw_input ${isDarkMode ? 'dark-mode' : ''}`}
          />
          <p className={isFocused2 ? 'focused' : ''}>비밀번호 확인</p>
          <input
            type='password'
            onFocus={() => setIsFocused2(true)} 
            onBlur={() => setIsFocused2(false)}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`resetpw_input ${isDarkMode ? 'dark-mode' : ''}`}
          />
          <button onClick={handleResetPassword} className={`resetpwBtn ${isDarkMode ? 'dark-mode' : ''}`}>
            비밀번호 재설정
          </button>
          {message && <p>{message}</p>}
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;