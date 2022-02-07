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

        // Update also localStorage
        localStorage.setItem("data", JSON.stringify(data));
        break;

        // If id is not targeted, search in 
      } else {
        // If the current array has no reply pass the next
        if (comments[i].replies.length === 0) continue;
        
        // Check now replies
        for (let j = 0; j < comments[i].replies.length; j++) {
          console.log(comments[i].replies[j])
          if (comments[i].replies[j].id === id) {
            console.log('else');  
    
            // If score is 0 and user click minus button do not make changing
            if (comments[i].replies[j].score === 0 && vote === -1) break;
    
            // Otherwise change score value
            comments[i].replies[j] = {
              ...comments[i].replies[j],
              'score': comments[i].replies[j].score + vote
            }
            
            // After changing comments set in data object and return it then so render page
            setData((data) => {
              return {
                ...data,
                'comments': comments,
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
      />
      <AddComment data={data} handleData={handleData} />
    </div>
  );
}
