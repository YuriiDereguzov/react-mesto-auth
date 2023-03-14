import {React, useState} from "react";

function Login({ handleLogin }) {
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

    if (!userData.email || !userData.password) {
      return;
    }

    handleLogin(userData)
      .then(() => {
        setUserData({ email: "", password: "" });
        setMessage("");
      })
      .catch((error) => {
        setMessage(`Что-то пошло не так! ${error} `);
      });
  }

  return (
    <form
      onSubmit={handleSubmit}
      name="registration"
      className="registration"
    >
      <h2 className="registration__title">Вход</h2>
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
        className="registration__button-save registration__login-btn"
        aria-label="Вход"
      >
        Войти
      </button>
    </form>
  );
}

export default Login;
