import React from 'react';

function PlaceDetail({ place }) {
  if (!place) return null;

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <h2>{place.title}</h2>
      <p><strong>주소:</strong> {place.address}</p>
      <p><strong>카테고리:</strong> {place.category}</p>
      {place.image && (
        <img src={place.image} alt={place.title} style={{ maxWidth: '100%', height: 'auto' }} />
      )}
    </div>
  );
}

export default PlaceDetail;