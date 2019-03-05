import React, { Component } from "react";
import styled from "styled-components";
//ßimport GenerateRandomCode from "GenerateRandomCode";

// import openSocket from "socket.io-client";
// const socket = openSocket(window.location.hostname + ":3080");

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

var textCode = "";
var numCode = "";
var result = "";
var alphabet = "abcdefghijklmnopqrstuvwxyz";
var num = "0123456789";

class CodeButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: "123j21",
      textLength: 3,
      numLength: 3,
      redirectToMap: false,
      redirectToTruckerHome: false
    };
    // this.sendSocketIO = this.sendSocketIO.bind(this);
  }

  generateCode = () => {
    //extLength, numLength

    for (var i = 0; i < 3; i++) {
      textCode += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
    }

    for (var i = 0; i < 3; i++) {
      numCode += num.charAt(Math.floor(Math.random() * num.length));
    }

    result = textCode + numCode;

    textCode = "";
    numCode = "";
    this.state.code = result;
    console.log(result);
  };

  render() {
    // if (this.state.redirectToMap) {
    //   return <Redirect to="/map" />;
    // }
    // else if (this.state.redirectToTruckerHome) {
    //   return <Redirect to="/truck" />;
    // }
    //this.state.code = GenerateRandomCode.NumCode(4);
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
