import React from 'react'
import Footer from './Footer';
import { useNavigate  } from 'react-router-dom';
import "../../style/Service/Home.scss";
import InfiniteSlider from "../ETC/InfiniteSlider";
import mainImg from "../../style/img/mainImg.jpg";
import maindark from "../../style/img/maindark.jpg";
import gif from "../../style/img/moveImg.gif";

function Home({ isDarkMode }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/Custom'); // 클릭 시 이동할 경로
  };
  return (
    <div className='Home'>
      <div className={`home_container ${isDarkMode ? 'dark-mode' : ''}`}>
        <p className={`homeText1 ${isDarkMode ? 'dark-mode' : ''}`}>설레는 여행의 첫 시작</p>
        <p className={`homeText1 ${isDarkMode ? 'dark-mode' : ''}`}>나비와 자유롭게</p>
        <p className={`homeText2 ${isDarkMode ? 'dark-mode' : ''}`}>어디로 여행을 갈지 고민이 들 때 나비를 통해 개인 맞춤형 여행지를 계획해 보세요.</p>
        <button className={`homeBtn ${isDarkMode ? 'dark-mode' : ''}`} onClick={handleClick}>시작하기</button>
        <img src={isDarkMode ? maindark : mainImg} className='homeImg'/>
      </div>
      <InfiniteSlider isDarkMode={isDarkMode}/>

      {/* 실행부분 영상 녹화 후 넣기 */}
      <img src={gif} style={{width:'40vw', height:'40vh', margin:'7vw', marginLeft: '30vw', borderRadius:'1vw'}}/>
      
      <Footer isDarkMode={isDarkMode}/>
    </div>
  )
}

export default Home;