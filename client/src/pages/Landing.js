import React, { Component } from "react";
import LoginForm from "../components/LoginForm";
import LoginSubmitButton from "../components/LoginSubmitButon";

class Landing extends Component {
  render() {
    return (
      <div>
        <div>
          <LoginForm />
        </div>
        <div>
          <LoginSubmitButton />
        </div>
      </div>
    );
  }
}

export default Landing;
