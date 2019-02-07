import React from "react";
import styled from "styled-components";

//   const ButtonDiv = styled.div`
//   display: flex;
//   justify-content: center;
//   background: #ffbd59;
// `;

// const ButtonDiv = styled.div`
//   display: flex;
//   justify-content: center;
//   background: #ffbd59;
// `;

// const ButtonDiv = styled.div`
//   display: flex;
//   justify-content: center;
//   background: #ffbd59;
// `;

const Component = styled.div`
  color: red;
`;

function MapButtons(props) {
  return (
    <Component as="button" onClick={() => alert("It works!")}>
      Hello World!
    </Component>
  );
}

export default MapButtons;
