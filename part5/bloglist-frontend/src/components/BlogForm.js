import Blog from "./Blog";
import React, { useState } from "react";
import "./BlogForm.css";
import NewBlogForm from "./NewBlogForm";
import SuccessMessage from "./SuccessMessage";
import ErrorMessage from "./ErrorMessage";

const BlogForm = ({
  blogs,
  user,
  setUser,
  setBlogs,
  newBlog,
  setNewBlog,
  loginPassed,
  setLoginPassed,
  loggedOut,
  setLoggedOut,
  isError,
  setIsError,
}) => {
  const [blogInfo, setBlogInfo] = useState({
    title: "",
    author: "",
    url: "",
  });

  const handleLogoutClick = () => {
    window.localStorage.removeItem("loggedUser");
    setUser();
    setLoggedOut(true);
  };

  return (
    <div>
      <h1>Blogs</h1>
      {loginPassed === true && (
        <SuccessMessage
          state={loginPassed}
          changeState={setLoginPassed}
          message={"Successfully logged in"}
        />
      )}
      {newBlog && (
        <SuccessMessage
          state={newBlog}
          changeState={setNewBlog}
          message={`Added blog "${newBlog.title}" by ${newBlog.author} to the blog list`}
        />
      )}
      {isError && (
        <ErrorMessage
          state={isError}
          changeState={setIsError}
          message={`Please add a URL or Title`}
        />
      )}
      <div>
        <span className="userStatement">
          {user.name} is currently logged in
        </span>
        <button onClick={handleLogoutClick}>Logout</button>
      </div>
      <h1>Create a new blog</h1>
      <NewBlogForm
        setBlogs={setBlogs}
        blogs={blogs}
        blogInfo={blogInfo}
        setBlogInfo={setBlogInfo}
        setNewBlog={setNewBlog}
        setIsError={setIsError}
      />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogForm;
