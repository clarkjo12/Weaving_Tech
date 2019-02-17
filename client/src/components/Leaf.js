import React, { Component } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import AllTruck from "../images/truck-all.png";
import styled from "styled-components";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Modal from "./Modal";
import API from "../utils/API";

import truckImg from "../images/navimg.png";
import profileImg from "../images/testtruck.jpeg";
import heartImg from "../images/heartblue.png";
import heartImg40 from "../images/heartblue40.png";

const MapDiv = styled.div`
  height: 100%;
  width: 100%;
`;

const PopDiv = styled.div``;

const PopHead = styled.h3`
  margin-top: 0;
  margin-bottom: 5px;
  min-width: 100px;
`;

const PopWrapper = styled.div``;

const NavImg = styled.img`
  width: 33%;
  padding-right: 8px;
`;

const HeartImg = styled.img`
  width: 25%;
  padding-right: 8px;
`;

const ProfImg = styled.div`
  border: 1px solid red;
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
  state = {
    lat: this.props.lat,
    lng: this.props.lng,
    zoom: 13,
    nearbyTrucks: [],
    userFavorites: []
  }

  componentWillMount = () => {
    API.findTrucks()
      .then(async res => {
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
        };
      });
  };

  componentDidMount = () => {
    API.findEater(this.props.userId).then(res => {
      const favorites = res.data.favorites;
      console.log(favorites);
      this.setState({userFavorites: favorites});
    });
  }

  checkIfFav = (username, favorites) => {
    if(favorites) {
      for (let i = 0; i< favorites.length; i++) {
        console.log(favorites[i]);
        console.log(username);
        if (favorites[i] === username) {
          return true;
        }
      }
      return false;
    }
  };

  addTruckToUserFavs = (username, e) => {
    e.preventDefault();
    if (!this.checkIfFav(username, this.state.userFavorites)) {
    API.updateEaterFav(this.props.userId, {username: username}).then(res => {
        console.log("Added favorite" + username);
        let favoritesArr = this.state.userFavorites;
        favoritesArr.push(username);
        this.setState({userFavorites: favoritesArr});
      }).catch(err => {
        console.log("eater favorites error: ");
        console.log(err);
      })
     } 
     else {
      API.removeEaterFav(this.props.userId, {username: username}).then(res => {
        console.log("Removed favorite");
        let favoritesArr = this.state.userFavorites;
        favoritesArr.splice(favoritesArr.indexOf(username), 1);
        this.setState({userFavorites: favoritesArr});
      }).catch(err => {
        console.log("eater favorites error: ");
        console.log(err);
      })
    }
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
           console.log(key + truck.location.coordinates);
           return(
            <Marker 
                key={key} 
                position={truck.location.coordinates}
                icon={myIcon}
            >
            <Popup>
              <PopDiv>
                <PopHead>{truck.title}</PopHead>
                <PopWrapper>
                  {(this.checkIfFav(truck.username, this.state.userFavorites)) ? 
                  (
                  <HeartImg
                    onClick={(e) => this.addTruckToUserFavs(truck.username, e)}
                    src={heartImg40}
                    alt="nahh"
                  />) :
                  (<HeartImg
                    onClick={(e) => this.addTruckToUserFavs(truck.username, e)}
                    src={heartImg}
                    alt="nahh"
                  />)}
                  <NavImg src={truckImg} alt="nahh" />
                  <ProfImg src={profileImg} alt="nahh" />
                </PopWrapper>
              </PopDiv>
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