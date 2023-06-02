
interface Props {
    showImage: string
    handleDownload: any
    btncolor: string
    btnfontcolor: string
}

const Result = ({showImage, handleDownload, btncolor, btnfontcolor}:Props) => {
  return (
    <div className="result">
        
        <div className="img-wrapper">
          <img key={0} src={`${showImage}`} alt="image" />
        </div>

        <div className="btn-wrapper">
          <button style={{
                background: btncolor,
                color: btnfontcolor
            }} className="mt-4" onClick={() => handleDownload("png")}>Download PNG</button>
          <button style={{
                background: btncolor,
                color: btnfontcolor
            }} className="mt-4" onClick={() => handleDownload("jpeg")}>Download JPEG</button>
        </div>

    </div>
  )
}

export default Result