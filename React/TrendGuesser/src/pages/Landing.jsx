import Button from "../components/LinkButton"
import ColorHeader from "../components/ColorHeader"
import '../styles/landing.css'

export default function Landing() {

    return (
        <section className="landing">
            <div className="left">
                
            </div>
            
            <div className="center">
                <ColorHeader text="Trendguesser" />
                
                <p>A popularity guessing game for everyone!</p>

                <div className="button-wrapper"> 
                    <Button text="Play" to="/game" aninum="1" />          
                    <Button text="User" to="/user" aninum="2" />          
                </div>
            </div>

            <div className="right">

            </div>
        </section>
    )
}