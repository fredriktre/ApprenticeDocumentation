import Header from '@editorjs/header';
import Code from '@editorjs/code';
import Paragraph from '@editorjs/paragraph'
import Delimiter from '@editorjs/delimiter';
import Image from '@editorjs/image';
import Link from '@editorjs/link';
import Quote from '@editorjs/quote';
import axios from 'axios'

export const EDITOR_JS_TOOLS = {
    header: Header,
    code: Code,
    paragraph: Paragraph,
    delimiter: Delimiter,
    link: Link,
    quote: Quote,
    image: {
        class: Image,
        config: {
            uploader: {
                /**
                 * Upload file to the server and return an uploaded image data
                 * @param {File} file - file selected from the device or pasted by drag-n-drop
                 * @return {Promise.<{success, file: {url}}>}
                 */
                uploadByFile(file){
                  // your own uploading logic here
                  return new Promise((resolve, reject) => {

                    const data = new FormData();
                    data.append('file', file)

                    axios.post("/api/upload", data)
                        .then((res) => {
                            resolve({
                                success: 1,
                                file: {
                                    url: `${res.data[0]}`
                                }
                            })
                        })
                        .catch(err => {
                            reject(err)
                        })
                  })
                },
              }
        }
    }
};

