import { getAnecdotes, postAnecdote, updateVotes } from "../services/anecdote";

export const increaseVote = (anecdotes, id) => {
  return async (dispatch) => {
    const updatedAnecdote = await updateVotes(anecdotes, id);
    const newState = anecdotes.map((anecdote) => {
      if (anecdote.id === id) {
        return updatedAnecdote;
      }
      return anecdote;
    });
    const sortedState = newState.sort((a, b) => {
      if (a.votes > b.votes) {
        return -1;
      } else if (a.votes < b.votes) {
        return 1;
      } else {
        return 0;
      }
    });

    dispatch({
      type: "INCREASE_VOTE",
      data: sortedState,
    });
  };
};

export const createAnecdote = (newAnecdote) => {
  return async (dispatch) => {
    const newAnecdoteObject = await postAnecdote(newAnecdote);
    dispatch({
      type: "CREATE_ANECDOTE",
      data: {
        ...newAnecdoteObject,
      },
    });
  };
};

export const initialAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await getAnecdotes();
    dispatch({
      type: "INIT_ANECDOTES",
      data: {
        anecdotes: anecdotes,
      },
    });
  };
};

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case "INCREASE_VOTE": {
      return action.data;
    }

    case "CREATE_ANECDOTE": {
      const newState = state.concat(action.data);
      return newState;
    }

    case "INIT_ANECDOTES": {
      return action.data.anecdotes;
    }

    default:
      return state;
  }
};

export default anecdoteReducer;
