import React from 'react'
import Header from "./Header";

function Navi({isDarkMode , toggleDarkMode}) {
  return (
    <div>
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode}/>
      <h1>Navi</h1>
    </div>
  )
}

export default Navi;