import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import styled from "styled-components";
import MapHeader from "./MapHeader";
import MapButtons from "./MapButtons";
import Modals from "./Modal";

const MainDiv = styled.section`
  padding: 4em;
  display: flex;
  justify-content: center;
  flex-direction: column;
  background: #38b6ff;
`;

// const MapImg = styled.section`
//   border: 1px solid gray;
//   border-radius: 5px;
// `;

const MapDiv = styled.div`
  border: 7px solid gray;
  border-radius: 5px;
`;

const Marker = ({ text }) => <div>{text}</div>;

class MapDisplay extends Component {
  state = {
    center: {
      lat: 35.25,
      lng: -79.37
    }
  };

  static defaultProps = {
    center: {
      lat: 35.91,
      lng: -79.05
    },
    zoom: 11
  };

  render() {
    return (
      <MainDiv>
        <MapHeader />
        <MapDiv>
          <div style={{ height: "80vh", width: "100%" }}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY }}
              defaultCenter={this.state.center}
              defaultZoom={this.props.zoom}
              yesIWantToUseGoogleMapApiInternals
            >
              <Marker
                lat={35.9132}
                lng={-79.055847}
                text={"⭐"}
              />
              <Marker 
                lat={this.state.center.lat} 
                lng={this.state.center.lng}
                text={"⭐"}
              />
            </GoogleMapReact>{" "}
          </div>
        </MapDiv>
        <MapButtons />
        <Modals />
      </MainDiv>
    );
  }
}

export default MapDisplay;
