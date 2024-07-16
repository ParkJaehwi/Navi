import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { BsBookmark, BsFillBookmarkCheckFill } from "react-icons/bs";
import axios from 'axios';
import '../../style/Service/MyMap.scss';

const MySwal = withReactContent(Swal);

const categories = {
  "전체": "ALL",
  "자연": "A0101",
  "역사": "A0201",
  "휴양": "A0202",
  "체험": "A0203",
  "산업": "A0204",
  "건축/조형물": "A0205",
  "문화시설": "A0206",
  "육상 레저": "A0302",
  "수상 레저": "A0303",
  "항공 레저": "A0304"
};

function MyMap({ isDarkMode }) {
  const [likes, setLikes] = useState([]);
  const [filteredLikes, setFilteredLikes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const navigate = useNavigate();

  useEffect(() => {
    fetchLikes();
  }, [navigate]);

  useEffect(() => {
    if (selectedCategory === "ALL") {
      setFilteredLikes(likes);
    } else {
      setFilteredLikes(likes.filter(like => like.cat === selectedCategory));
    }
  }, [selectedCategory, likes]);

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
        setFilteredLikes(data);
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

  const toggleLike = async (item) => {
    try {
      const url = 'http://localhost:5000/api/unlike';
      await axios.post(url, {
        title: item.title,
      }, { withCredentials: true });

      fetchLikes();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const showDetails = (like) => {
    MySwal.fire({
      title: like.title,
      html: `
        <div class="detail-container">
          <div class="map-container">
            <div id="map" style="width: 40vw; height: 60vh; border-radius: 0.5vw"></div>
          </div>
          <div class="info-container">
            <img src="${like.img}" alt="${like.title}" class="detail-image" />
            <p class="info_add">${like.addre}</p>
            <p class="info_content">${like.content}</p>
          </div>
        </div>
      `,
      showCloseButton: true,
      showConfirmButton: false,
      width: '80%',
      didOpen: () => {
        const mapContainer = document.getElementById('map');
        const mapOption = { 
          center: new window.kakao.maps.LatLng(like.lat, like.lon),
          level: 3
        };
        const map = new window.kakao.maps.Map(mapContainer, mapOption);
        
        new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(like.lat, like.lon),
          map: map
        });
      },
      footer: `
        <button id="likeButton" class="swal2-confirm swal2-styled">
          <span id="likeIcon"></span>
        </button>
      `,
      didRender: () => {
        const likeIcon = document.getElementById('likeIcon');
        ReactDOM.render(<BsFillBookmarkCheckFill />, likeIcon);
        document.getElementById('likeButton').addEventListener('click', () => {
          toggleLike(like);
          MySwal.close();
        });
      },
      customClass: {
        popup: 'custom-swal-popup'
      }
    });
  };
  

  return (
    <div className={`my-map ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="category-menu">
        {Object.entries(categories).map(([name, code]) => (
          <button 
            key={code} 
            onClick={() => setSelectedCategory(code)}
            className={`${selectedCategory === code ? 'active' : ''} ${isDarkMode ? 'dark-mode' : ''}`}>
            {name}
          </button>
        ))}
      </div>
      <div className={`my-map-content ${isDarkMode ? 'dark-mode' : ''}`}>
        <h1 className='mymapH1'>저장된 여행지</h1>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : filteredLikes.length > 0 ? (
          <div className="likes-container">
            {filteredLikes.map((like) => (
              <div key={like.like_id} className={`like-item ${isDarkMode ? 'dark-mode' : ''}`} onClick={() => showDetails(like)}>
                <img src={like.img} alt={like.title} className="item-image" />
                <h4 className="item-title">{like.title}</h4>
                <p className="item-address">{like.addre}</p>
              </div>
            ))}
          </div>
        ) : (
          <p style={{fontSize:'1.1vw'}}>해당 카테고리에 저장된 여행지가 없습니다.</p>
        )}
      </div>
    </div>
  );
}

export default MyMap;