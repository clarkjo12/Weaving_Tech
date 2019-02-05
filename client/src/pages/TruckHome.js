import React, { Component } from "react";
import MapHeader from "../components/MapHeader";
import Toggle from "../components/Switch";
import styled from "styled-components";
import TruckWrapper from "../components/TruckWrapper";

const TruckHomeDiv = styled.div`
  display: flex;
  justify-content: center;
  background-color: #38b6ff;
  margin-top: 40px;
`;

class TruckHome extends Component {
  render() {
    return (
      <div>
        <MapHeader />
        <TruckHomeDiv>
          <TruckWrapper />
          <Toggle />
        </TruckHomeDiv>
      </div>
    );
  }
}

export default TruckHome;
