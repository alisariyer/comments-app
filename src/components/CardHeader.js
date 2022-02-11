import React from "react";

export default function CardHeader({ comment, currentUser }) {
  const { createdAt, user } = comment;
  const image = user.image.png;
  const username = user.username;

  // Show you text if it is for currentUser
  const youSpan =
    currentUser.username === username ? (
      <span className="card-me">You</span>
    ) : (
      ""
    );
  return (
    <header className="card-header">
      <img src={image} alt="" className="card-img" />
      <h3 className="card-user">{username}</h3>
      {youSpan}
      <span className="card-date">{createdAt}</span>
    </header>
  );
}
