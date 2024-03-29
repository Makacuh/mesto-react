import React from "react";
import logo from "../image/logo.svg";
import { Link } from "react-router-dom";

function Header(props) {
  const newPath =
    props.path === "/" || props.path === "/sign-up" ? "/sign-in" : "/sign-up";
  const linkName = {
    "/": "Выйти",
    "/sign-up": "Войти",
    "/sign-in": "Регистрация",
  };
  const handleLogout = () => {
    props.onLogout();
  };

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип сайта Mesto" />
      {props.path === "/" ? (
        <div className="header__menu">
          <a className="header__link header__link_mail">{props.userEmail}</a>
          <Link
            className="header__link header__link_exit"
            to={newPath}
            onClick={handleLogout}
          >
            {linkName[props.path]}
          </Link>
        </div>
      ) : (
        <Link className="header__link" to={newPath}>
          {linkName[props.path]}
        </Link>
      )}
    </header>
  );
}

export default Header;
