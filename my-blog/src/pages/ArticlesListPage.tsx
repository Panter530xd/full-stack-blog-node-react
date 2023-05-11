import articles from "../pages/artical-content";
import ArticlesList from "../components/ArticlesList";
const ArticleListPage = () => {
  return (
    <div className=" py-10">
      <h2 className="text-3xl font-bold my-4">Articles</h2>
      <ArticlesList articles={articles} />
    </div>
  );
};
export default ArticleListPage;
