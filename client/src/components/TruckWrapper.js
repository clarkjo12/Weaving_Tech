import React, { Component } from "react";
import styled from "styled-components";
import BlueHeart from "../images/heartblue.png";

const TruckMain = styled.div`
  display: flex;
  justify-content: center;
`;

const Heart = styled.img`
  height: 75px;
`;

class TruckWrapper extends Component {
  render() {
    return (
      <TruckMain>
        <Heart img src={BlueHeart} alt="no dice" />
        <h2>: 342</h2>
      </TruckMain>
    );
  }
}

export default TruckWrapper;
