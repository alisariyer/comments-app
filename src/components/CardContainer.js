import React, { useState } from "react";
import Card from "./Card";
import AddComment from "./AddComment";

export default function CardContainer({
  data,
  handleVote,
  handleDelete,
  handleUpdate,
  insertReply,
  editMode,
  handleEditMode,
}) {
  
  const [replyId, setReplyId] = useState(null);

  const handleReply = (id) => {
    handleEditMode(true);
    setReplyId(id);
  }

  const cards = data.comments
    .sort((a, b) => b.score - a.score)
    .map((comment) => {
      return (
        <div key={comment.id}>
          <Card
            key={comment.id}
            comment={comment}
            currentUser={data.currentUser}
            handleVote={handleVote}
            handleDelete={handleDelete}
            handleUpdate={handleUpdate}
            handleReply={handleReply}
          />
          <div className="offset">
            {editMode && replyId && comment.id === replyId && (
              <AddComment
                currentUser={data.currentUser}
                insertReply={insertReply}
                isReplying={true}
                id={replyId}
                handleEditMode={handleEditMode}
                />
            )}
            
            {comment.replies.length > 0 &&
              comment.replies.map((reply) => (
                <div key={reply.id}>
                  <Card
                    comment={reply}
                    currentUser={data.currentUser}
                    handleVote={handleVote}
                    handleDelete={handleDelete}
                    handleUpdate={handleUpdate}
                    handleReply={handleReply}
                  />
                  {/* If replyId exist so initial value was null, and replyId equal to this card id add comment, this reply so send true */}
                  {editMode && replyId && reply.id === replyId && (
                    <AddComment
                      currentUser={data.currentUser}
                      insertReply={insertReply}
                      isReplying={true}
                      id={replyId}
                      handleEditMode={handleEditMode}
                      />
                      )}
                </div>
              ))}

          </div>
        </div>
      );
    });

  return <section>{cards}</section>;
}
