import React from "react";
import Modal from "react-modal";
import styled from "styled-components";
import Mega from "../images/mega.png";
import heartImg from "../images/heartblue.png";
import API from "../utils/API";
import navImg from "../images/navimg.png";
import watch from "../images/watch.png";

const SummaryDiv = styled.div`
  margin-top: 8px;
  text-align: center;
`;
const ButtDiv = styled.div`
  float: right;
`;

const MegaImg = styled.img`
  height: 26px;
  float: right;
  margin-top: -27px;
  padding-right: 3px;
`;
const NavImg = styled.img`
  height: 30px;
  padding-left: 13px;
  padding-bottom: 2px;
`;

const ProfileImg = styled.img`
  height: 100px;
  border-radius: 50%;
  border: solid 1px darkslategray;
`;

const TruckName = styled.h2`
  margin-top: 3px;
  color: darkslategray;
  margin-bottom: 12px;
`;

const LoveWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 6px;
`;

const Heart = styled.img`
  height: 40px;
`;

const LoveCount = styled.h3`
  padding-left: 5px;
`;

const TruckTitle = styled.h3`
  margin-top: 2px;
  margin-bottom: 5px;
  padding-bottom: 4px;
  border-bottom: 1px solid darkslategray;
`;

const LastCallDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Watch = styled.img`
  height: 30px;
  padding-right: 3px;
  padding-bottom: 5px;
`;

const Time = styled.div`
  color: tomato;
  font-size: 18px;
`;

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
//Modal.setAppElement('#yourAppElement')

class Modals extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: props.modalIsOpen
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal = () => {
    this.setState({ modalIsOpen: true });
    this.props.updateActiveFavorites(this.props.username);
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    //this.subtitle.style.color = "limegreen";
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  openDirections() {
    var uLat = this.props.lat;
    var ulong = this.props.long;
    var tLat = this.props.tlat;
    var tLong = this.props.tlong;
    var directionLink =
      "https://www.google.com/maps/dir/'" +
      uLat +
      "," +
      ulong +
      "'/'" +
      tLat +
      "," +
      tLong +
      "'";

    window.open(directionLink);
  }

  render() {
    return (
      <div>
        <MegaImg src={Mega} onClick={this.openModal} />

        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={{
            overlay: { zIndex: "100000" },
            content: {
              background: "#ffde59",
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "300px"
            }
          }}
          contentLabel="Example Modal"
        >
          <LastCallDiv>
            <Watch src={watch} />
            <Time>12:43</Time>
          </LastCallDiv>
          <TruckName>{this.props.name}</TruckName>
          <ProfileImg src={this.props.picture} />
          <LoveWrapper>
            <Heart
              onClick={e => {
                this.props.addTruckToUserFavs(this.props.username, e);                
              }}
              src={this.props.heartSrc}
            />
            : <LoveCount>{this.props.favorites}</LoveCount>
            <NavImg src={navImg} onClick={() => this.openDirections()} />
          </LoveWrapper>
          {/* <h2 ref={subtitle => (this.subtitle = subtitle)}>
            Fresh Tacos BOGO!
          </h2> */}
          <TruckTitle>{this.props.title}</TruckTitle>
          <SummaryDiv>
            <div>{this.props.summary}</div>
          </SummaryDiv>
          <ButtDiv>
            <br />
            <button onClick={this.closeModal}>close</button>
          </ButtDiv>
        </Modal>
      </div>
    );
  }
}

export default Modals;
