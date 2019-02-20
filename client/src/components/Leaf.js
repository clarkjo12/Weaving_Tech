import React, { Component } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import AllTruck from "../images/truck-all.png";
import styled from "styled-components";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Modal from "./Modal";
import API from "../utils/API";
import { Style } from "react-style-tag";

import truckImg from "../images/navimg.png";
import heartImg from "../images/heartblue.png";
import heartImg40 from "../images/heartblue40.png";

import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8000');

const MapDiv = styled.div`
  height: 100%;
  width: 100%;
`;

const PopDiv = styled.div``;

const PopHead = styled.h5`
  margin-top: 0;
  margin-bottom: 8px;
  min-width: 100px;
  text-align: center;
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

var myIcon = L.icon({
  iconUrl: AllTruck,
  iconAnchor: [25, 45],
  popupAnchor: [0, -30]
});

class SimpleExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: this.props.lat,
      lng: this.props.lng,
      zoom: 11,
      nearbyTrucks: [],
      userFavorites: []
    };
    this.sendSocketIO = this.sendSocketIO.bind(this);
  }

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
        //this.loadMarkers();
      }
    });
  };

  componentDidMount = () => {

    if (this.props.userId) {
      API.findEater(this.props.userId).then(res => {
        const favorites = res.data.favorites;
        this.setState({ userFavorites: favorites });
      });
    }
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
    socket.emit('user updated favorties', truckname);
  }

  addTruckToUserFavs = (username, e) => {
    e.preventDefault();
    this.sendSocketIO(username);
    if (!this.checkIfFav(username, this.state.userFavorites)) {
      API.updateEaterFav(this.props.userId, { username: username }).then(res => {
        console.log("Added favorite" + username);
        let favoritesArr = this.state.userFavorites;
        favoritesArr.push(username);
        this.setState({ userFavorites: favoritesArr });
        this.props.updateFavs();
      }).catch(err => {
        console.log("eater favorites error: ");
        console.log(err);
      })
    }
    else {
      API.removeEaterFav(this.props.userId, { username: username }).then(res => {
        console.log("Removed favorite");
        let favoritesArr = this.state.userFavorites;
        favoritesArr.splice(favoritesArr.indexOf(username), 1);
        this.setState({ userFavorites: favoritesArr });
        this.props.updateFavs();
      }).catch(err => {
        console.log("eater favorites error: ");
        console.log(err);
      })
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
          {/* <Marker position={position} icon={myIcon}>
            <Popup>
              <PopDiv>
                <PopHead>Senorita's Tacos</PopHead>
                <PopWrapper>
                  <HeartImg
                    onClick={() => alert("yoo")}
                    src={heartImg}
                    alt="nahh"
                  />
                  <NavImg src={truckImg} alt="nahh" />
                  <Modal />
                </PopWrapper>
              </PopDiv>
            </Popup>
         </Marker> */}

          {this.state.nearbyTrucks.map((truck, key) => {
            return (
              <Marker
                key={key}
                position={truck.location.coordinates}
                icon={myIcon}
              >
                <Popup className="mypopup">
                  <PopDiv>
                    <PopHead>{truck.title}</PopHead>
                    <PopWrapper>
                      {this.checkIfFav(
                        truck.username,
                        this.state.userFavorites
                      ) ? (
                          <HeartImg
                            onClick={e =>
                              this.addTruckToUserFavs(truck.username, e)
                            }
                            src={heartImg40}
                            alt="nahh"
                          />
                        ) : (
                          <HeartImg
                            onClick={e =>
                              this.addTruckToUserFavs(truck.username, e)
                            }
                            src={heartImg}
                            alt="nahh"
                          />
                        )}
                      <NavImg
                        onClick={() => this.openDirections(truck.location.coordinates[0], truck.location.coordinates[1])}
                        src={truckImg}
                        alt="nahh"
                      />
                      <Modal username={truck.username} title={truck.title} summary={truck.summary} picture={truck.picture} favoritedNum={this.state.favorites} />
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
          })}
        </Map>
      </MapDiv>
    );
  }
}

export default SimpleExample;
