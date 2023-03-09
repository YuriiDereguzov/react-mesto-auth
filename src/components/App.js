import React from "react";
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
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

function App() {
  const navigate = useNavigate();

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({
    name: "",
    link: "",
  });
  const [currentUser, setCurrentUser] = React.useState("");
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [data, setData] = React.useState({
    email: "",
  });

  React.useEffect(() => {
    Promise.all([api.getProfile(), api.getInitialCards()])
      .then(([userData, cardList]) => {
        setCurrentUser(userData);
        setCards(cardList);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`); // выведем ошибку в консоль
      });
  }, []);

  React.useEffect(() => {
    tokenCheck();
  });

  function tokenCheck() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      Auth.getContent(jwt).then((res) => {
        setLoggedIn(true);
        setData({
          email: res.email,
        });
        navigate("/");
      });
    }
  }
    
  function handleRegister({ password, email }) {
    return Auth.register(password, email).then(() => {
      navigate("/sign-up");
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
    api.toggleLike(card._id, isLiked).then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    })
    .catch((err) => {
      console.log(`Ошибка лайка карточки: ${err}`); // выведем ошибку в консоль
    })
  }

  function handleCardDelete(card) {
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.deleteCard(card._id).then(() => {
      setCards((cards) => cards.filter((c) => c._id !== card._id));
    })
    .catch((err) => {
      console.log(`Ошибка удаления карточки: ${err}`); // выведем ошибку в консоль
    })
  }

  function handleUpdateUser(userData) {
    api.editProfile(userData.name, userData.about).then((userData) => {
      setCurrentUser(userData);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(`Ошибка при обновлении информации пользователя: ${err}`); // выведем ошибку в консоль
    })
  }
  function handleUpdateAvatar(userData) {
    api.editAvatar(userData.avatar).then((userData) => {
      setCurrentUser(userData);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(`Ошибка при обновлении аватара: ${err}`); // выведем ошибку в консоль
    })
  }
  function handleAddPlaceSubmit(name, link) {
    api.addCard(name, link).then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(`Ошибка при добавлении новой карточки: ${err}`); // выведем ошибку в консоль
    })
  }

  return (
    <div className="page">
      <Routes>
        <Route path="/" 
          element={
            <ProtectedRoute 
              loggedIn={loggedIn} 
              component={
                <>
                  <Header link="/sign-up" email={data} buttonText="Выйти" />
                  <CurrentUserContext.Provider value={currentUser}>
                    <Main
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
          }
        />
        <Route path="/sign-up" 
          element={
            <>
              <Header link="/sign-in" buttonText="Регистрация"/>
              <Login />
            </>
          } 
        />
        <Route path="/sign-in" 
          element={
            <>
              <Header  link="/sign-up" buttonText="Войти"/>
              <Register handleRegister={handleRegister}/>
            </>
          }
        />
        <Route
        path="*"
        element={loggedIn ? <Navigate to="/" /> : <Navigate to="/sign-up" />}
        />
      </Routes>
    </div>
  );
}

export default App;
