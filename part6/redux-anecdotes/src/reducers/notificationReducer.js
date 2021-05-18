const initialState = "";
let timeout;

export const showNotification = (content, seconds) => {
  return async (dispatch) => {
    if (timeout) {
      console.log("ifstatement");
      clearTimeout(timeout);
      dispatch({
        type: "SHOW_NOTIFICATION",
        data: {
          content: content,
        }});
      timeout = setTimeout(() => dispatch(closeNotification()), seconds * 1000);
    } else {
      console.log("elsestatement");
      timeout = setTimeout(() => dispatch(closeNotification()), seconds * 1000);
      dispatch({
        type: "SHOW_NOTIFICATION",
        data: {
          content: content,
        },
      });
    }
  };
};

export const closeNotification = () => {
  return {
    type: "CLOSE_NOTIFICATION",
    data: {
      content: "",
    },
  };
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SHOW_NOTIFICATION": {
      return action.data.content;
    }
    case "CLOSE_NOTIFICATION": {
      return action.data.content;
    }
    default: {
      return state;
    }
  }
};

export default notificationReducer;
