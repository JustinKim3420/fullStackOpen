const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

export const increaseVote = (id) => {
  return {
    type: "INCREASE_VOTE",
    data: { id: id },
  };
};

export const createAnecdote = (newAnecdote) => {
  return {
    type: "CREATE_ANECDOTE",
    data: {
      content: newAnecdote,
      id: getId(),
      votes: 0,
    },
  };
};

const initialState = anecdotesAtStart.map(asObject);

const anecdoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INCREASE_VOTE":{
      const newState = state.map((anecdote) => {
        if (anecdote.id === action.data.id) {
          return {
            ...anecdote,
            votes: anecdote.votes + 1,
          };
        }
        return anecdote;
      });
      newState.sort((a,b) => {
        if(a.votes>b.votes){
          return -1
        }else if(a.votes<b.votes){
          return 1
        }else{
          return 0
        }
      })
      return newState;}

    case "CREATE_ANECDOTE":{
      const newState = state.concat(action.data);
      return newState;
    }

    default:
      return state;
  }
};

export default anecdoteReducer;
