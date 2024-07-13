import React, { useState } from 'react';
import Footer from './Footer';
import "../../style/Service/MyPage.scss";
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function MyPage({ isDarkMode, setIsLoggedIn }) {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const fetchUserData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:5000/api/user', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        Swal.fire({
          title: '사용자 정보',
          html: `<p><strong>아이디:</strong> ${data.username}</p><p><strong>이메일:</strong> ${data.email}</p>`,
          icon: 'info',
          iconHtml: '<span class="swal2-icon swal2-info" style="color: yellow;">!</span>', // 아이콘 색상 노란색으로 설정
        });
      } else if (response.status === 401) {
        setIsLoggedIn(false);
        navigate('/login');
      } else {
        throw new Error('사용자 정보를 가져오는데 실패했습니다.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return (
      <div>
        <p>에러: {error}</p>
        <button className="fetchUserDataButton" onClick={fetchUserData}>다시 시도</button>
      </div>
    );
  }

  return (
    <div className={`myPageWrapper ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="myPageContent">
        <h1 className="myPageH1">마이페이지</h1>
        <div className="buttonGroup">
          <button className="fetchUserDataButton" onClick={fetchUserData}>
            사용자 정보 가져오기
          </button>
          <Link to="/reset_password" className="resetpwBtn">
            비밀번호 재설정
          </Link>
        </div>
      </div>
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
}

export default MyPage;
