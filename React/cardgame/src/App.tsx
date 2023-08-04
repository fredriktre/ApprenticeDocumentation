import { Routes, Route } from 'react-router'
import './App.css'
import Menu from './pages/Menu'
import Game4x4 from './pages/Game4x4'
import Game6x4 from './pages/Game6x4'
import Game8x4 from './pages/Game8x4'
import Game6x6 from './pages/Game6x6'
import Game8x8 from './pages/Game8x8'
import Game10x10 from './pages/Game10x10'
// import { initializeApp } from "firebase/app";
// firebase deploy --only hosting:boredhub
function App() {

  // const firebaseConfig = {
    // apiKey: "AIzaSyAxljGt8KOVnVhZLVebrA5BLPYp17xfAtc",
    // authDomain: "boredhub-b4891.firebaseapp.com",
    // projectId: "boredhub-b4891",
    // storageBucket: "boredhub-b4891.appspot.com",
    // messagingSenderId: "321605093382",
    // appId: "1:321605093382:web:8126749d066b2b9506db87"
  // };

  // const app = initializeApp(firebaseConfig);

  return (
    <Routes>

      <Route path='/' element={<Menu />} />
      <Route path='/game4x4/standard' element={<Game4x4 game='standard' />} />
      <Route path='/game6x4/standard' element={<Game6x4 game='standard' />} />
      <Route path='/game8x4/standard' element={<Game8x4 game='standard' />} />
      <Route path='/game6x6/standard' element={<Game6x6 game='standard' />} />
      <Route path='/game8x8/standard' element={<Game8x8 game='standard' />} />
      <Route path='/game10x10/standard' element={<Game10x10 game='standard' />} />
      <Route path='/game4x4/pokemon' element={<Game4x4 game='pokemon' />} />
      <Route path='/game6x4/pokemon' element={<Game6x4 game='pokemon' />} />
      <Route path='/game8x4/pokemon' element={<Game8x4 game='pokemon' />} />
      <Route path='/game6x6/pokemon' element={<Game6x6 game='pokemon' />} />
      <Route path='/game8x8/pokemon' element={<Game8x8 game='pokemon' />} />
      <Route path='/game10x10/pokemon' element={<Game10x10 game='pokemon' />} />
      <Route path='/game4x4/proglang' element={<Game4x4 game='proglang' />} />
      <Route path='/game6x4/proglang' element={<Game6x4 game='proglang' />} />
      <Route path='/game8x4/proglang' element={<Game8x4 game='proglang' />} />
      <Route path='/game6x6/proglang' element={<Game6x6 game='proglang' />} />
      <Route path='/game8x8/proglang' element={<Game8x8 game='proglang' />} />
      <Route path='/game10x10/proglang' element={<Game10x10 game='proglang' />} />
      <Route path='/game4x4/countries' element={<Game4x4 game='countries' />} />
      <Route path='/game6x4/countries' element={<Game6x4 game='countries' />} />
      <Route path='/game8x4/countries' element={<Game8x4 game='countries' />} />
      <Route path='/game6x6/countries' element={<Game6x6 game='countries' />} />
      <Route path='/game8x8/countries' element={<Game8x8 game='countries' />} />
      <Route path='/game10x10/countries' element={<Game10x10 game='countries' />} />

    </Routes>
  )
}

export default App
