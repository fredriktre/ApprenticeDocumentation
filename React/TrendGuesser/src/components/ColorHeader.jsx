import '../styles/colorheader.css'

export default function ColorHeader(props) {

    return (
        <div className="h1-wrapper">
            <h1>{props.text}</h1>
        </div>
    )
}