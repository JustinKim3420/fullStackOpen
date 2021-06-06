import Blog from "./Blog";
import React, { useRef } from "react";
import NewBlogForm from "./NewBlogForm";
import Toggleable from "./Toggleable";
import { showMessage } from "../reducers/messageReducer";
import { createBlog, increaseLikes, deleteBlog } from "../reducers/blogReducer";
import { logout } from "../reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./Navbar";
import UsersForm from "./UsersForm";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import SingleUser from "./SingleUser";
import SingleBlog from "./SingleBlog";

const BlogForm = () => {
  const successMessageStyle = {
    color: "green",
    borderWidth: "0.1rem",
    borderColor: "green",
    backgroundColor: "rgb(163, 255, 163)",
  };
  const errorMessageStyle = {
    color: "red",
    borderWidth: "0.1rem",
    borderColor: "red",
    backgroundColor: "pink",
  };
  const toggleableRef = useRef();
  const dispatch = useDispatch();
  const message = useSelector((state) => state.message);
  const blogs = useSelector((state) => state.blog);
  const user = useSelector((state) => state.user);
  const users = useSelector((state) => state.users);
  const userMatch = useRouteMatch("/users/:id");
  const singleUser = userMatch
    ? users.find((user) => user.id === String(userMatch.params.id))
    : null;
  const blogMatch = useRouteMatch("/blogs/:id");
  const singleBlog = blogMatch
  ? blogs.find(blog => blog.id === String(blogMatch.params.id))
  :null;

  const createNewBlog = (blogInfo) => {
    try {
      toggleableRef.current.toggleVisibility();
      dispatch(createBlog(blogInfo));
      dispatch(
        showMessage(
          `Successfully created blog for ${blogInfo.title} by ${blogInfo.author}`,
          successMessageStyle
        )
      );
    } catch (error) {
      dispatch(
        showMessage(
          "Missing blog info. Could not create new blog",
          errorMessageStyle
        )
      );
      console.log(error);
    }
  };

  const handleLogoutClick = () => {
    window.localStorage.removeItem("loggedUser");
    dispatch(logout());
    dispatch(showMessage("Successfully logged out", successMessageStyle));
  };

  const likeButtonClick = (id) => {
    const blogToLike = blogs.find((blog) => blog.id === id);
    const likedBlog = {
      ...blogToLike,
      likes: blogToLike.likes + 1,
      user: blogToLike.user.id,
    };
    dispatch(increaseLikes(likedBlog, id));
  };

  const handleDeleteClick = (blog) => {
    if (
      window.confirm(`Do you want to delete ${blog.title} by ${blog.author}?`)
    ) {
      dispatch(deleteBlog(blog.id));
      dispatch(
        showMessage(`Successfully deleted ${blog.title}`, successMessageStyle)
      );
    }
  };

  return (
    <div>
      <Navbar handleLogout={handleLogoutClick} user={user}/>
      <div className="message" style={message.style}>
        {message.message}
      </div>
      <h1>Blogs</h1>
      <Switch>
        <Route path="/users/:id">
          <SingleUser user={singleUser} />
        </Route>
        <Route path="/users">
          <UsersForm />
        </Route>
        <Route path="/blogs/:id">
          <SingleBlog blog={singleBlog} likeButtonClick={likeButtonClick}/>
        </Route>
        <Route path="">
          <h2>Create a new blog</h2>
          <Toggleable buttonLabel="Show Blog Form" ref={toggleableRef}>
            <NewBlogForm createNewBlog={createNewBlog} />
          </Toggleable>
          {blogs.map((blog) => {
            return (
              <Blog
                key={blog.id}
                blog={blog}
                likeButtonClick={likeButtonClick}
                handleDeleteClick={handleDeleteClick}
              />
            );
          })}
        </Route>
      </Switch>
    </div>
  );
};

export default BlogForm;
