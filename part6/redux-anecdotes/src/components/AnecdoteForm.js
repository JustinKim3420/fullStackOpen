import React from "react";
import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const createNewAnecdote = (event) => {
    event.preventDefault();
    const newEntry = event.target.anecdoteInput.value;
    event.target.anecdoteInput.value = ''
    dispatch(createAnecdote(newEntry));
  };

  return (
    <div>
      <h2>create new anecdote</h2>
      <form onSubmit={createNewAnecdote}>
        <div>
          <input name="anecdoteInput" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm