import { React, useState } from "react";
import logo from "../images/Vector-logo.svg";
import { Link } from "react-router-dom";
import CloseIcon from "../images/CloseIcon.svg";

function Header(props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  function handleClick() {
    setIsMenuOpen(!isMenuOpen);
  }

  function signOut() {
    localStorage.removeItem("jwt");
  }

  return (
    <header className="header">
      <div className="header__components">
        <img className="header__logo" src={logo} alt="Место Россия" />
        <button onClick={handleClick} className="header__menu-btn">
          {isMenuOpen ? (
            <img src={CloseIcon} alt="Крест" className="header__menu-btn" />
          ) : (
            <>
              <span className="header__span"></span>
              <span className="header__span"></span>
              <span className="header__span"></span>
            </>
          )}
        </button>
      </div>
      <div
        className={`header__loged ${isMenuOpen ? "header__loged_opened" : ""}`}
      >
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
