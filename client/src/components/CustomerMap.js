import React, { Component } from "react";

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

// Create a Wrapper component that'll render a <section> tag with some styles
const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;

class CustomerMap extends Component {
  render() {
    return (
      <div className="momma-div">
        <div>
          <h2>Customer Map Page</h2>
        </div>

        <div>
          <p>afdsfasdfasd</p>
        </div>
        <div>
          <h1>dasfadsasd</h1>
        </div>
      </div>
    );
  }
}

export default CustomerMap;
