import React, { useState } from "react";
import "./styles/base.css";
import "./styles/card.css";
import "./styles/modal.css";
import "./styles/media.css";
import CardContainer from "./components/CardContainer";
import AddComment from "./components/AddComment";
import Modal from "./components/Modal";
import defaultData from './data.json'

export default function App() {

  const getData = () => {
    const data = JSON.parse(localStorage.getItem('data'));
    if (!data) { 
        localStorage.setItem('data', JSON.stringify(defaultData))
        return defaultData;
    } 
    return data;
  }

  const [data, setData] = useState(getData());
  const handleData = (data) => {
    setData(data);
    localStorage.setItem('data', JSON.stringify(data))
  }

  const handleVote = (vote, id) => {
    console.log(vote, 'id' , id);
  }

  return (
    <div className="container">
      {/* <Modal /> */}
      <CardContainer data={data} handleData={handleData} handleVote={handleVote}/>
      <AddComment data={data} handleData={handleData}/>
    </div>
  );
}
