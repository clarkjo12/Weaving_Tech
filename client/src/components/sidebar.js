import React, { Component } from "react";
import { push as Menu } from "react-burger-menu";
import styled from "styled-components";
import API from "../utils/API";
import BlueHeart from "../images/heartblue.png";

const FavCounter = styled.div`
  display: flex;
`;

const Welcome = styled.div`
  /* margin-bottom: 0px; */
  font-size: 25px;
`;

const UserName = styled.div`
  color: whitesmoke;
  margin-top: 0;
  font-size: 35px;
`;

const FavNum = styled.div`
  margin-top: 5px;
  color: darkred;
  font-size: 40px;
`;

const Signout = styled.div``;

const SumDiv = styled.div`
  padding-top: 10px;
  padding-bottom: 10px;
  display: flex;
`;

const FavCount = styled.div`
  color: red;
`;

const Heart = styled.img`
  height: 75px;
`;

///burger style
var styles = {
  bmCross: {
    background: "#bdc3c7"
  },
  bmMenuWrap: {
    position: "fixed",
    height: "100%"
  },
  bmMenu: {
    background: "#55e363",
    padding: "2.5em 1.5em 0",
    fontSize: "1.15em"
  },
  bmMorphShape: {
    fill: "#373a47"
  },
  bmItemList: {
    color: "#b8b7ad",
    padding: "0.8em",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },

  bmItem: {
    color: "lavender"
  },
  bmOverlay: {
    background: "rgba(0, 0, 0, 0.3)"
  },
  menuitem: {
    background: "yellow"
  }
};

class Sidebar extends Component {
  state = {
    activeFavorites: 10,
    favoritedNum: 342
  };

  render() {
    return (
      <Menu right styles={styles}>
        {this.props.username !== "" &&
        sessionStorage.getItem("userType") === "eater" ? (
          <div>
            <Welcome> Hey,</Welcome>
            <UserName>{this.props.username}</UserName>
            <FavCounter>
              Active Favorites: <FavNum>{this.props.favorites}</FavNum>
            </FavCounter>
          </div>
        ) : (
          <div />
        )}
        {this.props.username !== "" &&
        sessionStorage.getItem("userType") === "trucker" ? (
          <div>
            <Welcome> Hey,</Welcome>
            <UserName>{this.props.username}</UserName>
            <SumDiv>
              <Heart img src={BlueHeart} alt="no dice" />
              <h1>:</h1>
              <FavCount>{this.props.favoritedNum}</FavCount>
            </SumDiv>
          </div>
        ) : (
          <div />
        )}

        <Signout onClick={this.props.logout}>
          <a className="menu-item" href="/">
            Sign Out
          </a>
          <br />
          <br />
        </Signout>
      </Menu>
    );
  }
}

export default Sidebar;
