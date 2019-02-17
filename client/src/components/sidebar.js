import React, { Component } from "react";
import { push as Menu } from "react-burger-menu";
import styled from "styled-components";
import API from "../utils/API";
import BlueHeart from "../images/heartblue.png";

const FavCounter = styled.div``;

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

const Links = styled.div`
  display: flex;
  flex-direction: column;
`;

const Signout = styled.div``;

const SumDiv = styled.div`
  padding-top: 10px;
  padding-bottom: 10px;
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

  updateFavorites = () => {
    API.getFavs(this.props.userId)
      .then(res => {
        this.setState({
          activeFavorites: res.data.length
        });
      })
      .catch(err => {
        console.log("favorites error: ");
        console.log(err);
      });
  };

  updateActiveFavorites = () => {
    API.favCount({ favorites: this.props.username })
      .then(res => {
        this.setState({
          favoritedNum: res.data
        });
      })
      .catch(err => {
        console.log("favorites error: ");
        console.log(err);
      });
  };

  render() {
    if (
      this.props.username !== "" &&
      sessionStorage.getItem("userType") === "eater" &&
      this.state.activeFavorites === 10
    ) {
      this.updateFavorites();
    }
    else if (
      this.props.username !== "" &&
      sessionStorage.getItem("userType") === "trucker" &&
      this.state.favoritedNum === 342
    ) {
      this.updateActiveFavorites();
    }
    return (
      <Menu right styles={styles}>
        <Links>
          <a className="menu-item" href="/">
            Landing
          </a>

          <br />

          <a className="menu-item" href="/map">
            Map
          </a>

          <br />

          <a className="menu-item" href="/truck">
            Truck Home
          </a>
        </Links>

        {this.props.username !== "" &&
        sessionStorage.getItem("userType") === "eater" ? (
          <div>
            <Welcome> Hey,</Welcome>
            <UserName>{this.props.username}</UserName>
            <FavCounter>
              Active Favorites: <FavNum>{this.state.activeFavorites}</FavNum>
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
              <h1>
                : <FavCount>{this.state.favoritedNum}</FavCount>
              </h1>
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
