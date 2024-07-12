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
        checkSessionAndRedirect(); // 비밀번호 변경 후 세션 확인 및 리다이렉트

      } else {
        setMessage('비밀번호 변경에 실패했습니다.');
      }
    } catch (error) {
      setMessage('비밀번호 변경에 실패했습니다.');
    }
  };

  const checkSessionAndRedirect = async () => { // 세션 확인 및 리다이렉트 함수 추가
    try {
      const response = await axios.get('http://localhost:5000/api/check_session', { withCredentials: true });
      if (response.data.logged_in) {
        navigate('/'); // 세션이 있으면 홈으로 이동
      } else {
        navigate('/login'); // 세션이 없으면 로그인 페이지로 이동
      }
    } catch (error) {
      console.error('Error checking session:', error);
      navigate('/login'); // 에러 발생 시 로그인 페이지로 이동
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