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
  border: solid 2px gray;
  position: relative;
  margin-right: -1px;
  z-index: 20000;

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
  border: solid 2px gray;
  position: relative;
  z-index: 20000;

  :hover {
    background-color: lightseagreen;
  }
`;
//css ^^^ ///////

//var favs = 0;

class MapButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: 0,
      isFavoritesActive: this.props.isFavoritesActive
    };
  }

  seeAll = () => {
    this.setState({ filter: 0 });
    console.log("filter= " + this.state.filter);

    if (this.state.isFavoritesActive) {
      this.setState({ isFavoritesActive: false });
      this.props.mapFavCallback(false);
    }
  };

  seeFavs = () => {
    this.setState({ filter: 1 });
    console.log(this.state.filter);

    if (!this.state.isFavoritesActive) {
      this.setState({ isFavoritesActive: true });
      this.props.mapFavCallback(true);
    }
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
