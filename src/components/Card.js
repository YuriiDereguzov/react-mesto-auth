import React from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
  // Подписываемся на контекст CurrentUserContext
  const currentUser = React.useContext(CurrentUserContext);
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = props.card.owner._id === currentUser._id;
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);
  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = ( 
    `card__like ${isLiked && 'card__like_active'}`
  );

  function handleCardClick() {
    props.onCardClick(props.card);
  }
  function handleLikeClick() {
    props.onCardLike(props.card);
  }
  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <div className="card">
      <button onClick={handleCardClick} className="card__image-btn">
        <img
          className="card__image"
          src={props.card.link}
          alt={props.card.name}
        />
      </button>
      {isOwn && <button
        type="button"
        className="card__delete"
        aria-label="Удалить"
        onClick={handleDeleteClick}
      ></button>}
      <div className="card__content">
        <h2 className="card__name">{props.card.name}</h2>
        <div className="card__like-container">
          <button
            onClick={handleLikeClick}
            type="button"
            className={cardLikeButtonClassName}
            aria-label="Оценить"
          ></button>
          <p className="card__like-count">{props.card.likes.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
