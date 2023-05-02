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
        <div className={`${mode ? "opacity-100" : "opacity-0"} prose max-w-full md:max-w-2xl lg:max-w-3xl xl:max-w-4xl w-full bg-gray-100 rounded-md p-4`} key={data?.time}>
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