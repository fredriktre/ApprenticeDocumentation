
interface Props {
    source: string
    alt: string
}

const Image = ({source, alt}:Props) => {

  return (
    <div className="w-full bg-black h-full 
    rounded-lg flex justify-center items-center">

        <img className="rounded-lg w-full h-full object-contain" src={source} alt={alt} />

    </div>
  )
}

export default Image