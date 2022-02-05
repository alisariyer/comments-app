import React from "react";
import Card from "./Card";
import data from "../data.json";

export default function CardContainer() {
  console.log(data.comments);
  const cards = data.comments.map((comment) => {
    return (
      <>
        <Card key={comment.id} content={comment.content} />
        <div className="offset">
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
