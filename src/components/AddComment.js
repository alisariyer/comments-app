import React from "react";

export default function AddComment({ data, handleData }) {

  return (
    <div className="card">
        <textarea className="card-input" placeholder="Add a comment"/>
        <img src={"./images/avatars/image-ramsesmiron.png"} alt="" className="card-img card-img-grid" />
        <button type="button" className="card-btn">SEND</button>
    </div>
  )
}
