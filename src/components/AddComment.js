import React, { useState } from "react";

export default function AddComment({ currentUser, addComment }) {

  const currentUserImage = currentUser.image.png;

  const [comment, setComment] = useState('');

  const handleInput = (e) => {
    setComment(e.target.value);
  }

  return (
    <form action="#" className="card" onSubmit={(e) => e.preventDefault()}>
        <textarea className="card-input" placeholder="Add a comment" value={comment} onChange={handleInput}/>
        <img src={currentUserImage} alt="" className="card-img card-img-grid" />
        <button type="submit" className="card-btn" onClick={() => addComment(comment)}>SEND</button>
    </form>
  )
}
