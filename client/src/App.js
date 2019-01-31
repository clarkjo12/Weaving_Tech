import React, { Component } from "react";
import LoginForm from "./Components/LoginForm/LoginForm";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>WMFA!?</h2>
        </div>
        <div className="login-div">
          <LoginForm />
        </div>
      </div>
    );
  }
}

export default App;
