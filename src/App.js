import React from "react";
import "./styles/base.css";
import "./styles/card.css";
import CardContainer from "./components/CardContainer";
import AddComment from './components/AddComment'

export default function App() {
  return (
  <div className="container">
      <CardContainer />
      <AddComment />
  </div>
  );
}
