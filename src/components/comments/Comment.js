import React from "react";
import { FiMessageSquare } from "react-icons/fi";
import { GrEdit } from "react-icons/gr";
import { VscTrash } from "react-icons/vsc";
import { images, stables } from "../../constants";
import CommentForm from "./CommentForm";

const Comment = ({
  commentData,
  logginedUserId,
  affectedComment,
  setAffectedComment,
  addComment,
  parentId = null,
  updateComment,
  deleteComment,
  replies,
}) => {
  const isUserLoggedIn = Boolean(logginedUserId);
  const commentBelongsToUser = logginedUserId === commentData.user._id;
  const isReplying =
    affectedComment &&
    affectedComment.type === "replying" &&
    affectedComment._id === commentData._id;
  const isEditing =
    affectedComment &&
    affectedComment.type === "editing" &&
    affectedComment._id === commentData._id;
  const repliedCommentId = parentId ? parentId : commentData._id;
  const replyOnUserId = commentData.user._id;

  return (
    <div
      className="flex flex-nowrap items-start gap-x-3 bg-[#f2f4f5] p-3 rounded-lg"
      id={`comment-${commentData?._id}`}
    >
      <img
        src={
          commentData?.user?.avatar
            ? stables.UPLOAD_FOLDER_BASE_URL + commentData.user.avatar
            : images.userImage
        }
        alt="user profile"
        className="w-9 h-9 object-cover rounded-full"
      />
      <div className="flex flex-1 flex-col">
        <h5 className="font-bold text-dark-hard text-xs lg:text-sm">
          {commentData.user.name}
        </h5>
        <span className="text-xs text-dark-light">
          {new Date(commentData.createdAt).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
          })}
        </span>
        {!isEditing && (
          <p className="font-opensans mt-[10px] text-dark-light">
            {commentData.desc}
          </p>
        )}
        {isEditing && (
          <CommentForm
            btnLabel="Update"
            formSubmitHandler={(value) => updateComment(value, commentData._id)}
            formCancelHandler={() => setAffectedComment(null)}
            initialText={commentData.desc}
          />
        )}
        <div className="flex items-center gap-x-3 text-dark-light font-roboto text-sm mt-3 mb-3">
          {isUserLoggedIn && (
            <button
              className="flex items-center space-x-2"
              onClick={() =>
                setAffectedComment({ type: "replying", _id: commentData._id })
              }
            >
              <FiMessageSquare className="w-4 h-auto" />
              <span>Reply</span>
            </button>
          )}
          {commentBelongsToUser && (
            <>
              <button
                className="flex items-center space-x-2"
                onClick={() =>
                  setAffectedComment({ type: "editing", _id: commentData._id })
                }
              >
                <GrEdit className="w-4 h-auto" />
                <span>Edit</span>
              </button>
              <button
                className="flex items-center space-x-1"
                onClick={() => deleteComment(commentData._id)}
              >
                <VscTrash className="w-4 h-auto" />
                <span>Delete</span>
              </button>
            </>
          )}
        </div>
        {isReplying && (
          <CommentForm
            btnLabel="Reply"
            formSubmitHandler={(value) =>
              addComment(value, repliedCommentId, replyOnUserId)
            }
            formCancelHandler={() => setAffectedComment(null)}
          />
        )}
        {replies.length > 0 && (
          <div>
            {replies.map((reply) => (
              <Comment
                key={reply._id}
                addComment={addComment}
                affectedComment={affectedComment}
                setAffectedComment={setAffectedComment}
                commentData={reply}
                deleteComment={deleteComment}
                logginedUserId={logginedUserId}
                replies={[]}
                updateComment={updateComment}
                parentId={commentData._id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
