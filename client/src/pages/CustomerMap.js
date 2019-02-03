import React, { Component } from "react";
import Map from "../components/Map";
import styled from "styled-components";

import MapHeader from "../components/MapHeader";

const Header = styled.section`
  background: blue;
`;

if ("geolocation" in navigator) {
  console.log("gd boy!");
} else {
  console.log("geolocation, no habla");
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  console.log("Latitude: " + position.coords.latitude);
  console.log(" Longitude: " + position.coords.longitude);
}

function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      console.log("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      console.log("Location information is unavailable.");
    case error.TIMEOUT:
      console.log("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      console.log("An unknown error occurred.");
      break;
  }
}

getLocation();

class CustomerMap extends Component {
  render() {
    return (
      <div>
        <MapHeader />
        <Map />
      </div>
    );
  }
}

export default CustomerMap;
