import React, { Component } from "react";

import Jack from "../images/jack.jpeg";

class ErrorPage extends Component {
  render() {
    return (
      <div>
        <h1>Errrorr!</h1>
        <img src={Jack} alt="error?" />
      </div>
    );
  }
}

export default ErrorPage;
