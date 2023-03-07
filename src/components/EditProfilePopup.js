import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  // Стейты, в которых содержится значение инпутов
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);
  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleSubmit(e) {
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  // Обработчики изменения инпутов обновляют стейты
  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      children={
        <>
          {/* Значение элемента «привязывается» к значению стейта */}
          <input
            type="text"
            value={name || ""}
            onChange={handleChangeName}
            id="name-user"
            name="name"
            className="popup__input popup__input_type_name"
            required
            placeholder="Имя"
          />
          <span className="name-user-error popup__input-error"></span>
          <input
            type="text"
            value={description || ""}
            onChange={handleChangeDescription}
            id="job"
            name="job"
            className="popup__input popup__input_type_job"
            required
            placeholder="Вид деятельности"
          />
          <span className="job-error popup__input-error"></span>
        </>
      }
    />
  );
}

export default EditProfilePopup;
