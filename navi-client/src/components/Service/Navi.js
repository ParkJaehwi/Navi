import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import KakaoMap from '../ETC/KakaoMap';

function Navi({ isDarkMode }) {
    const [data, setData] = useState(null);

    useEffect(() => {
        if (data) {
          console.log("Updated data:", data);
          console.log("Type of data:", typeof data);
        }
      }, [data]);
    
    const handleClick = () => {
    setData(null);
    fetch("http://localhost:5000/ask?areacode=32&category=A0101,A0102")
        .then((response) => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
        })
        .then((response) => {
        const parsedData = JSON.parse(response.result); // JSON 문자열을 객체로 변환
        setData(parsedData); // 변환된 데이터를 상태로 설정
        })
        .catch((error) => {
        console.error("There has been a problem with your fetch operation:", error);
        });
    };
      

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
            <button onClick={handleClick}>버튼임</button>

        </div>
    );
}

export default Navi;