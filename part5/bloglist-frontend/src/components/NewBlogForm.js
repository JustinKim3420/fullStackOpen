import React, { useState } from 'react'

const NewBlogForm = ({
  createBlog
}) => {

  const [blogInfo, setBlogInfo] = useState({
    title: '',
    author: '',
    url: '',
  })

  const changeHandler = (event) => {
    const value = event.target.value
    setBlogInfo({
      ...blogInfo,
      [event.target.name]: value,
    })
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog(blogInfo)
    setBlogInfo({
      title: '',
      author: '',
      url: '',
    })
  }

  return (
    <form className='NewBlogForm' onSubmit={addBlog}>
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
        <label htmlFor="authorInput">author:</label>
        <input
          id="authorInput"
          name="author"
          value={blogInfo.author}
          onChange={changeHandler}
        />
      </div>
      <div>
        <label htmlFor="url">url:</label>
        <input
          id="urlInput"
          name="url"
          value={blogInfo.url}
          onChange={changeHandler}
        />
      </div>
      <button className='submitButton' type="submit">Create blog</button>
    </form>
  )
}

export default NewBlogForm
