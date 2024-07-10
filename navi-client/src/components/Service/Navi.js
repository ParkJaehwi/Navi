import React from 'react';
import { useLocation } from 'react-router-dom';

import KakaoMap from '../ETC/KakaoMap';

function Navi({ isDarkMode }) {
    const location = useLocation();
    const result = location.state;

    if (!result) {
        return <div>결과를 불러올 수 없습니다.</div>;
    }

    return (
        <div style={{ textAlign: 'center', margin: '20px' }}>
            <h1>Navi</h1>
            <KakaoMap />
            <h1>퀴즈 결과</h1>
            <p>가장 많이 선택된 옵션: {result.mostFrequentOption}</p>
            <p>점수: {result.score}</p>
            <p>해석: 
                {result.mostFrequentOption === 1 && "옵션 1을 가장 많이 선택하셨습니다."}
                {result.mostFrequentOption === 2 && "옵션 2를 가장 많이 선택하셨습니다."}
                {result.mostFrequentOption === 3 && "옵션 3을 가장 많이 선택하셨습니다."}
            </p>
        </div>
    );
}

export default Navi;