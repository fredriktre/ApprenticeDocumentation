
interface Props {
    source: string
}

const YtPlayer = ({source}:Props) => {

  return (
    <div className="video-responsive rounded-lg">
        <iframe 
          width={"853"}
          height={"480"}
          src={`https://www.youtube.com/embed/${source}`} 
          frameBorder={"0"}
          allow={"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"}
          allowFullScreen
          title="Embedded youtube"
        />
    </div>
  )
}

export default YtPlayer