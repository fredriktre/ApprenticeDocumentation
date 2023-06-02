import { Settings } from "../App"

interface Props {
    settings: Settings
    setSettings: any
    handleGenerate: any
    btncolor: string
    btnfontcolor: string
}

const SettingsEditor = ({settings, setSettings, handleGenerate, btncolor, btnfontcolor}:Props) => {
  


    return (
        <div className="settings-editor">
            <select value={settings.style} onChange={(ev) => setSettings({
                style: ev.target.value,
                text: settings.text,
                rotate: settings.rotate,
                scale: settings.scale,
                bgActive: settings.bgActive,
                bg: settings.bg,
                flip: settings.flip
            })} style={{
                background: btncolor,
                color: btnfontcolor
            }}>
                <option value={"initials"}>Initials</option>
                <option value={"identicon"}>Identicon</option>
                <option value={"lorelei"}>Lorelei</option>
                <option value={"loreleiNeutral"}>Lorelei Neutral</option>
                <option value={"funEmoji"}>Fun Emoji</option>
                <option value={"thumbs"}>Thumbs</option>
                <option value={"adventurer"}>Adventurer</option>
                <option value={"avataaars"}>Avataaars</option>
                <option value={"bigEars"}>Big Ears</option>
                <option value={"bigSmile"}>Big Smile</option>
                <option value={"bottts"}>Bottts</option>
                <option value={"botttsNeutral"}>Bottts Neutral</option>
                <option value={"croodles"}>Croodles</option>
                <option value={"croodlesNeutral"}>Croodles Neutral</option>
                <option value={"icons"}>Icons</option>
                <option value={"micah"}>Micah</option>
                <option value={"miniavs"}>Miniavs</option>
                <option value={"notionists"}>Notionists</option>
                <option value={"notionistsNeutral"}>Notionists Neutral</option>
                <option value={"openPeeps"}>Open Peeps</option>
                <option value={"personas"}>Personas</option>
                <option value={"pixelArt"}>Pixel Art</option>
                <option value={"pixelArtNeutral"}>Pixel Art Neutral</option>
                <option value={"shapes"}>Shapes</option>
            </select>
            <input 
                placeholder="Text / Name"
                type={"text"}
                value={settings.text} 
                onChange={(ev) => setSettings({
                    style: settings.style,
                    text: ev.target.value,
                    rotate: settings.rotate,
                    scale: settings.scale,
                    bgActive: settings.bgActive,
                    bg: settings.bg,
                    flip: settings.flip
                })} style={{
                    background: btncolor,
                    color: btnfontcolor
                }} />
            <select value={settings.rotate} onChange={(ev) => setSettings({
                style: settings.style,
                text: settings.text,
                rotate: parseInt(ev.target.value),
                scale: settings.scale,
                bgActive: settings.bgActive,
                bg: settings.bg,
                flip: settings.flip
            })} style={{
                background: btncolor,
                color: btnfontcolor
            }} >
                <option value={"0"}>0°</option>
                <option value={"10"}>10°</option>
                <option value={"20"}>20°</option>
                <option value={"30"}>30°</option>
                <option value={"40"}>40°</option>
                <option value={"50"}>50°</option>
                <option value={"60"}>60°</option>
                <option value={"70"}>70°</option>
                <option value={"80"}>80°</option>
                <option value={"90"}>90°</option>
                <option value={"100"}>100°</option>
                <option value={"110"}>110°</option>
                <option value={"120"}>120°</option>
                <option value={"130"}>130°</option>
                <option value={"140"}>140°</option>
                <option value={"150"}>150°</option>
                <option value={"160"}>160°</option>
                <option value={"170"}>170°</option>
                <option value={"180"}>180°</option>
                <option value={"190"}>190°</option>
                <option value={"200"}>200°</option>
                <option value={"210"}>210°</option>
                <option value={"220"}>220°</option>
                <option value={"230"}>230°</option>
                <option value={"240"}>240°</option>
                <option value={"250"}>250°</option>
                <option value={"260"}>260°</option>
                <option value={"270"}>270°</option>
                <option value={"280"}>280°</option>
                <option value={"290"}>290°</option>
                <option value={"300"}>300°</option>
                <option value={"310"}>310°</option>
                <option value={"320"}>320°</option>
                <option value={"330"}>330°</option>
                <option value={"340"}>340°</option>
                <option value={"350"}>350°</option>
                <option value={"360"}>360°</option>
            </select>
            <select value={settings.scale} onChange={(ev) => setSettings({
                style: settings.style,
                text: settings.text,
                rotate: settings.rotate,
                scale: parseInt(ev.target.value),
                bgActive: settings.bgActive,
                bg: settings.bg,
                flip: settings.flip
            })} style={{
                background: btncolor,
                color: btnfontcolor
            }} >
                <option value={"100"}>100%</option>
                <option value={"90"}>90%</option>
                <option value={"80"}>80%</option>
                <option value={"70"}>70%</option>
                <option value={"60"}>60%</option>
                <option value={"50"}>50%</option>
                <option value={"40"}>40%</option>
                <option value={"30"}>30%</option>
                <option value={"20"}>20%</option>
                <option value={"10"}>10%</option>
            </select>
            <select value={settings.bgActive} onChange={(ev) => setSettings({
                style: settings.style,
                text: settings.text,
                rotate: settings.rotate,
                scale: settings.scale,
                bgActive: ev.target.value,
                bg: settings.bg,
                flip: settings.flip
            })} style={{
                background: btncolor,
                color: btnfontcolor
            }} >
                <option value={"false"}>No Background</option>
                <option value={"true"}>Background</option>
            </select>
            {
                settings.bgActive === "true" ?
                <input 
                    type={"color"}
                    value={settings.bg} 
                    onChange={(ev) => setSettings({
                        style: settings.style,
                        text: settings.text,
                        rotate: settings.rotate,
                        scale: settings.scale,
                        bgActive: settings.bgActive,
                        bg: ev.target.value,
                        flip: settings.flip
                    })} style={{
                        background: btncolor,
                        color: btnfontcolor
                    }} />
                : ""
            }
            <select value={settings.flip} onChange={(ev) => setSettings({
                style: settings.style,
                text: settings.text,
                rotate: settings.rotate,
                scale: settings.scale,
                bgActive: settings.bgActive,
                bg: settings.bg,
                flip: ev.target.value
            })} style={{
                background: btncolor,
                color: btnfontcolor
            }}>
                <option value={"false"}>No Flip</option>
                <option value={"true"}>Flip</option>
            </select>
            <button onClick={handleGenerate} style={{
                background: btncolor,
                color: btnfontcolor
            }}>Generate</button>
        </div>
    )
}

export default SettingsEditor