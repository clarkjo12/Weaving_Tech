import Nouislider from "react-nouislider";
import React, { Component } from "react";

class Slider extends Component {
  render() {
    return (
      <div>
        <Nouislider range={{ min: 0, max: 200 }} start={[0, 99]} tooltips />{" "}
      </div>
    );
  }
}

export default Slider;
