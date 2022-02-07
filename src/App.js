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

  const handleVote = (vote, id) => {
    console.log(vote, "id", id);
    const comments = data.comments;

    // Use for loop after equality break loop for performance issue in case of bigger arrays
    for (let i = 0; i < comments.length; i++) {
      if (comments[i].id === id) {

        // If score is 0 and user click minus button do not make changing
        if (comments[i].score === 0 && vote === -1) break;

        // Otherwise change score value
        comments[i] = {
          ...comments[i],
          'score': comments[i].score + vote
        }

        // After changing comments set in data object and return it then so render page
        setData((data) => {
          return {
            ...data,
            'comments': comments,
          };
        });
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
      />
      <AddComment data={data} handleData={handleData} />
    </div>
  );
}
