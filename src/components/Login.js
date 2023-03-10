import React from "react";

function Login({ handleLogin }) {
  const [userData, setUserData] = React.useState({
    password: "",
    email: "",
  });
  const [message, setMessage] = React.useState("");

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
        // console.log(userData)
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
      // className="popup__form popup__form_delete_card"
      className="registration"
    >
      <h2 className="registration__title">Вход</h2>
      <input
        onChange={handleChange}
        type="email"
        id="email"
        name="email"
        // className="popup__input popup__input_type_name"
        className="registration__input"
        required
        placeholder="email"
      />
      <input
        onChange={handleChange}
        type="password"
        id="password"
        name="password"
        // className="popup__input popup__input_type_name"
        className="registration__input"
        required
        placeholder="Password"
      />
      <span className="name-user-error popup__input-error">{message}</span>
      <button
        type="submit"
        // className="button popup__button-save"
        className="registration__button-save registration__login-btn"
        aria-label="Вход"
      >
        Войти
      </button>
    </form>
  );
}

export default Login;