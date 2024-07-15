import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import noneimg from "../../style/img/noneImg.png";
import "../../style/ETC/KakaoMap.scss";
import { FaLocationDot } from "react-icons/fa6";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import axios from 'axios';

const KakaoMap = ({ data, isDarkMode }) => {
  const [position, setPosition] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isMapReady, setIsMapReady] = useState(false);
  const [showCurrentLocationMarker, setShowCurrentLocationMarker] = useState(false);
  const [mapLevel, setMapLevel] = useState(3);
  const [isLoading, setIsLoading] = useState(true);
  const mapInstanceRef = useRef(null);

  const errorImg = noneimg;

  useEffect(() => {
    const loadKakaoMap = () => {
      if (window.kakao && window.kakao.maps) {
        initializeMap();
      } else {
        const script = document.createElement('script');
        script.onload = initializeMap;
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=YOUR_APP_KEY&libraries=services`;
        document.head.appendChild(script);
      }
    };

    const initializeMap = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setPosition({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
            setShowCurrentLocationMarker(false);
            setIsMapReady(true);
            setIsLoading(false);
          },
          (error) => {
            console.error("Geolocation error:", error);
            setPosition({ lat: 37.5665, lng: 126.9780 });
            setShowCurrentLocationMarker(false);
            setIsMapReady(true);
            setIsLoading(false);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
        setPosition({ lat: 37.5665, lng: 126.9780 });
        setShowCurrentLocationMarker(false);
        setIsMapReady(true);
        setIsLoading(false);
      }
    };

    loadKakaoMap();
  }, []);

  const dataItems = data && data.length > 0 ? data.map((item, index) => ({
    key: index,
    title: item.title,
    areacode: item.areacode,
    address: item.address,
    category: item.category,
    latitude: item.latitude,
    longitude: item.longitude,
    image: item.image === null || item.image === "nan" ? errorImg : item.image,
    content: item.content
  })) : [];
  
  useEffect(() => {
    if (data && data.length > 0) {
      const firstItem = dataItems[0];
      const lat = parseFloat(firstItem.latitude);
      const lng = parseFloat(firstItem.longitude);
      if (!isNaN(lat) && !isNaN(lng)) {
        setPosition({ lat, lng });
        setShowCurrentLocationMarker(true);
      }
    }
  }, [data]);

  const handleSetPosition = useCallback((item) => {
    const lat = parseFloat(item.latitude);
    const lng = parseFloat(item.longitude);
    if (!isNaN(lat) && !isNaN(lng)) {
      setPosition({ lat, lng });
      setSelectedItem(item);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.setLevel(4);
      }
      setMapLevel(4);
    }
  }, []);

  const handleZoomChanged = (map) => {
    setMapLevel(map.getLevel());
  };

  const like = async (item) => {
    try {
      const response = await axios.post('http://localhost:5000/api/like', {
        title: item.title,
        cat: item.category,
        addre: item.address,
        content: item.content,
        lat: item.latitude,
        lon: item.longitude,
        img: item.image
      }, { withCredentials: true });

      if (response.status === 201) {
        alert('좋아요가 저장되었습니다.');
      } else {
        alert('좋아요 저장에 실패했습니다.');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert('로그인이 필요합니다.');
      } else {
        alert('좋아요 저장 중 오류가 발생했습니다.');
      }
    }
  };


  return (
    <div className={`Map ${isDarkMode ? 'dark-mode' : ''}`}>
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      )}
      <div className="data-list">
        {dataItems.length > 0 ? (
          dataItems.map((item) => (
            <div key={item.key} className="data-item" onClick={() => handleSetPosition(item)}>
              <img src={item.image} alt={item.title} className="item-image" />
              <div className="item-info">
                <h3>{item.title}</h3>
                <div className={`item-address ${isDarkMode ? 'dark-mode' : ''}`}>
                  <FaLocationDot/> {item.address}
                </div>
                <div className="item-content">{item.content}</div>
                <button onClick={() => like(item)}>좋아요?</button>
              </div>
            </div>
          ))
        ) : (
          <p className='noneSearch'>지역을 선택하고 검색해주세요.</p>
        )}
      </div>
      {isMapReady && position && (
        <Map
          center={position}
          style={{ width: '51.82vw', height: '92vh' }}
          level={mapLevel}
          onCreate={(map) => mapInstanceRef.current = map}
          onZoomChanged={handleZoomChanged}
        >
          {showCurrentLocationMarker && (
            <MapMarker position={position} />
          )}
          {dataItems.map((item) => {
            const lat = parseFloat(item.latitude);
            const lng = parseFloat(item.longitude);
            if (!isNaN(lat) && !isNaN(lng)) {
              return (
                <MapMarker 
                  key={item.key}
                  position={{ lat, lng }}
                  onClick={() => handleSetPosition(item)}
                />
              );
            }
            return null;
          })}
        </Map>
      )}
    </div>
  );
};

export default KakaoMap;