import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import "../../style/Service/Travel.scss";
import Place1 from "../../style/img/nature.jpg";
import Place2 from "../../style/img/history.jpg";
import Place3 from "../../style/img/recreation.jpg";
import Place4 from "../../style/img/activity.jpg";
import Place5 from "../../style/img/industry.jpg";
import Place6 from "../../style/img/building.jpg";
import Place7 from "../../style/img/culture.jpg";
import Place8 from "../../style/img/land-leisure.jpg";
import Place9 from "../../style/img/water-leisure.jpg";
import Place10 from "../../style/img/aviation-leisure.jpg";


const travelData = [
  { id: 1, name: '자연', image: Place1, info: "자연은 국립공원, 산, 바다, 계곡 등 자연의 아름다움을 경험할 수 있는 장소들로 구성되어 있습니다."},
  { id: 2, name: '역사', image: Place2, info: "역사는 고궁, 유적지, 사찰 등 우리 역사의 흔적과 문화를 느낄 수 있는 장소들로 구성되어 있습니다."},
  { id: 3, name: '휴양', image: Place3, info: "휴양는 온천, 스파, 테마공원 등 몸과 마음을 편안하게 쉬며 즐길 수 있는 다양한 휴식 장소들로 구성되어 있습니다."},
  { id: 4, name: '체험', image: Place4, info: "체험는 농촌, 전통, 산사 등 다양한 체험 활동을 통해 새로운 경험을 할 수 있는 장소들로 구성되어 있습니다."},
  { id: 5, name: '산업', image: Place5, info: "산업은 발전소, 전자-반도체, 자동차 등 다양한 산업 현장을 직접 체험할 수 있는 장소들로 구성되어 있습니다."},
  { id: 6, name: '건축 / 조형물', image: Place6, info: "건축/조형물은 다리, 기념탑, 분수, 동상, 터널, 유명건물 등 다양한 형태의 건축물과 조형물을 직접 체험할 수 있는 장소들로 구성되어 있습니다."},
  { id: 7, name: '문화시설', image: Place7, info: "문화시설은 박물관, 기념관, 전시관, 미술관, 화랑 등 다양한 문화적 경험을 제공하는 장소들로 구성되어 있습니다."},
  { id: 8, name: '육상 레저', image: Place8, info: "육상 레저는 카트, 승마, 사격장, 캠핑, 암벽등반, ATV 등 다양한 야외 액티비티를 체험할 수 있는 장소들로 구성되어 있습니다."},
  { id: 9, name: '수상 레저', image: Place9, info: "수상 레저는 요트, 카약, 스노클링, 래프팅 등 물 위와 물속에서 즐길 수 있는 액티비티를 체험할 수 있는 장소들로 구성되어 있습니다."},
  { id: 10, name: '항공 레저', image: Place10, info: "항공 레저는 스카이다이빙, 패러글라이딩, 열기구 등 하늘에서의 다양한 액티비티를 체험할 수 있는 장소들로 구성되어 있습니다."},
];

function Travel({ isDarkMode }) {
  const navigate = useNavigate();

  const handleClick = (place) => {
    navigate("/Navi", { state: { mostFrequentOption: place.id, score: 1 } });
  };
  
  return (
    <div>
      <p className={`travel_text ${isDarkMode ? 'dark-mode' : ''}`}>여행의 주제를 선택해보세요.</p>
      <div className='travel_container'>
        {travelData.map((place) => (
          <div 
            key={place.id} 
            className='travel_item' 
            onClick={() => handleClick(place)}
            style={{ cursor: 'pointer' }} // 클릭 가능한 느낌을 줍니다.
          >
            <img src={place.image} alt={place.name} className='travel_image'/>
            <p className={`travel_name ${isDarkMode ? 'dark-mode' : ''}`}>{place.name}</p>
            <p className={`travel_name2 ${isDarkMode ? 'dark-mode' : ''}`}>{place.info}</p>
          </div>
        ))}
      </div>
      <Footer isDarkMode={isDarkMode}/>
    </div>
  );
}


export default Travel;