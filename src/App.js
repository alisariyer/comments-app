import React from "react";
import "./styles/base.css";
import "./styles/card.css";
import "./styles/modal.css";
import CardContainer from "./components/CardContainer";
import AddComment from "./components/AddComment";
import Modal from "./components/Modal";

export default function App() {
  return (
    <div className="container">
      <Modal />
      <CardContainer />
      <AddComment />
    </div>
  );
}
