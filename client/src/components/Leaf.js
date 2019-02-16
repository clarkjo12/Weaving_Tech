import React, { Component } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import AllTruck from "../images/truck-all.png";
import styled from "styled-components";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Modal from "./Modal";
import API from "../utils/API";

import truckImg from "../images/navimg.png";
import heartImg from "../images/heartblue.png";
import heartImg40 from "../images/heartblue40.png";
import profileImg from "../images/testtruck.jpeg";

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
    profileImgSrc: heartImg,
    nearbyTrucks: []
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
    console.log(this.props.userId);
    API.findEater(this.props.userId).then(res => {
      const favorites = res.data.favorites;
      let found = false;
      // for (let i = 0; i< favorites.length; i++) {
      //   if (favorites[i] === truckusername) {
      //     found = true;
      //   }
      // }
     {(found) ? this.setState({profileImgSrc: heartImg40}) : this.setState({profileImgSrc: heartImg})}
    })
    .catch(err => {
      console.log("eater favorites error: ");
      console.log(err);
    });
  }

  addTrucktoUserFavs = () => {
    (this.state.profileImgSrc === heartImg) ? 
    (
      this.setState({profileImgSrc: heartImg40})
      //API.updateEaterFav(this.props.userId, truckusername)
    ) : 
    (
      this.setState({profileImgSrc: heartImg})
      //API.removeEaterFav(this.props.userId, truckusername)
    )
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
           return(
            <Marker 
                key={key} 
                position={truck.location}
                icon={myIcon}
            >
            <Popup>
              <PopDiv>
                <PopHead>Senorita's Tacos</PopHead>
                <PopWrapper>
                  <HeartImg
                    onClick={this.addTrucktoUserFavs}
                    src={this.state.profileImgSrc}
                    alt="nahh"
                  />
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