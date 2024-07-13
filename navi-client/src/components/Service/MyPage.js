import React, { useState, useEffect } from 'react';
import "../../style/Service/MyPage.scss";
import { Link, useNavigate } from 'react-router-dom';
import naviImg from "../../style/img/Navi.png"; 

function MyPage({ isDarkMode, setIsLoggedIn }) {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
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
          setUserData(data);
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

    fetchUserData();
  }, [navigate, setIsLoggedIn]);

  const handlePasswordReset = () => {
    navigate('/reset_password'); // 비밀번호 재설정 페이지로 이동
  };

  return (
    <div className={`MyPage ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className={`myPageContent ${isDarkMode ? 'dark-mode' : ''}`}>
        <img src={naviImg} alt='Navi' className='mypageLogo'/>
        {isLoading ? (
          <p className={`myPageP ${isDarkMode ? 'dark-mode' : ''}`}>Loading...</p>
        ) : error ? (
          <p className={`myPageError ${isDarkMode ? 'dark-mode' : ''}`}>{error}</p>
        ) : userData ? (
          <div>
            <p className={`myPageID ${isDarkMode ? 'dark-mode' : ''}`}>{userData.username}</p>
            <p className={`myPageEmail ${isDarkMode ? 'dark-mode' : ''}`}>{userData.email}</p>
          </div>
        ) : null}
          <Link to="/MyMap" className={`mymapBtn btn-5 ${isDarkMode ? 'dark-mode' : ''}`}>
            저장된 여행지
          </Link>
          <Link to="/reset_password" onClick={handlePasswordReset} className={`resetpwBtn ${isDarkMode ? 'dark-mode' : ''}`}>
            비밀번호 재설정
          </Link>
      </div>
    </div>
  );
}

export default MyPage;
