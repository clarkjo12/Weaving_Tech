import React, { Component } from "react";
import styled from "styled-components";

const TruckMain = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;

const Grey = styled.h2`
  color: darkslategray;
  text-decoration: underline;
  margin: 0;
`;

const Title = styled.input`
  width: 90%;
`;

const Summary = styled.textarea`
  padding-top: 10px;
  width: 90%;
  height: 100px;
  display: flex;
`;

const SumDiv = styled.div`
  padding-top: 10px;
  padding-bottom: 10px;
`;

const Edit = styled.a`
  font-size: 13px;
`;

class TruckWrapper extends Component {
  render() {
    return (
      <TruckMain>
        <Grey>
          <h2>Current Summary:</h2>
        </Grey>
        <Title placeholder="Title-" />
        <SumDiv>
          <Summary placeholder="Summary: (280 chars max)" />
          <Edit href="/truck">edit</Edit>
        </SumDiv>
      </TruckMain>
    );
  }
}

export default TruckWrapper;
