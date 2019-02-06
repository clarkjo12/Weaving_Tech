import React, { Component } from "react";
import MapHeader from "../components/MapHeader";
import Toggle from "../components/Switch";
import styled from "styled-components";
import TruckWrapper from "../components/TruckWrapper";

const TruckHomeDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  background-color: #38b6ff;
  flex-direction: column;
  height: 100vh;
`;

const TruckMapHeader = styled.div`
  margin-top: 20px;
`;

class TruckHome extends Component {
  render() {
    return (
      <TruckHomeDiv>
        <TruckMapHeader>
          <MapHeader />
        </TruckMapHeader>
        <TruckWrapper />
        <Toggle />
      </TruckHomeDiv>
    );
  }
}

export default TruckHome;
