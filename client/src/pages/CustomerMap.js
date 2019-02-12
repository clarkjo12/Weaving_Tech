import React, { Component } from "react";
import Map from "../components/Map";

class CustomerMap extends Component {
  render() {
    return (
      <div>
        <Map latitude={this.props.latitude} longitude={this.props.longitude} />
      </div>
    );
  }
}

export default CustomerMap;
