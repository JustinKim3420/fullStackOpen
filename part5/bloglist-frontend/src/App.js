import React, { useState, useEffect } from "react";
import blogsService from "./services/blogsService";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState();
  const [user, setUser] = useState();
  const [loginPassed, setLoginPassed] = useState();
  const [loggedOut, setLoggedOut] = useState();
  const [isError, setIsError] = useState();

  // useEffect(() => {
  //   blogsService.getAll().then((blogs) => {
  //     setBlogs(blogs);
  //   });
  // }, []);

  useEffect(() => {
    async function fetchData() {
      const receivedBlogs = await blogsService.getAll();
      receivedBlogs.sort((a, b) => {
        return b.likes - a.likes;
      });
      setBlogs(receivedBlogs)
    }
    fetchData();
  },[])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      blogsService.setToken(loggedUser.token);
      setUser(loggedUser);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {user && (
        <>
          <BlogForm
            blogs={blogs}
            user={user}
            newBlog={newBlog}
            setNewBlog={setNewBlog}
            setUser={setUser}
            setBlogs={setBlogs}
            loginPassed={loginPassed}
            setLoginPassed={setLoginPassed}
            setLoggedOut={setLoggedOut}
            isError={isError}
            setIsError={setIsError}
          />
        </>
      )}
      {!user && (
        <>
          <LoginForm
            setUser={setUser}
            setLoginPassed={setLoginPassed}
            loginPassed={loginPassed}
            loggedOut={loggedOut}
            setLoggedOut={setLoggedOut}
          />
        </>
      )}
    </div>
  );
};

export default App;
