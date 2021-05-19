import React from "react";
import { connect } from "react-redux";
import { increaseVote } from "../reducers/anecdoteReducer";
import {
  showNotification
} from "../reducers/notificationReducer";


const AnecdoteList = (props) => {

  const borderStyle = {
    border: "solid 0.1rem black",
    marginBottom: "0.25rem",
  };

  const vote = (anecdote) => {
    props.increaseVote(props.anecdotes,anecdote.id);
    props.showNotification(`You voted for '${anecdote.content}'`,5);
  };

  const filteredAnecdotes = props.anecdotes.filter((anecdote)=>{
    return ((anecdote.content.toLowerCase()).includes(props.filter.toLowerCase()))
  })

  return (
    <div>
      {filteredAnecdotes.map((anecdote) => {
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

const mapDispatchToProps = {
  increaseVote,
  showNotification
}

const mapStateToProps = (state)=>{
  return({
    filter:state.filter,
    anecdotes:state.anecdotes,
})}

const connectedAnecdoteList = connect(mapStateToProps,mapDispatchToProps)(AnecdoteList)

export default connectedAnecdoteList;
