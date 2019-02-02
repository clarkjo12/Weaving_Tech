import React, { Component } from "react";
import "./CustomerHome.css";
import CustomerMap from "../CustomerMap/CustomerMap";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class CustomerHome extends Component {
  static defaultProps = {
    center: {
      lat: 35.91,
      lng: -79.05
    },
    zoom: 11
  };

  render() {
    return (
      <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact 
        bootstrapURLKeys={{ key: /* API KEY HERE */}}
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
      >
        <AnyReactComponent
          lat={35.913200}
          lng={-79.055847}
          text={'Chapel Hill'}
        />
      </GoogleMapReact>
    </div>
    );
  }
}

export default CustomerHome;
