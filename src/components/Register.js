import {React, useState} from "react";
import { Link } from "react-router-dom";

function Register({ handleRegister }) {
  const [userData, setUserData] = useState({
    password: "",
    email: "",
  });
  const [message, setMessage] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;

    setUserData({
      ...userData,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    handleRegister(userData)
      .then(() => {
        setMessage("");
      })
      .catch((error) => {
        setMessage(`Что-то пошло не так! ${error} `);
      });
  }

  return (
    <form onSubmit={handleSubmit} name="registration" className="registration">
      <h2 className="registration__title">Регистрация</h2>
      <input
        onChange={handleChange}
        type="email"
        id="email"
        name="email"
        className="registration__input"
        required
        placeholder="email"
      />
      <input
        onChange={handleChange}
        type="password"
        id="password"
        name="password"
        className="registration__input"
        required
        placeholder="Password"
      />
      <span className="name-user-error popup__input-error">{message}</span>
      <button
        type="submit"
        className="registration__button-save"
        aria-label="Регистрация"
      >
        Зарегистрироваться
      </button>
      <p className="registration__button">
        Уже зарегестрированны?{" "}
        <Link to="/sign-in" className="registration__login-link">
          Войти
        </Link>
      </p>
    </form>
  );
}

export default Register;
