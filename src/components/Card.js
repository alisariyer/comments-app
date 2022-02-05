import React from "react";
import imgUser from "../images/avatars/image-ramsesmiron.png";
import data from "../data.json";

export default function Card() {
  const comment = data.comments[0].content;
  return (
    <div className="card">
      <header className="card-header">
        <img src={imgUser} alt="" className="card-img" />
        <h3 className="card-user">username</h3>
        <span className="card-me">You</span>
        <span className="card-date">2 days ago</span>
      </header>

      <section className="card-body">
        <p><span className="card-tag">@ramsesmiron</span>{comment}</p>
      </section>


        <div className="card-vote">
          <span className="card-up">+</span>
          <span className="card-number">1</span>
          <span className="card-down">-</span>
        </div>
        <div className="card-modify">
          <div className="card-delete">
            <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z"
                fill="#ED6368"
              />
            </svg>
            <span>Delete</span>
          </div>
          <div className="card-reply">
            <svg width="14" height="13" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z"
                fill="#5357B6"
              />
            </svg>
            <span>Reply</span>
          </div>
        </div>

    </div>
  );
}
