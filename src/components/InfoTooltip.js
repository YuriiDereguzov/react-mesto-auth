import React from "react";
import Union from "../images/Union.svg";
import Union2 from "../images/Union2.svg";

function InfoTooltip(props) {
  return (
    <section
      className={`popup  popup_tooltip ${props.isOpen ? "popup_opened" : ""}`}
    >
      <div className="popup__container">
        <div onSubmit={props.onSubmit} className="popup__form">
          <img
            className="popup__tooltip-image"
            src={props.isSuccess ? Union : Union2}
            alt="Union"
          />
          <h2 className="popup__tooltip-text">{props.titleText}</h2>
        </div>
        <button
          onClick={props.onClose}
          type="button"
          className="popup__close popup__close-button"
          aria-label="Закрыть"
        ></button>
      </div>
    </section>
  );
}

export default InfoTooltip;
