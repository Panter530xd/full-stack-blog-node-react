import { Link } from "react-router-dom";

interface Article {
  name: string;
  title: string;
  content: string[];
}

interface ArticlesListProps {
  articles: Article[];
}

const ArticlesList = (props: ArticlesListProps) => {
  const { articles } = props;
  return (
    <div>
      {articles.map((article) => (
        <Link
          className="article-list-item"
          to={`/articles/${article.name}`}
          key={article.name}
        >
          <h3>{article.title}</h3>
          <p>{article.content[0].substring(0, 150)}...</p>
        </Link>
      ))}
    </div>
  );
};

export default ArticlesList;
