import React from "react";
import SocialLogin from "react-social-login";

import styled from "styled-components";

const Style = styled.button`
  color: white;
  background: #4c69ba;
  border: 0px solid black;
  border-radius: 3px;
  margin: 5px;
  padding: 10px 20px;
`;
const FBButton = ({ children, triggerLogin, ...props }) => (
  <Style onClick={triggerLogin} {...props}>
    {children}
  </Style>
);

export default SocialLogin(FBButton);
