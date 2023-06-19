import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'

const CommentComp = ({userData, handleAsync, comments}) => {
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(true);
    const [showComments, setShowComments] = useState([])
    const router = useRouter();

    useEffect(() => {
        if (!comments) return
        setLoading(false)
    }, [comments])

    const handleSendComment = async () => {
        
        if (userData?.id) {
            await handleAsync(input)
            setInput("");            
        } else {
            router.push("/auth")
        }
    }       

    const handleShowDate = (date) => {
        const newdate = new Date(date);
        return `${newdate.getUTCDate() + 1}/${newdate.getUTCMonth()} - ${newdate.getUTCFullYear()}`
    }

  return (
    <div className='w-full flex flex-col gap-5'>
        <div className="w-full bg-c-accent p-4 shadow-accent rounded-lg flex gap-5 items-center justify-center">
            <div className="relative w-full h-fit max-w-[85%] flex justify-center items-center">
                <textarea maxLength={200} rows={1} onChange={(ev) => setInput(ev.target.value)} value={input} 
                placeholder='Comment' className="w-full py-2 px-4 text-lg bg-c-background text-c-text hidescroll
                placeholder:text-c-text placeholder:opacity-75 outline-none resize-none
                border-2 transition-colors duration-300 rounded-lg border-transparent focus:border-c-s-button"/>     
                <div className="absolute bottom-1 right-2 text-c-text flex gap-5">
                    <p>
                        {200 - input.length}
                    </p>
                </div>
            </div>
            <div className="flex gap-5 items-center">
                <button
                    onClick={() => handleSendComment()}
                    className={`w-fit px-4 py-2 flex justify-center items-center text-lg 
                    bg-c-background hover:bg-green-600 hover:border-black text-c-text
                    placeholder:text-c-text placeholder:opacity-75 outline-none font-bold 
                    border-2 border-transparent transition-colors duration-300 rounded-lg`}
                >
                    Post
                </button>
            </div>
        </div>        
        <div className={`w-full h-fit p-4 rounded-lg bg-c-accent shadow-accent flex flex-col gap-5`}>
            {
                !loading &&
                comments &&
                comments.map((comment, index) => {
                    return (
                        <div key={index} className='w-full flex flex-col gap-2 text-white'>
                            <div className={`w-fit flex gap-2 items-center`}>
                                <img 
                                    src={comment.avatar} 
                                    alt='image'
                                    className='w-12 h-12 rounded-lg'
                                 />
                                <p className={`text-xl whitespace-nowrap`}>{comment.username}</p>    
                                <p className={`text-xl whitespace-nowrap mx-2`}>|</p>    
                                <p className={`text-lg whitespace-nowrap`}>{handleShowDate(comment.date)}</p>                                    
                            </div> 
                            <div className='w-full px-4 py-2 bg-black rounded-lg'>
                                <p>{comment.comment}</p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    </div>        
  )
}

export default CommentComp