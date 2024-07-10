import React from 'react'
import Header from "./Header";

function Custom({isDarkMode , toggleDarkMode}) {
  return (
    <div>
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode}/>
      <div>Custom</div>
    </div>
  )
}

export default Custom;