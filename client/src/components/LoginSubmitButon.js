import React, { Component } from "react";
import styled from "styled-components";

const Button = styled.button`
  /* Adapt the colors based on primary prop */
  background: ${props => (props.primary ? "palevioletred" : "white")};
  color: ${props => (props.primary ? "white" : "palevioletred")};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

class LoginSubmitButton extends Component {
  render() {
    return (
      <div>
        <Button>Im a Truck</Button>
        <Button primary>Submit</Button>
      </div>
    );
  }
}

export default LoginSubmitButton;
