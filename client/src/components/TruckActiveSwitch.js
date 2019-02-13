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

const H3 = styled.h3`
  color: darkslategrey;
  margin: 0;
  padding-top: 20px;
`;

class TruckActivateSwitch extends Component {
  state = { 
    checked: false 
  };
  
  componentWillMount() {
    
  }

  handleChange = () => {
    this.setState({ checked: !this.state.checked });
    let status =  this.state.checked ? "open" : "closed";
    API.updateTruckerStatus(sessionStorage.getItem("userid"), { status: status })
      .then(res => {
        console.log("updated truck status");
        console.log(res);
      }).catch(err => {
        console.log("update truck status error");
        console.log(err);
      })
  }

  render() {
    return (
      <ButtonDiv>
        <H3>
          <h3>Activate Truck:</h3>
        </H3>
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

// class TruckActivateSwitch extends React.Component {

//   render() {
//     return (
//       <div className="switch-container">
//         <h3>Activate Truck:</h3>
//         <label>
//           <input
//             ref="switch"
//             checked={this.state.isChecked}
//             onChange={this._handleChange}
//             className="switch"
//             type="checkbox"
//           />
//           <div>
//             <div />
//           </div>
//         </label>
//       </div>
//     );
//   }

//   //   _handleChange() {
//   //     this.setState({ isChecked: !this.state.isChecked });
//   //   }
// }

export default TruckActivateSwitch;
