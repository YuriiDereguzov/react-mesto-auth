import React from "react";
import logo from "../images/Vector-logo.svg";
import { Link } from "react-router-dom";

function Header(props) {
  function signOut() {
    localStorage.removeItem("jwt");
  }

  return (
    <header className="header">
      <div className="header__components">
        <img className="header__logo" src={logo} alt="Место Россия" />
        <button className="header__menu-btn">
          <span className="header__span"></span>
          <span className="header__span"></span>
          <span className="header__span"></span>
        </button>
      </div>
      <div className="header__loged">
        <p className="heder__email">{props.email}</p>
        <button onClick={signOut} className="header__button">
          <Link to={props.link} className="header__link">
            {props.buttonText}
          </Link>
        </button>
      </div>
    </header>
  );
}

export default Header;
