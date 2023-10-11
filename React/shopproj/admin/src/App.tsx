import { useState } from 'react'
import { Routes, Route } from 'react-router'
import Design from './pages/Design'

function App() {

  return (
      
    <Routes>
      <Route path='/' element={<Design />} />
    </Routes>

  )
}

export default App
