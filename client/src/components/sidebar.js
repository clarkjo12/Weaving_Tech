import React from "react";
import { bubble as Menu } from "react-burger-menu";

export default props => {
  return (
    <Menu right>
      <a className="menu-item" href="/">
        Landing
      </a>

      <a className="menu-item" href="/map">
        Map
      </a>

      <a className="menu-item" href="/truck">
        Truck Home
      </a>
    </Menu>
  );
};
