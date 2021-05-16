const initialState = "";

export const updateFilter = (filter) => {
  return {
    type: "UPDATE_FILTER",
    data:{
        content:filter
    }
  };
};

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_FILTER": {
      return action.data.content;
    }
    default: {
      return state;
    }
  }
};

export default filterReducer;
