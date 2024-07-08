import React from 'react'
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Home</h1>
      <Link to="/Login">로그인</Link>
    </div>
  )
}

export default Home;