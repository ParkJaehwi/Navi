import React from 'react'
import Header from "./Header";
import Footer from './Footer';
import { Link } from 'react-router-dom';
import "../../style/Service/Home.scss";
import InfiniteSlider from "../ETC/InfiniteSlider";


function Home({ isDarkMode, toggleDarkMode }) {


  return (
    <div>
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode}/>
      
      <Link to="/Navi"><button className='homeBtn'>시작하기</button></Link>
      <InfiniteSlider isDarkMode={isDarkMode}/>
      <Footer isDarkMode={isDarkMode}/>
    </div>
  )
}

export default Home;