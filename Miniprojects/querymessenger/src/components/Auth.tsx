// I want to be able to log in with the following platforms:
// 6. Twitter 

// I need to add a 2-factor system just for safety before launch

import { useState } from "react";
import { handleEmailAndPassword, handleFacebook, handleGoogle } from "../firebase";
import googleIcon from '../assets/googleicon.svg';
import facebookIcon from '../assets/facebookicon.svg'

export default function Auth(props:any) {
  const [authPage, setAuthPage] = useState(false);
  let showPage;

  const [usernameInput, setUsernameInput] = useState();
  const [emailInput, setEmailInput] = useState();
  const [passwordInput, setPasswordInput] = useState();
  const [minPasswordLength, setMinPasswordLength] = useState(6);
  const [checker, setChecker] = useState(false);
  const [checkerStart, setCheckerStart] = useState(false);
  const [loginError, setLoginError] = useState(false);

  function handleLogin(action:string = "login") {

    
    if (emailInput != undefined && passwordInput != undefined) {
      const email:string = emailInput
      const password:string = passwordInput
      
      if (email.length > 0 && password.length > 0) {
        setLoginError(false)
        handleEmailAndPassword(action, email, password)
          ?.then(result => {
            props.setUser(result);
            props.login(true)
          })
      } else {
        setLoginError(true)
      }
    }
   
  }

  function handleRegister(action:string = "register") {
    if (emailInput != undefined && passwordInput != undefined && usernameInput != undefined) {
      const username:string = usernameInput
      const email:string = emailInput
      const password:string = passwordInput
      
      if (email.length > 0 && password.length > 0 && username.length > 0) {
        setLoginError(false)
        handleEmailAndPassword(action, email, password, username)
          ?.then(result => {
            props.setUser(result);
            props.login(true)
          }) 
      } else {
        setLoginError(true)
      }
    }
  }

  function loginWithThirdParty(platform:string) {
    if (platform === "google") {
      handleGoogle()
        .then(result => {
          props.setUser(result)
          props.login(true)
        })
    } else if (platform === "facebook") {
      handleFacebook()
        .then(result => {
          props.setUser(result)
          props.login(true)
        })
    }
  }

  function inputSorter(inputType:string, e:any) {
    if (inputType === "username") {
      setUsernameInput(e.target.value)
    } else if (inputType === "email") {
      setEmailInput(e.target.value)
    } else if (inputType === "password") {
      setMinPasswordLength(6 - e.target.value.length)
      setPasswordInput(e.target.value)
    } else if (inputType === "checker") {
      if (passwordInput != undefined) {
        let password:string = passwordInput;
        if (password.length <= 0) {
          setCheckerStart(false)
        } else if (password.length > 0) {
          if(e.target.value.length > 0) {
            setCheckerStart(true)
            if (e.target.value === password) {
              setChecker(true)
            } else {
              setChecker(false)
            }
          } else {
            setCheckerStart(false)
          }
        } 
      }
    }
  }

  function changeAuthPage(value:boolean) {
    setUsernameInput(undefined);
    setEmailInput(undefined);
    setPasswordInput(undefined);
    setAuthPage(value)
  }

  if (authPage === false) {

    showPage = (
      <div className="flex justify-center items-center flex-col gap-4 w-96">
        <input onKeyUp={e => inputSorter("email", e)} id="login-email" type="email" placeholder="E-mail" className="w-full bg-transparent text-white border-2 border-blue-800 indent-2 rounded-lg outline-none" />
        <input onKeyUp={e => inputSorter("password", e)} id="login-password" type="password" placeholder="Password" className="w-full bg-transparent text-white border-2 border-blue-800 indent-2 rounded-lg outline-none" />
        <div className="flex mr-auto gap-4">
          <button onClick={() => {handleLogin()}} type="button" className="w-28 h-10 z-20 bg-blue-800 border-black border-2 text-white 
          rounded-lg hover:bg-blue-600 active:bg-blue-900 active:shadow-inner transition-all duration-200">Login</button>        
          <button onClick={() => {changeAuthPage(true)}} type="button" className="w-20 h-10 z-20 bg-blue-800 border-black border-2 text-white 
          rounded-lg hover:bg-blue-600 active:bg-blue-900 active:shadow-inner transition-all duration-200 text-xs">Register</button>
        </div>
        <div className="mt-4 mr-auto">
          <ul className="flex justify-center items-center gap-4 text-white">
            <li className="w-6 h-6"><a onClick={() => {loginWithThirdParty("google")}}><img src={googleIcon} /></a></li>
            <li className="w-6 h-6"><a onClick={() => {loginWithThirdParty("facebook")}}><img src={facebookIcon} /></a></li>
          </ul>
        </div>
      </div>
    )

  } else if (authPage === true) {
    showPage = (
      <div className="flex justify-center items-center flex-col gap-4 w-96">
        <input onKeyUp={e => inputSorter("username", e)} id="register-username" type="text" placeholder="Username" className="w-full bg-transparent text-white border-2 border-blue-800 indent-2 rounded-lg outline-none" />
        <input onKeyUp={e => inputSorter("email", e)} id="register-email" type="email" placeholder="E-mail" className="w-full bg-transparent text-white border-2 border-blue-800 indent-2 rounded-lg outline-none" />
        <div className="mr-auto">
          <input onKeyUp={e => inputSorter("password", e)} id="register-password" type="password" placeholder="Password" className="w-full bg-transparent text-white border-2 border-blue-800 indent-2 rounded-lg outline-none" />
          <p className={`text-white text-xs ${minPasswordLength < 1 ? "hidden" : ""}`}>Characters required: {minPasswordLength}</p>
        </div>
        <div className="mr-auto">
          <input onKeyUp={e => inputSorter("checker", e)} type="password" placeholder="Confirm Password" className="w-full bg-transparent text-white border-2 border-blue-800 indent-2 rounded-lg outline-none" />
          <p className={`text-green-500 text-xs ${checker ? "" : "hidden"} ${checkerStart ? "" : "hidden"}`}>Matches password</p>
          <p className={`text-red-500 text-xs ${checker ? "hidden" : ""} ${checkerStart ? "" : "hidden"}`}>Doesn't match password</p>
        </div>
        <div className="mr-auto">
          <p className={`text-red-500 text-xs ${loginError ? "" : "hidden"}`}>Something went wrong, check the fields and try again...</p>
        </div>  
        <div className="flex mr-auto gap-4">
          <button onClick={() => {handleRegister()}} type="button" className="w-28 h-10 z-20 bg-blue-800 border-black border-2 text-white 
          rounded-lg hover:bg-blue-600 active:bg-blue-900 active:shadow-inner transition-all duration-200 mr-auto">Register</button>
          <button onClick={() => {changeAuthPage(false)}} type="button" className="w-20 h-10 z-20 bg-blue-800 border-black border-2 text-white 
          rounded-lg hover:bg-blue-600 active:bg-blue-900 active:shadow-inner transition-all duration-200 mr-auto text-xs">Login</button>
        </div>
        <div className="mt-4 mr-auto">
          <ul className="flex justify-center items-center gap-4 text-white">
            <li className="w-6 h-6"><a onClick={() => {loginWithThirdParty("google")}}><img src={googleIcon} /></a></li>
            <li className="w-6 h-6"><a onClick={() => {loginWithThirdParty("facebook")}}><img src={facebookIcon} /></a></li>
          </ul>
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-center items-center flex-col gap-4">
        {showPage}
    </div>
  )
}


{/* <h1 className="text-white">You are not logged in</h1>
        <button onClick={() => {props.login(true)}} className="w-32 h-10 z-20 bg-blue-800 border-black border-2 text-white rounded-lg hover:bg-blue-600 active:bg-blue-900 active:shadow-inner transition-all duration-200">Click to log in</button> */}