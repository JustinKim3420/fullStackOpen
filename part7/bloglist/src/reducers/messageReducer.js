const initialState = {
  message: "",
  style: { display: "none" },
};
let messageTimeout;

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SHOW_MESSAGE": {
      return {
        message: action.data.message,
        style: action.data.style,
      };
    }
    case "CLOSE_MESSAGE": {
      return {
        ...action.data,
      };
    }
    default: {
      return state;
    }
  }
};

export const showMessage = (message, style) => {
  return (dispatch) => {
    clearTimeout(messageTimeout);
    messageTimeout = setTimeout(() => {
      dispatch(closeMessage());
    }, 3000);
    dispatch({
      type: "SHOW_MESSAGE",
      data: {
        message: message,
        style: style,
      },
    });
  };
};

export const closeMessage = () => {
  return {
    type: "CLOSE_MESSAGE",
    data: { ...initialState },
  };
};

export default messageReducer;
