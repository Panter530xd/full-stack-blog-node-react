const commentList = ({
  comments,
}: {
  comments: { text: string; postedBy: string }[];
}) => {
  return (
    <div className="add-comment-form">
      <h3 className=" font-semibold text-2xl ml-5 mt-3">Comments:</h3>
      {comments?.map((comment, index) => (
        <div className="comment" key={index}>
          <p>Comment: {comment?.text}</p>
          <p>Posted By: {comment?.postedBy}</p>
        </div>
      ))}
    </div>
  );
};

export default commentList;
