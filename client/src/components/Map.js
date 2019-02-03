import React, { Component } from "react";
import styled from "styled-components";

const MapDiv = styled.section`
  padding: 4em;
  display: flex;
  justify-content: center;
  background: papayawhip;
`;

const MapImg = styled.section`
  width: 80vw;
  justify-content: center;
`;

class Map extends Component {
  render() {
    return (
      <MapDiv>
        <img
          src="https://media.wired.com/photos/59269cd37034dc5f91bec0f1/master/w_550,c_limit/GoogleMapTA.jpg"
          alt="no dice"
        />
      </MapDiv>
    );
  }
}

export default Map;
