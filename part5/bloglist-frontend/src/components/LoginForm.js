import React, { useState } from "react";
import "./LoginForm.css";
import loginService from "../services/loginService";
import ErrorMessage from "./ErrorMessage";
import SuccessMessage from "./SuccessMessage";

const LoginForm = ({ setUser, setLoginPassed, loginPassed, loggedOut, setLoggedOut }) => {
  const [formInformation, setFormInformation] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    const value = event.target.value;
    setFormInformation({
      ...formInformation,
      [event.target.name]: value,
    });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.postLogin(formInformation);
      window.localStorage.setItem("loggedUser", JSON.stringify(user.data));
      setUser(user.data);
      setLoginPassed(true);
    } catch (error) {
      console.log(error);
      setLoginPassed(false);
    }
  };

  return (
    <>
      <h1 className="loginHeader">Log in to the application</h1>
      {loginPassed === false && (
        <ErrorMessage
          state={loginPassed}
          changeState={setLoginPassed}
          message={"Incorrect username or password"}
        />
      )}
      {loggedOut === true && (
        <SuccessMessage
        state={loggedOut}
        changeState={setLoggedOut}
        message={"Successfully logged out"}
      />
      )}
      <form className="loginForm" onSubmit={handleLogin}>
        <div className="formSection">
          <label id="usernameInput" className="formTitle">
            Username
          </label>
          <input
            type="text"
            htmlFor="usernameInput"
            className="formInput"
            name="username"
            onChange={handleChange}
            value={formInformation.username}
          />
        </div>
        <div className="formSection">
          <label id="passwordInput" className="formTitle">
            Password
          </label>
          <input
            type="password"
            htmlFor="passwordInput"
            className="formInput"
            name="password"
            onChange={handleChange}
            value={formInformation.password}
          />
        </div>
        <button type="submit" className="submitButton">
          Login
        </button>
      </form>
    </>
  );
};

export default LoginForm;
