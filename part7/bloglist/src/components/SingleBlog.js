import React, { useState } from "react";
import {useDispatch} from 'react-redux'
import {addComment} from '../reducers/blogReducer'
import {showMessage} from '../reducers/messageReducer'

const errorMessageStyle = {
  color: "red",
  borderWidth: "0.1rem",
  borderColor: "red",
  backgroundColor: "pink",
};
const successMessageStyle = {
  color: "green",
  borderWidth: "0.1rem",
  borderColor: "green",
  backgroundColor: "rgb(163, 255, 163)",
};

const SingleBlog = ({ blog, likeButtonClick }) => {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch()

  const handleChange = (event) => {
    setComment(event.target.value);
  };

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    if(comment.length>0){
        dispatch(addComment(blog, comment))
        setComment('')
        dispatch(showMessage('Successfully added comment', successMessageStyle))
    }else{
      dispatch(showMessage('Please include a comment', errorMessageStyle))
    }
  };

  if (!blog) {
    return null;
  } else {
    return (
      <div>
        <h2>{blog.title}</h2>
        <div>
          <a href={`${blog.url}`}>{blog.url}</a>
        </div>
        <div>
          {blog.likes}{" "}
          <button onClick={() => likeButtonClick(blog.id)}>like</button>
        </div>
        <div>added by {blog.user.name}</div>

        <h2>Comments</h2>
        <form onSubmit={handleCommentSubmit}>
          <input onChange={handleChange} value={comment}></input>
          <button type="submit">Create comment</button>
        </form>
        <ul>
          {blog.comments.map((comment) => {
            return <li key={comment._id}>{comment.comment}</li>;
          })}
        </ul>
      </div>
    );
  }
};

export default SingleBlog;
