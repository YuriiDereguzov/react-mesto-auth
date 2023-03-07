import React from "react";

// «Редактировать профиль»
// «Новое место»
// «Обновить аватар»
// «Вы уверены?»

function PopupWithForm(props) {
  return (
    <section
      className={`popup popup_${props.name} ${
        props.isOpen ? "popup_opened" : ""
      }`}
    >
      <div className="popup__container">
        <form onSubmit={props.onSubmit} name={`${props.name}`} className="popup__form" /*novalidate*/>
          <h2 className="popup__title">{props.title}</h2>
          {props.children}
          <button
            type="submit"
            className="button popup__button-save"
            aria-label="Сохранить"
          >
            {props.buttonText}
          </button>
        </form>
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

export default PopupWithForm;
