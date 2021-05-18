import axios from "axios";
const baseUrl = "http://localhost:3001/anecdotes";

const getAnecdotes = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const postAnecdote = async (anecdote) => {
  const newAnecdote = {
    content: anecdote,
    id: (100000 * Math.random()).toFixed(0),
    votes: 0,
  };
  const response = await axios.post(baseUrl, newAnecdote);
  return response.data;
};

const updateVotes = async (anecdotes, id) => {
  const anecdoteToUpdate = anecdotes.filter((anecdote) => {
    return anecdote.id === id;
  })[0];
  const updatedAnecdote = {
      ...anecdoteToUpdate,
      votes:anecdoteToUpdate.votes+1
  }
  const response = await axios.put(`${baseUrl}/${id}`, updatedAnecdote)

  return response.data
};

export { getAnecdotes, postAnecdote ,updateVotes};
