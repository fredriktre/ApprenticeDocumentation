interface Props {
    background: string
    fontcolor: string
    changeTheme: any
    btncolor: string
    btnfontcolor: string
}

const Navigation = ({background, fontcolor, changeTheme, btncolor, btnfontcolor}:Props) => {
  return (
    <nav style={{
        background: background,
        color: fontcolor 
    }}>

        <h1>Avatar Maker</h1>
        <button 
        onClick={changeTheme}
        style={{
          background: btncolor,
          color: btnfontcolor
        }}
        >Change Theme</button>

    </nav>
  )
}

export default Navigation