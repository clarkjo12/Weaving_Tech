import React, { Component } from "react";
import LoginForm from "../components/LoginForm";
import Container from "../components/Container";

class Signin extends Component {
  state = {
    username: "",
    password: ""
  };

  // When the component mounts, get a list of all available base breeds and update this.state.breeds
  componentDidMount() {}

  handleInputChange = event => {
    this.setState({ search: event.target.value });
  };

  handleFormSubmit = event => {
    event.preventDefault();
  };
  render() {
    return (
      <div>
        <LoginForm />
      </div>
    );
  }
}

export default Signin;
