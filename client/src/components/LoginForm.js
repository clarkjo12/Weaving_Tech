import React from "react";
import styled from "styled-components";
import OrangeLogo from "./../images/OrangeLogo.png";
import LogoTextUser from "./../images/LogoTextUser.png";

const LoginChilds = styled.section`
  padding-bottom: 5px;
  padding-top: 3em;

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
  height: 80px;
`;

const Input = styled.div`
  padding: 5px;
`;

const Htwo = styled.section`
  color: darkgray;
  padding: 5px;
`;

function LoginForm(props) {
  return (
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
            type="password"
            placeholder="Password"
            name="password"
            onChange={props.handleInput}
          />
        </Input>

        {props.newUser ? (
          <Input>
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmpassword"
              onChange={props.handleInput}
            />
          </Input>
        ) : null}
      </form>
    </LoginChilds>
  );
}

export default LoginForm;
