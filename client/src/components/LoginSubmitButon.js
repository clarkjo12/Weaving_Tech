import React from "react";
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

const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  background: #ffbd59;
`;

function LoginSubmitButton(props) {
  return (
    <ButtonDiv>
      <Button primary onClick={props.handleSubmit}>
        Submit
      </Button>
    </ButtonDiv>
  );
}

export default LoginSubmitButton;
