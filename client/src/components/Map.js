import React, { Component } from "react";
// import GoogleMapReact from "google-map-react";
import styled from "styled-components";
import MapHeader from "./MapHeader";
import MapButtons from "./MapButtons";
import API from "../utils/API";
import Leaf from "./Leaf";

import TruckImg from "../images/truck-all.png";

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
  border: 3px solid gray;
  border-radius: 3px;
`;

const infoStyle = styled.div`
  color: white;
  border: 3px solid gray;
  border-radius: 5px;
  z-index: 0;
`;

const Marker = ({ text }) => <div>{text}</div>;
const InfoWindow = ({ text }) => <div style={{ infoStyle }}>{text}</div>;

var truckIcon = <img src={TruckImg} alt="nahh" />;

class MapDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: {
        lat: this.props.latitude,
        lng: this.props.longitude
      },
      nearbyTrucks: [],
      activeMarker: {},
      modalIsOpen: false
    };

    this.onMarkerClick = this.onMarkerClick.bind(this);
  }

  static defaultProps = {
    center: {
      lat: 35.91,
      lng: -79.05
    },
    zoom: 11
  };

  onMarkerClick = (props, marker, e) => {
    this.setState({
      activeMarker: marker,
      modalIsOpen: true
    });
  };

  loadMarkers = () => {
    let truckState = this.state.nearbyTrucks;
    console.log("Truck state:" + JSON.stringify(truckState));

    const truckMap = truckState.map(function(coord, key) {
      return (
        <Marker
          key={key}
          lat={coord.location[1]}
          lng={coord.location[0]}
          text={truckIcon}
        />
      );
    });

    console.log(truckMap);
  };

  componentWillMount = () => {
    API.findTrucks().then(async res => {
      // console.log("Results: " + JSON.stringify(res));
      if (res === 0) {
        console.log("No trucks in database!");
      } else {
        let truckDBArray = res.data;

        await this.setState({
          nearbyTrucks: truckDBArray
        });

        console.log("State: " + JSON.stringify(this.state.nearbyTrucks));

        //load the markers!
        this.loadMarkers();
      }
    });
  };

  render() {
    return (
      <MainDiv>
        <MapHeader />
        <MapDiv>
          <div style={{ height: "80vh", width: "100%" }}>
            {/* <GoogleMapReact
              bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY }}
              defaultCenter={this.state.center}
              defaultZoom={this.props.zoom}
              yesIWantToUseGoogleMapApiInternals
            >
              <Marker
                onClick={this.onMarkerClick}
                lat={this.state.center.lat}
                lng={this.state.center.lng}
                text={truckIcon}
              />
            </GoogleMapReact> */}
            <Leaf lat={this.state.center.lat} lng={this.state.center.lng} />
          </div>
        </MapDiv>
        <MapButtons />
      </MainDiv>
    );
  }
}

export default MapDisplay;
