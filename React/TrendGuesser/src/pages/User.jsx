import '../styles/user.css'
import LinkButton from "../components/LinkButton";
import ActionButton from '../components/ActionButton';
import icon from '../assets/usericon.svg'
import { useState } from 'react';

export default function User(props) {
    const [signType, setSignType] = useState(false);

    return (
        <section className="user">
            
            <div className="button-wrapper">
                <LinkButton to="/game" text="Play" aninum="1" />
                <LinkButton to="/" text="Back" aninum="2" />
            </div>
            <div className="user-content">
                <div className="card-container">
                    <div className="card-wrapper">
                        <div className="img-wrapper">
                            <img src={icon} />
                        </div>
                        <h3>Name</h3>
                        <p className="stat-text">Total Score | <span id="ts-stat">0</span></p>
                        <p className="stat-text">Hours Played | <span id="hp-stat">0</span></p>
                        <p className="stat-text">Games Played | <span id="gp-stat">0</span></p>
                        <p className="stat-text">Global Rank | <span id="gr-stat"n>0</span></p>
                    </div>
                    <span className="bg"></span>
                </div>
                <div className="card-container">
                    <div className="card-wrapper">

                        {
                            signType ? 
                            (<div className='input-wrapper'>
                                <input id='su-email' type="email" placeholder='Email'></input>
                                <input id='su-username' type="text" placeholder='Username'></input>
                                <input id='su-password' type="password" placeholder='Password'></input>
                                <input id='su-checkpassword' type="password" placeholder='Repeat password'></input>
                            </div>) 
                            : 
                            (<div className='input-wrapper'>
                                <input id='li-email' type="email" placeholder='Email'></input>
                                <input id='li-password' type="password" placeholder='Password'></input>
                            </div>) 
                        }

                        <div className='cw-button-wrapper'>
                            <ActionButton text={signType ? "Sign Up" : "Log In"} aninum="1" />
                            <ActionButton text={signType ? "Log In" : "Sign Up"} aninum="2" action={() => {setSignType(!signType)}} />
                        </div>
                    </div>
                    <span className="bg"></span>
                </div>
            </div>

        </section>
    )
}