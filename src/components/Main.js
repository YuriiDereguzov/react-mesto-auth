import React from "react";
// import { api } from "../utils.js/Api";
import Card from "./Card";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({ cards, onEditProfile, onEditAvatar, onAddPlace, onCardClick, onCardLike, onCardDelete }) {
  // Подписываемся на контекст CurrentUserContext
  const currentUser = React.useContext(CurrentUserContext);

  // const [cards, setCards] = React.useState([]);
  // React.useEffect(() => {
  //   api.getInitialCards()
  //     .then((cardList) => {
  //       setCards(cardList);
  //     })
  //     .catch((err) => {
  //       console.log(`Ошибка: ${err}`); // выведем ошибку в консоль
  //     });
  // }, []);
  // const [userName, setUserName] = React.useState("");
  // const [userDescription, setUserDescription] = React.useState("");
  // const [userAvatar, setUserAvatar] = React.useState("");
  // React.useEffect(() => {
  //   Promise.all([api.getProfile(), api.getInitialCards()])
  //     .then(([userData, cardList]) => {
  //       setUserName(userData.name);
  //       setUserDescription(userData.about);
  //       setUserAvatar(userData.avatar);
  //       setCards(cardList);
  //     })
  //     .catch((err) => {
  //       console.log(`Ошибка: ${err}`); // выведем ошибку в консоль
  //     });
  // }, []);

  return (
    <main>
      <section className="profile">
        <div className="profile__info">
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt="Аватар"
          />
          <button
            onClick={onEditAvatar}
            className="profile__avatar-edit-btn"
          ></button>
          <div className="profile__info-item">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              onClick={onEditProfile}
              type="button"
              className="profile__edit-button"
              aria-label="Редактировать"
            ></button>
            <p className="profile__job">{currentUser.about}</p>
          </div>
        </div>
        <button
          onClick={onAddPlace}
          type="button"
          className="profile__button-add"
          aria-label="Добавить"
        ></button>
      </section>

      <section className="cards">
        {cards.map((card) => (
          <Card key={card._id} card={card} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} />
        ))}
      </section>
    </main>
  );
}

export default Main;
