import React, { Component } from "react";
import styled from "styled-components";
import MapHeader from "./MapHeader";

const MapDiv = styled.section`
  padding: 4em;
  display: flex;
  justify-content: center;
  flex-direction: column;
  background: #38b6ff;
`;

const MapImg = styled.section`
  border: 7px solid gray;
  border-radius: 5px;
`;

class Map extends Component {
  render() {
    return (
      <MapDiv>
        <MapHeader />
        <MapImg>
          <img
            src="https://media.wired.com/photos/59269cd37034dc5f91bec0f1/master/w_550,c_limit/GoogleMapTA.jpg"
            alt="no dice"
          />
        </MapImg>
      </MapDiv>
    );
  }
}

export default Map;
