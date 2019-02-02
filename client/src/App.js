import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import LoginForm from "./Components/LoginForm/LoginForm";
import CustomerHome from "./Components/CustomerHome/CustomerHome";
import CustomerMap from "./Components/CustomerMap/CustomerMap";
import TruckHome from "./Components/TruckHome/TruckHome";
import ErrorPage from "./Components/ErrorPage/ErrorPage";

import "./App.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={LoginForm} exact />
          <Route path="/truck" component={TruckHome} />
          <Route path="/customer" component={CustomerHome} />
          <Route path="/map" component={CustomerMap} />
          <Route component={ErrorPage} />
        </Switch> 
      </BrowserRouter>
    );
  }
}

export default App;
