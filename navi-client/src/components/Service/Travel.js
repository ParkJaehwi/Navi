import React from 'react'
import Header from "./Header";
import Footer from './Footer';

function Travel({ isDarkMode, toggleDarkMode }) {
  return (
    <div>
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode}/>
      <h1>여행지</h1>
      <Footer isDarkMode={isDarkMode}/>
    </div>
  )
}

export default Travel;