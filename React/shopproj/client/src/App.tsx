import { useState } from 'react'
import { Route, Routes } from 'react-router'
import Home from './pages/Home'
import Navigation from './components/general/Navigation'
import Product from './pages/Product'

function App() {

  return (
    <>
      <Navigation />

      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/product/:id' element={<Product />} />
        </Routes>
      </main>
    </>
  )
}

export default App
