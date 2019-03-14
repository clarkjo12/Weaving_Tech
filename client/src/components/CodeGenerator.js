import React, { Component } from "react";
import styled from "styled-components";
import API from "../utils/API";
//ßimport GenerateRandomCode from "GenerateRandomCode";

// const FBButton = styled.div``;
// const GGButton = styled.div``;

const ButtonDiv = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  background-color: #38b6ff;
  padding: 20px;
`;

const CurrCode = styled.h3`
  color: darkslategray;
  text-align: center;
  text-decoration-line: underline;
  margin-bottom: -5px;
  margin-top: 20px;
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

  state = {
    code: "",
    textLength: 3,
    numLength: 3,
    redirectToMap: false,
    redirectToTruckerHome: false
  }

  componentWillMount = () => {
    if (this.props.userId) {
      API.findTrucker(this.props.userId)
        .then(res => {
          let code = "123j21";
          if (res.data.code) {
            code = res.data.code;
            this.setState({
              code: code
            });
          }
          else {
            this.generateCode();
          }
        })
        .catch(err => {
          console.log("code error: ");
          console.log(err);
        });
    }
  }

  generateCode = () => {
    //extLength, numLength

    for (let i = 0; i < 3; i++) {
      textCode += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
      numCode += num.charAt(Math.floor(Math.random() * num.length));
    }

    result = textCode + numCode;

    textCode = "";
    numCode = "";
    this.setState({ code: result });
    API.updateTrucker(this.props.userId, {code: result});
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
        <CurrCode>Current Code</CurrCode>
        <ButtonDiv>
          <Button onClick={() => this.generateCode()}>New Code</Button>
          <Code> - {this.state.code}</Code>
        </ButtonDiv>
      </div>
    );
  }
}

export default CodeButton;
