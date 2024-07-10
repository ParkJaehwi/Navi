import React, { useEffect, useState } from 'react'
import PlaceDetail from './PlaceDetail';

const { kakao } = window;

function KakaoMap() {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [places, setPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);

  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(36.2683, 127.6358),
      level: 13
    };
    const map = new kakao.maps.Map(container, options);
    setMap(map);

    fetch('/data.json')
      .then(response => response.json())
      .then(data => setPlaces(data));
  }, []);

  const searchPlace = (keyword) => {
    markers.forEach(marker => marker.setMap(null));
    setMarkers([]);
    setSelectedPlace(null);

    const filteredPlaces = places.filter(place => 
      place.address.includes(keyword) || place.title.includes(keyword)
    );

    const newMarkers = filteredPlaces.map(place => {
      const marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(place.longitude, place.latitude),
        map: map
      });

      kakao.maps.event.addListener(marker, 'click', () => setSelectedPlace(place));

      const infowindow = new kakao.maps.InfoWindow({
        content: `<div style="padding:5px;">${place.title}</div>`
      });

      kakao.maps.event.addListener(marker, 'mouseover', () => infowindow.open(map, marker));
      kakao.maps.event.addListener(marker, 'mouseout', () => infowindow.close());

      return marker;
    });

    setMarkers(newMarkers);

    if (filteredPlaces.length > 0) {
      const bounds = new kakao.maps.LatLngBounds();
      filteredPlaces.forEach(place => {
        bounds.extend(new kakao.maps.LatLng(place.longitude, place.latitude));
      });
      map.setBounds(bounds);
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1 }}>
        <div>
          <input type="text" id="searchInput" placeholder="지역 검색" />
          <button onClick={() => searchPlace(document.getElementById('searchInput').value)}>검색</button>
        </div>
        <div id="map" style={{
          width: '100%',
          height: '90vh',
        }}></div>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', maxHeight: '100vh' }}>
        <PlaceDetail place={selectedPlace} />
      </div>
    </div>
  )
}

export default KakaoMap;