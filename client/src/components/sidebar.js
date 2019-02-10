import React from "react";
import { push as Menu } from "react-burger-menu";
import styled from "styled-components";

const Maindiv = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const Links = styled.div`
  display: flex;
  flex-direction: column;
  background-color: blue;
`;

const Signout = styled.div`
  justify-content: flex-end;
`;

export default props => {
  return (
    <Menu right width={420}>
      <Maindiv>
        <Links>
          <a className="menu-item" href="/">
            Landing
          </a>

          <a className="menu-item" href="/map">
            Map
          </a>

          <a className="menu-item" href="/truck">
            Truck Home
          </a>
        </Links>
        <br />

        <Signout>
          <a className="menu-item" href="/">
            Sign Out
          </a>
        </Signout>
      </Maindiv>
    </Menu>
  );
};
