import React from "react";
import blogsService from "../services/blogsService";

const NewBlogForm = ({
  blogs,
  setBlogs,
  blogInfo,
  setBlogInfo,
  setNewBlog,
  setIsError,
  toggleVisibility
}) => {
  const changeHandler = (event) => {
    const value = event.target.value;
    setBlogInfo({
      ...blogInfo,
      [event.target.name]: value,
    });
  };

  const createBlog = async (event) => {
    event.preventDefault();
    try {
      const newBlog = await blogsService.createBlog(blogInfo);
      toggleVisibility()
      setBlogs([...blogs, newBlog]);
      setNewBlog(newBlog);
      setBlogInfo({
        title: "",
        author: "",
        url: "",
      });
    } catch (error) {
      setIsError(true)
      console.log(error);
    }
  };

  return (
    <form onSubmit={createBlog}>
      <div>
        <label htmlFor="titleInput">title:</label>
        <input
          id="titleInput"
          name="title"
          value={blogInfo.title}
          onChange={changeHandler}
        />
      </div>
      <div>
        <label id="author">author:</label>
        <input
          htmlFor="author"
          name="author"
          value={blogInfo.author}
          onChange={changeHandler}
        />
      </div>
      <div>
        <label id="url">url:</label>
        <input
          htmlFor="url"
          name="url"
          value={blogInfo.url}
          onChange={changeHandler}
        />
      </div>
      <button type="submit">Create blog</button>
    </form>
  );
};

export default NewBlogForm;
