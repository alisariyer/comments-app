import React from "react";
import imgUser from "../images/avatars/image-ramsesmiron.png";

export default function AddComment() {
  return (
    <div className="card">
        <textarea className="card-input" placeholder="Add a comment"/>
        <img src={imgUser} alt="" className="card-img card-img-grid" />
        <button type="button" className="card-btn">SEND</button>
    </div>
  )
}
