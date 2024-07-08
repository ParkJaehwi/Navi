import React from 'react'
import Header from "./Header";
import Footer from './Footer';
import { Link } from 'react-router-dom';
import "../../style/Service/Home.scss";

function Home({ isDarkMode, toggleDarkMode }) {
  return (
    <div>
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode}/>
      <h1>Home</h1>
      <Link to="/Navi"><button className='homeBtn'>시작하기</button></Link>
      <Footer isDarkMode={isDarkMode}/>
    </div>
  )
}

export default Home;