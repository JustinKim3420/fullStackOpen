import React from 'react'
import blogsService from '../services/blogsService'

const NewBlogForm = ({
  blogs,
  setBlogs,
  blogInfo,
  setBlogInfo,
  setShowMessage,
  toggleVisibility,
}) => {
  const changeHandler = (event) => {
    const value = event.target.value
    setBlogInfo({
      ...blogInfo,
      [event.target.name]: value,
    })
  }

  const successMessageStyle = {
    color: 'green',
    borderWidth: '0.1rem',
    borderColor: 'green',
    backgroundColor: 'rgb(163, 255, 163)',
  }

  const errorMessageStyle ={
    color:'red',
    borderWidth:'0.1rem',
    borderColor:'red',
    backgroundColor: 'pink',
  }

  const createBlog = async (event) => {
    event.preventDefault()
    try {
      const newBlog = await blogsService.createBlog(blogInfo)
      toggleVisibility()
      setBlogs([...blogs, newBlog])
      setBlogInfo({
        title: '',
        author: '',
        url: '',
      })
      setShowMessage({
        message: `Successfully created blog for ${blogInfo.title} by ${blogInfo.author}`,
        style: successMessageStyle,
      })
    } catch (error) {
      setShowMessage({
        message: 'Missing blog info. Could not create new blog',
        style: errorMessageStyle,
      })
      console.log(error)
    }
  }

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
  )
}

export default NewBlogForm
