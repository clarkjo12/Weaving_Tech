import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import LoginSubmitButton from "../components/LoginSubmitButon";
import API from "../utils/API";

class Landing extends Component {
  state = {
    username: "",
    password: "",
    redirect: false
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.username && this.state.password) {
      API.saveEater({ username: this.state.username, password: this.state.password, location: { coordinates: [-73.556077, 40.848447] }, isActive: true })
        .then(res => {
          this.setState({ redirect: true });
        })
        .catch(err => console.log(err));
    }
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/map' />
    }
  };

  render() {
    return (
      <div>
        {this.renderRedirect()}
        <div>
          <LoginForm handleInput={this.handleInputChange} />
        </div>
        <div>
          <LoginSubmitButton handleSubmit={this.handleFormSubmit} />
        </div>
      </div>
    );
  }
}

export default Landing;
