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
        async onChange(api, event) {
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
    <div id={holder} className="md:max-w-3xl w-full bg-gray-950 rounded-md py-4"></div>
  )
}

export default memo(Editor)