import React, { Component } from "react";
import MapHeader from "../components/MapHeader";
import Toggle from "../components/TruckActiveSwitch";
import styled from "styled-components";
import TruckWrapper from "../components/TruckWrapper";

const TruckHomeDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  background-color: #38b6ff;
  flex-direction: column;
  height: 100vh;
`;

const TruckMapHeader = styled.div`
  margin-top: 60px;
`;

class TruckHome extends Component {
  componentDidMount = () => {
    const loggedIn = sessionStorage.getItem("userid") ? true : false;
    if (loggedIn) {
      this.props.updateUser({
        userId: sessionStorage.getItem("userid"),
        username: sessionStorage.getItem("displayname"),
        loggedIn: loggedIn,
        userType: sessionStorage.getItem("userType")
      });
    }
    if (this.props.userType === "trucker") {
      this.props.updateActiveFavs();
    }
    this.props.updateActiveFavs();
  };

  render() {
    return (
      <TruckHomeDiv>
        <TruckMapHeader>
          <MapHeader />
        </TruckMapHeader>
        <Toggle userId={this.props.userId} sendSocketIOTruckStatus={this.props.sendSocketIOTruckStatus}/> 
        <TruckWrapper userId={this.props.userId} sendSocketIOUpdatedTruck={this.props.sendSocketIOUpdatedTruck}/>
      </TruckHomeDiv>
    );
  }
}

export default TruckHome;
