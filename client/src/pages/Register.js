import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import Header from "../components/MapHeader";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 420
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 400
  }
});

const MommaDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  background-color: #38b6ff;
`;

const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin: auto;
  color: darkslategray;
  background-color: #38b6ff;
  padding-top: 50px;
  height: 100vh;
`;

const RegButton = styled.button`
  background-color: tomato;
  width: 100px;
  margin: auto;
  margin-top: 15px;
`;

class Registration extends React.Component {
  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  submitReg() {
    alert(
      "After you're Confirmed, \n We will email you Steps to Finish Registraion, within 24-48 hours"
    );
    window.location.href = "/";
  }

  render() {
    return (
      <MainDiv>
        <Header />
        <MommaDiv>
          <h3 style={{ color: "black" }}>To Register-</h3>
          <h3>
            From the Email you wish to Link to your New Account, Email your
            Truck's Name to-
          </h3>
          <h2 style={{ color: "black" }}> apply2wmfa@gmail.com</h2>
          <h3>
            A Confrimation Email will be returned, with Access to the App 👍
          </h3>
        </MommaDiv>
        <RegButton onClick={() => this.submitReg()}>Roger That!</RegButton>
      </MainDiv>
    );
  }
}

export default Registration;
