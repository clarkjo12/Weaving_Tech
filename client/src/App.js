import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Landing from "./Pages/Landing/Landing";
import CustomerHome from "./Pages/CustomerHome/CustomerHome";
import CustomerMap from "./Pages/CustomerMap/CustomerMap";
import TruckHome from "./Pages/TruckHome/TruckHome";
import ErrorPage from "./Pages/ErrorPage/ErrorPage";

import "./App.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Landing} exact />
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
