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

//const io = require('socket.io-client');
//const socket = io();

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
      isFavoritesActive: this.props.isFavoritesActive, 
      favorites: 0
    };
  }

  updateActiveFavorites = truckname => {
    API.favCount({ favorites: truckname })
      .then(res => {
        this.setState({ favorites: res.data });
      })
      .catch(err => {
        console.log("favorites error: ");
        console.log(err);
      });
  };

  receiveSocketIO(updateTrucksArray) {
    //socket.on("truck status changed", function() {
      //update the trucks array
    //  updateTrucksArray();
    //});
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

  addTruckToUserFavs = (username, e) => {
    e.preventDefault();
    this.props.sendSocketIOUpdatedFavs(username);
    if (!this.checkIfFav(username, this.props.userFavorites)) {
      API.updateEaterFav(this.props.userId, { username: username })
        .then(res => {
          console.log("Added favorite" + username);
          this.updateActiveFavorites(username);
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
          this.updateActiveFavorites(username);
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



  render() {
    const position = [this.state.lat, this.state.lng];

    let allMarkers = this.props.nearbyTrucks.map((truck, key) => {
      let heartSrc = heartImg40;
      let truckSrc = AllTruck;

      if (this.checkIfFav(truck.username, this.props.userFavorites)) {
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
                  favorites={this.state.favorites}
                  updateActiveFavorites={this.updateActiveFavorites}
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

    let favMarkers = this.props.nearbyTrucks.map((truck, key) => {
      let heartSrc = heartImg40;
      let truckSrc = AllTruck;

      if (this.checkIfFav(truck.username, this.props.userFavorites)) {
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
                    favorites={this.state.favorites}
                    updateActiveFavorites={this.updateActiveFavorites}
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
