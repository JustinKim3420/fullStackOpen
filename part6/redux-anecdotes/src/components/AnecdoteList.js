import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increaseVote } from "../reducers/anecdoteReducer";
import {
  showNotification,
  closeNotification,
} from "../reducers/notificationReducer";

let timeOut;

const AnecdoteList = (props) => {
  const notification = useSelector((state) => state.notification);
  const filter = useSelector((state) => state.filter);
  const anecdotes = (useSelector((state) => state.anecdote)).filter((anecdote)=>{
    return ((anecdote.content.toLowerCase()).includes(filter.toLowerCase()))
  });
  const dispatch = useDispatch();

  const borderStyle = {
    border: "solid 0.1rem black",
    marginBottom: "0.25rem",
  };

  const vote = (anecdote) => {
    dispatch(increaseVote(props.store.getState().anecdote,anecdote.id));
    if (notification === "") {
      dispatch(showNotification(`You voted for '${anecdote.content}'`,5));
    } else {
      clearTimeout(timeOut);
      dispatch(showNotification(`You voted for '${anecdote.content}'`,5));
      timeOut = setTimeout(() => dispatch(closeNotification()), 5000);
    }
  };

  return (
    <div>
      {anecdotes.map((anecdote) => {
          return (
            <div key={anecdote.id} style={borderStyle}>
              <div>{anecdote.content}</div>
              <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote)}>vote</button>
              </div>
            </div>
          );
        }
      )}
    </div>
  );
};

export default AnecdoteList;
