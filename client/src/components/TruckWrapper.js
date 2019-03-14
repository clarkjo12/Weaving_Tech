import React, { Component } from "react";
import styled from "styled-components";
import Inputs from "./EditableInputs";
import CodeButton from "./CodeGenerator";

//import TruckModals from "./TruckModal";

const TruckMain = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  padding-top: 10px;
`;

const Grey = styled.div`
  color: darkslategray;
  text-decoration: underline;
  margin-bottom: 0;
  margin-top: 20px;
`;

// const Title = styled.div`
//   width: 300px;
//   border-left: 1px solid gray;
//   border-right: 1px solid gray;
//   margin-bottom: 7px;
//   margin-top: 5px;
//   color: lavender;
//   background-color: rgba(255, 0, 0, 0.1);
// `;

// const Summary = styled.div`
//   padding-top: 10px;
//   margin-top: 5px;
//   margin-bottom: 5px;
//   height: 100px;
//   width: 300px;
//   display: flex;
//   border-left: 1px solid gray;
//   border-right: 1px solid gray;
//   color: lavender;
//   justify-content: center;
//   background-color: rgba(255, 0, 0, 0.1);
// `;

// const SumDiv = styled.div`
//   padding-top: 10px;
//   padding-bottom: 10px;
// `;

// const MainSumDiv = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   flex-direction: column;
// `;

class TruckWrapper extends Component {
  render() {
    return (
      <TruckMain>
        <CodeButton />
        <Inputs userId={this.props.userId} />
        {/* <MainSumDiv>
          Title:
          <Title>
            <h3>{this.state.title}</h3>
          </Title>
          <SumDiv>
            Summary:
            <Summary>{this.state.summary}</Summary>
            <TruckModals updateTitleSummary={this.updateTitleSummary} userId={this.props.userId} />
          </SumDiv>
        </MainSumDiv> */}
      </TruckMain>
    );
  }
}

export default TruckWrapper;
