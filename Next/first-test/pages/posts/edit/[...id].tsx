import EditorSystem from '@/components/editorSystem'
import Layout from '@/components/Layout'
import axios from 'axios';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import { OutputData } from '@editorjs/editorjs'

interface Data {
  title?: string;
  content?: OutputData;
  updated?: string;
  _id?: string,
}

const editPost = () => {
  const [getData, setGetData] = useState<Data>();
  const router = useRouter();

  const {id} = router.query

  useEffect(() => {
    if (!id) return;
    axios.get(`/api/post?id=${id}`).then((response:any) => {
      setGetData({
        title: response.data.title,
        content: response.data.content[0][0],
        updated: response.data.updated,
        _id: response.data._id
      });
    }).catch((err) => {
      console.warn(err)
    })
  }, [id])

  return (
    <Layout>
      
      {
        getData && <EditorSystem data={getData} />
      }

    </Layout>
  )
}

export default editPost