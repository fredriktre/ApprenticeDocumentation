import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc} from "firebase/firestore"
import { createAvatar } from '@dicebear/core'
import { thumbs } from '@dicebear/collection'
import { auth, db } from '../App'

const Auth = (props) => {
    const registerForm = document.getElementById("register-form")
    const loginForm = document.getElementById("login-form")

    const [switchIn, setSwitchIn] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [authError, setAuthError] = useState(false);
    const [register, setRegister] = useState(false);


    async function makeProfileIcon () {
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

        
        return avatar.toFile("profile.svg")
    }

    function submitHandler(e, type) {
        e.preventDefault()
        if (type === "registration") {
            if (registerForm['register-password'].value.length >= 6) {

                setPasswordError(false);

                let name = registerForm['register-username'].value
                let email = registerForm['register-email'].value
                let password = registerForm['register-password'].value
                let company = registerForm['register-company'].value

                createUserWithEmailAndPassword(auth, email, password)
                    .then((user) => {
                        setDoc(doc(db, "userinfo", user.user.uid), {
                            username: name,
                            company: company,
                        })
                        props.uploadImage(makeProfileIcon)
                        props.setIconType(true);
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
                        props.setIconType(true);
                        console.log(auth.currentUser)
                    })
                    .catch((error) => {
                        setAuthError(true);
                        console.log(error)
                    })

            } else {
                setPasswordError(true);
            }
        }
    }

    function switchState() {
        setSwitchIn(!switchIn)
    }

    return (
        <div className={`absolute z-40 md:bottom-0 md:left-0
                        flex justify-center items-center flex-col
                        w-full h-full origin-bottom-left overflow-hidden
                        bg-gray-900 transition-all duration-300
                        ${props.loginState ? "scale-100" : "scale-0"}`}>
            <form onSubmit={(e) => submitHandler(e, "registration")} id="register-form" className={`${switchIn ? "left-1/2 -translate-x-1/2" : "-left-full"} w-9/12 3xl:w-1/2 top-1/2 -translate-y-1/2 absolute transition-all duration-300 origin-left m-6 flex flex-col justify-center items-center gap-6`}>
                <FormInput themeGlow={props.themeGlow} themeColor={props.themeColor} id="register-username" type="text" text="Username" />
                <FormInput themeGlow={props.themeGlow} themeColor={props.themeColor} id="register-email" type="text" text="E-mail" />
                <div className="w-full">
                    <label className={`${passwordError ? "block" : "hidden"} text-red-500 mr-auto ml-6`}>Password should contain minimum 6 characters</label>
                    <FormInput themeGlow={props.themeGlow} themeColor={props.themeColor} id="register-password" type="password" text="Password" />
                </div>
                <FormInput themeGlow={props.themeGlow} themeColor={props.themeColor} id="register-company" type="text" text="Company (if you are part of one)" />
                <div className="flex mr-auto gap-4">
                    <FormFinish themeGlow={props.themeGlow} themeColor={props.themeColor} /> 
                    <FormSwitch themeGlow={props.themeGlow} themeColor={props.themeColor} text="Login" action={switchState} />
                </div>
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
                    <FormSwitch themeGlow={props.themeGlow} themeColor={props.themeColor} text="Register" action={switchState} />
                    <FormSwitch themeGlow={props.themeGlow} themeColor={props.themeColor} text="makePF" action={() => {props.uploadImage(makeProfileIcon())}} />
                </div>
                <label className={`${authError ? "block" : "hidden"} text-red-500 mr-auto ml-6`}>Something went wrong... We are very sorry for this</label>
            </form>
        </div>
    )
};

const FormInput = (props) => {
    return (        
        <input id={props.id} type={props.type} placeholder={props.text} className={`w-full h-6 mr-auto pl-6 pr-6 pt-6 pb-6 rounded-3xl border-2
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
                                        border-gray-800 hover-bo focus-bo bg-gray-800 outline-0 
                                        ${props.themeColor} ease-in-out duration-300 hover:shadow-lg 
                                        focus:shadow-lg hover:rounded-xl focus:rounded-xl`}>Submit</button>
    )
}

const FormSwitch = (props) => {
    return (        
        <button type="button" onClick={props.action} className={`w-40 h-12 rounded-3xl border-2 mr-auto shadow-md ${props.themeGlow ? "active-shadow" : ""}
                                                                border-gray-800 hover-bo focus-bo bg-gray-800 outline-0 
                                                                ${props.themeColor} ease-in-out duration-300 hover:shadow-lg 
                                                                focus:shadow-lg hover:rounded-xl focus:rounded-xl`}>{props.text}</button>
    )
}

export default Auth;