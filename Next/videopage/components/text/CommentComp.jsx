import { getAvatar } from '@/pages'
import useUsersStore from '@/stores/usersstore';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'
import Image from 'next/image';

const CommentComp = ({postID, userData, handleAsync}) => {
    const [input, setInput] = useState("");
    const [comments, setComments] = useState([]);
    const usersStore = useUsersStore();
    const router = useRouter();

    useEffect(() => {
        if (!postID) return

        getUsersAndComments(postID.toString())

    })

    async function getUsersAndComments (id) {
        try {

            const responseComments = await axios.post("/api/posts/comment", {
                type: "GET",
                id:id
            })
            
            if (responseComments.data.content.length > 0) {
                const userList = [];
                responseComments.data.content.forEach((comment) => {
                    userList.push(comment.userID)
                })
                const responseUsers = await axios.post("/api/posts/getUsers", {
                    type: "GETLISTOFUSERS",
                    ids: userList
                })
                usersStore.setUsers(responseUsers.data.content);
                const commentData = [];
                for (let i = 0; i < responseComments.data.content.length; i++) {
                    const currAvatar = await getAvatar(responseUsers.data.content[i].avatar)

                    commentData.push({
                        avatar: currAvatar,
                        username: responseUsers.data.content[i].data.name,
                        date: responseComments.data.content[i].date,
                        comment: responseComments.data.content[i].content
                    })
                }
                console.log(commentData)
                
                setComments(commentData)
            }

        } catch (error) {
            if (error instanceof AxiosError) {
                console.error(error)
            }
        }
    }
    const handleSendComment = async () => {
        
        if (userData?.id) {
            try {
                const res = await handleAsync(input);
                const newCommentArray = [{
                    avatar: userData.avatar,
                    username: userData.data.name,
                    date: res.data.content.date,
                    comment: res.data.content.content
                }, ...comments]
                
                console.log(newCommentArray)
                setComments(newCommentArray);
                setInput("");
            } catch (error) {
                if (error instanceof AxiosError) {
                    console.error(error)
                }
            }
        } else {
            router.push("/auth")
        }
    }   
    

  return (
    <div className='w-full flex flex-col gap-5'>
        <div className="w-full bg-c-accent p-4 rounded-lg flex gap-5 items-center justify-center">
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
        {
        comments.length > 0 &&
        <div className={`w-full h-fit p-4 rounded-lg bg-c-accent flex flex-col gap-5`}>
            {
                comments.map((comment, index) => {

                    return (
                        <div key={index} className='w-full flex flex-col gap-2 text-white'>
                            <div className={`w-fit flex gap-2 items-center`}>
                                <Image 
                                    src={comment.avatar} 
                                    alt='image'
                                    className='w-12 h-12 rounded-lg'
                                 />
                                <p className={`text-xl whitespace-nowrap`}>{comment.username}</p>    
                                <p className={`text-xl whitespace-nowrap mx-2`}>|</p>    
                                <p className={`text-lg whitespace-nowrap`}>{comment.date}</p>                                    
                            </div> 
                            <div className='w-full px-4 py-2 bg-black rounded-lg'>
                                <p>{comment.comment}</p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
        }
    </div>        
  )
}

export default CommentComp