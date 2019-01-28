import React from "react";
import "./style.css";

function Card(props) {
  return (
    <div
      className="card"
      style={{
        backgroundImage: props.image ? `url(${props.image})` : "none"
      }}
    >
      yo
    </div>
  );
}

export default Card;
