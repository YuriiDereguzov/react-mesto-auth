import React from "react";
import { Link } from "react-router-dom";

function Register({ handleRegister }) {
//   const [userData, setUserData] = React.useState({
//     username: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const [message, setMessage] = React.useState("");

//   function handleChange(e) {
//     const { name, value } = e.target;

//     setUserData({
//       ...userData,
//       [name]: value,
//     });
//   }

//   function handleSubmit(e) {
//     e.preventDefault();

//     if (userData.password === userData.confirmPassword) {
//       handleRegister(userData)
//         .then(() => {
//           setMessage("");
//         })
//         .catch((error) => {
//           setMessage(`Что-то пошло не так! ${error} `);
//         });
//     }
//   }

  return (
    <form
      name="registration"
      // className="popup__form popup__form_delete_card"
      className="registration"
    >
      <h2 className="registration__title">Регистрация</h2>
      <input
        type="text"
        id="@mailr"
        name="@mail"
        // className="popup__input popup__input_type_name"
        className="registration__input"
        required
        placeholder="@mail"
      />
      <span className="name-user-error popup__input-error"></span>
      <input
        type="password"
        id="password"
        name="password"
        // className="popup__input popup__input_type_name"
        className="registration__input"
        required
        placeholder="Password"
      />
      <span className="name-user-error popup__input-error"></span>
      <button
        type="submit"
        // className="button popup__button-save"
        className="registration__button-save"
        aria-label="Регистрация"
      >
        Зарегистрироваться
      </button>
      <p className="registration__button">
        Уже зарегестрированны? <Link to="/sign-up" className="registration__login-link">Войти</Link>
      </p>
    </form>
  );
}

export default Register;