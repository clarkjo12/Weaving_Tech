import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Landing from "./pages/Landing";
import CustomerMap from "./pages/CustomerMap";
import TruckHome from "./pages/TruckHome";
import ErrorPage from "./pages/ErrorPage";

// import NavBar from "./components/NavBar";
import SideBar from "./components/sidebar";

import "./App.css";

class App extends Component {
  state = {
    loggedIn: false,
    userId: sessionStorage.getItem("userId") || "",
    displayName: sessionStorage.getItem("displayName") || "",
    longitude: -49.089977,
    latitude: -21.805149
  };

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

  updateUser = (data) => {
    const user = data.username;
    const upper = user.replace(/^\w/, c => c.toUpperCase());
    this.setState({
      loggedIn: data.loggedIn,
      userId: data.userId,
      displayName: upper
    });
    sessionStorage.setItem("userid", this.state.userId);
    sessionStorage.setItem("displayname", this.state.displayName)
    sessionStorage.setItem("userType", data.userType);
  }

  logout = () => {
    sessionStorage.removeItem("userid");
    sessionStorage.removeItem("displayname");
    sessionStorage.removeItem("userType");
    this.setState({
      loggedIn: false,
      userId: "",
      displayName: ""
    });
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <SideBar username={this.state.displayName} userId={this.state.userId} logout={this.logout} />
          <Switch>
            <Route exact path="/" render={(props) => <Landing {...props} updateUser={this.updateUser} latitude={this.state.latitude} longitude={this.state.longitude} />} />
            <Route exact path="/truck" render={(props) => <TruckHome {...props} updateUser={this.updateUser} />} />
            <Route exact path="/map" render={(props) => <CustomerMap {...props} {...props} updateUser={this.updateUser} latitude={this.state.latitude} longitude={this.state.longitude} />} />
            <Route component={ErrorPage} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
