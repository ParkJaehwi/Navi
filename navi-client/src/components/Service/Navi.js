import React from 'react';
import { useLocation } from 'react-router-dom';
import KakaoMap from '../ETC/KakaoMap';

function Navi({ isDarkMode }) {
    const location = useLocation();
    const { mostFrequentOption, score } = location.state || {};

    const resultDisplay = Array.isArray(mostFrequentOption)
        ? `가장 높은 점수를 받은 카테고리: ${mostFrequentOption.join(', ')}`
        : `가장 높은 점수를 받은 카테고리: ${mostFrequentOption}`;

    return (
        <div style={{ textAlign: 'center', margin: '20px' }}>
            <h1>Navi</h1>
            <KakaoMap />
            <p>{resultDisplay}</p>
        </div>
    );
}

export default Navi;