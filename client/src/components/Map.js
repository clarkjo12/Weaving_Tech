import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import styled from "styled-components";
import MapHeader from "./MapHeader";
import MapButtons from "./MapButtons";

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

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class Map extends Component {
  static defaultProps = {
    center: {
      lat: 35.91,
      lng: -79.05
    },
    zoom: 11
  };

  render() {
    return (
      <MapDiv>
        <MapHeader />
        <MapImg>
          <div style={{ height: "80vh", width: "100%" }}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: "/*API KEY HERE*/" }}
              defaultCenter={this.props.center}
              defaultZoom={this.props.zoom}
            >
              <AnyReactComponent
                lat={35.9132}
                lng={-79.055847}
                text={"Chapel Hill"}
              />
            </GoogleMapReact>{" "}
          </div>
        </MapImg>
      </MapDiv>
    );
  }
}

export default Map;
