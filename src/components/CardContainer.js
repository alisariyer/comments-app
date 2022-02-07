import React from "react";
import Card from "./Card";
import data from "../data.json";

export default function CardContainer() {
  const cards = data.comments.map((comment) => {
    return (
      <>
        <Card key={comment.id} content={comment.content} />
        <div className="offset">
          {console.log(comment)}
        {comment.replies.length > 0 &&
          comment.replies.map((subComment) => (
            <Card key={subComment.id} content={subComment.content} />
          ))
        }
        </div>
      </>
    );
  });
  return <section>{cards}</section>;
}
