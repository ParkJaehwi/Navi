import React from 'react';
import { useLocation } from 'react-router-dom';
import KakaoMap from '../ETC/KakaoMap';

function Navi({ isDarkMode }) {
    const location = useLocation();
    const result = location.state || null;

    if (!result) {
        return <div>결과를 불러올 수 없습니다.</div>;
    }

    return (
        <div style={{ textAlign: 'center', margin: '20px' }}>
            <h1>Navi</h1>
            <KakaoMap selectedOption={result.mostFrequentOption} />
            <h1>퀴즈 결과</h1>
            <p>가장 많이 선택된 옵션: {result.mostFrequentOption}</p>
            <p>점수: {result.score}</p>
            <p>해석: 
                {result.mostFrequentOption === 1 && "자연을 가장 많이 선택하셨습니다."}
                {result.mostFrequentOption === 2 && "역사를 가장 많이 선택하셨습니다."}
                {result.mostFrequentOption === 3 && "휴양을 가장 많이 선택하셨습니다."}
                {result.mostFrequentOption === 4 && "체험을 가장 많이 선택하셨습니다."}
                {result.mostFrequentOption === 5 && "산업을 가장 많이 선택하셨습니다."}
                {result.mostFrequentOption === 6 && "건축 / 조형물을 가장 많이 선택하셨습니다."}
                {result.mostFrequentOption === 7 && "문화시설을 가장 많이 선택하셨습니다."}
                {result.mostFrequentOption === 8 && "육상 레저를 가장 많이 선택하셨습니다."}
                {result.mostFrequentOption === 9 && "수상 레저를 가장 많이 선택하셨습니다."}
                {result.mostFrequentOption === 10 && "항공 레저를 가장 많이 선택하셨습니다."}
            </p>
        </div>
    );
}

export default Navi;
