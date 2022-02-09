import React, { useState } from "react";
import { nanoid } from "nanoid";
import "./styles/base.css";
import "./styles/card.css";
import "./styles/modal.css";
import "./styles/media.css";
import CardContainer from "./components/CardContainer";
import AddComment from "./components/AddComment";
import Modal from "./components/Modal";
import defaultData from "./data.json";

export default function App() {
  // Check localStorage if contains data object text version otherwise set in default json object in form of string
  const getData = () => {
    const data = JSON.parse(localStorage.getItem("data"));
    if (!data) {
      localStorage.setItem("data", JSON.stringify(defaultData));
      return defaultData;
    }
    return data;
  };

  const [data, setData] = useState(getData());

  // flags: 0 => Vote, 1 => Delete, 2 => Update

  const handleVote = (id, vote) => updateGlobal(id, 0, vote);

  const handleDelete = (id) => updateGlobal(id, 1);

  const handleUpdate = (id, updatedComment) => updateGlobal(id, 2, 0, updatedComment)

  /**
   * updateGlobal is to search comments and realize targeted operation
   * @param {number} id is id of comment
   * @param {number} flag is to define target vote, delete or update 0-Vote, 1-Delete, 2-Update
   * @param {number} vote is increase or descrease vote number
   * @param {string} updatedComment is used to update comment
   */
  const updateGlobal = (id, flag, vote, updatedComment) => {
    const comments = data.comments;

    // Use for loop after equality break loop for performance issue in case of bigger arrays
    for (let i = 0; i < comments.length; i++) {
      if (comments[i].id === id) {
        if (flag === 0) {

          // If the currentUser click on vote button ignore it
          if (data.currentUser.username === comments[i].user.username) break;

          // If score is 0 and user click minus button do not make changing
          if (comments[i].score === 0 && vote === -1) break;

          // Otherwise change score value
          comments[i] = {
            ...comments[i],
            score: comments[i].score + vote,
          };
        } else if (flag === 1) {
          // Else delete one element on i index
          comments.splice(i, 1);
        } else if (flag === 2) {
          comments[i] = {
            ...comments[i],
            content: updatedComment
          }
        }

        // After changing comments set in data object and return it then so render page
        setData((data) => {
          return {
            ...data,
            comments: comments,
          };
        });

        // Update also localStorage
        localStorage.setItem("data", JSON.stringify(data));
        break;

        // If id is not targeted, search in
      } else {
        // If the current array has no reply pass the next
        if (comments[i].replies.length === 0) continue;

        // Check now replies
        for (let j = 0; j < comments[i].replies.length; j++) {
          if (comments[i].replies[j].id === id) {
            if (flag === 0) {

              // If the currentUser click on vote button ignore it
              if (data.currentUser.username === comments[i].replies[j].user.username) break;


              // If score is 0 and user click minus button do not make changing
              if (comments[i].replies[j].score === 0 && vote === -1) break;

              // Otherwise change score value
              comments[i].replies[j] = {
                ...comments[i].replies[j],
                score: comments[i].replies[j].score + vote,
              };
            } else if (flag === 1) {
              // Else delete one element on j index
              comments[i].replies.splice(j, 1);
            } else if (flag === 2) {
              comments[i].replies[j] = {
                ...comments[i].replies[j],
                content: updatedComment
              }
            }

            // After changing comments set in data object and return it then so render page
            setData((data) => {
              return {
                ...data,
                comments: comments,
              };
            });

            // Update also localStorage
            localStorage.setItem("data", JSON.stringify(data));
            break;
          }
        }
      }
    }
  };

  // addComment is to add a new comment with currentUser
  const addComment = (comment) => {

    const newData = {
      ...data,
      comments: [
        ...data.comments,
        {
          id: nanoid(),
          content: comment,
          createdAt: "Today",
          score: 0,
          user: { ...data.currentUser },
          replies: []
        },
      ],
    }
    setData(newData);

    // Update also localStorage
    localStorage.setItem("data", JSON.stringify(newData));
  };

  return (
    <div className="container">
      {/* <Modal /> */}
      <CardContainer
        data={data}
        handleVote={handleVote}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
      />
      <AddComment currentUser={data.currentUser} addComment={addComment} />
    </div>
  );
}
