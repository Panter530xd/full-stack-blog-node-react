import articles from "../pages/artical-content";
import ArticlesList from "../components/ArticlesList";
const ArticleListPage = () => {
  return (
    <div>
      <h1>Articles</h1>
      <ArticlesList articles={articles} />
    </div>
  );
};
export default ArticleListPage;
