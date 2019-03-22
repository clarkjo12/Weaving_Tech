import React, { Component } from "react";
import Map from "../components/Map";

class CustomerMap extends Component {
  componentDidMount = () => {
    const loggedIn = (sessionStorage.getItem("userid")) ? true : false;
    if (loggedIn) {
      this.props.updateUser({
        userId: sessionStorage.getItem("userid"),
        username: sessionStorage.getItem("displayname"),
        loggedIn: loggedIn,
        userType: sessionStorage.getItem("userType")
      })
    }
    this.props.updateFavs(); 
  }

  render() {
    return (
      <div>
        <Map latitude={this.props.latitude} longitude={this.props.longitude} userId={this.props.userId} updateFavs={this.props.updateFavs} nearbyTrucks={this.props.nearbyTrucks} userFavorites={this.props.userFavorites} sendSocketIOUpdatedFavs={this.props.sendSocketIOUpdatedFavs}/>
      </div>
    );
  }
}

export default CustomerMap;
