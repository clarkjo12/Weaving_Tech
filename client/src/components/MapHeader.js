import React, { Component } from "react";
import styled from "styled-components";

const MapHead = styled.section`
  display: flex;
  justify-content: center;
  background: limegreen;
`;

class MapHeader extends Component {
  render() {
    return (
      <MapHead>
        <h2>Customer Map Page</h2>
      </MapHead>
    );
  }
}

export default MapHeader;
