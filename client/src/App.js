import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Landing from "./pages/Landing";
import CustomerMap from "./pages/CustomerMap";
import TruckHome from "./pages/TruckHome";
import ErrorPage from "./pages/ErrorPage";
import Register from "./pages/Register";
import API from "./utils/API";

// import NavBar from "./components/NavBar";
import SideBar from "./components/sidebar";

import "./App.css";


const io = require('socket.io-client');
const socket = io();

class App extends Component {
  constructor(props) {
    super(props);
    this.updateFavorites = this.updateFavorites.bind(this);
    this.updateActiveFavorites = this.updateActiveFavorites.bind(this);
    this.updateTrucksArray = this.updateTrucksArray.bind(this);
    this.state = {
      loggedIn: false,
      userId: sessionStorage.getItem("userid") || "",
      displayName: sessionStorage.getItem("displayname") || "",
      userType: sessionStorage.getItem("userType") || "",
      longitude: -49.089977,
      latitude: -21.805149,
      activeFavorites: 10,
      favoritedNum: 342,
      userFavorites: [],
      nearbyTrucks: []
    };   
  }

  componentDidMount = () => {
    this.updateTrucksArray();
    if (this.state.userId) {
      API.findEater(this.state.userId).then(res => {
        const favorites = res.data.favorites;
        this.setState({ userFavorites: favorites });
      });
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this.showPosition,
        this.showError
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
    const loggedIn = sessionStorage.getItem("userid") ? true : false;
    if (loggedIn) {
      this.updateUser({
        userId: sessionStorage.getItem("userid"),
        username: sessionStorage.getItem("displayname"),
        loggedIn: loggedIn,
        userType: sessionStorage.getItem("userType")
      });
    };
    socket.on("favorite updated", (truck) => {
      console.log("received updated favorite");
      if (truck === this.state.displayName) {
        if (this.state.userType === "trucker") {
          this.updateActiveFavorites();
        }
      }
    });
    socket.on('truck status changed', () => {
      console.log("received updated truck status");
      if (this.state.userType === "eater") {
        this.updateFavorites();
        this.updateTrucksArray();
      }  
    });
    socket.on("truck info changed", () => {
      console.log("received updated truck info");
      if (this.state.userType === "eater") {
        this.updateTrucksArray();
      }
    });
  };

  showPosition = position => {
    console.log("Latitude: " + position.coords.latitude);
    console.log("Longitude: " + position.coords.longitude);
    this.setState({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  };

  showError = error => {
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
      default:
        console.log("An unknown error occurred.");
    }
  };

  updateFavorites = () => {
    if (this.state.userId !== "") {
      API.getFavs(this.state.userId)
        .then(res => {
          this.setState({
            activeFavorites: res.data.count.length,
            userFavorites: res.data.favorites
          });
        })
        .catch(err => {
          console.log("favorites error: ");
          console.log(err);
        });
    }
  };

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

  updateUser = data => {
    this.setState({
      loggedIn: data.loggedIn,
      userId: data.userId,
      userType: data.userType,
      displayName: data.username
    });
    sessionStorage.setItem("userid", data.userId);
    sessionStorage.setItem("displayname", data.username);
    sessionStorage.setItem("userType", data.userType);
  };

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

    API.logout()
      .catch(err => {
        console.log("logout error: ");
        console.log(err);
      });
  }

  sendSocketIOTruckStatus() {
    socket.emit('truck status change');
    console.log("sent updated truck status");
  }

  sendSocketIOUpdatedFavs(truckname) {
    socket.emit("user updated favorties", truckname);
    console.log("sent updated user favs");
  }

  sendSocketIOUpdatedTruck(truckname) {
    socket.emit("trucker updated info", truckname);
    console.log("sent updated truck info");
  }

  updateTrucksArray = () => {
    API.findTrucks().then(async res => {
      if (res === 0) {
        console.log("No trucks in database!");
      } else {
        //let truckDBArray = res.data;
        //filter out only the open trucks
        let truckDBArray = res.data.filter(function(truck) {
          return truck.status === "open";
        });

        await this.setState({
          nearbyTrucks: truckDBArray
        });
      }
    });
  };

  render() {
    
    return (
      <BrowserRouter>
        <div>

          <SideBar username={this.state.displayName} userId={this.state.userId} userType={this.state.userType} logout={this.logout} favorites={this.state.activeFavorites} favoritedNum={this.state.favoritedNum} />

          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <Landing
                  {...props}
                  updateUser={this.updateUser}
                  username={this.state.displayName}
                  userType={this.state.userType}
                  latitude={this.state.latitude}
                  longitude={this.state.longitude}
                  sendSocketIOTruckStatus={this.sendSocketIOTruckStatus}
                  updateTrucksArray={this.updateTrucksArray}
                />
              )}
            />
            <Route
              exact
              path="/truck"
              render={props => (
                <TruckHome
                  {...props}
                  userId={this.state.userId}
                  userType={this.state.userType}
                  updateUser={this.updateUser}
                  updateActiveFavs={this.updateActiveFavorites}
                  sendSocketIOTruckStatus={this.sendSocketIOTruckStatus}
                  sendSocketIOUpdatedTruck={this.sendSocketIOUpdatedTruck}
                />
              )}
            />
            <Route
              exact
              path="/map"
              render={props => (
                <CustomerMap
                  {...props}
                  {...props}
                  updateUser={this.updateUser}
                  updateFavs={this.updateFavorites}
                  latitude={this.state.latitude}
                  longitude={this.state.longitude}
                  userId={this.state.userId}
                  sendSocketIOUpdatedFavs={this.sendSocketIOUpdatedFavs}
                  userFavorites={this.state.userFavorites}
                  nearbyTrucks={this.state.nearbyTrucks}
                />
              )}
            />
            <Route exact path="/register" render={props => <Register />} />
            <Route component={ErrorPage} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
