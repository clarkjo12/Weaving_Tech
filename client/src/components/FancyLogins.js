import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import FaceButton from "./FBButton";
import GoogButton from "./GGButton";
import API from "../utils/API";

// const FBButton = styled.div``;

// const GGButton = styled.div``;

const ButtonDiv = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  background-color: #ffbd59;
  padding-top: 20px;
`;

class FancyLogins extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToMap: false,
      redirectToTruckerHome: false
    }
  };

  googleResponse = response => {
    console.log(response.token);
    const tokenBlob = new Blob([JSON.stringify({ access_token: response.token.accessToken, loginType: this.props.loginType }, null, 2)], { type: 'application/json' });
    const options = {
      method: "POST",
      body: tokenBlob,
      mode: "cors",
      cache: "default"
    };
    fetch('/auth/google/', options).then(r => {
      const token = r.headers.get('x-auth-token');
      r.json().then(user => {
        if (token) {
          this.props.updateUser(user.username, user._id);
        }
        {
          (this.props.loginType === "eater") ?
          (API.updateEater(user._id, { location: { coordinates: [this.props.latitude, this.props.longitude] } })
            .then(res => {
              console.log("update response: ");
              console.log(res);
              this.setState({
                redirectToMap: true
              })
            }).catch(err => {
              console.log("update error: ");
              console.log(err);
            })) :
          (API.updateTrucker(user._id, { location: { coordinates: [this.props.latitude, this.props.longitude] } })
            .then(res => {
              this.props.updateTrucksArray();                  
              console.log("update response: ");
              console.log(res);
              this.props.sendSocketIOTruckStatus();
              this.setState({
                redirectToTruckerHome: true
              })
            }).catch(err => {
              console.log("update error: ");
              console.log(err);
            }))
        }
      });
    })
  };

  facebookResponse = response => {
    console.log(response);
    const tokenBlob = new Blob([JSON.stringify({ access_token: response.token.accessToken, loginType: this.props.loginType }, null, 2)], { type: 'application/json' });
    const options = {
      method: "POST",
      body: tokenBlob,
      mode: "cors",
      cache: "default"
    };

    fetch('/auth/facebook', options).then(r => {
      const token = r.headers.get('x-auth-token');
      r.json().then(user => {
        if (token) {
          this.props.updateUser(user.username, user._id);
        }
        {
          (this.props.loginType === "eater") ?
            (API.updateEater(user._id, { location: { coordinates: [this.props.latitude, this.props.longitude] } })
              .then(res => {
                console.log("update response: ");
                console.log(res);
                this.setState({
                  redirectToMap: true
                })
              }).catch(err => {
                console.log("update error: ");
                console.log(err);
              })) :
            (API.updateTrucker(user._id, { location: { coordinates: [this.props.latitude, this.props.longitude] } })
              .then(res => {
                this.props.updateTrucksArray();                  
                console.log("update response: ");
                console.log(res);
                this.props.sendSocketIOTruckStatus();
                this.setState({
                  redirectToTruckerHome: true
                })
              }).catch(err => {
                console.log("update error: ");
                console.log(err);
              }))
        }
      });
    });
  };

  render() {
    
    if (this.state.redirectToMap) {
      return <Redirect to="/map" />;
    }
    else if (this.state.redirectToTruckerHome) {
      return <Redirect to="/truck" />;
    }

    return (
      <div className="FancyLogins">
        <ButtonDiv>
          <FaceButton
            provider="facebook"
            appId={process.env.REACT_APP_FACEBOOK_CLIENT_ID}
            onLoginSuccess={this.facebookResponse}
            onLoginFailure={this.onFailure}
          >
            Login with Facebook
          </FaceButton>
          <GoogButton
            provider="google"
            appId={process.env.REACT_APP_GOOGLE_CLIENT_ID}       
            onLoginSuccess={this.googleResponse}
            onLoginFailure={this.onFailure}
          >
            Login with Google
          </GoogButton>
        </ButtonDiv>
      </div>
    )
  }
}

export default FancyLogins;
