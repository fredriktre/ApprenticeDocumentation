import Meta from '@/components/meta'
import {server} from '../../../config'
// import { useRouter } from "next/router";
import Link from 'next/link'

const article = ({article}:any) => {
    // const router = useRouter();
    // const {id} = router.query
  
    return (
        <>
            <Meta title={article.title} />
            <h1>{article.title}</h1>
            <p>{article.body}</p>
            <br />
            <Link href='/'>Go Back</Link>
        </>
    )
}

// export const getServerSideProps = async (context:any) => {
//     const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${context.params.id}`);

//     const article = await res.json();

//     return {
//         props: {
//             article
//         }
//     }
// }
// export const getStaticProps = async (context:any) => {
//     const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${context.params.id}`);

//     const article = await res.json();

//     return {
//         props: {
//             article
//         }
//     }
// }

// export const getStaticPaths = async () => {
//     const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
//     const articles = await res.json();

//     const ids = articles.map((article:any) => article.id)
//     const paths = ids.map((id:number) => ({params: {id:id.toString()}}))
//     return {
//         paths,
//         fallback: false
//     }
// }

export const getStaticProps = async (context:any) => {
    const res = await fetch(`${server}/api/articles/${context.params.id}`);

    const article = await res.json();

    return {
        props: {
            article
        }
    }
}

export const getStaticPaths = async () => {
    const res = await fetch(`${server}/api/articles/`);
    const articles = await res.json();

    const ids = articles.map((article:any) => article.id)
    const paths = ids.map((id:number) => ({params: {id:id.toString()}}))
    return {
        paths,
        fallback: false
    }
}

export default article