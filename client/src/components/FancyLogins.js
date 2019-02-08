import React, { Component } from "react";
import styled from "styled-components";
import config from "./../config.json";
import FaceButton from "./FBButton";
import GoogButton from "./GGButton";

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
  constructor() {
    super();
    this.state = { isAuthenticated: false, user: null, token: "" };
  }

  logout = () => {
    this.setState({ isAuthenticated: false, token: "", user: null });
  };

  onFailure = error => {
    alert(error);
  };

  googleResponse = response => {
    const tokenBlob = new Blob(
      [JSON.stringify({ access_token: response.accessToken }, null, 2)],
      { type: "application/json" }
    );
    const options = {
      method: "POST",
      body: tokenBlob,
      mode: "cors",
      cache: "default"
    };
    fetch("http://localhost:4000/api/v1/auth/google", options).then(r => {
      const token = r.headers.get("x-auth-token");
      r.json().then(user => {
        if (token) {
          this.setState({ isAuthenticated: true, user, token });
        }
      });
    });
  };

  facebookResponse = response => {
    const tokenBlob = new Blob(
      [JSON.stringify({ access_token: response.accessToken }, null, 2)],
      { type: "application/json" }
    );
    const options = {
      method: "POST",
      body: tokenBlob,
      mode: "cors",
      cache: "default"
    };
    fetch("http://localhost:4000/api/v1/auth/facebook", options).then(r => {
      const token = r.headers.get("x-auth-token");
      r.json().then(user => {
        if (token) {
          this.setState({ isAuthenticated: true, user, token });
        }
      });
    });
  };

  render() {
    let content = !!this.state.isAuthenticated ? (
      <div>
        <p>Authenticated</p>
        <div>{this.state.user.email}</div>
        <div>
          <button onClick={this.logout} className="button">
            Log out
          </button>
        </div>
      </div>
    ) : (
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
          onLoginSuccess={this.googleResponse}
          onLoginFailure={this.onFailure}
        >
          Login with Google
        </GoogButton>
      </ButtonDiv>
    );

    return <div className="FancyLogins">{content}</div>;
  }
}

export default FancyLogins;
