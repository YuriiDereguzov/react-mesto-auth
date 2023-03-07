import React from "react";

function ImagePopup({ card, onClose }) {
  return (
    <section
      className={`popup popup_image_big ${card.link ? "popup_opened" : ""}`}
    >
      <div className="popup__container popup__container_image_big">
        <img className="popup__big-image" src={card.link} alt={card.name} />
        <button
          onClick={onClose}
          type="button"
          className="popup__close popup__close-button popup__close-button_image_big"
          aria-label="Закрыть"
        ></button>
        <h2 className="popup__card-name">{card.name}</h2>
      </div>
    </section>
  );
}

export default ImagePopup;
