import { useParams } from "react-router-dom";
import articlesData from "../pages/artical-content";
import NotFoundPage from "./NotFoundPage";
import axios from "axios";
import { useEffect, useState } from "react";
import CommentList from "../components/CommentsList";
import useUser from "../hooks/useUser";
import AddCommentForm from "../components/AddCommentForm";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vs } from "react-syntax-highlighter/dist/esm/styles/prism";

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
    <div className=" py-10 w-11/12 mx-auto">
      <h2 className="text-3xl font-bold my-4">{article?.title}</h2>
      <div className="upvotes-section py-5 flex items-center">
        {user ? (
          <button className="text-white whitespace-nowrap" onClick={addUpvote}>
            {canUpvote ? "Upvote" : "Already Upvoted"}
          </button>
        ) : (
          <button className="text-white">Log in to upvote</button>
        )}
        <p className="ml-2 font-semibold">
          This is Article has{" "}
          <span className="font-bold">{articleInfo.upvotes}</span> upvote(s)
        </p>
      </div>
      <div className="text-lg text-center">
        {article?.content?.map((paragraph: string, i) => (
          <div key={i} className="code-container">
            <SyntaxHighlighter language="typescript" style={vs}>
              {paragraph}
            </SyntaxHighlighter>
          </div>
        ))}
      </div>

      {user ? (
        <AddCommentForm
          articleName={id}
          onArticleUpdated={(updatedArticle: ArticleInfo) =>
            setArticleInfo(updatedArticle)
          }
        />
      ) : (
        <button className="text-white">Log in to add a comment</button>
      )}
      <CommentList comments={articleInfo.comments} />
    </div>
  );
};
export default ArticlePage;
