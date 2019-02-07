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
  padding-left: 42%;
  margin-top: -2em;
`;

const FavButton = styled.button`
  background: tomato;
  color: white;
  font-size: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;
  border: solid 0;
  z-index: 3;
  position: relative;
`;

const AllButton = styled.button`
  background: lightseagreen;
  color: white;
  font-size: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;
  border: solid 0;
  z-index: 3;
  position: relative;
`;

function MapButtons(props) {
  return (
    <Main>
      <FavButton>Favorited</FavButton>
      <AllButton>All</AllButton>
    </Main>
  );
}

export default MapButtons;
