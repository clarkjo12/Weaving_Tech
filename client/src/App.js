import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Landing from "./pages/Landing";
import CustomerMap from "./pages/CustomerMap";
import TruckHome from "./pages/TruckHome";
import ErrorPage from "./pages/ErrorPage";

import "./App.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Landing} exact />
          <Route path="/truck" component={TruckHome} />
          <Route path="/map" component={CustomerMap} />
          <Route component={ErrorPage} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
