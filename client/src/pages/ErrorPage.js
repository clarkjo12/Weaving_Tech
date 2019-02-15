import React, { Component } from "react";

import Jack from "../images/jack.jpeg";
import L from "../components/Leaf";

class ErrorPage extends Component {
  render() {
    return (
      <div>
        <h1>Error!</h1>
        <img src={Jack} alt="error?" />
        <L />
      </div>
    );
  }
}

export default ErrorPage;
