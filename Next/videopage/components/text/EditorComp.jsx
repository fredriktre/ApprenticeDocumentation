import { useEffect, useRef, useState, useCallback } from "react"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Bold from '@tiptap/extension-bold'
import Link from '@tiptap/extension-link'
import CharacterCount from '@tiptap/extension-character-count'
import Image from '@tiptap/extension-image'
import YT from '@tiptap/extension-youtube'
import Heading from '@tiptap/extension-heading'

const EditorComp = ({handler, cancler}) => {
    const [boldActive, setBoldActive] = useState(false)
    const [linkActive, setLinkActive] = useState(false)
    const [headerActive, setHeaderActive] = useState(false)
    const [imageList, setImageList] = useState([]);
    const [ytURLDropdownOpen, setYtURLDropdownOpen] = useState(false)
    const [ytURLDropdownText, setYtURLDropdownText] = useState("")

    const editor = useEditor({
        extensions: [
            StarterKit,
            Bold.configure({
                HTMLAttributes: {
                    class: 'editor-bold'
                }
            }),
            Link.configure({
                openOnClick: true,
                linkOnPaste: true,
                HTMLAttributes: {
                    class: 'editor-link'
                }
            }),
            CharacterCount.configure({
                limit: 5000,
            }),
            Image.configure({
                inline: true,
                allowBase64: true,
                HTMLAttributes: {
                    class: "editor-image"
                }
            }),
            YT.configure({
                inline: false,
                width: 480,
                height: 320,
                controls: true,
                nocookie: false,
                allowFullscreen: true,
                autoplay: false,
                ccLanguage: "en",
                progressBarColor: "white"
            }),
            Heading.configure({
                HTMLAttributes: {
                    class: "editor-header"
                }
            })
        ],
        content: ''
    })
    
    
    const handleSubmit = () => {

        const imagesElements = document.querySelectorAll(".editor-image");
        const images = []

        if (imagesElements.length > 0) {
            if (imageList.length > 0) {
                imageList.forEach((image) => {
                    for (let i = 0; i < imagesElements.length; i++) {
                        if (image.index.toString() === imagesElements[i].alt.toString()) {
                            images.push({
                                index: image.index,
                                image: image.image
                            })
                        }
                    }
                })
            } 
        }

        const json = editor.getJSON()

        const compiledData = {
            files: images,
            json: json
        }

        handler(compiledData)
    }

    const handleCancel = () => {
        setYtURLDropdownOpen(false)
        setYtURLDropdownText("")
        setImageList([])
        setHeaderActive(false)
        setBoldActive(false)
        setLinkActive(false)
        cancler()
    }

    const addImage = useCallback((event) => {

        setImageList([...imageList, {
            index: imageList.length,
            image: event.target.files[0]
        }])

        const src = URL.createObjectURL(new Blob([event.target.files[0]], {type: 'image/webp'}));
        console.log(src)

        if (src) {
          editor.chain().focus().setImage({ src: src, alt: `${imageList.length}` }).run()
        }
      }, [editor])

    const addYT = () => {
        if (ytURLDropdownText.length > 0) {
            editor.commands.setYoutubeVideo({
                src: ytURLDropdownText,
                width: 480,
                height: 320
            })
        }
        setYtURLDropdownText("")
    }
    
    if (!editor) return null

  return (
    <div className="w-full flex flex-col gap-2">
        <div className="w-full flex justify-start items-center gap-2">
            <button
                onClick={() => {
                    editor.commands.toggleBold()
                    setBoldActive(!boldActive)
                }}
                className={`w-12 h-12 flex justify-center items-center text-lg 
                placeholder:text-c-text placeholder:opacity-75 outline-none font-bold 
                ${boldActive ? "bg-c-s-button text-c-background hover:border-c-background" 
                : "bg-c-background text-c-text hover:border-c-s-button"}
                border-2 border-transparent transition-colors duration-300 rounded-lg`}
            >
                B
            </button>
            <div
                onClick={() => setHeaderActive(!headerActive)}
                className={`relative w-12 h-12 flex justify-center items-center text-lg 
                placeholder:text-c-text placeholder:opacity-75 outline-none font-bold cursor-pointer
                ${headerActive ? "bg-c-s-button text-c-background hover:border-c-background" 
                : "bg-c-background text-c-text hover:border-c-s-button"}
                border-2 border-transparent transition-colors duration-300 rounded-lg`}
            >
                <p>h</p>
                <div className={`absolute top-1/2 -translate-y-1/2 z-30 w-fit flex 
                gap-5 items-center bg-c-accent border-2 border-c-background px-4 py-2 rounded-lg transition-all duration-300
                ${headerActive ? "left-[110%] opacity-100 pointer-events-auto" : "left-[90%] opacity-0 pointer-events-none"}`}>
                    <button
                    onClick={() => {
                            editor.commands.setHeading({level: 1})
                        }
                    }
                    className={`relative w-12 h-12 flex justify-center items-center text-lg 
                    placeholder:text-c-text placeholder:opacity-75 outline-none font-bold 
                    ${headerActive ? "bg-c-s-button text-c-background hover:border-c-background" 
                    : "bg-c-background text-c-text hover:border-c-s-button"}
                    border-2 border-transparent transition-colors duration-300 rounded-lg`}
                    >
                        1
                    </button>
                    <button
                    onClick={() => {
                            editor.commands.setHeading({level: 2})
                        }
                    }
                    className={`relative w-12 h-12 flex justify-center items-center text-lg 
                    placeholder:text-c-text placeholder:opacity-75 outline-none font-bold 
                    ${headerActive ? "bg-c-s-button text-c-background hover:border-c-background" 
                    : "bg-c-background text-c-text hover:border-c-s-button"}
                    border-2 border-transparent transition-colors duration-300 rounded-lg`}
                    >
                        2
                    </button>
                    <button
                    onClick={() => {
                            editor.commands.setHeading({level: 3})
                        }
                    }
                    className={`relative w-12 h-12 flex justify-center items-center text-lg 
                    placeholder:text-c-text placeholder:opacity-75 outline-none font-bold 
                    ${headerActive ? "bg-c-s-button text-c-background hover:border-c-background" 
                    : "bg-c-background text-c-text hover:border-c-s-button"}
                    border-2 border-transparent transition-colors duration-300 rounded-lg`}
                    >
                        3
                    </button>
                </div>
            </div>
            <button
                onClick={() => {
                    setLinkActive(!linkActive)
                    editor.commands.toggleLink({href: "", target: '_blank'})
                }}
                className={`w-12 h-12 flex justify-center items-center text-lg 
                ${linkActive ? "bg-c-s-button text-c-background hover:border-c-background" 
                    : "bg-c-background text-c-text hover:border-c-s-button"}
                placeholder:text-c-text placeholder:opacity-75 outline-none font-bold 
                border-2 border-transparent transition-colors duration-300 rounded-lg`}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                </svg>
            </button>
            <button                
                className={`w-12 h-12 flex justify-center items-center text-lg 
                bg-c-background text-c-text hover:border-c-s-button relative
                placeholder:text-c-text placeholder:opacity-75 outline-none font-bold 
                border-2 border-transparent transition-colors duration-300 rounded-lg`}
            >
                <input type="file" className="absolute top-0 left-0 w-full h-full z-20 opacity-0" onChange={addImage} />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 pointer-events-none">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
            </button>
            <button
                onClick={() => {
                    if (ytURLDropdownOpen) {
                        setYtURLDropdownText("")
                        setYtURLDropdownOpen(false)
                    } else {
                        setYtURLDropdownOpen(true)
                    }
                }}
                className={`w-12 h-12 flex justify-center items-center text-lg 
                bg-c-background text-c-text hover:border-c-s-button
                placeholder:text-c-text placeholder:opacity-75 outline-none font-bold 
                border-2 border-transparent transition-colors duration-300 rounded-lg`}
            >
                {">"}
            </button>
        </div>
        <div className="relative w-full h-fit">
            <EditorContent editor={editor} />
            <div className={`absolute top-0 left-0 w-full px-2 h-16 flex items-center gap-5
            ${ytURLDropdownOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"} transition-opacity duration-300`}>
                <input placeholder="Youtube Link"
                type="text" onChange={ev => setYtURLDropdownText(ev.target.value)} value={ytURLDropdownText}
                className={`w-full py-2 px-4 text-lg bg-c-background text-c-text 
                placeholder:text-c-text placeholder:opacity-75 outline-none 
                border-2 transition-colors duration-300 rounded-lg border-gray-700 focus:border-c-s-button`} />
                <button
                onClick={() => {
                    addYT()
                    setYtURLDropdownOpen(false)
                }}
                className={`w-fit px-4 py-2 whitespace-nowrap flex justify-center items-center text-lg 
                bg-c-background text-c-text hover:border-c-s-button
                placeholder:text-c-text placeholder:opacity-75 outline-none font-bold 
                border-2 border-gray-700 transition-colors duration-300 rounded-lg`}
            >
                add
            </button>
            </div>
            <div className="absolute bottom-1 right-2 text-c-text flex gap-5">
                <p>
                    {5000 - editor.storage.characterCount.characters()}
                </p>
                <p>
                    {editor.storage.characterCount.words()} words
                </p>
            </div>
        </div>
        <div className="flex gap-5 items-center">
            <button
                onClick={handleSubmit}
                className={`w-fit px-4 py-2 flex justify-center items-center text-lg 
                bg-c-background hover:bg-green-600 hover:border-black text-c-text
                placeholder:text-c-text placeholder:opacity-75 outline-none font-bold 
                border-2 border-transparent transition-colors duration-300 rounded-lg`}
            >
                Post
            </button>
            <button
                onClick={handleCancel}
                className={`w-fit px-4 py-2 flex justify-center items-center text-lg 
                bg-c-background hover:bg-red-600 hover:border-black text-c-text
                placeholder:text-c-text placeholder:opacity-75 outline-none font-bold 
                border-2 border-transparent transition-colors duration-300 rounded-lg`}
            >
                Cancel
            </button>
        </div>
    </div>
  )
}

export default EditorComp