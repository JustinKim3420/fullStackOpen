import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increaseVote } from "../reducers/anecdoteReducer";
import {
  showNotification,
  closeNotification,
} from "../reducers/notificationReducer";

let timeOut;

const AnecdoteList = () => {
  const notification = useSelector((state) => state.notification);
  const filter = useSelector((state) => state.filter);
  const anecdotes = (useSelector((state) => state.anecdote)).filter((anecdote)=>{
    console.log(anecdote)
    return ((anecdote.content.toLowerCase()).includes(filter.toLowerCase()))
  });
  const dispatch = useDispatch();

  const borderStyle = {
    border: "solid 0.1rem black",
    marginBottom: "0.25rem",
  };

  const vote = (anecdote) => {
    dispatch(increaseVote(anecdote.id));
    console.log(timeOut);
    if (notification === "") {
      console.log("if statement");
      dispatch(showNotification(anecdote.content));
      timeOut = setTimeout(() => dispatch(closeNotification()), 5000);
    } else {
      console.log("else statement");
      clearTimeout(timeOut);
      dispatch(showNotification(anecdote.content));
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
