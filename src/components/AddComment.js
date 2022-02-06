import React from "react";
import imgUser from "../images/avatars/image-ramsesmiron.png";

export default function AddComment() {
  return (
    <div className="card">
        <textarea className="card-input" />
        <img src={imgUser} alt="" className="card-img" />
        <button type="button" className="card-btn" value="SEND"/>
    </div>
  )
}
