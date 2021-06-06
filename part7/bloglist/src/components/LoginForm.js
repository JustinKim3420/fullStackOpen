import React, { useState } from "react";
import { login } from "../reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

const LoginForm = () => {
  const [formInformation, setFormInformation] = useState({
    username: "",
    password: "",
  });
  const history = useHistory();

  const dispatch = useDispatch();
  const message = useSelector((state) => {
    return state.message;
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
    dispatch(login(formInformation));
    history.push("/");
  };

  return (
    <>
      <div className="message" style={message.style}>
        {message.message}
      </div>
      <h1 className="loginHeader">Log in to the application</h1>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label className="formTitle" htmlFor="usernameInput">
            Username
          </Form.Label>
          <Form.Control
            type="text"
            id="usernameInput"
            className="formInput"
            name="username"
            onChange={handleChange}
            value={formInformation.username}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label className="formTitle" htmlFor="passwordInput">
            Password
          </Form.Label>
          <Form.Control
            type="password"
            id="passwordInput"
            className="formInput"
            name="password"
            onChange={handleChange}
            value={formInformation.password}
          />
        </Form.Group>
        <Button type="submit" variant='primary'>
          Login
        </Button>
      </Form>
    </>
  );
};

export default LoginForm;
