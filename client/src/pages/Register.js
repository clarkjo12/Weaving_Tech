import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
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
  color: dimgray;
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

class TextFields extends React.Component {
  state = {
    name: "Cat in the Hat",
    email: "clarkjo12@gmail.com"
    //summary: "Show this App, to the cashier for a 10% Discount!"
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  submitReg() {
    alert(
      "registration successfully submitted \n We will email you Steps to Finish Registraion, within 24 hours"
    );
    window.location.href = "/";
  }

  render() {
    const { classes } = this.props;

    return (
      <MainDiv>
        <Header />
        <form className={classes.container} noValidate autoComplete="off">
          <MommaDiv>
            {/* <TextField
              id="standard-name"
              label="Truck-Name"
              className={classes.textField}
              value={this.state.name}
              onChange={this.handleChange("name")}
              margin="normal"
              variant="filled"
            />

            <TextField
              id="standard-name"
              label="Work-Email"
              className={classes.textField}
              value={this.state.email}
              onChange={this.handleChange("email")}
              margin="normal"
              variant="filled"
            /> */}
            <h4 style={{ color: "black" }}>To Register-</h4>
            <h3>Email the truck name, from your truck email, to:</h3>
            <h2 style={{ color: "black" }}> apply2wmfa@gmail.com</h2>
            <h3>
              A Confrimation Email will be returned, with Access to the App 👍
            </h3>
          </MommaDiv>
        </form>
        <RegButton onClick={() => this.submitReg()}>
          Send Registration
        </RegButton>
      </MainDiv>
    );
  }
}

TextFields.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TextFields);
