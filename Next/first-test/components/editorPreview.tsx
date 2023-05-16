import { OutputData } from '@editorjs/editorjs'

const editorJsHTML = require("editorjs-html");
const EditorJsToHTML:any = editorJsHTML();

type Props = {
    data?: OutputData;
    mode: boolean
}
type ParsedContent = string | JSX.Element;

const EditorPreview = ({data, mode}: Props) => {
    const html = EditorJsToHTML.parse(data) as ParsedContent[];

    return (
        <div className={`${mode ? "opacity-100" : "opacity-0"} prose w-full bg-cyan-800 text-white rounded-md p-4`} key={data?.time}>
            {html.map((item, index):any => {
                if (typeof item === "string") {
                    return ( 
                        <div dangerouslySetInnerHTML={{__html: item}} key={index}></div>
                    )
                }
                return item
            })}
        </div>
    )
}

export default EditorPreview