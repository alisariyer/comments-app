import React from "react";

export default function AddComment({ data, handleData }) {

  const currentUserImage = data.currentUser.image.png;

  return (
    <div className="card">
        <textarea className="card-input" placeholder="Add a comment"/>
        <img src={currentUserImage} alt="" className="card-img card-img-grid" />
        <button type="button" className="card-btn">SEND</button>
    </div>
  )
}
