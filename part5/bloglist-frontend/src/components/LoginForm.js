import React, { useState } from 'react'
import './LoginForm.css'
import loginService from '../services/loginService'

const LoginForm = ({ setUser, showMessage, setShowMessage }) => {
  const [formInformation, setFormInformation] = useState({
    username: '',
    password: '',
  })

  const successMessageStyle = {
    color: 'green',
    borderWidth: '0.1rem',
    borderColor: 'green',
    backgroundColor: 'rgb(163, 255, 163)',
  }

  const errorMessageStyle = {
    color: 'red',
    borderWidth: '0.1rem',
    borderColor: 'red',
    backgroundColor: 'pink',
  }

  const handleChange = (event) => {
    const value = event.target.value
    setFormInformation({
      ...formInformation,
      [event.target.name]: value,
    })
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.postLogin(formInformation)
      window.localStorage.setItem('loggedUser', JSON.stringify(user.data))
      setUser(user.data)
      setShowMessage({
        message: 'Successfully logged in',
        style: successMessageStyle,
      })
    } catch (error) {
      setShowMessage({
        message: 'Incorrect username or password',
        style: errorMessageStyle,
      })
      console.log(error)
    }
  }

  return (
    <>
      <div style={showMessage.style}>{showMessage.message}</div>
      <h1 className="loginHeader">Log in to the application</h1>
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
  )
}

export default LoginForm
