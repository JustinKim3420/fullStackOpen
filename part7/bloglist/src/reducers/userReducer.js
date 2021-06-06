import loginService from "../services/loginService";
import { showMessage } from "./messageReducer";

const initialState = {
  token: undefined,
  username: undefined,
  name: undefined,
};
const successMessageStyle = {
  display: "block",
  color: "green",
  borderWidth: "0.1rem",
  borderColor: "green",
  backgroundColor: "rgb(163, 255, 163)",
};
const errorMessageStyle = {
  display: "block",
  color: "red",
  borderWidth: "0.1rem",
  borderColor: "red",
  backgroundColor: "pink",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN": {
      return action.data;
    }
    case "LOGOUT": {
      return initialState;
    }
    case "INITIALIZE_USER": {
      return action.data;
    }
    default: {
      return state;
    }
  }
};

export const login = (formInfo) => {
  return (dispatch) => {
    loginService
      .postLogin(formInfo)
      .then((response) => {
        window.localStorage.setItem(
          "loggedUser",
          JSON.stringify(response.data)
        );
        console.log(response.data);
        dispatch({
          type: "LOGIN",
          data: response.data,
        });
        dispatch(showMessage("Successfully logged in", successMessageStyle));
      })
      .catch((error) => {
        dispatch(
          showMessage("Incorrect username or password", errorMessageStyle)
        );
        throw error;
      });
  };
};

export const logout = () => {
  return {
    type: "LOGOUT",
  };
};

export const initializeUser = (user) => {
  return {
    type: "INITIALIZE_USER",
    data: user,
  };
};

export default userReducer;
