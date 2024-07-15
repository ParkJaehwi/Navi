import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import KakaoMap from "../ETC/KakaoMap";
import "../../style/Service/Navi.scss";
import Swal from 'sweetalert2';

function Navi({ isDarkMode }) {
  const [selectedCode, setSelectedCode] = useState("");
  const [data, setData] = useState(null);
  const cities = [
    { code: "1", name: "서울" },
    { code: "2", name: "인천" },
    { code: "3", name: "대전" },
    { code: "4", name: "대구" },
    { code: "5", name: "광주" },
    { code: "6", name: "부산" },
    { code: "7", name: "울산" },
    { code: "8", name: "세종" },
    { code: "31", name: "경기도" },
    { code: "32", name: "강원도" },
    { code: "33", name: "충청북도" },
    { code: "34", name: "충청남도" },
    { code: "35", name: "경상북도" },
    { code: "36", name: "경상남도" },
    { code: "37", name: "전라북도" },
    { code: "38", name: "전라남도" },
    { code: "39", name: "제주도" },
  ];

  const handleChange = (e) => {
    setSelectedCode(e.target.value);
  };

  const location = useLocation();
  const { mostFrequentOption, score } = location.state || {};

  const resultDisplay = Array.isArray(mostFrequentOption) ? `${mostFrequentOption.join(",")}` : `${mostFrequentOption}`;

  const handleSubmit = () => {
    console.log(resultDisplay);
    console.log(typeof resultDisplay);
    let url = `http://localhost:5000/search?areacode=${selectedCode}&category=${resultDisplay}`;
    console.log(url);

    // 로딩 팝업 표시
    Swal.fire({
      title: '데이터 생성 중...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setData(JSON.parse(data.result));
        // 로딩 팝업 닫기
        Swal.close();
      })
      .catch((error) => {
        console.error('Error:', error);
        // 에러 발생 시 로딩 팝업 닫기
        Swal.close();
        // 에러 메시지 표시
        Swal.fire('오류', '데이터가 존재하지 않습니다.', 'error');
      });
  };

  return (
    <div className="Navi">
      <div className="locationContainer">
        <h3 className={`selectLocation ${isDarkMode ? 'dark-mode' : ''}`}>지역 선택</h3>
        <div className="cityList">
          {cities.map((city) => (
            <div key={city.code} className="cityItem">
              <input 
                type="radio" 
                id={`city-${city.code}`} 
                name="city" 
                value={city.code} 
                onChange={handleChange} 
                className="Location_radio"
              />
              <label htmlFor={`city-${city.code}`} className="cityLabel">{city.name}</label>
            </div>
          ))}
        </div>
        <button onClick={handleSubmit} className="submitButton">검색</button>
      </div>
      <KakaoMap data={data} isDarkMode={isDarkMode}/>
      <div className="dataDisplay">
        {console.log(data)}
      </div>
    </div>
  );
}

export default Navi;