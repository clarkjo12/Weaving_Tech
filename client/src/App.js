import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Landing from "./pages/Landing";
import CustomerMap from "./pages/CustomerMap";
import TruckHome from "./pages/TruckHome";
import ErrorPage from "./pages/ErrorPage";

import NavBar from "./components/NavBar";

import "./App.css";

class App extends Component {
  state = {
    loggedIn: false,
    username: "",
    longitude: -49.089977,
    latitude: -21.805149
  };

  componentDidMount = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition, this.showError);
    } else {
      console.log("Geolocation is not supported by this browser.");
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
    this.setState({
      loggedIn: data.loggedIn,
      username: data.username
    });
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <NavBar />
          <Switch>
            <Route exact path="/" render={(props) => <Landing {...props} updateUser={this.updateUser} latitude={this.state.latitude} longitude={this.state.longitude} />} />
            <Route exact path="/truck" component={TruckHome} />
            <Route exact path="/map" component={CustomerMap} />
            <Route component={ErrorPage} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
