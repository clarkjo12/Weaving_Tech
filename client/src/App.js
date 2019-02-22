import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Landing from "./pages/Landing";
import CustomerMap from "./pages/CustomerMap";
import TruckHome from "./pages/TruckHome";
import ErrorPage from "./pages/ErrorPage";
import API from "./utils/API";

// import NavBar from "./components/NavBar";
import SideBar from "./components/sidebar";

import "./App.css";

import openSocket from 'socket.io-client';
const socket = openSocket(window.location.hostname + ":8000");

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      userId: sessionStorage.getItem("userId") || "",
      displayName: sessionStorage.getItem("displayName") || "",
      userType: sessionStorage.getItem("userType") || "",
      longitude: -49.089977,
      latitude: -21.805149,
      activeFavorites: 10,
      favoritedNum: 342
    };
    this.receiveSocketIO = this.receiveSocketIO.bind(this);
  }

  componentDidMount = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition, this.showError);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
    const loggedIn = (sessionStorage.getItem("userid")) ? true : false;
    if (loggedIn) {
      this.updateUser({
        userId: sessionStorage.getItem("userid"),
        username: sessionStorage.getItem("displayname"),
        loggedIn: loggedIn,
        userType: sessionStorage.getItem("userType")
      })
    }
  }

  showPosition = (position) => {
    console.log("Latitude: " + position.coords.latitude);
    console.log("Longitude: " + position.coords.longitude);
    this.setState({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }

  showError = (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        console.log("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        console.log("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        console.log("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        console.log("An unknown error occurred.");
        break;
      default: console.log("An unknown error occurred.");
    }
  }

  updateFavorites = () => {
    if (this.state.userId !== "") {
      API.getFavs(this.state.userId)
        .then(res => {
          this.setState({
            activeFavorites: res.data.length
          });
        })
        .catch(err => {
          console.log("favorites error: ");
          console.log(err);
        });
    }
  }

  updateActiveFavorites = () => {
    API.favCount({ favorites: this.state.displayName })
      .then(res => {
        this.setState({
          favoritedNum: res.data
        });
      })
      .catch(err => {
        console.log("favorites error: ");
        console.log(err);
      });
  };

  updateUser = (data) => {
    this.setState({
      loggedIn: data.loggedIn,
      userId: data.userId,
      userType: data.userType,
      displayName: data.username
    });
    sessionStorage.setItem("userid", data.userId);
    sessionStorage.setItem("displayname", data.username);
    sessionStorage.setItem("userType", data.userType);
  }

  logout = () => {
    sessionStorage.removeItem("userid");
    sessionStorage.removeItem("displayname");
    sessionStorage.removeItem("userType");
    this.setState({
      loggedIn: false,
      userId: "",
      userType: "",
      displayName: ""
    });
  }

  receiveSocketIO(username, userType, updateFavorites, updateActiveFavorites) {
    console.log("HERE");
    socket.on("favorite updated", function (truck) {
      if (truck === username) {
        if (userType === "trucker") {
          updateActiveFavorites();
        }
      }
    });
    socket.on("truck status changed", function () {
      if(userType === "eater") {
        //update the eaters active favorites
        updateFavorites();
      }
    });
  }

  render() {
    this.receiveSocketIO(this.state.displayName, this.state.userType, this.updateFavorites, this.updateActiveFavorites);
    return (
      <BrowserRouter>
        <div>
          <SideBar username={this.state.displayName} userId={this.state.userId} userType={this.state.userType} logout={this.logout} favorites={this.state.activeFavorites} favoritedNum={this.state.favoritedNum} />
          <Switch>
            <Route exact path="/" render={(props) => <Landing {...props} updateUser={this.updateUser} username={this.state.displayName} userType={this.state.userType} latitude={this.state.latitude} longitude={this.state.longitude} />} />
            <Route exact path="/truck" render={(props) => <TruckHome {...props} userId={this.state.userId} userType={this.state.userType} updateUser={this.updateUser} updateActiveFavs={this.updateActiveFavorites} />} />
            <Route exact path="/map" render={(props) => <CustomerMap {...props} {...props} updateUser={this.updateUser} updateFavs={this.updateFavorites} latitude={this.state.latitude} longitude={this.state.longitude} userId={this.state.userId} />} />
            <Route component={ErrorPage} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
