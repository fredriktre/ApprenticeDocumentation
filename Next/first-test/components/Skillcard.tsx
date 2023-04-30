
interface Props {
    name: string,
    skill: number,
}

const Skillcard = ({name, skill}:Props) => {

    // const animation = [
    //     { width: 0 },
    //     { width: 20 * skill}
    // ]

    // function animateOnSeen() {
    //     document.querySelector(`#${name}`)?.animate(animation, {
    //         duration: 4000,
    //         iterations: 1,
    //     })
    // }

    return (
        <div id={`wrapper-${name}`}>
            <p>{name}</p>
            <div className="relative w-full h-6 bg-black rounded-md">
                <span id={name} className={`absolute block top-0 left-0 h-full bg-blue-500 rounded-md`}
                style={{
                    width: `${20 * skill}%`
                }}><span className="absolute right-2">{skill}</span></span>
            </div>
        </div>
    )
}

export default Skillcard