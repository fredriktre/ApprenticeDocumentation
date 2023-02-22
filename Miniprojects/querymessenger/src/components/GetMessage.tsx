import placeholder from '../assets/dummy.png'

export default function GetMessage() {
  return (
    <div className="flex flex-col justify-center items-center">
        <h1>Get message</h1>
        <img className='w-96 mb-10 border-2 border-black rounded-lg' src={placeholder} />
        <textarea className=" border-2 border-black rounded-lg mb-5 resize-none" rows="6" cols="50" placeholder="message" maxLength="1000"></textarea>
        <div className='w-full flex justify-between'>
            <input className='border-2 border-black rounded-lg indent-2' type="text" placeholder="messagequery" />
            <button className=" w-28 h-10 z-20 bg-black text-white rounded-lg" type="button">Get</button>
        </div>
    </div>
  )
}
