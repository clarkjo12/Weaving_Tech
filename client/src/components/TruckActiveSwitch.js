import React, { Component } from "react";
import FlipSwitch from "react-switch";
import API from "../utils/API";
import styled from "styled-components";

import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8000');

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
  constructor(props) {
    super(props);
    this.state = {
      checked: false
    };
    this.sendSocketIO = this.sendSocketIO.bind(this);
  };

  componentDidMount() {
    API.findTrucker(this.props.userId).then(res => {
      if (res.data.status === "open") {
        this.setState({
          checked: true
        })
      }
    })
  }

  handleChange = () => {
    this.setState({ checked: !this.state.checked });

    let status = this.state.checked ? "open" : "closed";
    API.updateTrucker(this.props.userId, {
      status: status
    })
      .then(res => {
        console.log("updated truck status");
        this.sendSocketIO();
      })
      .catch(err => {
        console.log("update truck status error");
        console.log(err);
      });
  };

  sendSocketIO() {
    socket.emit('truck status change');
    console.log("updated truck status");
  }

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
