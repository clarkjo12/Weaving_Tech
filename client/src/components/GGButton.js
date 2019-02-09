import React from "react";
import SocialLogin from "react-social-login";

import styled from "styled-components";

const Style = styled.button`
  color: white;
  background: #d14836;
  border: 0 solid black;
  border-radius: 3px;
  margin: 5px;
  padding: 10px 20px;
`;
const GGButton = ({ children, triggerLogin, ...props }) => (
  <Style onClick={triggerLogin} {...props}>
    {children}
  </Style>
);

export default SocialLogin(GGButton);
