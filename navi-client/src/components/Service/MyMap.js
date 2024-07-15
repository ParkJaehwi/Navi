import React, { useState, useEffect } from 'react';
// import "../../style/Service/MyMap.scss";
import { useNavigate } from 'react-router-dom';

function MyMap({ isDarkMode }) {
  const [likes, setLikes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLikes = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('http://localhost:5000/api/user_likes', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
          },
        });
        if (response.ok) {
          const data = await response.json();
          setLikes(data);
        } else if (response.status === 401) {
          navigate('/login');
        } else {
          throw new Error('좋아요한 글을 가져오는데 실패했습니다.');
        }
      } catch (error) {
        console.error('Error:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLikes();
  }, [navigate]);

  return (
    <div className={`MyMap ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className={`myMapContent ${isDarkMode ? 'dark-mode' : ''}`}>
        <h1>저장된 여행지</h1>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : likes.length > 0 ? (
          <div className="likesContainer">
            {likes.map((like) => (
              <div key={like.like_id} className={`likeItem ${isDarkMode ? 'dark-mode' : ''}`}>
                <h4>{like.title}</h4>
                <p>{like.content}</p>
                <img src={like.img} alt={like.title} className="likeImage" />
              </div>
            ))}
          </div>
        ) : (
          <p>저장된 여행지가 없습니다.</p>
        )}
      </div>
    </div>
  );
}

export default MyMap;
