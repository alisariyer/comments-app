import React, { useState } from "react";
/**
 * 
 * @param {currentUser, addComment, isReplying} isReplying is for check if it is reply or just a comment 
 * @returns 
 */
export default function AddComment({ currentUser, addComment, insertReply, isReplying , id, handleEditMode}) {

  const currentUserImage = currentUser.image.png;

  const [comment, setComment] = useState('');

  const handleInput = (e) => {
    setComment(e.target.value);
  }

  const handleClick = () => {
    if (isReplying) {
      insertReply(comment, id);
    } else {
      addComment(comment);
    }
    setComment('');
    handleEditMode(false);
  }

  return (
    <form action="#" className="card" onSubmit={(e) => e.preventDefault()}>
        <textarea className="card-input" placeholder="Add a comment" value={comment} onChange={handleInput}/>
        <img src={currentUserImage} alt="" className="card-img card-img-grid" />
        <button type="button" className="card-btn" onClick={handleClick}>{isReplying ? "REPLY" : "SEND"}</button>
    </form>
  )
}
