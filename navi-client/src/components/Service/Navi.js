import React, { useState } from "react";
import Header from "./Header";
import KakaoMap from './KakaoMap';

function Navi({isDarkMode , toggleDarkMode}) {
  
  return (
    <div>
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode}/>
      <h1>Navi</h1>
      <KakaoMap />
    </div>
  )
}

export default Navi;