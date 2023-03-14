import {React, useEffect, useContext, useRef} from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditAvatarPopup(props) {
  // записываем объект, возвращаемый хуком, в переменную
  const avatarRef = useRef();
  // Подписка на контекст
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    avatarRef.current.value = "";
  }, [currentUser]);

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar:
        avatarRef.current.value /* Значение инпута, полученное с помощью рефа */,
    });
  }

  return (
    <PopupWithForm
      name="edit_avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      children={
        <>
          <input
            ref={avatarRef}
            type="url"
            id="linkAvatar"
            name="link"
            className="popup__input popup__input_avatar_image"
            required
            placeholder="Ссылка на картинку"
          />
          <span className="linkAvatar-error popup__input-error"></span>
        </>
      }
    />
  );
}

export default EditAvatarPopup;
