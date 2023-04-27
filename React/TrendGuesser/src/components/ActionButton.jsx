import '../styles/actionbutton.css'

export default function ActionButton(props) { 

    return (
        <div className="actionbutton">

            <button onClick={props.action}>{props.text}</button>

            <span className={`actionbutton-animation${props.aninum}`}></span>
            <span className='actionbutton-bg'></span>
        </div>
    )
}
