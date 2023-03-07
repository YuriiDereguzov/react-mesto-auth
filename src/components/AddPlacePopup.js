import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  // Стейты, в которых содержится значение инпутов
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");
  // После загрузки текущих данных из API
  // данные будут стерты в управляемых компонентах.
  React.useEffect(() => {
    setName("");
    setLink("");
  }, [props.onAddPlace]);

  function handleSubmit(e) {
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onAddPlace(name, link);
  }

  // Обработчики изменения инпутов обновляют стейты
  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  return (
    <PopupWithForm
      name="add_card"
      title="Новое место"
      buttonText="Создать"
      onClose={props.onClose}
      isOpen={props.isOpen}
      onSubmit={handleSubmit}
      children={
        <>
          <input
            type="text"
            value={name}
            onChange={handleChangeName}
            id="name-card"
            name="name"
            className="popup__input popup__input_card_name"
            required
            placeholder="Название"
          />
          <span className="name-card-error popup__input-error"></span>
          <input
            type="url"
            value={link}
            onChange={handleChangeLink}
            id="link"
            name="link"
            className="popup__input popup__input_card_image"
            required
            placeholder="Ссылка на картинку"
          />
          <span className="link-error popup__input-error"></span>
        </>
      }
    />
  );
}

export default AddPlacePopup;
