import React from "react";
import Modal from "react-modal";
import styled from "styled-components";
import API from "../utils/API";

const SummaryDiv = styled.textarea`
  height: 40px;
  margin-top: 7px;
`;

const HeaderDiv = styled.input`
  margin-bottom: 15px;
  margin-top: 7px;
`;
const ButtDiv = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: flex-end;
`;

const ModalDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  height: 300px;
  color: lightblack;
`;

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
//Modal.setAppElement('#yourAppElement')

class TruckModal extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      title: "",
      summary: ""
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
    //this.subtitle.style.color = "#f00";
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  handleTitleChange = event => {
    this.setState({ title: event.target.value });
  };

  handleSummaryChange = event => {
    this.setState({ summary: event.target.value });
  };

  handleSubmit = () => {
    API.updateTrucker(this.props.userId, {title: this.state.title, summary: this.state.summary});
    this.props.updateTitleSummary(this.state.title, this.state.summary);
    this.closeModal();
  }

  render() {
    return (
      <div>
        <button onClick={this.openModal}>Edit</button>{" "}
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={{
            content: {
              background: "#ffde59",
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)"
            }
          }}
          contentLabel="Example Modal"
        >
          <ModalDiv>
            <h2>Edit Summary:</h2>
            Title:
            <HeaderDiv onChange={this.handleTitleChange} />
            Summary:
            <SummaryDiv onChange={this.handleSummaryChange} />
            <ButtDiv>
              <br />
              <button onClick={this.handleSubmit}>save</button>
            </ButtDiv>
          </ModalDiv>
        </Modal>
      </div>
    );
  }
}

export default TruckModal;
