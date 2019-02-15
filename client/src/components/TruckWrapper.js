import React, { Component } from "react";
import styled from "styled-components";
import TruckModals from "./TruckModal";

const TruckMain = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  padding-top: 10px;
`;

const Grey = styled.h2`
  color: darkslategray;
  text-decoration: underline;
  margin: 0;
`;

const Title = styled.div`
  width: 300px;
  border-left: 1px solid gray;
  border-right: 1px solid gray;
  margin-bottom: 7px;
  margin-top: 5px;
  color: lavender;
  background-color: rgba(255, 0, 0, 0.1);
`;

const Summary = styled.div`
  padding-top: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
  height: 100px;
  width: 300px;
  display: flex;
  border-left: 1px solid gray;
  border-right: 1px solid gray;
  color: lavender;
  justify-content: center;
  background-color: rgba(255, 0, 0, 0.1);
`;

const SumDiv = styled.div`
  padding-top: 10px;
  padding-bottom: 10px;
`;

const Edit = styled.div`
  font-size: 13px;
  text-decoration: underline;
`;

const MainSumDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

function launchEdit() {
  alert("oh yea");
}

class TruckWrapper extends Component {
  render() {
    return (
      <TruckMain>
        <Grey>
          <h3>Current Summary:</h3>
        </Grey>
        <MainSumDiv>
          Title:
          <Title>
            <h3>Come Down and See Us!!!</h3>
          </Title>
          <SumDiv>
            Summary:
            <Summary>We only use the freshest stuff..</Summary>
            <TruckModals />
          </SumDiv>
        </MainSumDiv>
      </TruckMain>
    );
  }
}

export default TruckWrapper;
