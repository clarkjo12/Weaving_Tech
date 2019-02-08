import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import styled from "styled-components";
import MapHeader from "./MapHeader";
import MapButtons from "./MapButtons";

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

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class Map extends Component {

  static defaultProps = {
    center: {
      lat: 35.91,
      lng: -79.05
    },
    zoom: 11
  };

  state = {
    center: {
      lat: 35.25,
      lng: -79.37
    }
  };

  render() {
    return (
      <MainDiv>
        <MapHeader />
        <MapDiv>
          <div style={{ height: "80vh", width: "100%" }}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY }}
              //pulling our default center from the state
              //use this.props.center for the defaultProps setting
              defaultCenter={this.state.center}
              defaultZoom={this.props.zoom}
            >
              {/* <AnyReactComponent
                // lat={this.state.currentLat}
                // lng={this.state.currentLng}
                // text={"Chapel Hill"}
              /> */}
            </GoogleMapReact>{" "}
          </div>
        </MapDiv>
        <MapButtons />
      </MainDiv>
    );
  }
}

export default Map;
