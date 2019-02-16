import React, { Component } from "react";
import API from "../utils/API";
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

class LeafMarker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nearbyTrucks: []
        };
    };

    loadMarkers = () => {
        let truckState = this.state.nearbyTrucks;
        console.log("Truck state:" + JSON.stringify(truckState));
    
        const truckMap = truckState.map(function(truck, key) {
          return (
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
          );
        });
    
        console.log(truckMap);
    };

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
            //   this.loadMarkers();
            };
          });
    };

    render() {
        return (
            <div>
                <LeafMarker render={this.loadMarkers} />
            </div>
        );
    }
};

export default LeafMarker;