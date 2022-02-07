import React, { useState } from "react";
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

  const handleData = (data) => {
    setData(data);
    localStorage.setItem("data", JSON.stringify(data));
  };

  const handleVote = (id, vote) => updateGlobal(id, vote, false);

  const handleDelete = (id) => updateGlobal(id, 0, true);

  // updateGlobal is combined to manage for both vote feature and delete feature
  const updateGlobal = (id, vote, isDelete) => {
    const comments = data.comments;

    // Use for loop after equality break loop for performance issue in case of bigger arrays
    for (let i = 0; i < comments.length; i++) {
      if (comments[i].id === id) {
        if (!isDelete) {
          // If score is 0 and user click minus button do not make changing
          if (comments[i].score === 0 && vote === -1) break;

          // Otherwise change score value
          comments[i] = {
            ...comments[i],
            score: comments[i].score + vote,
          };
        } else {
          // Else delete one element on i index
          comments.splice(i, 1);
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
            if (!isDelete) {
              // If score is 0 and user click minus button do not make changing
              if (comments[i].replies[j].score === 0 && vote === -1) break;

              // Otherwise change score value
              comments[i].replies[j] = {
                ...comments[i].replies[j],
                score: comments[i].replies[j].score + vote,
              };
            } else {
              // Else delete one element on j index
              comments[i].replies.splice(j, 1);
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

  return (
    <div className="container">
      {/* <Modal /> */}
      <CardContainer
        data={data}
        handleData={handleData}
        handleVote={handleVote}
        handleDelete={handleDelete}
      />
      <AddComment data={data} handleData={handleData} />
    </div>
  );
}
