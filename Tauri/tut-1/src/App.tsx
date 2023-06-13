import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import Home from "./components/pages/Home";
import Room from "./components/pages/Room";
import { PuffLoader } from 'react-spinners'

function App() {
  //mongodbpasss = Haq1lya8RLcfpmHv
  const [page, setPage] = useState<number>(0);
  const [loaded, setLoaded] = useState<boolean>(false)
  const pages = ["Home", "Public"]

  useEffect(() => {
    invoke("get_message", {content: "Frontend update!"})
  }, [])

  const changePage = async (changepage:number) => {
    if (changepage === page) return;
    setLoaded(false)
    setPage(changepage);
    const response = await invoke("send_message");
    console.log(response);
    setTimeout(() => {
      setLoaded(true);
    }, 4000)
  }

  return (
    <div className="container">

      <nav className="navigation">
        <p>{pages[page]}</p>
        <ul>
          <li><button onClick={() => changePage(0)}>Home</button></li>
          <li><button onClick={() => changePage(1)}>Public</button></li>
        </ul>
      </nav>

      <div className="content">
        <Home page={page} pageValue={0} loaded={loaded} />        
        <Room page={page} pageValue={1} loaded={loaded} roomID="apdka" />        
        <div className="loadmessage">
          <PuffLoader
            color="#ffffff"
            loading={!loaded}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
           />
        </div>
      </div>

    </div>
  );
}

export default App;
