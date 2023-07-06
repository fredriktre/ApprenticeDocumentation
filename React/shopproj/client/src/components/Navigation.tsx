import { useState } from "react"
import { Link } from 'react-router-dom'

const Navigation = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [cartAmount, setCartAmount] = useState<number>(0);

  return (
    <nav className="w-full h-16 relative">
      <div className="relative z-50 bg-black w-full h-full px-4 py-2 flex justify-between items-center gap-5">
        <div aria-label="left-side-nav">
          <Link to={"/"} className="">
            <img src={"/logoholder.png"}
              className="w-24 h-12 rounded-lg" /> 
          </Link>
        </div>
        <div aria-label="right-side-nav" className="flex justify-center items-center gap-5">
          <div className="flex justify-center items-center gap-2">
            <input type="text" 
              className="w-full px-4 py-2 border-2 border-transparent focus:border-gray-500 outline-none
              rounded-lg transition-colors duration-150"
              value={searchInput} 
              onChange={(event) => setSearchInput(event.target.value)} />
            <button type="button" className="p-2 bg-white flex rounded-lg
            border-2 border-transparent hover:border-gray-500 transition-colors duration-150">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </button>
          </div>
          <Link to={"/"} className="p-2 bg-white flex rounded-lg
          border-2 border-transparent hover:border-gray-500 transition-colors duration-150">
            {
              cartAmount > 0 
              ? `${cartAmount}`
              : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
            }
          </Link>
          <button type="button" className="p-2 bg-white flex rounded-lg
          border-2 border-transparent hover:border-gray-500 transition-colors duration-150"
          onClick={() => setMenuOpen(!menuOpen)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              {
                menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
              }
            </svg>
          </button>
        </div>
      </div> 

      <div aria-label="menu" className={`absolute z-40 bg-gray-800 w-full h-fit grid 
      lg:grid-cols-3 md:grid-cols-2 grid-cols-1 left-0 ${menuOpen ? "top-full" : "-top-[100rem]"}
      transition-all duration-300 text-white p-4`}>
        <div className="w-full h-[20rem] flex flex-col gap-5 border-l-2 border-white">
          <Link to={"/"} className="text-2xl w-fit ml-2 border-b-2 border-transparent hover:border-white
          transition-all duration-150">Tags</Link>
          <ul className="text-md flex flex-col gap-2 ml-2">
            <li>
              <Link to={"/"} className="border-b-2 border-transparent hover:border-white
              transition-all duration-150">Cutesy</Link>
            </li>
            <li>
              <Link to={"/"} className="border-b-2 border-transparent hover:border-white
              transition-all duration-150">Digital</Link>
            </li>
            <li>
              <Link to={"/"} className="border-b-2 border-transparent hover:border-white
              transition-all duration-150">Past</Link>
            </li>
          </ul>
        </div>
      </div>     
    </nav>
  )
}

export default Navigation