import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { setDoc, doc, getDoc} from "firebase/firestore"
import { createAvatar } from '@dicebear/core'
import { thumbs } from '@dicebear/collection'
import { auth, db } from '../App'

const Auth = (props) => {
    const registerForm = document.getElementById("register-form")
    const loginForm = document.getElementById("login-form")

    const [switchIn, setSwitchIn] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [passwordNoMatch, setPasswordNoMatch] = useState(false);
    const [authError, setAuthError] = useState(false);
    const [register, setRegister] = useState(false);
    const [filled, setFilled] = useState(true);


    function makeProfileIcon () {
        const avatar = createAvatar(thumbs, {
            seed: ["Simon", "Daisy", "Loki", "Patches", "Baby", "Zoey", "Annie", "Bailey", "Simba", "Midnight", "Ginger", "Toby"],
            size: 96,
            backgroundColor: ["0016A6", "3D1AC9", "00A82A", "A89D00", "A86F00", "A83B01", "A80701", "A8009F", "5100A8"],
            backgroundType: ["solid"],
            randomizeIds: true,
            face: ["variant1", "variant2", "variant3", "variant4", "variant5"],
            shapeColor: ["3048FF", "21FAD3", "61DE26", "FFE645", "FFB638", "FF8336", "FF3232", "FF33FF", "9842FF"],
            eyes: ["variant1W12", "variant2W14", "variant3W12", "variant4W10", "variant5W16", "variant6W16", "variant7W12", "variant8W16", "variant9W14"],
            eyesColor: ["ffffff"],
            mouth: ["variant1", "variant2", "variant3", "variant4", "variant5"],
            mouthColor: ["ffffff"],
        })

        const dataUri = avatar.toDataUriSync();
        return dataUri;
    }

    function submitHandler(e, type) {
        e.preventDefault()
        if (passwordNoMatch === true) return
        if (type === "registration") {
            if (registerForm['register-password'].value.length >= 6) {

                setPasswordError(false);

                let name = registerForm['register-username'].value
                let email = registerForm['register-email'].value
                let password = registerForm['register-password'].value
                let company = registerForm['register-company'].value
                let profileIcon = makeProfileIcon();

                console.log(`${name} ${email} ${password}`)
                if (name.length === 0 || email.length === 0 || password.length === 0) {
                    setFilled(false);
                    console.log("hi")
                    return
                } else {
                    setFilled(true);
                }

                createUserWithEmailAndPassword(auth, email, password)
                    .then((user) => {
                        setDoc(doc(db, "userinfo", user.user.uid), {
                            username: name,
                            company: company,
                            profileIcon: profileIcon,
                        })
                        setRegister(true);
                        props.setIconType(true);
                        props.setUserOn(true);
                        getDoc(doc(db, 'userinfo', user.user.uid))
                            .then((doc) => {
                                props.setProfileIcon(doc.data().profileIcon)
                            })
                            .catch((error) => {
                                console.log(error.message)
                            })
                    })
                    .catch((error) => {
                        setAuthError(true);
                        console.log(error.message)
                    })

            } else {
                setPasswordError(true);
            }

        } else if (type === "login") {
            if (loginForm['login-password'].value.length >= 6) {

                setPasswordError(false);

                let email = loginForm['login-email'].value
                let password = loginForm['login-password'].value

                console.log(email + " " + password)

                signInWithEmailAndPassword(auth, email, password)
                    .then((user) => {
                        setAuthError(false);
                        props.setUserOn(true);
                        props.setIconType(true);
                        getDoc(doc(db, 'userinfo', auth.currentUser.uid))
                            .then((doc) => {
                                props.setProfileIcon(doc.data().profileIcon)
                            })
                            .catch((error) => {
                                console.log(error.message)
                            })
                    })
                    .catch((error) => {
                        setAuthError(true);
                        console.log(error.message)
                    })
            } else {
                setPasswordError(true);
            }
        }
    }

    function checkMatch(e) {
        const value = e.target.value;
        if (value.length === 0) {
            setPasswordNoMatch(false);
        } else if (document.getElementById("register-password").value != value) {
            setPasswordNoMatch(true);
        } else {
            setPasswordNoMatch(false);
        }
    }

    const logoutHandler = async () => {
        console.log("logout")        
        await signOut(auth)
            .then(() => {
                props.setUserOn(false);
                props.setIconType(false);
                console.log("logging out")
            })
            .catch((error) => {
                console.log(error.message)
            })
    }

    return (
        <div className={`absolute z-40 md:bottom-0 md:left-0
                        flex justify-center items-center flex-col
                        w-full h-full origin-bottom-left overflow-hidden
                        bg-gray-900 transition-all duration-300
                        ${props.loginState ? "scale-100" : "scale-0"}`}>
            <div className={`w-full h-full ${props.userOn ? "hidden" : "block"}`}>
                <form onSubmit={(e) => submitHandler(e, "registration")} id="register-form" className={`${switchIn ? "left-1/2 -translate-x-1/2" : "-left-full"} w-9/12 3xl:w-1/2 top-1/2 -translate-y-1/2 absolute transition-all duration-300 origin-left m-6 flex flex-col justify-center items-center gap-6`}>
                    <FormInput themeGlow={props.themeGlow} themeColor={props.themeColor} id="register-username" type="text" text="Username" />
                    <FormInput themeGlow={props.themeGlow} themeColor={props.themeColor} id="register-email" type="text" text="E-mail" />
                    <div className="w-full">
                        <label className={`${passwordError ? "block" : "hidden"} text-red-500 mr-auto ml-6`}>Password should contain minimum 6 characters</label>
                        <FormInput themeGlow={props.themeGlow} themeColor={props.themeColor} id="register-password" type="password" text="Password" />
                    </div>
                    <div className="w-full">
                        <label className={`${passwordNoMatch ? "block" : "hidden"} text-red-500 mr-auto ml-6`}>Password does not match</label>
                        <FormInput onKeyUp={checkMatch} themeGlow={props.themeGlow} themeColor={props.themeColor} id="register-password-check" type="password" text="Confirm Password" />
                    </div>
                    <FormInput themeGlow={props.themeGlow} themeColor={props.themeColor} id="register-company" type="text" text="Company (if you are part of one)" />
                    <div className="flex mr-auto gap-4">
                        <FormFinish themeGlow={props.themeGlow} themeColor={props.themeColor} /> 
                        <FormSwitch themeGlow={props.themeGlow} themeColor={props.themeColor} text="Login" action={() => {setSwitchIn(!switchIn)}} />
                    </div>
                    <label className={`${filled ? "hidden" : "block"} text-red-500 mr-auto ml-6`}>You have not filled out all required fields!</label>
                    <label className={`${register ? "block" : "hidden"} ${props.themeColor} mr-auto ml-6`}>Congratulations! You are registered!</label>
                </form>
                <form onSubmit={(e) => submitHandler(e, "login")} id="login-form" className={`${switchIn ? "-left-full" : "left-1/2 -translate-x-1/2"} w-9/12 3xl:w-1/2 top-1/2 -translate-y-1/2 absolute transition-all duration-300 origin-right m-6 flex flex-col justify-center items-center gap-6`}>
                    <FormInput themeGlow={props.themeGlow} themeColor={props.themeColor} type="text" id="login-email" text="E-mail" />
                    <div className="w-full">
                        <label className={`${passwordError ? "block" : "hidden"} text-red-500 mr-auto ml-6`}>Password should contain minimum 6 characters</label>
                        <FormInput themeGlow={props.themeGlow} themeColor={props.themeColor} type="password" id="login-password" text="Password" />
                    </div>                
                    <div className="flex mr-auto gap-4">
                        <FormFinish themeGlow={props.themeGlow} themeColor={props.themeColor} /> 
                        <FormSwitch themeGlow={props.themeGlow} themeColor={props.themeColor} text="Register" action={() => {setSwitchIn(!switchIn)}} />
                    </div>
                    <label className={`${authError ? "block" : "hidden"} text-red-500 mr-auto ml-6`}>Something went wrong... We are very sorry for this</label>
                </form>
            </div>
            <div className={`relative w-2/5 h-4/5 p-8 ${props.userOn ? "flex" : "hidden"} flex-col ${props.themeColor} active-glass-bg  rounded-3xl`}>
                <div className={`absolute -top-8 left-1/2 -translate-x-1/2 flex flex-col w-full h-fit ${props.themeColor} rounded-3xl`}>
                    <div className={`w-28 h-28 rounded-3xl mr-auto ml-auto overflow-hidden border-2 ${props.themeColor} active-bo transition-all duration-300 shadow-md ${props.themeGlow ? "active-shadow" : ""}`}>
                        <img className="w-full h-full" src={props.profileIcon} />
                    </div>
                    <div className={`mt-4 mr-auto ml-auto ${props.themeColor} active-darker-bg text-white w-fit pl-4 pr-4 pt-2 pb-2 rounded-3xl transition-all duration-300 shadow-md ${props.themeGlow ? "active-shadow" : ""} `}>
                        <h4 className=" text-2xl">{props.userName}</h4>
                    </div>
                    <div className={`mt-4 mr-auto ml-auto ${props.themeColor} active-darker-bg text-white w-fit pl-4 pr-4 pt-2 pb-2 rounded-3xl transition-all duration-300 shadow-md ${props.themeGlow ? "active-shadow" : ""} `}>
                        <p className=" text-md">Messages sent: 15</p>
                    </div>
                    <div className={`mt-4 mr-auto ml-auto ${props.themeColor} active-darker-bg text-white w-fit pl-4 pr-4 pt-2 pb-2 rounded-3xl transition-all duration-300 shadow-md ${props.themeGlow ? "active-shadow" : ""} `}>
                        <p className="text-md">Member since: 02.02.2023</p>
                    </div>
                </div>
                <div className="ml-auto mr-auto mt-auto">
                    <FormSwitch themeGlow={props.themeGlow} themeColor={props.themeColor} action={logoutHandler} text="Log out" />
                </div>
            </div>
        </div>
    )
};

