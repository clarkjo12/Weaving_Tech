import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import FaceButton from "./FBButton";
import GoogButton from "./GGButton";
import API from "../utils/API";
import config from './../config.json';


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

  state = {
    redirectToMap: false
  }

  googleResponse = response => {
    console.log(response);
    const tokenBlob = new Blob([JSON.stringify({ access_token: response.accessToken }, null, 2)], { type: 'application/json' });

    const options = {
      method: "POST",
      body: tokenBlob,
      mode: "cors",
      cache: "default"
    };
    fetch('http://localhost:3000/auth/google', options).then(r => {
      const token = r.headers.get('x-auth-token');
      r.json().then(user => {
        if (token) {
          this.props.updateUser(user.username);

        }
        API.updateEaterLoc(user._id, { location: { coordinates: [this.props.latitude, this.props.longitude] } })
          .then(res => {
            console.log("update response: ");
            console.log(res);
            this.setState({
              redirectToMap: true
            })
          }).catch(err => {
            console.log("update error: ");
            console.log(err);
          });
      });
    });
  };

  facebookResponse = response => {
    console.log(response)
    const tokenBlob = new Blob([JSON.stringify({ access_token: response.accessToken }, null, 2)], { type: 'application/json' });
    const options = {
      method: "POST",
      body: tokenBlob,
      mode: "cors",
      cache: "default"
    };

    fetch('http://localhost:3000/auth/facebook', options).then(r => {
      const token = r.headers.get('x-auth-token');
      r.json().then(user => {
        if (token) {
          this.props.updateUser(user.username);
        }
        API.updateEaterLoc(user._id, { location: { coordinates: [this.props.latitude, this.props.longitude] } })
          .then(res => {
            console.log("update response: ");
            console.log(res);
            this.setState({
              redirectToMap: true
            })
          }).catch(err => {
            console.log("update error: ");
            console.log(err);
          });
      });
    });
  };

  render() {

    if (this.state.redirectToMap) {
      return <Redirect to="/map" />;
    }

    return (
      <div className="FancyLogins">
        <ButtonDiv>
          <FaceButton
              provider="facebook"
              appId={config.FACEBOOK_APP_ID}
              autoLoad={false}
              fields="name,email,picture"
              callback={this.facebookResponse}
              >
              Login with Facebook
          </FaceButton>
          <GoogButton
              provider="google"
              appId={config.GOOGLE_CLIENT_ID}
              buttonText="Login"
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
