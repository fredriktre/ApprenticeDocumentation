interface Props {
    background: string
    fontcolor: string
}

const Footer = ({background, fontcolor}:Props) => {
  return (
    <footer style={{
        background: background,
        color: fontcolor,
        borderBottomColor: fontcolor
    }}>

        <p>Runs on <a target={"_blank"} href="https://www.dicebear.com/">Dicebear</a></p>

    </footer>
  )
}

export default Footer