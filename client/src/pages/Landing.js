import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import API from "../utils/API";
import FancyLogins from "../components/FancyLogins";
import LoginSubmitButton from "../components/LoginSubmitButon";
import styled from "styled-components";

const FirstTimeDiv = styled.div`
  background-color: #ffbd59;
  display: flex;
  justify-content: center;
  padding-bottom: 5px;
  padding-top: 3px;
`;

const Mommadiv = styled.div`
  background-color: #ffbd59;
  height: 100vh;
`;

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

  handleUser = (username) => {
    this.props.updateUser({
      loggedIn: true,
      username: username
    });
  }

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.newUser) {
      if (
        this.state.username &&
        this.state.password &&
        this.state.password === this.state.confirmpassword
      ) {
        //check to make sure the username isn't in the database already

        API.saveEater({ username: this.state.username, password: this.state.password, location: { coordinates: [this.props.latitude, this.props.longitude] }})
          .then(res => {
            console.log("login response: ");
            console.log(res);

            if (res.status === 200) {
              this.handleUser(res.data.username);
              this.setState({ redirect: true });
            }
          })
          .catch(err => {
            console.log("login error: ");
            console.log(err);
          });
      }
      //error modal
    } else {
      //user already exists in the database, so update
      if (this.state.username && this.state.password) {

        API.findEater({username: this.state.username, password: this.state.password})

          .then(res => {
            console.log("login response: ");
            console.log(res.data._id);
            if (res.status === 200) {
              this.props.updateUser({
                loggedIn: true,
                username: res.data.username
              });
              this.setState({ redirect: true });
            }

            API.updateEaterLoc(res.data._id, { location: { coordinates: [this.props.latitude, this.props.longitude] } })
              .then(res => {
                console.log("update response: ");
                console.log(res);
              }).catch(err => {
                console.log("update error: ");
                console.log(err);
              });
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
      return <Redirect to="/map" />;
    }
  };

  render() {
    return (
      <Mommadiv>
        {this.renderRedirect()}
        <LoginForm
          handleInput={this.handleInputChange}
          newUser={this.state.newUser}
        />
        <FirstTimeDiv>
          <Link to="#" onClick={this.handleUserStatus}>
            {" "}
            {this.state.newUser
              ? "Already Been Here?"
              : "First Time Here?"}{" "}
          </Link>
        </FirstTimeDiv>{" "}
        <LoginSubmitButton handleSubmit={this.handleFormSubmit} />
        <FancyLogins updateUser={this.handleUser} latitude={this.props.latitude} longitude={this.props.longitude} />
      </Mommadiv>

    );
  }
}

export default Landing;
