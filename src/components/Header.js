import React from "react";
import logo from "../image/logo.svg";

function Header(props) {
  return (
    <header className="header">
      <img className="header__logo" src={logo}></img>
    </header>
  );
}

export default Header;
