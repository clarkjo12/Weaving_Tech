import React from "react";
import Modal from "react-modal";
import styled from "styled-components";
import Mega from "../images/mega.png";
import heartImg from "../images/heartblue.png";
import API from "../utils/API";

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
`;

const ProfileImg = styled.img`
  height: 100px;
  border-radius: 50%;
  border: solid 1px darkslategray;
`;

const TruckName = styled.h2`
  color: darkslategray;
  margin-bottom: 8px;
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
  margin-top: 7px;
  margin-bottom: 2px;
  padding-bottom: 4px;
  border-bottom: 1px solid darkslategray;
`;
// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
//Modal.setAppElement('#yourAppElement')

class Modals extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: props.modalIsOpen,
      favorites: 0
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
    this.updateActiveFavorites(this.props.username);
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    //this.subtitle.style.color = "limegreen";
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  updateActiveFavorites = truckname => {
    API.favCount({ favorites: truckname })
      .then(res => {
        this.setState({ favorites: res.data });
      })
      .catch(err => {
        console.log("favorites error: ");
        console.log(err);
      });
  };

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
          <TruckName>{this.props.username}</TruckName>
          <ProfileImg src={this.props.picture} />
          <LoveWrapper>
            <Heart src={heartImg} />:{" "}
            <LoveCount>{this.state.favorites}</LoveCount>
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
