import EditorJS, { OutputData } from '@editorjs/editorjs';
import { EDITOR_JS_TOOLS } from '../lib/tools';
import { useRef, useEffect, memo } from 'react' 

type Props = {
  data? : OutputData;
  onChange(val: OutputData): void;
  holder: string;
}

const Editor = ({ data, onChange, holder }:Props) => {

  const ref = useRef<EditorJS>();

  useEffect(() => {
    if (!ref.current) {
      const editor = new EditorJS({
        holder: holder,
        tools: EDITOR_JS_TOOLS,
        data,
        // event:any
        async onChange(api:any) {
          const data = await api.saver.save();
          onChange(data);
        }
      });
      ref.current = editor
    }

    return () => {
      if (ref.current && ref.current.destroy) {
        ref.current.destroy();
      }
    }
  }, [])

  return (
    <div id={holder} className="md:max-w-2xl lg:max-w-3xl xl:max-w-4xl min-h-[20rem] w-full bg-gray-100 rounded-md py-4"></div>
  )
}

export default memo(Editor)