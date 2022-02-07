import React from "react";
import Card from "./Card";

export default function CardContainer({data, handleVote, handleDelete}) {

  const cards = data.comments.map((comment) => {

    return (
      <div key={comment.id}>
        <Card key={comment.id} comment={comment} currentUser={data.currentUser} handleVote={handleVote} handleDelete={handleDelete}/>
        <div className="offset">
          {comment.replies.length > 0 &&
            comment.replies.map((reply) => (
              <Card key={reply.id} comment={reply} currentUser={data.currentUser}  handleVote={handleVote} handleDelete={handleDelete}/>
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
