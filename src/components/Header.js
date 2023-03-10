import React from "react";
import logo from "../images/Vector-logo.svg";
import { Link } from "react-router-dom";

function Header(props) {
  function signOut() {
    localStorage.removeItem("jwt");
  }

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Место Россия" />
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
