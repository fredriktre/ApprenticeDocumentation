import React from 'react'
import { Link } from 'react-router-dom'

const Navigation = () => {
  return (
    <nav>
      <Link to={"/"}>Home</Link>
      <Link to={"/admin"}>Admin</Link>
    </nav>
  )
}

export default Navigation