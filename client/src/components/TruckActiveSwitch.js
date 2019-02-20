import React, { Component } from "react";
import FlipSwitch from "react-switch";
import API from "../utils/API";
import styled from "styled-components";

const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const HeaderDiv = styled.div`
  color: darkslategrey;
  margin: 0;
`;

const HeaderText = styled.h3`
  text-decoration: underline;
`;

class TruckActivateSwitch extends Component {
  state = {
    checked: false
  };

  componentWillMount() {}

  handleChange = () => {
    this.setState({ checked: !this.state.checked });
    let status = this.state.checked ? "open" : "closed";
    API.updateTrucker(sessionStorage.getItem("userid"), {
      status: status
    })
      .then(res => {
        console.log("updated truck status");
        console.log(res);
      })
      .catch(err => {
        console.log("update truck status error");
        console.log(err);
      });
  };

  render() {
    return (
      <ButtonDiv>
        <HeaderDiv>
          <HeaderText>Activate Truck:</HeaderText>
        </HeaderDiv>
        <label htmlFor="normal-switch">
          <FlipSwitch
            onChange={this.handleChange}
            checked={this.state.checked}
            id="normal-switch"
          />
        </label>
      </ButtonDiv>
    );
  }
}

export default TruckActivateSwitch;
