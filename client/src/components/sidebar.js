import React, { Component } from "react";
import { push as Menu } from "react-burger-menu";
import styled from "styled-components";
import BlueHeart from "../images/heartblue.png";

const FavCounter = styled.div`
  display: flex;
  flex-direction: column;
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
  color: firebrick;
  font-size: 40px;
`;

const CurrLove = styled.p`
  padding: 5px;
  margin-bottom: 0;
`;

const Signout = styled.div``;

const SumDiv = styled.div`
  padding-top: 0px;
  padding-bottom: 10px;
  display: flex;
  align-items: center;
`;

const FavCount = styled.div`
  color: firebrick;
  padding-left: 5px;
  font-size: 25px;
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
  constructor(props) {
    super(props);
    this.state = {
      activeFavorites: 10,
      favoritedNum: 342
    };
  }

  render() {
    return (
      <div>
        {this.props.username !== "" && this.props.userType === "eater" ? (
          <Menu right styles={styles}>
            <div>
              <Welcome> Hey,</Welcome>
              <UserName>{this.props.username}</UserName>
            </div>

            <FavCounter>
              Active Favorites: <FavNum>{this.props.favorites}</FavNum>
            </FavCounter>

            <Signout onClick={this.props.logout}>
              <a className="menu-item" href="/">
                Sign Out
              </a>
              <br />
              <br />
            </Signout>
          </Menu>
        ) : (
          <div />
        )}
        {this.props.username !== "" && this.props.userType === "trucker" ? (
          <Menu right styles={styles}>
            <div>
              <Welcome> Hey,</Welcome>
              <UserName>{this.props.username}</UserName>
            </div>
            <div>
              <CurrLove>Current Love:</CurrLove>
              <SumDiv>
                <Heart img src={BlueHeart} alt="no dice" />
                <h1>:</h1>
                <FavCount>{this.props.favoritedNum}</FavCount>
              </SumDiv>
            </div>
            <Signout onClick={this.props.logout}>
              <a className="menu-item" href="/">
                Sign Out
              </a>
              <br />
              <br />
            </Signout>
          </Menu>
        ) : (
          <div />
        )}
      </div>
    );
  }
}

export default Sidebar;
