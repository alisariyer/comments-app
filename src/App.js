import React, { useState, useEffect } from "react";
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

  // Get default data if localStorage has no data
  // To avoid lazy state used arrow function inside
  const [data, setData] = useState(() => JSON.parse(localStorage.getItem("data")) || defaultData);

  // flags: 0 => Vote, 1 => Delete, 2 => Update

  const handleVote = (id, vote) => updateGlobal(id, 0, vote);

  // state for modal
  const [isModal, setModal] = useState(false);

  // Keep Id of the item wanted to be deleted
  const [toBeDeleted, setToBeDeleted] = useState(null);

  // Check in case of any edit mode
  const [editMode, setEditMode] = useState(false);

  const handleEditMode = (bool) => setEditMode(bool);

  // When click on delete button show modal end get id of the item in question
  const handleDelete = (id) => {
    setModal(true);
    setToBeDeleted(id);
  };

  // When user click on yes or no, delete item and reset deletedItem state and hide modal
  const handleChoice = (choice) => {
    if (choice) {
      if (toBeDeleted) updateGlobal(toBeDeleted, 1);
    } else {
      setToBeDeleted(null);
    }
    setModal(false);
  };

  const handleUpdate = (id, updatedComment) =>
    updateGlobal(id, 2, 0, updatedComment);

  /**
   * updateGlobal is to search comments and realize targeted operation
   * @param {number} id is id of comment
   * @param {number} flag is to define target vote, delete or update: 0-Vote, 1-Delete, 2-Update
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
            content: updatedComment,
          };
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
              if (
                data.currentUser.username ===
                comments[i].replies[j].user.username
              )
                break;

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
                content: updatedComment,
              };
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
          replies: [],
        },
      ],
    };
    
    setData(newData);
    
    // Update also localStorage
    localStorage.setItem("data", JSON.stringify(newData));
  };
  
  const insertReply = (comment, id) => {

    // To check repyling for first or second level comment
    let mainUser = false;
    let replyingUser = false;

    for (let i=0; i < data.comments.length; i++) {
      mainUser = data.comments[i].id === id;
      replyingUser = data.comments[i].replies.find(reply => reply.id === id)

      if (mainUser || replyingUser) {
        let replyingResult = mainUser ? data.comments[i].user.username : data.comments[i].replies.filter(reply => reply.id === id)[0].user.username;

        data.comments[i].replies.push({
          id: nanoid(),
          content: comment,
          createdAt: 'today',
          score: 0,
          replyingTo: replyingResult,
          user: data.currentUser
        })
        
        setData(data);
        localStorage.setItem("data", JSON.stringify(data));
        break;
      }
    }
  }

  return (
    <div className="container">
      {isModal && <Modal handleChoice={handleChoice} />}
      <CardContainer
        data={data}
        handleVote={handleVote}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
        insertReply={insertReply}
        editMode={editMode}
        handleEditMode={handleEditMode}
        />
      <AddComment
        currentUser={data.currentUser}
        addComment={addComment}
        isReplying={false}
        editMode={editMode}
        handleEditMode={handleEditMode}
      />
    </div>
  );
}
