import Layout from '@/components/basic/Layout'
import VideoComp from '@/components/media/VideoComp';
import { FormEvent, useEffect, useRef, useState } from 'react'
import useUserStore from '@/stores/userstore';
import axios, { AxiosError } from 'axios';
import { Triangle } from 'react-loader-spinner';

const New = () => {
    const [currAdd, setCurrAdd] = useState<string>("vlog");
    const [fileVideo, setFileVideo] = useState<any>(null);
    const [fileThumbnail, setFileThumbnail] = useState<any>(null);
    const [vlogInput, setVlogInput] = useState({
        title: "",
        desc: ""
    })
    const videoRef = useRef(null)
    const thumbRef = useRef(null)
    const [previewSrc, setPreviewSrc] = useState<any>("");
    const [thumbnailSrc, setThumbnailSrc] = useState<any>("");
    const [lackingVlog, setLackingVlog] = useState<string>("");

    useEffect(() => {
        if (!fileVideo) return
        const src = URL.createObjectURL(new Blob([fileVideo], {type: 'video/mp4'}));
        setPreviewSrc(src);
    }, [fileVideo])

    useEffect(() => {
        if (!fileThumbnail) return
        const src = URL.createObjectURL(new Blob([fileThumbnail], {type: 'image/webp'}));
        setThumbnailSrc(src);
    }, [fileThumbnail])



    const handleBlog = async () => {

    }

    const handleVlog = async (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (vlogInput.title.length > 0 && vlogInput.desc.length > 0 && fileVideo && fileThumbnail) {
            console.log("all good")
            setLackingVlog("")
            try {
    
                const response = axios.post("/api/posts/vlog", {
                    
                })
    
            } catch (error) {
                if (error instanceof AxiosError) {
                    console.error(error)
                }
            }
        } else if (vlogInput.title.length < 1) {
            console.warn("Lacking title")
            setLackingVlog("title")
        } else if (vlogInput.desc.length < 1) {
            console.warn("Lacking description")
            setLackingVlog("desc")
        } else if (!fileVideo) {
            console.warn("Lacking video")
            setLackingVlog("video")
        } else if (!fileThumbnail) {
            console.warn("Lacking thumbnail")
            setLackingVlog("thumbnail")
        } else {
            console.error("something went wrong it seems... try again")
            setLackingVlog("")
        }
    }

  return (
    <Layout>

        <div className='w-4/5 mx-auto h-screen-wnav flex justify-center items-center flex-col gap-5 p-5'>
            <div className='bg-c-accent p-4 w-full h-fit flex gap-5 rounded-lg shadow-accent'>
                {
                    currAdd.length < 1 && <>
                        <button type='button' onClick={() => setCurrAdd("blog")}
                            className='w-fit py-2 px-4 text-lg bg-c-background text-c-text 
                            placeholder:text-c-text placeholder:opacity-75 outline-none
                            border-2 border-transparent hover:border-c-s-button transition-colors duration-300 rounded-lg'>
                            Blog
                        </button>
                        <button type='button' onClick={() => setCurrAdd("vlog")}
                            className='w-fit py-2 px-4 text-lg bg-c-background text-c-text 
                            placeholder:text-c-text placeholder:opacity-75 outline-none
                            border-2 border-transparent hover:border-c-s-button transition-colors duration-300 rounded-lg'>
                            Vlog
                        </button>
                    </>
                }

                {
                    currAdd === "vlog" && <form onSubmit={handleVlog} className='w-full flex flex-col gap-5'>

                        
                        <input 
                            type="text"
                            placeholder='Title'
                            className={`w-full py-2 px-4 text-lg bg-c-background text-c-text 
                            placeholder:text-c-text placeholder:opacity-75 outline-none 
                            border-2 transition-colors duration-300 rounded-lg ${lackingVlog === "title" ? "border-red-600" 
                            : "border-transparent focus:border-c-s-button"}`}
                            value={vlogInput.title}
                            onChange={(ev) => setVlogInput({
                                title: ev.target.value,
                                desc: vlogInput.desc
                            })} />
                            
                        <div className='w-full h-fit relative'>
                            <textarea 
                                placeholder='Description'
                                rows={8}
                                maxLength={1200}
                                className={`w-full py-2 px-4 text-lg bg-c-background text-c-text 
                                placeholder:text-c-text placeholder:opacity-75 outline-none resize-none
                                border-2 ${lackingVlog === "desc" ? "border-red-600" 
                                : "border-transparent focus:border-c-s-button"} transition-colors duration-300 rounded-lg`}
                                value={vlogInput.desc}
                                onChange={(ev) => setVlogInput({
                                    title: vlogInput.title,
                                    desc: ev.target.value
                                })} />
                            <p className='absolute bottom-5 right-5 text-white rounded-lg'>{1200 - vlogInput.desc.length}</p>
                            {
                                vlogInput.desc.length > 0 &&
                                <button type='button' onClick={() => setVlogInput({
                                        title: vlogInput.title,
                                        desc: ""
                                    })} className='absolute bottom-5 right-20 text-white rounded-lg'>Clear</button>
                            }
                        </div>

                        <div className='w-full flex gap-5 items-center'>
                            <div className='w-fit h-fit relative cursor-pointer'>
                                <input 
                                onChange={(ev:any) => setFileVideo(ev.target.files[0])}
                                type='file' 
                                ref={videoRef}
                                accept='video/mp4'
                                className='w-full h-full opacity-0 absolute top-0 left-0 cursor-pointer z-10' />
                                <button type='button'
                                    className='w-fit py-2 px-4 text-lg bg-c-background text-c-text 
                                    placeholder:text-c-text placeholder:opacity-75 outline-none
                                    border-2 border-transparent hover:border-c-s-button transition-colors duration-300 rounded-lg'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                                    </svg>
                                </button>
                            </div>
                            <p className={`w-full py-2 px-4 text-lg bg-c-background text-c-text 
                            placeholder:text-c-text placeholder:opacity-75 outline-none
                            border-2 ${lackingVlog === "video" ? "border-red-600" 
                            : "border-transparent focus:border-c-s-button"} transition-colors duration-300 rounded-lg`}>
                                {
                                    fileVideo ? `${fileVideo.name}` : "No MP4 file picked"
                                }
                            </p>
                        </div>
                        
                        <VideoComp source={previewSrc} title={`Preview: ${fileVideo && `${fileVideo.name}`}`} />

                        {
                            fileVideo && <>
                                <div className='w-full flex gap-5 items-center'>
                                    <div className='w-fit h-fit relative cursor-pointer'>
                                        <input 
                                        onChange={(ev:any) => setFileThumbnail(ev.target.files[0])}
                                        type='file' 
                                        ref={thumbRef}
                                        accept='.jpg, .png'
                                        className='w-full h-full opacity-0 absolute top-0 left-0 cursor-pointer z-10' />
                                        <button type='button'
                                            className='w-fit py-2 px-4 text-lg bg-c-background text-c-text 
                                            placeholder:text-c-text placeholder:opacity-75 outline-none
                                            border-2 border-transparent hover:border-c-s-button transition-colors duration-300 rounded-lg'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                                            </svg>
                                        </button>
                                    </div>
                                    <p className={`w-full py-2 px-4 text-lg bg-c-background text-c-text 
                                    placeholder:text-c-text placeholder:opacity-75 outline-none
                                    border-2 ${lackingVlog === "thumbnail" ? "border-red-600" 
                                    : "border-transparent focus:border-c-s-button"} transition-colors duration-300 rounded-lg`}>
                                        {
                                            fileThumbnail ? `${fileThumbnail.name}` : "No thumbnail picked"
                                        }
                                    </p>
                                </div>
                                    
                                <div className={`w-full relative ${fileThumbnail ? "w-fit h-fit" : "w-full aspect-video"} rounded-lg overflow-hidden`}>
                                    <div className={`w-full aspect-video absolute top-0 left-0 z-20 bg-black flex justify-center items-center ${fileThumbnail ? "opacity-0" : "opacity-100"}`}>
                                        <Triangle 
                                            height={"150"}
                                            width={"150"}
                                            color='#ffffff'
                                            ariaLabel='triangle-loading'
                                            wrapperStyle={{}}
                                            wrapperClass=''
                                            visible={true}
                                        />
                                    </div>
                                    <img src={thumbnailSrc} alt="thumbnail" className='w-full' />
                                </div>
                            </>
                        }

                        <div className='w-full flex gap-5'>
                            <button type='submit'
                                className='w-fit py-2 px-4 text-lg bg-c-background hover:bg-green-600 text-c-text 
                                placeholder:text-c-text placeholder:opacity-75 outline-none
                                border-2 border-transparent hover:border-black transition-colors duration-300 rounded-lg'>
                                Post
                            </button>
                            <button type='button'
                                onClick={() => {
                                    setFileVideo(null)
                                    setFileThumbnail(null)
                                    setVlogInput({
                                        title: "",
                                        desc: ""
                                    })
                                    setCurrAdd("")
                                    setLackingVlog("")
                                    setPreviewSrc("")
                                    setThumbnailSrc("")
                                }}
                                className='w-fit py-2 px-4 text-lg bg-c-background hover:bg-red-600 text-c-text 
                                placeholder:text-c-text placeholder:opacity-75 outline-none
                                border-2 border-transparent hover:border-black transition-colors duration-300 rounded-lg'>
                                Cancel
                            </button>
                        </div>
                    </form>
                }
            </div>
        </div>

    </Layout>
  )
}

export default New