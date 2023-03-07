import React from "react";
import logo from "../images/Vector-logo.svg";

function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Место Россия" />
      <div className="header__loged">
        <p className="heder__email">@mail</p>
        <button className="header__button">Вход</button> 
      </div>
    </header>
  );
}

export default Header;
