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

const Main = styled.div`
  display: flex;
  justify-content: center;
  margin-top: -2.3em;
`;

const FavButton = styled.button`
  background: tomato;
  color: gold;
  font-size: 1.2em;
  padding: 0.25em 1em;
  border-radius: 3px;
  border: solid gray 3px;
  z-index: 3;
  position: relative;
  height: 75px;
  border-right-width: 1.5px;
  :hover {
    background-color: darkred;
  }
`;

const AllButton = styled.button`
  background: #7ed957;
  height: 75px;
  color: gold;
  font-size: 1.2em;
  padding: 0.25em 1em;
  border-radius: 3px;
  border: solid gray 3px;
  border-left-width: 1.5px;
  z-index: 3;
  position: relative;
  :hover {
    background-color: darkgreen;
  }
`;

function MapButtons(props) {
  return (
    <Main>
      <FavButton as="button" onClick={props => (props.color = "blue")}>
        Favorites
      </FavButton>
      <AllButton>Everybody</AllButton>
    </Main>
  );
}

export default MapButtons;
