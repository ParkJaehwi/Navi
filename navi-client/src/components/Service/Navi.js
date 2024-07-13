import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import KakaoMap from '../ETC/KakaoMap';

function Navi({ isDarkMode }) {
    const [selectedCode, setSelectedCode] = useState("");
    const cities = [
        { code: "1", name: "서울" },
        { code: "2", name: "인천" },
        { code: "3", name: "대전" },
        { code: "4", name: "대구" },
        { code: "5", name: "광주" },
        { code: "6", name: "부산" },
        { code: "7", name: "울산" },
        { code: "8", name: "세종특별자치시" },
        { code: "31", name: "경기도" },
        { code: "32", name: "강원특별자치도" },
        { code: "33", name: "충청북도" },
        { code: "34", name: "충청남도" },
        { code: "35", name: "경상북도" },
        { code: "36", name: "경상남도" },
        { code: "37", name: "전북특별자치도" },
        { code: "38", name: "전라남도" },
        { code: "39", name: "제주도" }
    ];

    const handleChange = (e) => {
        setSelectedCode(e.target.value);
    };    

    const location = useLocation();
    const { mostFrequentOption, score } = location.state || {};

    const resultDisplay = Array.isArray(mostFrequentOption)
        ? `${mostFrequentOption.join(', ')}`
        : `${mostFrequentOption}`;


    const handleSubmit = () => {
        alert(`선택된 코드: ${selectedCode}\n선택된 카테고리: ${resultDisplay}`);
    };

    return (
        <div style={{ textAlign: 'center', margin: '20px' }}>
            <h1>Navi</h1>
            <KakaoMap />

            <div>
                <h3>도시 선택</h3>
                {cities.map((city) => (
                    <div key={city.code}>
                    <label>
                        <input
                        type="radio"
                        name="city"
                        value={city.code}
                        onChange={handleChange}
                        />
                        {city.name}
                    </label>
                    </div>
                ))}
                <button onClick={handleSubmit}>제출</button>
            </div>
        </div>
    );
}

export default Navi;