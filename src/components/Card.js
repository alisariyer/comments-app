import React from "react";
import imgUser from "../images/avatars/image-ramsesmiron.png"
import imgReply from "../images/icon-reply.svg";
import imgDelete from "../images/icon-delete.svg";
import data from "../data.json";

export default function Card() {
  const comment = data.comments[0].content;
  return (
    <>
      <header className="card-header">
          <img src={imgUser} alt="" className="card-img" />
          <h3 className="card-user">username</h3>
          <span className="card-me">You</span>
          <span className="card-date">2 days ago</span>
      </header>

      <section className="card-body">
        <p>{comment}</p>
      </section>

      <footer className="card-footer">
        <div className="vote">
          <span className="vote-up">+</span>
          <span className="vote-number">1</span>
          <span className="vote-down">-</span>
        </div>
        <div className="delete">
          <img src={imgDelete} alt="" />
          Delete
        </div>
        <div className="reply">
          <img src={imgReply} alt="" />
          Reply
        </div>
      </footer>
    </>
  );
}
