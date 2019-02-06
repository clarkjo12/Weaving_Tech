import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import API from "../utils/API";

class Landing extends Component {
  state = {
    username: "",
    password: "",
    confirmpassword: "",
    newUser: false,
    redirect: false
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleUserStatus = () => {
    this.setState(prevState => ({
      newUser: !prevState.newUser
    }));
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.newUser) {
      if (this.state.username && this.state.password && (this.state.password === this.state.confirmpassword)) {
        //check to make sure the username isn't in the database already
        API.saveEater({ username: this.state.username, password: this.state.password, location: { coordinates: [this.props.latitude, this.props.longitude] }, isActive: true })
          .then(res => {
            console.log("login response: ");
            console.log(res);

            if (res.status === 200) {
              this.props.updateUser({
                loggedIn: true,
                username: res.data.username
              })
              this.setState({ redirect: true });
            }
          }).catch(err => {
            console.log("login error: ");
            console.log(err);
          });
      }
      //error modal
    }
    else {
      //user already exists in the database, so update
      if (this.state.username && this.state.password) {
        API.updateEater({ username: this.state.username, password: this.state.password, location: { coordinates: [-73.556077, 40.848447] }, isActive: true })
          .then(res => {
            console.log("login response: ");
            console.log(res);

            if (res.status === 200) {
              this.props.updateUser({
                loggedIn: true,
                username: res.data.username
              })
              this.setState({ redirect: true });
            }
          }).catch(err => {
            console.log("login error: ");
            console.log(err);
          });
      }
      //error modal
    }
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/map" />
    }
  };

  render() {
    return (
      <div>
        {this.renderRedirect()}

        <LoginForm handleInput={this.handleInputChange} newUser={this.state.newUser} handleSubmit={this.handleFormSubmit}/>
        <Link to="#" onClick={this.handleUserStatus}> {this.state.newUser ? "Already Been Here?" : "First Time Here?"} </Link>
      </div >
    );
  }
}

export default Landing;
