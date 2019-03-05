import React, { Component } from "react";
import styled from "styled-components";
//import GenerateRandomCode from "GenerateRandomCode";

// import openSocket from "socket.io-client";
// const socket = openSocket(window.location.hostname + ":8000");

// const FBButton = styled.div``;

// const GGButton = styled.div``;

const ButtonDiv = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  background-color: #38b6ff;
  padding: 20px;
`;

const Button = styled.button`
  background-color: palevioletred;
`;

const Code = styled.div`
  padding-left: 7px;
`;

class CodeButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: "123j21",
      redirectToMap: false,
      redirectToTruckerHome: false
    };
    // this.sendSocketIO = this.sendSocketIO.bind(this);
  }

  generateCode = () => {
    console.log(this.state.code);
  };

  render() {
    // if (this.state.redirectToMap) {
    //   return <Redirect to="/map" />;
    // }
    // else if (this.state.redirectToTruckerHome) {
    //   return <Redirect to="/truck" />;
    // }

    return (
      <div>
        <ButtonDiv>
          <Button onClick={() => this.generateCode()}>Generate Code</Button>
          <Code> - {this.state.code}</Code>
        </ButtonDiv>
      </div>
    );
  }
}

export default CodeButton;
