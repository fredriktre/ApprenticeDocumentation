import placeholder from '../assets/dummy.png'

export default function PostMessage() {
    return (
    <div className="flex flex-col justify-center items-center">
        <h1>Post message</h1>
        <div className='relative mb-10'>
            <img className='w-96 border-2 border-black rounded-lg' src={placeholder} />
            <div className="absolute bottom-0 w-full h-10">
                <input className="absolute left-1/2 -translate-x-1/2 w-28 h-full z-30 opacity-0" type="file" />
                <button className="absolute left-1/2 -translate-x-1/2 w-28 h-full z-20 bg-black text-white rounded-t-lg" type="button">Add Image</button>
            </div>
        </div>        
        <textarea className=" border-2 border-black rounded-lg mb-5 resize-none" rows="6" cols="50" placeholder="message" maxLength="1000"></textarea>
        <div className='w-full flex justify-between'>
            <button className=" w-28 h-10 z-20 bg-black text-white rounded-lg" type="button">Post</button>
            <button className=" w-28 h-10 z-20 bg-black text-white rounded-lg" type="button">Copy Query</button>
        </div>
    </div>
    )
 }
 