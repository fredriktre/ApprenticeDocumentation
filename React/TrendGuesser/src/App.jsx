import { Route, Routes } from "react-router-dom"
import Landing from "./pages/Landing"
import User from "./pages/User"
import Game from "./pages/Game/Game"
import GameIndex from "./pages/Game/GameIndex"
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

function App() {

  const firebaseConfig = {
    apiKey: "AIzaSyCmAzYAPa_FsBrC2DEuQiZG2UsXmh3D-HM",
    authDomain: "trendguesser.firebaseapp.com",
    projectId: "trendguesser",
    storageBucket: "trendguesser.appspot.com",
    messagingSenderId: "653092403522",
    appId: "1:653092403522:web:41371ac931a6aa40e870db",
    // measurementId: "G-ZF168YD7FK"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  // const analytics = getAnalytics(app);

  return (
    <>
      <main>
        <Routes>
          <Route path="/" element={ <Landing /> } />
          <Route path="/game">
            <Route index element={ <GameIndex /> }></Route>
            <Route path=":category" element={<Game />}></Route>
          </Route>
          <Route path="/user" element={ <User /> } />
        </Routes>
      </main>
    </>
  )
}

export default App
