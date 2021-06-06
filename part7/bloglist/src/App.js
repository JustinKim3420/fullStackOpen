import React, { useEffect } from "react";
import blogsService from "./services/blogsService";
import usersService from "./services/usersService";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import { initializeBlogs } from "./reducers/blogReducer";
import { initializeUser } from "./reducers/userReducer";
import { initializeUsers } from "./reducers/usersReducer";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blog);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    blogsService.getAll().then((blogs) => {
      dispatch(initializeBlogs(blogs));
    });
  }, [dispatch]);

  useEffect(()=>{
    usersService.getUsers().then(users=>{
      dispatch(initializeUsers(users))
    })
  },[dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      dispatch(initializeUser(loggedUser));
    }
  }, [dispatch]);

  return (
    <Router>
      <Switch>
        <Route path="/">
          <div className='container'>
            {user.token && (
              <>
                <BlogForm blogs={blogs} user={user} />
              </>
            )}
            {!user.token && (
              <>
                <LoginForm />
              </>
            )}
          </div>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
