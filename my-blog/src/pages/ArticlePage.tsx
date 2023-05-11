import { useParams } from "react-router-dom";
import articlesData from "../pages/artical-content";
import NotFoundPage from "./NotFoundPage";
import axios from "axios";
import { useEffect, useState } from "react";
import CommentList from "../components/CommentsList";
import useUser from "../hooks/useUser";
import AddCommentForm from "../components/AddCommentForm";

type ArticleInfo = {
  upvotes: number;
  comments: { postedBy: string; text: string }[];
  canUpvote: boolean;
};

export interface Article {
  name: string;
  title: string;
  content: string[];
}

const ArticlePage = () => {
  const [articleInfo, setArticleInfo] = useState<ArticleInfo>({
    upvotes: 0,
    comments: [],
    canUpvote: false,
  });
  const { id = "" } = useParams();
  const { canUpvote } = articleInfo;
  const { user, isLoading } = useUser();

  const api = axios.create({
    baseURL: "https://full-stack-react-node-blog.onrender.com/",
  });

  useEffect(() => {
    const loadArticleInfo = async () => {
      const token = user && (await user.getIdToken());
      const headers = token ? { authtoken: token } : {};
      const response = await api.get(`/api/article/${id}`, {
        headers,
      });
      const newArticleInfo = response.data;
      setArticleInfo(newArticleInfo);
    };

    if (!isLoading) {
      loadArticleInfo();
    }
  }, [api, id, isLoading, user]);

  const article = articlesData.find((article: Article) => article.name === id);

  const addUpvote = async () => {
    const token = user && (await user.getIdToken());
    const headers = token ? { authtoken: token } : {};
    const response = await api.put(`/api/article/${id}/upvote`, null, {
      headers,
    });
    const updatedArticle = response.data;
    setArticleInfo(updatedArticle);
  };

  if (!article) {
    return <NotFoundPage />;
  }
  return (
    <div>
      <h1>{article?.title}</h1>
      <div className="upvotes-section">
        {user ? (
          <button onClick={addUpvote}>
            {canUpvote ? "Upvote" : "Already Upvoted"}
          </button>
        ) : (
          <button>Log in to upvote</button>
        )}
        <p style={{ marginLeft: "10px" }}>
          This is Article has {articleInfo.upvotes} upvote(s)
        </p>
      </div>

      {article?.content?.map((paragraph: string, i) => (
        <p key={i}>{paragraph}</p>
      ))}
      {user ? (
        <AddCommentForm
          articleName={id}
          onArticleUpdated={(updatedArticle: ArticleInfo) =>
            setArticleInfo(updatedArticle)
          }
        />
      ) : (
        <button>Log in to add a comment</button>
      )}
      <CommentList comments={articleInfo.comments} />
    </div>
  );
};
export default ArticlePage;
