import React from "react";
import "./navbar.css";

const Navbar = () => {
  return (
    <div className="navbar" id="navbar">
      <div className="container">
        <div className="nav-row">
          <a href="#navbar">
            <img className="brand" src="images/logo.svg" alt="brand" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
