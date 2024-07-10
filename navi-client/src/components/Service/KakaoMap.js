import React, { useEffect, useState } from 'react';
import axios from 'axios';

const { kakao } = window;

function KakaoMap() {
  const [map, setMap] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [jsonData, setJsonData] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [infowindows, setInfowindows] = useState([]);

  useEffect(() => {
    // Load JSON data from public folder
    axios.get(`${process.env.PUBLIC_URL}/data.json`)
      .then(response => {
        setJsonData(response.data);
      })
      .catch(error => {
        console.error("There was an error loading the JSON data!", error);
      });

    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3
    };
    const map = new kakao.maps.Map(container, options);
    setMap(map);
  }, []);

  const handleSearch = () => {
    // Clear existing markers and infowindows
    markers.forEach(marker => marker.setMap(null));
    infowindows.forEach(infowindow => infowindow.close());
    setMarkers([]);
    setInfowindows([]);

    const cityData = jsonData.find(item => item.city === searchQuery);

    if (cityData) {
      const landmarks = cityData.landmarks;

      const newMarkers = [];
      const newInfowindows = [];

      landmarks.forEach(landmark => {
        const coords = new kakao.maps.LatLng(landmark.lat, landmark.lng);

        const marker = new kakao.maps.Marker({
          map: map,
          position: coords
        });

        const infowindow = new kakao.maps.InfoWindow({
          content: `<div style="width:150px;text-align:center;padding:6px 0;">${landmark.name}</div>`
        });
        infowindow.open(map, marker);

        newMarkers.push(marker);
        newInfowindows.push(infowindow);
      });

      setMarkers(newMarkers);
      setInfowindows(newInfowindows);
    } else {
      alert('해당 지역을 찾을 수 없습니다');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="지역 이름 입력"
        style={{ marginBottom: '10px', width: '200px' }}
      />
      <button onClick={handleSearch}>검색</button>
      <div
        id="map"
        style={{
          width: '50vw',
          height: '100vh',
        }}
      ></div>
    </div>
  );
}

export default KakaoMap;
