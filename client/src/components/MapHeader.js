import React, { Component } from "react";
import styled from "styled-components";
import MapLogo from "./../images/BlueLogo.png";

const MapHead = styled.div`
  display: flex;
  justify-content: center;
`;

const MapLogoBlue = styled.img`
  height: 60px;
  margin-bottom: 20px;
`;

class MapHeader extends Component {
  render() {
    return (
      <MapHead>
        <MapLogoBlue img src={MapLogo} alt="no dice" />
      </MapHead>
    );
  }
}

export default MapHeader;
