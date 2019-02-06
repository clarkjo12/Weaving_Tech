import React, { Component } from "react";
import styled from "styled-components";
import BlueHeart from "../images/heartblue.png";

const TruckMiddle = styled.div`
  display: flex;
  justify-content: center;
  padding-right: 10px;
`;
const TruckMain = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;

const Grey = styled.h2`
  color: darkslategray;
  text-decoration: underline;
  margin: 0;
`;
const Heart = styled.img`
  height: 75px;
`;

class TruckWrapper extends Component {
  render() {
    return (
      <TruckMain>
        <Grey>
          <h2>Favorited</h2>
        </Grey>
        <TruckMiddle>
          <Heart img src={BlueHeart} alt="no dice" />
          <h1>: 342</h1>
        </TruckMiddle>
      </TruckMain>
    );
  }
}

export default TruckWrapper;
