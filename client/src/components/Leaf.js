import React, { Component } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import AllTruck from "../images/truck-all.png";
import styled from "styled-components";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const MapDiv = styled.div`
  border: 3px solid red;
  height: 300px;
  width: 300px;
`;

var myIcon = L.icon({
  iconUrl: AllTruck,
  iconAnchor: [25, 45],
  popupAnchor: [0, -30]
});

export default class SimpleExample extends Component {
  state = {
    lat: 35.91,
    lng: -79.05,
    zoom: 13
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
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </Map>
      </MapDiv>
    );
  }
}
