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
    username: ""
  };

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
            <Route exact path="/" render={(props) => <Landing {...props} updateUser={this.updateUser} />} />
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
