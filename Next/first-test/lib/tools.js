import Header from '@editorjs/header';
import Code from '@editorjs/code';
import Paragraph from '@editorjs/paragraph'
import Checklist from '@editorjs/checklist';
import Delimiter from '@editorjs/delimiter';
import Embed from '@editorjs/embed';
import Image from '@editorjs/image';
import Link from '@editorjs/link';
import Marker from '@editorjs/marker';
import Quote from '@editorjs/quote';


export const EDITOR_JS_TOOLS = {
    header: Header,
    code: Code,
    paragraph: Paragraph,
    checklist: Checklist,
    delimiter: Delimiter,
    embed: Embed,
    link: Link,
    marker: Marker,
    quote: Quote,
    image: {
        class: Image,
        config: {
            endpoints: {
                byFile: ''
            }
        }
    }
};

