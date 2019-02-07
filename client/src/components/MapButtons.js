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
  padding-left: 38%;
  margin-top: -2em;
`;

const FavButton = styled.button`
  background: tomato;
  color: white;
  font-size: 1.25em;
  padding: 0.25em 1em;
  border-radius: 3px;
  border: solid 0;
  z-index: 3;
  position: relative;
  margin-right: 0.5px;
  margin-left: 0.5px;
  :hover {
    background-color: darkred;
  }
`;

const AllButton = styled.button`
  background: lightseagreen;
  color: gold;
  font-size: 1.2em;
  padding: 0.25em 1em;
  border-radius: 3px;
  margin-right: 0.5px;
  margin-left: 0.5px;
  border: solid 0;
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
