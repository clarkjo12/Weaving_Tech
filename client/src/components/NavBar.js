import React from "react";
import { Link } from "react-router-dom";

// Depending on the current path, this component sets the "active" class on the appropriate navigation link item
function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link
            to="/"
            className={
              window.location.pathname === "/discover"
                ? "nav-link active"
                : "nav-link"
            }
          >
            Landing
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/map"
            className={
              window.location.pathname === "/map"
                ? "nav-link active"
                : "nav-link"
            }
          >
            Map
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/truck"
            className={
              window.location.pathname === "/truck"
                ? "nav-link active"
                : "nav-link"
            }
          >
            Truck Home
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
