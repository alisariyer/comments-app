import React from 'react'

export default function CardVote({ comment, handleVote}) {
    const { score, id } = comment;
    return (
        <div className="card-vote">
        <span
          className="card-up"
          role="button"
          onClick={() => handleVote(id, 1)}
        >
          +
        </span>
        <span className="card-number">{score}</span>
        <span
          className="card-down"
          role="button"
          onClick={() => handleVote(id, -1)}
        >
          -
        </span>
      </div>
    )
}