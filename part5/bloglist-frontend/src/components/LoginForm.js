import React, { useState } from 'react'
import './LoginForm.css'
import loginService from '../services/loginService'

const LoginForm = ({ setUser, showMessage, setShowMessage }) => {
  const [formInformation, setFormInformation] = useState({
    username: '',
    password: '',
  })

  const successMessageStyle = {
    display:'block',
    color: 'green',
    borderWidth: '0.1rem',
    borderColor: 'green',
    backgroundColor: 'rgb(163, 255, 163)',
  }

  const errorMessageStyle = {
    display:'block',
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
      <div className='message' style={showMessage.style}>{showMessage.message}</div>
      <h1 className="loginHeader">Log in to the application</h1>
      <form className="loginForm" onSubmit={handleLogin}>
        <div className="formSection">
          <label  className="formTitle" htmlFor="usernameInput">
            Username
          </label>
          <input
            type="text"
            id="usernameInput"
            className="formInput"
            name="username"
            onChange={handleChange}
            value={formInformation.username}
          />
        </div>
        <div className="formSection">
          <label  className="formTitle" htmlFor="passwordInput">
            Password
          </label>
          <input
            type="password"
            id="passwordInput"
            className="formInput"
            name="password"
            onChange={handleChange}
            value={formInformation.password}
          />
        </div>
        <button id="loginButton" type="submit" className="submitButton">
          Login
        </button>
      </form>
    </>
  )
}

export default LoginForm
