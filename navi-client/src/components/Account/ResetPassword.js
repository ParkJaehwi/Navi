import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
// import "../../style/Account/ResetPassword.scss";

function ResetPassword({ isDarkMode }) {
  const { username, email } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
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
        <h2>비밀번호 재설정</h2>
        <input
          type='password'
          placeholder='새 비밀번호'
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className={`resetpw_input ${isDarkMode ? 'dark-mode' : ''}`}
        />
        <input
          type='password'
          placeholder='비밀번호 확인'
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
  );
}

export default ResetPassword;
