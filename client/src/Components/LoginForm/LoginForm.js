import React, { Component } from "react";
import "./LoginForm.css";

class LoginForm extends Component {
  render() {
    return (
      <form className="sign-in">
        <div>
          <h1>WMFA!</h1>
          <h2>Sign-in/Login</h2>
        </div>
        <br />
        <input className="form-control" placeholder="Username" id="username" />
        <input
          type="text"
          className="form-control"
          placeholder="Password"
          id="password"
        />
      </form>
    );
  }
}

export default LoginForm;
