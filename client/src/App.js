import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import LoginForm from "./Components/LoginForm/LoginForm";
import Truckhome from "./pages/Truckhome";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="App-header">
          <h2>WMFA!?</h2>
        </div>
        <div className="login-div">
          <LoginForm />
        </div>
        <div>
          <Link to="/userhome">
            <button id="user-login-submit"> User-login </button>
            <Route exact path="/truckhome" component={Truckhome} />
          </Link>
        </div>
        <div>
          <Link to="/truckhome">
            <button id="truck-login-submit"> Truck-login </button>
          </Link>
        </div>
      </div>
    </Router>
  );
}

export default App;