const FormInput = (props) => {
    return (        
        <input onKeyUp={props.onKeyUp} id={props.id} type={props.type} placeholder={props.text} className={`w-full h-6 mr-auto pl-6 pr-6 pt-6 pb-6 rounded-3xl border-2
                                                                                  border-gray-800 hover-bo shadow-md
                                                                                  focus-bo bg-gray-800 outline-0 
                                                                                  ease-in-out duration-300 hover:shadow-lg 
                                                                                  focus:shadow-lg hover:rounded-xl focus:rounded-xl
                                                                                  ${props.themeColor} ${props.themeGlow ? "active-shadow" : "test"}`} />
    )
}

const FormFinish = (props) => {
    return (        
        <button type="submit" className={`w-40 h-12 rounded-3xl border-2 mr-auto shadow-md ${props.themeGlow ? "active-shadow" : ""}
                                        border-gray-800 hover-bo bg-gray-800 outline-0 
                                        ${props.themeColor} ease-in-out duration-300 hover:shadow-lg 
                                        focus:shadow-lg hover:rounded-xl focus:rounded-xl`}>Submit</button>
    )
}

const FormSwitch = (props) => {
    return (        
        <button type="button" onClick={props.action} className={`w-40 h-12 rounded-3xl border-2 mr-auto shadow-md ${props.themeGlow ? "active-shadow" : ""}
                                                                border-gray-800 hover-bo bg-gray-800 outline-0 
                                                                ${props.themeColor} ease-in-out duration-300 hover:shadow-lg 
                                                                focus:shadow-lg hover:rounded-xl focus:rounded-xl`}>{props.text}</button>
    )
}

export default Auth;