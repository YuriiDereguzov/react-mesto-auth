import { React, useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import ImagePopup from "./ImagePopup";
import Main from "./Main";
import { api } from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import * as Auth from "../utils/Auth";
import InfoTooltip from "./InfoTooltip";

function App() {
  const navigate = useNavigate();

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({
    name: "",
    link: "",
  });
  const [currentUser, setCurrentUser] = useState("");
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);
  const [tooltipStatusText, setTooltipStatusText] = useState(
    "Что-то пошло не так! Попробуйте ещё раз."
  );

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getProfile(), api.getInitialCards()])
        .then(([userData, cardList]) => {
          setCurrentUser(userData);
          setCards(cardList);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`); // выведем ошибку в консоль
        });
    }
  }, [loggedIn]);

  useEffect(() => {
    // проверяем наличие токена
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      Auth.getContent(jwt).then((res) => {
        setLoggedIn(true);
        setUserEmail(res.data.email);
        navigate("/");
      });
    }
  }, [navigate]);

  function handleTooltipClose() {
    tooltipStatusText === "Вы успешно зарегистрировались!"
      ? navigate("/sign-in") ||
        setIsInfoToolTipOpen(false) ||
        setTooltipStatusText("Что-то пошло не так! Попробуйте ещё раз.")
      : setIsInfoToolTipOpen(false);
  }

  function handleRegister({ password, email }) {
    return Auth.register(password, email)
      .then(() => {
        setIsInfoToolTipOpen(true);
        setTooltipStatusText("Вы успешно зарегистрировались!");
      })
      .catch(() => {
        setIsInfoToolTipOpen(true);
      });
  }

  function handleLogin({ password, email }) {
    return Auth.authorize(password, email)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          setLoggedIn(true);
          setUserEmail(email);
          navigate("/");
        }
      })
      .catch(() => {
        setIsInfoToolTipOpen(true);
      });
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({ name: "", link: "" });
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .toggleLike(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(`Ошибка лайка карточки: ${err}`); // выведем ошибку в консоль
      });
  }

  function handleCardDelete(card) {
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(`Ошибка удаления карточки: ${err}`); // выведем ошибку в консоль
      });
  }

  function handleUpdateUser(userData) {
    api
      .editProfile(userData.name, userData.about)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка при обновлении информации пользователя: ${err}`); // выведем ошибку в консоль
      });
  }
  function handleUpdateAvatar(userData) {
    api
      .editAvatar(userData.avatar)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка при обновлении аватара: ${err}`); // выведем ошибку в консоль
      });
  }
  function handleAddPlaceSubmit(name, link) {
    api
      .addCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка при добавлении новой карточки: ${err}`); // выведем ошибку в консоль
      });
  }

  return (
    <div className="page">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <CurrentUserContext.Provider value={currentUser}>
                <Header link="/sign-in" email={userEmail} buttonText="Выйти" />
                <ProtectedRoute
                  loggedIn={loggedIn}
                  component={Main}
                  cards={cards}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={setSelectedCard}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />
                <Footer />
                <ImagePopup card={selectedCard} onClose={closeAllPopups} />
                <EditProfilePopup
                  isOpen={isEditProfilePopupOpen}
                  onClose={closeAllPopups}
                  onUpdateUser={handleUpdateUser}
                />
                <EditAvatarPopup
                  isOpen={isEditAvatarPopupOpen}
                  onClose={closeAllPopups}
                  onUpdateAvatar={handleUpdateAvatar}
                />
                <AddPlacePopup
                  isOpen={isAddPlacePopupOpen}
                  onClose={closeAllPopups}
                  onAddPlace={handleAddPlaceSubmit}
                />
              </CurrentUserContext.Provider>
            </>
          }
        />
        <Route
          path="/sign-in"
          element={
            <>
              <Header link="/sign-up" buttonText="Регистрация" />
              <Login handleLogin={handleLogin} />
            </>
          }
        />
        <Route
          path="/sign-up"
          element={
            <>
              <Header link="/sign-in" buttonText="Войти" />
              <Register handleRegister={handleRegister} />
            </>
          }
        />
        <Route
          path="*"
          element={loggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />}
        />
      </Routes>
      <InfoTooltip
        isOpen={isInfoToolTipOpen}
        onClose={handleTooltipClose}
        isSuccess={tooltipStatusText === "Вы успешно зарегистрировались!"}
        titleText={tooltipStatusText}
      />
    </div>
  );
}

export default App;
