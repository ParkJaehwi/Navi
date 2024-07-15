import React, { useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import noneimg from "../../style/img/noneImg.png";

const KakaoMap = ({ data }) => {
  const [position, setPosition] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isMapReady, setIsMapReady] = useState(false);
  
  // errorImg를 상단에서 선언 및 초기화
  const errorImg = noneimg;

  useEffect(() => {
    // 현재 위치 가져오기
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setIsMapReady(true);
        },
        (error) => {
          console.error("Geolocation error:", error);
          // 기본 위치 설정 (예: 서울시청)
          setPosition({ lat: 37.5665, lng: 126.9780 });
          setIsMapReady(true);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      // 기본 위치 설정 (예: 서울시청)
      setPosition({ lat: 37.5665, lng: 126.9780 });
      setIsMapReady(true);
    }
  }, []);

  const dataItems = data && data.length > 0 ? data.map((item, index) => ({
    key: index,
    title: `${index + 1}. ${item.title}`,
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
      const lat = firstItem.latitude;
      const lng = firstItem.longitude;
      if (!isNaN(lat) && !isNaN(lng)) {
        setPosition({ lat, lng });
        console.log("Updated position from data:", { lat, lng });
      } else {
        console.error("Invalid latitude or longitude in first data item:", data[0]);
      }
    }
  }, [data]);

  const handleSetPosition = (item) => {
    const lat = item.latitude;
    const lng = item.longitude;
    if (!isNaN(lat) && !isNaN(lng)) {
      setPosition({ lat, lng });
      setSelectedItem(item);
      console.log("Set position to:", { lat, lng });
    } else {
      console.error("Invalid latitude or longitude in item:", item);
    }
  };

  return (
    <div>
      {isMapReady && position && (
        <Map
          center={position}
          style={{ width: '100%', height: '400px' }}
          level={3}
        >
          <MapMarker position={position} />
          {data && data.map((item, index) => {
            const lat = parseFloat(item.latitude);
            const lng = parseFloat(item.longitude);
            if (!isNaN(lat) && !isNaN(lng)) {
              return (
                <MapMarker 
                  key={index}
                  position={{ lat, lng }}
                  onClick={() => handleSetPosition(item)}
                />
              );
            }
            return null;
          })}
        </Map>
      )}
      <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
        {data && data.length > 0 ? (
          data.map((item, index) => (
            <div key={index} onClick={() => handleSetPosition(item)} style={{cursor: 'pointer'}}>
              <h3>{index + 1}. {item.title}</h3>
              <div>Areacode: {item.areacode}</div>
              <div>Address: {item.address}</div>
              <div>Category: {item.category}</div>
              <div>Latitude: {item.latitude}</div>
              <div>Longitude: {item.longitude}</div>
              <img 
                src={item.image === null || item.image === "nan" ? errorImg : item.image} 
                alt={item.title} 
                style={{ maxWidth: "200px" }} 
              />
              <div>{item.content}</div>
            </div>
          ))
        ) : (
          "데이터가 없습니다."
        )}
      </div>
      {selectedItem && (
        <div>
          <h2>선택된 위치 정보</h2>
          <h3>{selectedItem.title}</h3>
          <p>{selectedItem.address}</p>
        </div>
      )}
    </div>
  );
};

export default KakaoMap;
