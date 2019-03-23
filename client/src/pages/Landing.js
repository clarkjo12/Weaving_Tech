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
    redirect: false,
    loginType: "eater",
    count: 0,
    errorMessage: ""
  };

  componentDidMount = () => {
    if (this.props.username) {
      if (this.props.userType === "eater") {
        window.location.href = "/map";
      } else {
        window.location.href = "/truck";
      }
    }
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      errorMessage: ""
    });
  };

  handleUserStatus = () => {
    this.setState(prevState => ({
      newUser: !prevState.newUser
    }));
  };

  handleUser = (username, userId) => {
    this.props.updateUser({
      loggedIn: true,
      username: username,
      userId: userId,
      userType: this.state.loginType
    });
  };

  handleLoginType = () => {
    let type = this.state.loginType;
    type = type === "eater" ? "trucker" : "eater";
    this.setState({
      loginType: type
    });
  };

  handleLoginLogo = event => {
    event.preventDefault();
    let clickCount = this.state.count;
    clickCount = clickCount + 1;
    if (clickCount === 5) {
      this.handleLoginType();
      clickCount = 0;
    }
    this.setState({
      count: clickCount
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.newUser) {
      if (
        this.state.username &&
        this.state.password &&
        this.state.password === this.state.confirmpassword
      ) {
        API.saveEater({
          username: this.state.username,
          password: this.state.password,
          location: { coordinates: [this.props.latitude, this.props.longitude] }
        })
          .then(res => {
            if (res.status === 200) {
              this.handleUser(res.data.username, res.data._id);
              this.setState({ redirect: true });
            }
          })
          .catch(err => {
            console.log("login error: ");
            console.log(err);
            this.setState({
              errorMessage: "Username and/or Password incorrect"
            });
          });
      } else {
        this.setState({ errorMessage: "Username and/or Password incorrect" });
      }
    } else {
      //user already exists in the database, so update
      if (this.state.username && this.state.password) {
        API.findEaters({
          username: this.state.username,
          password: this.state.password
        })
          .then(res => {
            console.log(res.headers);
            console.log(res.data);
            console.log(res.status);
            if (res.status === 200) {
              this.props.updateUser({
                loggedIn: true,
                username: res.data.username,
                userId: res.data._id,
                userType: this.state.loginType
              });
              this.setState({ redirect: true });
            }
            API.updateEater(res.data._id, {
              location: {
                coordinates: [this.props.latitude, this.props.longitude]
              }
            })
              .then(res => {
                console.log("update response: ");
              })
              .catch(err => {
                console.log("update error: ");
                console.log(err);
                this.setState({
                  errorMessage: "Username and/or Password incorrect"
                });
              });
          })
          .catch(err => {
            console.log("login error: ");
            console.log(err);
            this.setState({
              errorMessage: "Username and/or Password incorrect"
            });
          });
      } else {
        this.setState({ errorMessage: "Username and/or Password incorrect" });
      }
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
          loginType={this.state.loginType}
          handleLoginLogo={this.handleLoginLogo}
          errorMessage={this.state.errorMessage}
        />
        {this.state.loginType === "eater" ? (
          <FirstTimeDiv>
            <Link to="#" onClick={this.handleUserStatus}>
              {" "}
              {this.state.newUser
                ? "Already Been Here?"
                : "First Time Here?"}{" "}
            </Link>
          </FirstTimeDiv>
        ) : (
          ""
        )}
        {this.state.loginType === "eater" ? (
          <LoginSubmitButton handleSubmit={this.handleFormSubmit} />
        ) : (
          ""
        )}
        <FancyLogins
          updateUser={this.handleUser}
          latitude={this.props.latitude}
          longitude={this.props.longitude}
          loginType={this.state.loginType}
          sendSocketIOTruckStatus={this.props.sendSocketIOTruckStatus}
          updateTrucksArray={this.props.updateTrucksArray}
        />
      </Mommadiv>
    );
  }
}

export default Landing;
