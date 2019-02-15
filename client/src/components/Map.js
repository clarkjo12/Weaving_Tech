import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import styled from "styled-components";
import MapHeader from "./MapHeader";
import MapButtons from "./MapButtons";
import Modal from "./Modal";
import API from "../utils/API";
import TruckFav from "../images/truck-fav.png";
import TruckAll from "../images/truck-all.png";
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

const MapDiv = styled.div``;

// const infoStyle = styled.div`
//   color: white;
//   border: 3px solid gray;
//   border-radius: 5px;
//   z-index: 0;
// `;

// const Marker = ({ text }) => <div>{text}</div>;
// const InfoWindow = ({ text }) => <div style={{ infoStyle }}>{text}</div>;

var truckIcon = <img src={TruckImg} alt="nahh" />;

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: {
        lat: this.props.latitude,
        lng: this.props.longitude
      },
      nearbyTrucks: [],
      // activeMarker: {},
      // modalIsOpen: false,
      // InfoWindow: false
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
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

  // onMarkerClick = (props, marker, e) => {
  //   this.setState({
  //     activeMarker: marker,
  //     modalIsOpen: true,
  //     InfoWindow: true
  //   });
  // };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onMapClicked = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
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
  // containerStyle={{
  //                 height: "80%",
  //                 width: "80%",
  //                 position: "relative",
  //                 border: "3px solid gray",
  //                 borderRadius: "5px",
  //                 paddingRight: "10%"
  //               }}

  render() {
    const containerStyle = {
      position: "relative",
      width: "100%",
      height: "100%",
      border: "3px solid gray",
      borderRadius: "3px",
      marginLeft: "auto",
      marginRight: "auto"
    };
    return (
      <MainDiv>
        <MapHeader />

        <MapDiv>
          <div
            style={{
              height: "80vh",
              width: "85vw",
              marginLeft: "auto",
              marginRight: "auto",
              position: "relative"
            }}
          >
            <Map
              containerStyle={containerStyle}
              google={this.props.google}
              zoom={14}
              onClick={this.onMapClicked}
            >
              <Marker onClick={this.onMarkerClick} name={"Current location"} />

              <InfoWindow
                marker={this.state.activeMarker}
                visible={this.state.showingInfoWindow}
              >
                <div>
                  <h1>hell yea</h1>
                </div>
              </InfoWindow>
            </Map>
          </div>
        </MapDiv>
        <Modal
          modalIsOpen={this.state.modalIsOpen}
          visible={this.state.modalIsOpen}
        />
        <MapButtons />
      </MainDiv>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(MapContainer);
