import React, { Component } from "react";
import styled from "styled-components";

import OrangeLogo from "./../images/OrangeLogo.png";
import LogoTextUser from "./../images/LogoTextUser.png";
import LoginSubmitButton from "../components/LoginSubmitButon";

const LoginChilds = styled.section`
  padding: 4em;
  display: flex;
  justify-content: center;
  align-content: center;
  text-align: center;
  background: #ffbd59;
`;

const Logo = styled.img`
  height: 100px;
`;

const LogoText = styled.img`
  padding: 1px;
`;

const Input = styled.form`
  padding: 5px;
  height: 15px;
`;

const Htwo = styled.text`
  color: darkgray;
  padding: 5px;
`;

class LoginForm extends Component {
  render() {
    return (
      <div>
        <LoginChilds>
          <form className="sign-in">
            <Logo img src={OrangeLogo} alt="no dice" />
            <br />
            <LogoText img src={LogoTextUser} alt="nah bro" />

            <Htwo>
              <p>Login Below!</p>
            </Htwo>
            <Input>
              <input
                className="form-control"
                placeholder="Username"
                id="username"
              />
            </Input>
            <Input>
              <input
                type="text"
                className="form-control"
                placeholder="Password"
                id="password"
              />
            </Input>
            <LoginSubmitButton />
          </form>
        </LoginChilds>
      </div>
    );
  }
}

export default LoginForm;
