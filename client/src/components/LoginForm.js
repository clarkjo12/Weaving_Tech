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

const SendToReg = styled.a``;

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

const TrapDoor = styled.div`
  background-color: #ffbd59;
  border: solid 0;
`;

const Error = styled.div`
  color: red;
  font-weight: bold;
`;

function LoginForm(props) {
  return (
    <LoginChilds>
      <form className="sign-in">
        <TrapDoor as="button" onClick={props.handleLoginLogo}>
          <Logo img src={OrangeLogo} alt="no dice" />
        </TrapDoor>
        <br />
        <LogoText img src={LogoTextUser} alt="nah bro" />

        <Htwo>
          {props.loginType === "eater" ? (
            <p>Login Below!</p>
          ) : (
            <div>
              <p>Trucker Edition!</p>
              <SendToReg href="/register"> Need to Register?</SendToReg>
            </div>
          )}
        </Htwo>
        {props.loginType === "eater" ? (
          <div>
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
            <Error>{props.errorMessage}</Error>
          </div>
        ) : (
          ""
        )}
      </form>
    </LoginChilds>
  );
}

export default LoginForm;
