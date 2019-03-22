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
  constructor(props) {
    super(props);
    this.state = {
      checked: false
    };
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
    let newChecked = !this.state.checked;
    this.setState({ checked: newChecked });

    let status = newChecked ? "open" : "closed";
    API.updateTrucker(this.props.userId, {
      status: status
    })
      .then(res => {
        this.props.sendSocketIOTruckStatus();
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
