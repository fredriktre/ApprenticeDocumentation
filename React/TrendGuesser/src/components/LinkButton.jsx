import '../styles/button.css'
import { Link } from "react-router-dom"

export default function LinkButton(props) { 

    return (
        <div className="button">
            <Link to={props.to}>{props.text}</Link>
            <span className={`animation${props.aninum}`}></span>
            <span className="bg"></span>
        </div>
    )
}
