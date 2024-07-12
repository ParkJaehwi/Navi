import React from 'react';
import Footer from './Footer';
import axios from 'axios';
import "../../style/Service/MyPage.scss";
import { Link, useNavigate } from 'react-router-dom';

function MyPage({ isDarkMode, setIsLoggedIn }) {

  const navigate = useNavigate();
  
  const handlePasswordReset = () => {
    navigate('/reset_password'); // 비밀번호 재설정 페이지로 이동
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/api/logout', {}, { withCredentials: true });
      setIsLoggedIn(false);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div>
      <div className="myPageContent">
        <h1>마이페이지</h1>
        <p>여기에서 사용자 정보를 확인하고 수정할 수 있습니다.</p>
        <Link to="/" onClick={handleLogout} className={`headerBtn ${isDarkMode ? 'dark-mode' : ''}`}>로그아웃</Link>
        <Link to="/reset_password" onClick={handlePasswordReset} className={`resetpwBtn ${isDarkMode ? 'dark-mode' : ''}`}>비밀번호 재설정</Link>
      <Link to="/">홈으로 돌아가기</Link>
      </div>
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
}

export default MyPage;