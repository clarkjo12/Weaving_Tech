import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import LoginSubmitButton from "../components/LoginSubmitButon";
import API from "../utils/API";
import FancyLogins from "../components/FancyLogins";
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

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.newUser) {
      if (
        this.state.username &&
        this.state.password &&
        this.state.password === this.state.confirmpassword
      ) {
        //check to make sure the username isn't in the database already
        API.saveEater({
          username: this.state.username,
          password: this.state.password,
          location: { coordinates: [-73.556077, 40.848447] },
          isActive: true
        })
          .then(res => {
            console.log("login response: ");
            console.log(res);

            if (res.status === 200) {
              this.props.updateUser({
                loggedIn: true,
                username: res.data.username
              });
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
        API.updateEater({
          username: this.state.username,
          password: this.state.password,
          location: { coordinates: [-73.556077, 40.848447] },
          isActive: true
        })
          .then(res => {
            console.log("login response: ");
            console.log(res);

            if (res.status === 200) {
              this.props.updateUser({
                loggedIn: true,
                username: res.data.username
              });
              this.setState({ redirect: true });
            }
          })
          .catch(err => {
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
        <FancyLogins />
      </Mommadiv>
    );
  }
}

export default Landing;
