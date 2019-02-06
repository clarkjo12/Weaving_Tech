import React, { Component } from "react";
import FlipSwitch from "react-switch";
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
  constructor(props) {
    super(props);
    this.state = { checked: false };
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      isChecked: null
    };
  }

  componentWillMount() {
    this.setState({ isChecked: this.props.isChecked });
  }

  handleChange(checked) {
    this.setState({ checked });
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

// class TruckActivateSwitch extends React.Component {}

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
