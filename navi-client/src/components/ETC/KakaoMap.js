import React, { useEffect, useState, useCallback, useMemo } from 'react';
import PlaceDetail from '../Service/PlaceDetail';

const { kakao } = window;

function KakaoMap({ selectedOption }) {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [places, setPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);

  // Memoize locationMap to avoid recreating it on every render
  const locationMap = useMemo(() => ({
    1: '서울',
    2: '양주',
    3: '여주',
    4: '부산',
    5: '가평',
    6: '거제',
    7: '합천',
    8: '홍천',
    9: '익산',
    10: '포천'
  }), []);

  // Initialize the map and fetch places data only once
  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(36.2683, 127.6358),
      level: 13
    };
    const mapInstance = new kakao.maps.Map(container, options);
    
    setMap(mapInstance);

    // Fetch data only once after map is initialized
    fetch('/data.json')
      .then(response => response.json())
      .then(data => setPlaces(data));
  }, []); // Empty dependency array means this effect runs only once after the initial render

  // Memoized searchPlace function to avoid recreation on every render
  const searchPlace = useCallback((keyword) => {
    if (!map) return; // Ensure map is initialized

    // Remove existing markers
    setMarkers(prevMarkers => {
      prevMarkers.forEach(marker => marker.setMap(null));
      return [];
    });

    setSelectedPlace(null);

    // Filter places based on the keyword
    const filteredPlaces = places.filter(place => 
      place.address.includes(keyword) || place.title.includes(keyword)
    );

    // Create new markers for the filtered places
    const newMarkers = filteredPlaces.map(place => {
      const marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(place.longitude, place.latitude),
        map: map
      });

      // Add event listeners to the marker
      kakao.maps.event.addListener(marker, 'click', () => setSelectedPlace(place));

      const infowindow = new kakao.maps.InfoWindow({
        content: `<div style="padding:5px;">${place.title}</div>`
      });

      kakao.maps.event.addListener(marker, 'mouseover', () => infowindow.open(map, marker));
      kakao.maps.event.addListener(marker, 'mouseout', () => infowindow.close());

      return marker;
    });

    setMarkers(newMarkers);

    // Adjust the map bounds to fit the markers
    if (filteredPlaces.length > 0) {
      const bounds = new kakao.maps.LatLngBounds();
      filteredPlaces.forEach(place => {
        bounds.extend(new kakao.maps.LatLng(place.longitude, place.latitude));
      });
      map.setBounds(bounds);
    }
  }, [map, places]); // Dependencies of searchPlace

  // Handle selectedOption change
  useEffect(() => {
    if (selectedOption && map) {
      const location = locationMap[selectedOption];
      if (location) {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
          searchInput.value = location;
          searchPlace(location);
        }
      }
    }
  }, [selectedOption, locationMap, searchPlace, map]); // Dependencies of this effect

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1 }}>
        <div>
          <input type="text" id="searchInput" placeholder="지역 검색" />
          <button onClick={() => {
            const searchInput = document.getElementById('searchInput');
            if (searchInput) {
              searchPlace(searchInput.value);
            }
          }}>검색</button>
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
  );
}

export default KakaoMap;