import { ArticleList } from '@/components/ArticleList'
import Head from 'next/head'

export default function Home({articles}:any) {

  return (
    <div>
      <Head>
        <title>WebDev News | Home</title>
        <meta name='keywords' content='web-development, programming' />
      </Head>

      <ArticleList articles={articles} />

    </div>
  )
}

export const getStaticProps = async () => {
  const res = await fetch (`https://jsonplaceholder.typicode.com/posts?_limit=6`)
  const articles = await res.json();

  return {
    props: {
      articles
    }
  }
}