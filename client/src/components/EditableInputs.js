import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import styled from "styled-components";
import API from "../utils/API";

const styles = theme => ({
  // container: {
  //   display: "flex",

  //   flexWrap: "wrap"
  // },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  // dense: {
  //   marginTop: 19
  // },
  menu: {
    width: 200
  }
});

const MommaDiv = styled.div`
  display: flex;
  flex-direction: "column";
  margin: auto;
  background-color: #38b6ff;
`;

const BabyDiv = styled.div`
  display: flex;
  flex-direction: "column";
`;

const Summary = styled.h3`
  color: darkslategray;
  text-align: center;
  text-decoration-line: underline;
  margin-bottom: -5px;
  margin-top: 20px;
`;

class TextFields extends React.Component {
  state = {
    name: "Cat in the Hat",
    title: "Tacos BOGO!",
    summary: "Show this App, to the cashier for a 10% Discount!",
    username: ""
  };

  componentWillMount = () => {
    if (this.props.userId) {
      API.findTrucker(this.props.userId)
        .then(res => {
          let name = res.data.username;
          if (res.data.name) {
            name = res.data.name;
          }
          this.setState({
            name: name,
            title: res.data.title,
            summary: res.data.summary,
            username: res.data.username
          });
        })
        .catch(err => {
          console.log("favorites error: ");
          console.log(err);
        });
    }
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
    API.updateTrucker(this.props.userId, { [name]: event.target.value });
    this.props.sendSocketIOUpdatedTruck(this.state.username);
  };

  render() {
    const { classes } = this.props;

    return (
      <MommaDiv>
        <form className={classes.container} noValidate autoComplete="off">
          <Summary>Current Summary</Summary>
          <TextField
            id="standard-name"
            label="Truck Name"
            className={classes.textField}
            value={this.state.name}
            onChange={this.handleChange("name")}
            margin="normal"
            variant="filled"
          />

          <BabyDiv>
            <TextField
              id="standard-name"
              label="Title"
              className={classes.textField}
              value={this.state.title}
              onChange={this.handleChange("title")}
              margin="normal"
              variant="filled"
            />
            <TextField
              id="standard-multiline-static"
              label="Summary"
              multiline
              rows="4"
              value={this.state.summary}
              onChange={this.handleChange("summary")}
              className={classes.textField}
              margin="normal"
              variant="filled"
            />
          </BabyDiv>
        </form>{" "}
      </MommaDiv>
    );
  }
}

TextFields.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TextFields);
