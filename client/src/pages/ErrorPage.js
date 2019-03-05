import React, { Component } from "react";
import Spinner from "../components/Spinner";
import EdInp from "../components/EditableInputs";
import Demo from "../components/EditableInputs";

import Jack from "../images/jack.jpeg";

class ErrorPage extends Component {
  render() {
    return (
      <div>
        <h1>Errrorr!</h1>
        <img src={Jack} alt="error?" />
        <Spinner />
        <EdInp />
        <Demo />
      </div>
    );
  }
}

export default ErrorPage;
