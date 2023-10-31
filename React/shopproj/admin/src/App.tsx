import { useState } from 'react'
import { Routes, Route } from 'react-router'
import Design from './pages/Design'
import Products from './pages/Products'

function App() {

  return (
    <>
      <nav>

      </nav>

      <Routes>
        <Route path='/' element={<Design />} />
        <Route path='/products' element={<Products />} />
      </Routes>
    </>

  )
}

export default App
