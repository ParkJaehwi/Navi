import React,{ useEffect, useState } from 'react'

const { kakao } = window;

function KakaoMap() {
  const[map, setMap] = useState(null);

  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level:3
    };
    const map = new kakao.maps.Map(container, options);
    setMap(map);  
  }, [])
  
  return (
    <div id="map" style={{
      width: '50vw',
      height: '100vh',
    }}>


    </div>
  )
}

export default KakaoMap;
