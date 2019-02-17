import React from "react";
import Modal from "react-modal";
import styled from "styled-components";
import Mega from "../images/mega.png";
import testTruck from "../images/testtruck.jpeg";
import heartImg from "../images/heartblue.png";

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
      modalIsOpen: props.modalIsOpen
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    //this.subtitle.style.color = "limegreen";
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
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
          <TruckName>Senorita's Tacos</TruckName>
          <ProfileImg src={testTruck} />
          <LoveWrapper>
            <Heart src={heartImg} />: <LoveCount>223</LoveCount>
          </LoveWrapper>
          {/* <h2 ref={subtitle => (this.subtitle = subtitle)}>
            Fresh Tacos BOGO!
          </h2> */}
          <TruckTitle>Fresh Tacos BoGO!</TruckTitle>
          <SummaryDiv>
            <div>
              Hot and Fresh, Chicken or Beef; supplies limited so come and git
              it!
            </div>
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
