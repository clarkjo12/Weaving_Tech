import React, { Component } from "react";
import Map from "../components/Map";
import styled from "styled-components";

import MapHeader from "../components/MapHeader";

const Header = styled.section`
  background: blue;
`;

class CustomerMap extends Component {
  render() {
    return (
      <div>
        <MapHeader />
        <Map />
      </div>
    );
  }
}

export default CustomerMap;
