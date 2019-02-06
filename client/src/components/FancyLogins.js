import React from "react";
import styled from "styled-components";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login";

const FBButton = styled.div`
  height: 20px;
`;

const GGButton = styled.div`
  margin-left: 50px;
  margin-right: 70px;
`;

const ButtonDiv = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  background-color: #ffbd59;
  padding-top: 20px;
`;

const responseGoogle = response => {
  console.log(response);
};

const responseFacebook = response => {
  console.log(response);
};

function FancyLogins(props) {
  return (
    <ButtonDiv>
      <FBButton>
        <FacebookLogin
          appId="1088597931155576"
          autoLoad={true}
          fields="name,email,picture"
          //onClick={componentClicked}
          callback={responseFacebook}
        />
      </FBButton>
      <GGButton>
        <GoogleLogin
          clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
        />
      </GGButton>
    </ButtonDiv>
  );
}

export default FancyLogins;
