import React, { Component } from "react";
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
  height: 70px;
  background: limegreen;
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
    background-color: lightseagreen;
  }
`;
//css ^^^ ///////

var favs = 0;

class MapButtons extends Component {
  constructor() {
    super();
    this.state = { filter: 0 };
  }

  // initalFavClick = () => {
  //   if (favs < 1) {
  //     // alert("You havent Liked, Any Trucks yet.");
  //     //console.log(favs);
  //     favs++;
  //     this.seeFavs();
  //   } else {
  //     // alert("Many Trucks.");
  //     //console.log(favs);
  //     this.seeFavs();
  //   }
  // };

  seeAll = () => {
    this.setState({ filter: 0 });
    console.log("filter= " + this.state.filter);
  };

  seeFavs = () => {
    this.setState({ filter: 1 });
    console.log(this.state.filter);
  };

  render() {
    return (
      <Main>
        <FavButton as="button" onClick={() => this.seeFavs()}>
          Favorites
        </FavButton>
        <AllButton as="button" onClick={() => this.seeAll()}>
          Everybody
        </AllButton>
      </Main>
    );
  }
}

export default MapButtons;
