// import { useEffect } from "react"
import Navigation from "./components/Navigation";
import {
  Route,
  Routes
} from 'react-router-dom'
import Home from "./pages/Home";

const App = () => {

  // useEffect(() => {


  // }, [])

  // async function getBackendRouteInformation() {
  //   const response = await fetch("/api/getproducts");
  //   const data = await response.json();
  //   console.log(data)
  // }


  return (
    <div className="relative min-h-screen h-full">
      <Navigation />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>



    </div>
  )
}

export default App