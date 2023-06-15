import Layout from '@/components/basic/Layout'
import VideoComp from '@/components/media/VideoComp';
import { FormEvent, useEffect, useRef, useState } from 'react'
import useUserStore from '@/stores/userstore';
import axios, { AxiosError } from 'axios';
import { Triangle } from 'react-loader-spinner';
import EditorComp from '@/components/text/EditorComp';
import { GetServerSideProps } from "next";
import { getIronSession } from "iron-session";
import { sessionOptions } from "@/lib/auth/sessionOptions";
import { User } from '..';
import { getAvatar } from '..';

export const getServerSideProps:GetServerSideProps<Props> = async ({req, res}) => {
  const session = await getIronSession(req, res, sessionOptions);
  const { user } = session;

  return {
    props: {
      user: user || null,
    }
  }
}

interface Props {
    user: User | null,
}

type SendData = {
    title: string,
    content: {},
}

const New = ({user}:Props) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [currAdd, setCurrAdd] = useState<string>("");
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
    const [blogInput, setBlogInput] = useState({
        title: "",
    })
    const userStore = useUserStore();

    useEffect(() => {
        if (!user) return
        if (!userStore.status) {
          getAvatar(`${user.avatar}`).then((res:any) => {
            userStore.setUser({
              id: user.id,
              data: {
                  email: user.data.email,
                  name: user.data.name,
              },
              admin: user.admin,
              avatar: res,
            })
          })
        }
      }, [user])

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



    const handleBlog = async (data:any) => {
        setLoading(true)
             
        let sendData:SendData = {
            title: blogInput.title,
            content: {},
        }     
        if (data.files.length >= 1) {
            const uploadData = new FormData();
            data.files.forEach((file:any) => {
                uploadData.append("file", file.image)
            })
            const imageResponse = await axios.post("/api/posts/uploadFile", uploadData)
            
            console.log(data.json)
            console.log(imageResponse)
            
            let currentImage = 0;
            data.json.content.forEach((line:any) => {
                console.log(line)
                line.content.forEach((piece:any) => {
                    console.log(piece)
                    console.log(currentImage)
                    if (piece.type === "image") {
                        piece.attrs.src = imageResponse.data.data.content[currentImage]
                        currentImage += 1;
                    }
                })
            })

            sendData = {
                title: sendData.title,
                content: data.json,
            }

        } 
        if (data.files.length === 0) {
            console.log("without files")
            sendData = {
                title: sendData.title,
                content: data.json,
            }
        }

        try {  
            const response = await axios.post("/api/posts/blog", {
                type: "POST",
                body: sendData
            })

            console.log(response)
            setBlogInput({
                title: "",
            })
            setLoading(false)
            setCurrAdd("")
        } catch (error) {
            if (error instanceof AxiosError) {
                console.error(error)
                setLoading(false)
            }
        }

    }

    const handleVlog = async (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (vlogInput.title.length > 0 && vlogInput.desc.length > 0 && fileVideo && fileThumbnail) {
            setLackingVlog("")
            try {
                setLoading(true)
                const uploadData = new FormData();

                uploadData.append("file", fileVideo)
                uploadData.append("file", fileThumbnail)
    
                const upload = await axios.post("/api/posts/uploadFile", uploadData)
                const response = await axios.post("/api/posts/vlog", {
                    type: "POST",
                    title: vlogInput.title,
                    desc: vlogInput.desc,
                    videoURL: upload.data.data.content[0],
                    thumbnailURL: upload.data.data.content[1],
                })
    
                setVlogInput({
                    title: "",
                    desc: ""
                })
                setFileThumbnail(null)
                setFileVideo(null)
                setCurrAdd("")
                setLoading(false)

            } catch (error) {
                if (error instanceof AxiosError) {
                    console.error(error)
                    setLoading(false)
                }
            }
        } else if (vlogInput.title.length < 1) {
            console.warn("Lacking title")
            setLackingVlog("title")
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
                    currAdd.length > 0 &&
                    currAdd === "vlog" && 
                    
                    <form onSubmit={handleVlog} className='w-full flex flex-col gap-5'>
                        {
                            loading 
                            
                            ?   <div className='w-full h-full flex justify-center items-center'>
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
                            
                            :   <>
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
                            </>
                        }                        
                        
                    </form>
                }

                {
                    currAdd.length > 0 &&
                    currAdd === "blog" &&  
                    <div className='w-full flex flex-col gap-5'>
                        {
                            loading
                            ?   <div className='w-full h-full flex justify-center items-center'>
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
                            : <>
                                <input 
                            type="text"
                            placeholder='Title'
                            className={`w-full py-2 px-4 text-lg bg-c-background text-c-text 
                            placeholder:text-c-text placeholder:opacity-75 outline-none 
                            border-2 transition-colors duration-300 rounded-lg border-transparent focus:border-c-s-button`}
                            value={blogInput.title}
                            onChange={(ev) => setBlogInput({
                                title: ev.target.value,
                            })} />
                        <EditorComp handler={handleBlog} cancler={() => setCurrAdd("")} />
                            </>
                        }                     
                    </div>
                }
            </div>
        </div>

    </Layout>
  )
}

export default New