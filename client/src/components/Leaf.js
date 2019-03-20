import React, { Component } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import AllTruck from "../images/truck-all.png";
import FavTruck from "../images/truck-fav.png";
import styled from "styled-components";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Modal from "./Modal";
import API from "../utils/API";
import { Style } from "react-style-tag";

import truckImg from "../images/navimg.png";
import heartImg from "../images/heartblue.png";
import heartImg40 from "../images/heartblue40.png";

import openSocket from "socket.io-client";
const socket = openSocket(window.location.hostname + ":3080");

const MapDiv = styled.div`
  height: 100%;
  width: 100%;
`;

const PopDiv = styled.div``;

const PopHead = styled.h5`
  margin-top: 0;
  margin-bottom: 8px;
  padding-right: 35px;
  min-width: 80px;
  text-align: right;
`;

const PopWrapper = styled.div``;

const NavImg = styled.img`
  width: 33%;
  /* padding-right: 18px; */
`;

const HeartImg = styled.img`
  width: 25%;
  padding-right: 7px;
  margin-bottom: -2px;
`;

//////Styling ^
////
//

class SimpleExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: this.props.lat,
      lng: this.props.lng,
      zoom: 11,
      nearbyTrucks: [],
      userFavorites: [],
      isFavoritesActive: this.props.isFavoritesActive
    };
  }

  componentWillMount = () => {
    // if (!this.state.isFavoritesActive) {
    //   API.findTrucks().then(async res => {
    //     if (res === 0) {
    //       console.log("No trucks in database!");
    //     } else {
    //       let truckDBArray = res.data;
    //       await this.setState({
    //         nearbyTrucks: truckDBArray
    //       });
    //     }
    //   });
    // } else {
    //   API.findFavs().then(async res => {
    //     if (res === 0) {
    //       console.log("No favorites found!");
    //     } else {
    //       let truckDBArray = res.data;
    //       await this.setState({
    //         nearbyTrucks: truckDBArray
    //       });
    //     }
    //   });
    // }
  };

  componentDidMount = () => {
    this.updateTrucksArray();
  };

  updateTrucksArray = () => {
    if (this.props.userId) {
      API.findEater(this.props.userId).then(res => {
        const favorites = res.data.favorites;
        this.setState({ userFavorites: favorites });
      });
    }

    if (!this.state.isFavoritesActive) {
      API.findTrucks().then(async res => {
        if (res === 0) {
          console.log("No trucks in database!");
        } else {
          //let truckDBArray = res.data;
          //filter out only the open trucks
          let truckDBArray = res.data.filter(function(truck) {
            return truck.status === "open";
          });

          await this.setState({
            nearbyTrucks: truckDBArray
          });
        }
      });
    } else {
      API.findFavs().then(async res => {
        if (res === 0) {
          console.log("No favorites found!");
        } else {
          //let truckDBArray = res.data;
          //filter out only the open trucks
          let truckDBArray = res.data.filter(function(truck) {
            return truck.status === "open";
          });

          await this.setState({
            nearbyTrucks: truckDBArray
          });
        }
      });
    }
  };

  receiveSocketIO(updateTrucksArray) {
    socket.on("truck status changed", function() {
      //update the trucks array
      updateTrucksArray();
    });
  }

  checkIfFav = (username, favorites) => {
    if (favorites) {
      for (let i = 0; i < favorites.length; i++) {
        if (favorites[i] === username) {
          return true;
        }
      }
      return false;
    }
  };

  sendSocketIO(truckname) {
    socket.emit("user updated favorties", truckname);
  }

  addTruckToUserFavs = (username, e) => {
    e.preventDefault();
    this.sendSocketIO(username);
    if (!this.checkIfFav(username, this.state.userFavorites)) {
      API.updateEaterFav(this.props.userId, { username: username })
        .then(res => {
          console.log("Added favorite" + username);
          let favoritesArr = this.state.userFavorites;
          favoritesArr.push(username);
          this.setState({ userFavorites: favoritesArr });
          this.props.updateFavs();
        })
        .catch(err => {
          console.log("eater favorites error: ");
          console.log(err);
        });
    } else {
      API.removeEaterFav(this.props.userId, { username: username })
        .then(res => {
          console.log("Removed favorite");
          let favoritesArr = this.state.userFavorites;
          favoritesArr.splice(favoritesArr.indexOf(username), 1);
          this.setState({ userFavorites: favoritesArr });
          this.props.updateFavs();
        })
        .catch(err => {
          console.log("eater favorites error: ");
          console.log(err);
        });
    }
  };

  openDirections(lat, lng) {
    var uLat = this.state.lat;
    var ulong = this.state.lng;
    var tLat = lat;
    var tLong = lng;
    var directionLink =
      "https://www.google.com/maps/dir/'" +
      uLat +
      "," +
      ulong +
      "'/'" +
      tLat +
      "," +
      tLong +
      "'";

    window.open(directionLink);
  }

  // markerRender = (props) => {
  //   if (!this.state.isFavoritesActive) {
  //     return {allMarkers}
  //   } else {
  //     return {favMarkers}
  //   }
  // };

  render() {
    this.receiveSocketIO(this.updateTrucksArray);

    const position = [this.state.lat, this.state.lng];

    let allMarkers = this.state.nearbyTrucks.map((truck, key) => {
      let heartSrc = heartImg40;
      let truckSrc = AllTruck;

      if (this.checkIfFav(truck.username, this.state.userFavorites)) {
        heartSrc = heartImg;
        truckSrc = FavTruck;
      }
      return (
        <Marker
          key={key}
          position={truck.location.coordinates}
          icon={L.icon({
            iconUrl: truckSrc,
            iconAnchor: [25, 45],
            popupAnchor: [0, -30]
          })}
        >
          <Popup className="mypopup">
            <PopDiv>
              <PopWrapper>
                <PopHead>{truck.title}</PopHead>
                <Modal
                  lat={this.state.lat}
                  long={this.state.lng}
                  tlat={truck.location.coordinates[0]}
                  tlong={truck.location.coordinates[1]}
                  username={truck.username}
                  name={truck.name ? truck.name : truck.username}
                  title={truck.title}
                  summary={truck.summary}
                  picture={truck.picture}
                  favoritedNum={this.state.favorites}
                  heartSrc={heartSrc}
                  addTruckToUserFavs={this.addTruckToUserFavs}
                />
              </PopWrapper>
            </PopDiv>
            <Style>{`
                .mypopup .leaflet-popup-tip,
                .mypopup .leaflet-popup-content-wrapper {
                    background: #ffde59;
                }
              `}</Style>
          </Popup>
        </Marker>
      );
    });

    let favMarkers = this.state.nearbyTrucks.map((truck, key) => {
      let heartSrc = heartImg40;
      let truckSrc = AllTruck;

      if (this.checkIfFav(truck.username, this.state.userFavorites)) {
        heartSrc = heartImg;
        truckSrc = FavTruck;
        return (
          <Marker
            key={key}
            position={truck.location.coordinates}
            icon={L.icon({
              iconUrl: truckSrc,
              iconAnchor: [25, 45],
              popupAnchor: [0, -30]
            })}
          >
            <Popup className="mypopup">
              <PopDiv>
                <PopWrapper>
                  <PopHead>{truck.title}</PopHead>
                  <Modal
                    lat={this.state.lat}
                    long={this.state.lng}
                    tlat={truck.location.coordinates[0]}
                    tlong={truck.location.coordinates[1]}
                    username={truck.username}
                    title={truck.title}
                    summary={truck.summary}
                    picture={truck.picture}
                    favoritedNum={this.state.favorites}
                    heartSrc={heartSrc}
                    addTruckToUserFavs={this.addTruckToUserFavs}
                  />
                </PopWrapper>
              </PopDiv>
              <Style>{`
                .mypopup .leaflet-popup-tip,
                .mypopup .leaflet-popup-content-wrapper {
                    background: #ffde59;
                }
              `}</Style>
            </Popup>
          </Marker>
        );
      }
    });

    let marker;

    if (this.props.isFavoritesActive) {
      marker = favMarkers;
    } else {
      marker = allMarkers;
    }

    return (
      <MapDiv>
        <Map
          style={{ height: "100%" }}
          center={position}
          zoom={this.state.zoom}
        >
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {marker}
        </Map>
      </MapDiv>
    );
  }
}

export default SimpleExample;
