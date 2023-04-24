import articleStyles from '@/styles/Article.module.css'
import { ArticleItem } from './ArticleItem'

export const ArticleList = ({articles}:any) => {

    interface articleIF {
        body: string,
        id: number,
        title: string,
        userId: number
    }

  return (
    <div className={articleStyles.grid}>
        {articles.map((article:articleIF) => (
            <ArticleItem key={article.id} article={article} />
        ))}
    </div>
  )
}
