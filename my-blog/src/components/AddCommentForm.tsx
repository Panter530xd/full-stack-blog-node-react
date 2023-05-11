import axios from "axios";
import { useState } from "react";
import useUser from "../hooks/useUser";
type UpdatedArticle = {
  name: string;
  upvotes: number;
  comments: { postedBy: string; text: string }[];
  canUpvote: boolean;
};

interface AddCommentFormProps {
  articleName: string;
  onArticleUpdated: (updatedArticle: UpdatedArticle) => void;
}

const AddCommnetForm = ({
  articleName,
  onArticleUpdated,
}: AddCommentFormProps) => {
  const [name, setname] = useState("");
  const [commentText, setcommentText] = useState("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { user } = useUser();

  const api = axios.create({
    baseURL: "https://full-stack-react-node-blog.onrender.com/",
  });

  const addComment = async (e: React.FormEvent) => {
    e.preventDefault();

    // If either field is empty, display an error message and don't submit
    if (!commentText) {
      setErrorMessage("Please fill in both fields");
      return;
    }

    try {
      const token = user && (await user?.getIdToken());
      const headers = token ? { authtoken: token } : {};
      const response = await api.post(
        `/api/article/${articleName}/comments`,
        {
          postedBy: name,
          text: commentText,
        },
        {
          headers,
        }
      );
      const updatedArticle = response.data;
      onArticleUpdated(updatedArticle);
      setname("");
      setcommentText("");
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div id="add-comment-form">
      <h2 className="text-2xl font-bold">Add Comment</h2>
      <form onSubmit={addComment} className="flex flex-col justify-center">
        {user && <p>You are posting as {user.email}</p>}
        <textarea
          className="w-full"
          value={commentText}
          onChange={(e) => setcommentText(e.target.value)}
        />
        {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
        <div className=" w-full mt-5">
          <button className="bg-black text-white w-full">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddCommnetForm;
