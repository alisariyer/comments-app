import React from "react";
import Card from "./Card";
import data from "../data.json";

export default function CardContainer() {

  const cards = data.comments.map((comment) => {
    return (
      <div key={comment.id}>
        <Card key={comment.id} comment={comment}/>
        <div className="offset">
          {comment.replies.length > 0 &&
            comment.replies.map((reply) => (
              <Card key={reply.id} comment={reply}/>
            ))
          }
        </div>
      </div>
    );
  });
  return (
    <section>
      {cards}
    </section>
  );
}
