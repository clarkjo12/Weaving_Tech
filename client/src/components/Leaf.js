import React, { Component } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import AllTruck from "../images/truck-all.png";
import styled from "styled-components";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import truckImg from "../images/navimg.png";
import heartImg from "../images/heartblue.png";
import profileImg from "../images/testtruck.jpeg";

const MapDiv = styled.div`
  height: 100%;
  width: 100%;
`;

const PopDiv = styled.div``;

const PopHead = styled.h3`
  margin-top: 0;
  margin-bottom: 5px;
`;

const PopWrapper = styled.div``;

const NavImg = styled.img`
  width: 33%;
  padding-right: 8px;
`;

const HeartImg = styled.img`
  width: 25%;
  padding-right: 5px;
`;

const ProfImg = styled.img`
  border-radius: 50%;
  border: 1px solid red;
  width: 30px;
  height: 27px;
`;

//////Styling ^
////
//

var myIcon = L.icon({
  iconUrl: AllTruck,
  iconAnchor: [25, 45],
  popupAnchor: [0, -30]
});

export default class SimpleExample extends Component {
  constructor(props){
    super(props);
    this.state = {
      lat: this.props.lat,
      lng: this.props.lng,
      zoom: 13
    };
  };

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
          <Marker position={position} icon={myIcon}>
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
                  <ProfImg src={profileImg} alt="nahh" />
                </PopWrapper>
              </PopDiv>
            </Popup>
          </Marker>
        </Map>
      </MapDiv>
    );
  }
}
