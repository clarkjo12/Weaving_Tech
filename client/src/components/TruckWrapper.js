import React, { Component } from "react";
import styled from "styled-components";
import BlueHeart from "../images/heartblue.png";

const TruckMiddle = styled.div`
  display: flex;
  justify-content: center;
`;
const TruckMain = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;

const Heart = styled.img`
  height: 75px;
`;

class TruckWrapper extends Component {
  render() {
    return (
      <TruckMain>
        <h2>Favorited:</h2>
        <TruckMiddle>
          <Heart img src={BlueHeart} alt="no dice" />
          <h2>: 342</h2>
        </TruckMiddle>
      </TruckMain>
    );
  }
}

export default TruckWrapper;
