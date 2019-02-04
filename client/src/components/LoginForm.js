
import React, { Component } from "react";
import styled from "styled-components";
import OrangeLogo from "./../images/OrangeLogo.png";
import LogoTextUser from "./../images/LogoTextUser.png";

const LoginChilds = styled.section`
  padding: 4em;
  display: flex;
  justify-content: center !important;
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
                 type="text"
                  placeholder="Username"
                  name="username"
                  onChange={props.handleInput}
              />
            </Input>
            <Input>
              <input
                type="text"
                placeholder="Password"
                name="password"
                onChange={props.handleInput}
              />
            </Input>
          </form>
        </LoginChilds>
      </div>
    );
  }

}

export default LoginForm;
